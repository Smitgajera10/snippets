import { notFound } from 'next/navigation';
import Snippet from '../../../models/Snippet';
import connectDB from '../../../utils/dbConnect';
import ClientWrapper from './ClientWrapper';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  await connectDB();
  const snippet = await Snippet.findById(id).lean();

  if (!snippet || typeof snippet !== 'object' || !('title' in snippet)) {
    return {
      title: 'Snippet Not Found',
    };
  }

  return {
    title: snippet.title,
    description: snippet.code.substring(0, 150) + '...',
  };
}

export default async function SnippetPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  await connectDB();
  const snippet = await Snippet.findById(id).lean();

  if (!snippet || typeof snippet !== 'object' || !('title' in snippet)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-4xl mx-auto my-12">
        <h1 className="text-3xl font-bold mb-4 text-white">{snippet.title}</h1>
        <ClientWrapper code={snippet.code} language={snippet.language} />
      </div>
    </div>
  );
}
