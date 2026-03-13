interface MarkdownContentProps {
  html: string
}

export default function MarkdownContent({ html }: MarkdownContentProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
