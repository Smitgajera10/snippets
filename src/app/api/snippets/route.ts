import { NextResponse } from 'next/server';
import connectDB from '@/utils/dbConnect';
import Snippet from '@/models/Snippet';

export async function POST(req: Request) {
  await connectDB();

  try {
    const { code, language, title , theme } = await req.json();

    if (!code || !language || !theme) {
      return NextResponse.json({ error: 'Code ,language and theme are required.' }, { status: 400 });
    }

    const newSnippet = new Snippet({
      code,
      language,
      title: title || 'Untitled Snippet',
      theme: theme || 'xonokai',
    });

    const savedSnippet = await newSnippet.save();

    return NextResponse.json(
      {
        success: true,
        id: savedSnippet._id,
        message: 'Snippet created successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating snippet:', error);
    return NextResponse.json({ error: 'Failed to create snippet.' }, { status: 500 });
  }
}
