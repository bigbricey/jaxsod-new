import { NextRequest } from 'next/server'
import { searchContent } from '@/lib/rag'
import { CHAT_MODEL, CHAT_MAX_TOKENS, STATIC_SYSTEM_PROMPT, BOOKEND_REMINDERS } from '@/lib/chatbot-config'

export const runtime = 'nodejs'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Strip any <scratchpad>...</scratchpad> blocks from the response
// The model uses these internally for evidence extraction but users shouldn't see them
function stripScratchpad(text: string): string {
  return text.replace(/<scratchpad>[\s\S]*?<\/scratchpad>/gi, '').trim()
}

// Post-processing: strip any dollar amounts that leaked through despite prompt constraints
function stripLeakedPrices(text: string): string {
  // Remove patterns like "$120", "$120-$250", "$120 to $250", "$120–$250"
  return text.replace(/\$\d[\d,]*(\.\d{2})?\s*([-–to]+\s*\$?\d[\d,]*(\.\d{2})?)?/g, '[contact a local supplier for current pricing]')
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Chat is not configured. Missing API key.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: { messages: ChatMessage[] }
  try {
    body = await req.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { messages } = body
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: 'Messages array is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Get the latest user message for RAG search
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
  if (!lastUserMessage) {
    return new Response(
      JSON.stringify({ error: 'No user message found.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Search for relevant content
  const relevantChunks = searchContent(lastUserMessage.content)

  // Build XML-tagged context with document IDs (expert recommendation)
  let contextBlock: string
  if (relevantChunks.length > 0) {
    const documents = relevantChunks
      .map((chunk, i) => `    <document id="doc_${i + 1}" source="${chunk.source}" category="${chunk.category}">\n      ${chunk.text}\n    </document>`)
      .join('\n')
    contextBlock = `<context>\n${documents}\n</context>`
  } else {
    contextBlock = '<context>\n    No relevant articles found for this question.\n</context>'
  }

  // Architecture: Static Prefix (cached) → Dynamic Context → Bookend Reminders
  // The static system prompt never changes = KV-cache stays hot
  // Context + bookend reminders are the dynamic suffix
  const fullSystemMessage = `${STATIC_SYSTEM_PROMPT}\n\n${contextBlock}\n\n${BOOKEND_REMINDERS}`

  // Build the messages for the LLM
  const apiMessages = [
    { role: 'system', content: fullSystemMessage },
    // Include last 10 messages for conversation context (5 exchanges)
    ...messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
  ]

  // Stream the response from OpenRouter API
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: apiMessages,
      max_tokens: CHAT_MAX_TOKENS,
      stream: true,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('OpenRouter API error:', response.status, errorText)
    return new Response(
      JSON.stringify({ error: 'Failed to get a response. Please try again.' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Forward the SSE stream to the client
  // Post-process to strip scratchpad blocks and any leaked prices
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader()
      if (!reader) {
        controller.close()
        return
      }

      const decoder = new TextDecoder()
      let buffer = ''
      let fullResponse = ''
      let inScratchpad = false

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              continue
            }

            try {
              const parsed = JSON.parse(data)
              let content = parsed.choices?.[0]?.delta?.content
              if (!content) continue

              fullResponse += content

              // Track scratchpad state — hide everything between <scratchpad> and </scratchpad>
              if (content.includes('<scratchpad>')) {
                inScratchpad = true
                // Send any content before the tag
                const before = content.split('<scratchpad>')[0]
                if (before) {
                  const cleaned = stripLeakedPrices(before)
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: cleaned })}\n\n`))
                }
                continue
              }

              if (inScratchpad) {
                if (content.includes('</scratchpad>')) {
                  inScratchpad = false
                  // Send any content after the closing tag
                  const after = content.split('</scratchpad>')[1]
                  if (after) {
                    const cleaned = stripLeakedPrices(after)
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: cleaned })}\n\n`))
                  }
                }
                // Skip everything inside scratchpad
                continue
              }

              // Normal content — strip any leaked prices
              content = stripLeakedPrices(content)
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            } catch {
              // Skip unparseable chunks
            }
          }
        }
      } catch (err) {
        console.error('Stream error:', err)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
