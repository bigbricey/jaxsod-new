'use client'

import { OPEN_CHAT_EVENT } from './ChatWidget'

interface OpenChatButtonProps {
  children: React.ReactNode
  className?: string
}

export default function OpenChatButton({ children, className }: OpenChatButtonProps) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
      className={className}
    >
      {children}
    </button>
  )
}
