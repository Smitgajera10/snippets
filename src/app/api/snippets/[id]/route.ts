import { NextResponse } from 'next/server';
import connectDB from '@/utils/dbConnect';
import Snippet from '@/models/Snippet';

/**
 * This API route is a separate endpoint to fetch a single snippet.
 * It is a standard API route that runs on the Node.js runtime, which
 * allows it to connect to the database using Mongoose without issues.
 * The Edge runtime handler (opengraph-image.tsx) will call this endpoint
 * to get the snippet data, separating the concerns of data fetching and
 * image generation.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
  // Connect to the database
  await connectDB();

  try {
    // Find the snippet by its ID
    const snippet = await Snippet.findById(id).lean();

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, snippet }, { status: 200 });
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return NextResponse.json({ error: 'Failed to fetch snippet.' }, { status: 500 });
  }
}
