import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { ExternalLink } from "lucide-react";

import CodeBlock from "./CodeBlock";

// A link is "bare" when the LLM just dropped a raw URL in the text (auto-linked by
// remark-gfm) rather than writing [label](url). In that case the visible text IS
// the full URL, which is what causes the ugly mid-word wrapping and makes it hard
// to tell it's a link at all. We show a short, readable label instead.
function getLinkLabel(children, href) {
  const raw = Array.isArray(children) ? children.join("") : children;
  const text = typeof raw === "string" ? raw.trim() : "";
  const isBareUrl = !text || text === href || /^https?:\/\//i.test(text);

  if (!isBareUrl) return text;

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname !== "/" ? url.pathname : "";
    const shortPath = path.length > 26 ? `${path.slice(0, 26)}…` : path;
    return `${host}${shortPath}`;
  } catch {
    return href.length > 42 ? `${href.slice(0, 42)}…` : href;
  }
}

export default function MarkdownRenderer({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
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

        p: ({ children }) => (
          <p className="mb-4 break-words leading-8">{children}</p>
        ),

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
        // Links — rendered as a clearly-marked, truncated chip
        // (with an external-link icon) instead of a raw/underlined URL.
        //--------------------------------------------------

        a: ({ children, href }) => {
          if (!href) return <>{children}</>;

          const label = getLinkLabel(children, href);

          return (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              title={href}
              className="
                inline-flex
                max-w-full
                translate-y-[2px]
                items-center
                gap-1.5
                align-middle
                rounded-lg
                border
                border-cyan-500/25
                bg-cyan-500/10
                px-2
                py-0.5
                text-[0.92em]
                font-medium
                text-cyan-300
                no-underline
                transition
                hover:border-cyan-400/50
                hover:bg-cyan-500/15
                hover:text-cyan-200
              "
            >
              <ExternalLink size={12} className="shrink-0" />
              <span className="max-w-[15rem] truncate sm:max-w-xs">
                {label}
              </span>
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
