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
    <span className="dot w-3 h-3 rounded-full bg-[#ff5f56]" /> 
    <span className="dot w-3 h-3 rounded-full bg-[#ffbd2e]" /> 
    <span className="dot w-3 h-3 rounded-full bg-[#27c93f]" />
    <div>{language}</div>
  </div>

  {/* Code block */}
  <SyntaxHighlighter language={language} style={oneDark} customStyle={{ 
                      margin: '1rem', 
                      padding: '1rem',
                      backgroundColor: 'transparent',
                      minWidth: '100%',
                      width: 'fit-content',
                      minHeight: '100%'
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: '1rem',
                        lineHeight: '1.5em',
                      }
                    }}
                    lineProps={{
                      style: {
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-wrap'
                      }
                    }}
                    wrapLines={true}
                  >
    {code}
  </SyntaxHighlighter>
</div>
  );
}
