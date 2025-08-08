'use client'
import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';
import Prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import 'prismjs/themes/prism-okaidia.css';
import detect from 'flourite';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Supported languages for the dropdown
const supportedLanguages = [
  'javascript',
  'typescript',
  'python',
  'css',
  'html',
  'json',
  'markdown',
  'rust',
  'go',
];

export default function Home() {
  const [code, setCode] = useState<string>('// Start coding here...');
  const [language, setLanguage] = useState<string>('auto');
  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (language === 'auto' && code) {
      const lang = detect(code, { shiki: true }).language;
      setDetectedLanguage(lang || 'text');
    } else {
      setDetectedLanguage(language !== 'auto' ? language : null);
    }
  }, [code, language]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLink(null);

    const languageToUse = language === 'auto' ? (detectedLanguage || 'text') : language;
    
    try {
      const res = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language: languageToUse, title }),
      });

      if (!res.ok) {
        throw new Error('Failed to create snippet.');
      }

      const data = await res.json();
      setLink(`${window.location.origin}/s/${data.id}`);
    } catch (error) {
      console.error('Error creating snippet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <Head>
        <title>Snippet-To-Link</title>
        <meta name="description" content="Share code snippets with a single link." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl w-full space-y-8 bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Create and Share Code Snippets
          </h2>
          <p className="mt-2 text-center text-sm sm:text-lg text-gray-400">
            Paste your code, and get a shareable link.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Title Input Field */}
          <div>
            <label htmlFor="title" className="sr-only">
              Snippet Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-900 text-gray-200 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Give your snippet a title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          {/* Code Editor */}
          <div className="relative font-mono bg-[#282c34] rounded-lg overflow-hidden h-96">
            {/* Window header */}
            <div className="flex space-x-2 px-4 py-2 bg-[#21252b] border-b border-gray-700 sticky top-0 z-10">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="overflow-auto h-[calc(100%-40px)]">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => (
                  <SyntaxHighlighter
                    language={detectedLanguage || 'text'}
                    style={oneDark}
                    customStyle={{ 
                      margin: 0, 
                      padding: 0,
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
                )}
                padding={16}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: '1rem',
                  backgroundColor: 'transparent',
                  color: 'white',
                  minHeight: '100%',
                  minWidth: '100%',
                  width: 'fit-content',
                  lineHeight: '1.5em',
                }}
                textareaClassName="editor__textarea"
                preClassName="editor__pre"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Language Dropdown */}
            <div className="flex-1">
              <label htmlFor="language" className="sr-only">
                Language
              </label>
              <select
                id="language"
                name="language"
                className="block w-full pl-3 pr-10 py-2 text-base bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="auto">Auto-Detect ({detectedLanguage})</option>
                {supportedLanguages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Submit Button */}
            <div className="flex-1">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Link'}
              </button>
            </div>
          </div>
        </form>
        
        {link && (
          <div className="bg-gray-600 bg-opacity-20 p-4 rounded-md">
            <p className="text-sm font-medium text-green-300">
              Your snippet link is ready!
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block truncate text-sm text-blue-300 hover:underline"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}