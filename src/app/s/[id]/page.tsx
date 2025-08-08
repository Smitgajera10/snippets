import { notFound } from 'next/navigation';
import Snippet from '../../../models/Snippet';
import connectDB from '../../../utils/dbConnect';
import ClientWrapper from './ClientWrapper';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await connectDB();
  const snippet = await Snippet.findById(id).lean();

  if (!snippet || typeof snippet !== 'object' || !('title' in snippet) || !('code' in snippet)) {
    return {
      title: 'Snippet Not Found',
    };
  }

  const title = snippet.title;
  const description = snippet.code.substring(0, 150) + '...';
  const ogImageUrl = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/s/${id}/opengraph-image`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default async function SnippetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const snippet = await Snippet.findById(id).lean();
  if (!snippet || typeof snippet !== 'object' || !('title' in snippet)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-4xl mx-auto my-12">
        <h1 className="text-3xl font-bold mb-4 text-white">{snippet.title}</h1>
        <ClientWrapper code={snippet.code} language={snippet.language} theme={snippet.theme}/>
      </div>
    </div>
  );
}
