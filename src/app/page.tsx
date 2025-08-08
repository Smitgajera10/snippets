'use client'
import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';
import Prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import 'prismjs/themes/prism-okaidia.css';
import detect from 'flourite';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ThemeKeys, themes } from '@/utils/themes';

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
  const [theme, setTheme] = useState<ThemeKeys>('xonokai'); 
  const [outerBackground, setOuterBackground] = useState('#2d3748');

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
        body: JSON.stringify({ code, language: languageToUse, title , theme }),
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
    <div className="min-h-screen text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono bg-gray-800" >
      <Head>
        <title>Snippet-To-Link</title>
        <meta name="description" content="Share code snippets with a single link." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-5xl w-full space-y-8 p-6 sm:p-10 rounded-xl 
  bg-gradient-to-br from-gray-800/50 to-gray-900/80
  backdrop-blur-sm
  border 
  transition-all duration-300
  shadow-[0_12px_40px_rgba(0,0,0,0.4)]
  border-gray-600/70" >
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
          
          <div className='p-14 rounded-lg' style={{backgroundColor : outerBackground}}>
          {/* Code Editor */}
            <div className="relative font-mono rounded-lg overflow-hidden" style={{ backgroundColor: themes[theme].headerBg }}>
            {/* Window header */}
            <div className="flex space-x-2 px-4 py-2 border-b border-gray-700 sticky top-0 z-10 bg-[#21252b]" >
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div>
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => (
                  <SyntaxHighlighter
                    language={detectedLanguage || 'text'}
                    style={themes[theme].style}
                    customStyle={{ 
                      margin: 0, 
                      padding: 0,
                      backgroundColor: themes[theme].headerBg,
                      minWidth: '100%',
                      width: 'fit-content',
                      minHeight: '100%',
                      border : 'none',
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: '1rem',
                        lineHeight: themes[theme].lineHeight,
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
                  minHeight: '200px',
                  minWidth: '100%',
                  width: 'fit-content',
                  lineHeight: '1.5em',
                  overflow: 'auto',
                }}
                textareaClassName="editor__textarea"
                preClassName="editor__pre"
              />
            </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Theme Dropdown */}
            <div className="flex-1">
              <label htmlFor="theme" className="sr-only">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                className="block w-full pl-3 pr-10 py-2 text-base bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeKeys)}
              >
                <option value="xonokai">Xonokai</option>
                <option value="oneDark">One Dark</option>
              </select>
            </div>

            {/* Background Color Picker */}
            <div className="flex-1 flex items-center space-x-2 bg-gray-900 border border-gray-700 rounded-md p-2">
              <label htmlFor="outerBackground" className="text-gray-400 text-sm">
                Background
              </label>
              <input
                id="outerBackground"
                type="color"
                value={outerBackground}
                onChange={(e) => setOuterBackground(e.target.value)}
                className="w-10 h-8 p-1 rounded-md cursor-pointer border-none bg-transparent"
              />
            </div>

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
          </div>
          
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Link'}
            </button>
          </div>
        </form>
        
        {link && (
          <div className="bg-gray-600 bg-opacity-20 p-4 rounded-md mt-6">
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
