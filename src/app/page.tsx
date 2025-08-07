'use client'
import { useState, FormEvent } from 'react';
import Head from 'next/head';
import 'prismjs/themes/prism-okaidia.css';

export default function Home() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setLink(null);

  try {
    const res = await fetch('/api/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });

    if (!res.ok) {
      throw new Error('Failed to create snippet.');
    }

    const data = await res.json();
    setLink(`${window.location.origin}/s/${data.id}`);
  } catch (error) {
    console.error('Error creating snippet:', error);
    // You could also set an error state here to show an error message to the user
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Snippet-To-Link</title>
        <meta name="description" content="Share code snippets with a single link." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a Code Snippet Link
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Paste your code, select a language, and share.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code" className="sr-only">
              Code Snippet
            </label>
            <textarea
              id="code"
              name="code"
              rows={10}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="language" className="sr-only">
              Language
            </label>
            <select
              id="language"
              name="language"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              {/* Add more languages here */}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Link'}
            </button>
          </div>
        </form>
        {link && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm font-medium text-green-800">
              Your snippet link is ready!
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block truncate text-sm text-blue-600 hover:underline"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}