"use client";
import { ThemeKeys, themes } from "@/utils/themes";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeBlockProps {
  code: string;
  language: string;
  theme: ThemeKeys;
}

export default function ClientCodeBlock({
  code,
  language,
  theme,
}: CodeBlockProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
      console.log(err);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className=" rounded-lg overflow-hidden shadow-md"
      style={{ backgroundColor: themes[theme].headerBg }}
    >
      {/* header */}
      <div className="flex space-x-2 px-4 py-2 bg-[#21252b] items-center">
        <span className="dot w-3 h-3 my-2 rounded-full bg-[#ff5f56]" />
        <span className="dot w-3 h-3 my-2 rounded-full bg-[#ffbd2e]" />
        <span className="dot w-3 h-3 my-2 rounded-full bg-[#27c93f]" />
        <div className="language-label ml-2 font-mono text-sm text-gray-300 flex-1">
          {language}
        </div>
        <button
          onClick={handleCopy}
          className="capture-exclude ml-auto px-3 py-1 rounded bg-purple-700 hover:bg-purple-800 text-white text-xs font-mono transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code block */}
      <div className="p-4">
        <SyntaxHighlighter
          language={language}
          style={themes[theme].style}
          customStyle={{
            margin: 0,
            padding: 0,
            backgroundColor: themes[theme].headerBg,
            minWidth: "100%",
            width: "fit-content",
            minHeight: "100%",
            border: "none",
          }}
          codeTagProps={{
            style: {
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: "1rem",
              lineHeight: themes[theme].lineHeight,
            },
          }}
          lineProps={{
            style: {
              wordBreak: "break-all",
              whiteSpace: "pre-wrap",
            },
          }}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
