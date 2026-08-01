import { useState } from "react";

import { Copy, Check } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false);

  //----------------------------------------------------

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(children);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  //----------------------------------------------------

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-[var(--cp-border)]">
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2">
        <span className="text-sm text-gray-400">{language || "text"}</span>

        <button
          onClick={copyCode}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-300 transition hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check size={15} />
              Copied
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "20px",
          fontSize: "14px",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
