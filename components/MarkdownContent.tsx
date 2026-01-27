interface MarkdownContentProps {
  html: string
}

export default function MarkdownContent({ html }: MarkdownContentProps) {
  return (
    <div
      className="prose max-w-none prose-headings:text-secondary-900 prose-h2:text-primary-800 prose-h2:mt-10 prose-h2:mb-6 prose-h3:mt-6 prose-h3:mb-3 prose-p:text-secondary-700 prose-p:leading-relaxed prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-a:font-semibold prose-strong:text-secondary-900 prose-ul:space-y-2 prose-li:text-secondary-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
