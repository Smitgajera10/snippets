'use client';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose your theme
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function ClientCodeBlock({ code, language }: CodeBlockProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="bg-[#2e3440] rounded-lg overflow-hidden shadow-md">
  {/* Carbon-style window header */}
  <div className="flex space-x-2 px-4 py-2 bg-[#21252b]">
    <div className="w-3 h-3 bg-red-500 rounded-full" />
    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
    <div className="w-3 h-3 bg-green-500 rounded-full" />
  </div>

  {/* Code block */}
  <SyntaxHighlighter language="javascript" style={oneDark} customStyle={{ margin: 0, padding: "1rem" }}>
    {code}
  </SyntaxHighlighter>
</div>
  );
}
