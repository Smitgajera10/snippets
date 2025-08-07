import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Snippet, { ISnippet } from '../../models/Snippet';
import connectDB from '../../utils/dbConnect';
import Prism from 'prismjs';

interface SnippetPageProps {
  snippet: ISnippet | null;
}

export default function SnippetPage({ snippet }: SnippetPageProps) {
  if (!snippet) {
    return <div>Snippet not found!</div>;
  }

  // Highlight the code on the server
  const highlightedCode = Prism.highlight(
    snippet.code,
    Prism.languages[snippet.language] || Prism.languages.markup,
    snippet.language
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <Head>
        <title>{snippet.title}</title>
        <meta name="description" content={snippet.code.substring(0, 150) + '...'} />
        <meta property="og:title" content={snippet.title} />
        <meta property="og:description" content={snippet.code.substring(0, 150) + '...'} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="max-w-4xl mx-auto my-12">
        <h1 className="text-3xl font-bold mb-4 text-white">{snippet.title}</h1>
        {/* Added modern styling with Tailwind CSS */}
        <pre 
          className="p-6 rounded-xl shadow-2xl overflow-x-auto bg-[#282a36] font-mono text-sm"
        >
          <code
            className={`language-${snippet.language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SnippetPageProps> = async (context) => {
  const { id } = context.params as { id: string };

  await connectDB();
  const snippet = await Snippet.findById(id).lean();

  if (!snippet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      snippet: JSON.parse(JSON.stringify(snippet)),
    },
  };
};