import Markdown from "react-markdown";

export function MarkdownText({children}: {children: string}) {
  return <Markdown
    components={{
      strong: ({node, ...props}) => (
        <strong className="font-semibold text-zinc-800" {...props} />
      ),
      em: ({node, ...props}) => (
        <em className="italic text-zinc-600" {...props} />
      ),
    }}
  >{children}</Markdown>;
}