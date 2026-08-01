import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import CodeBlock from "./CodeBlock";

export default function MarkdownRenderer({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        //--------------------------------------------------
        // Code
        //--------------------------------------------------

        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          //--------------------------------------------------
          // Inline Code
          //--------------------------------------------------

          if (!match) {
            return (
              <code className="rounded bg-black/20 px-1.5 py-1 font-mono text-cyan-400">
                {children}
              </code>
            );
          }

          //--------------------------------------------------
          // Code Block
          //--------------------------------------------------

          return (
            <CodeBlock language={match[1]}>
              {String(children).replace(/\n$/, "")}
            </CodeBlock>
          );
        },

        //--------------------------------------------------
        // Headings
        //--------------------------------------------------

        h1: ({ children }) => (
          <h1 className="mb-5 text-4xl font-bold">{children}</h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-4 mt-8 text-3xl font-semibold">{children}</h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-3 mt-6 text-2xl font-semibold">{children}</h3>
        ),

        //--------------------------------------------------
        // Paragraph
        //--------------------------------------------------

        p: ({ children }) => <p className="mb-4 leading-8">{children}</p>,

        //--------------------------------------------------
        // Lists
        //--------------------------------------------------

        ul: ({ children }) => (
          <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
        ),

        //--------------------------------------------------
        // Quote
        //--------------------------------------------------

        blockquote: ({ children }) => (
          <blockquote className="my-5 border-l-4 border-cyan-500 pl-5 italic opacity-90">
            {children}
          </blockquote>
        ),

        //--------------------------------------------------
        // Tables
        //--------------------------------------------------

        table: ({ children }) => (
          <div className="my-6 overflow-auto rounded-xl border border-[var(--cp-border)]">
            <table className="w-full border-collapse">{children}</table>
          </div>
        ),

        th: ({ children }) => (
          <th className="border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] px-4 py-3 text-left">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border border-[var(--cp-border)] px-4 py-3">
            {children}
          </td>
        ),

        //--------------------------------------------------
        // Links
        //--------------------------------------------------

        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 underline transition hover:text-cyan-300"
          >
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
