import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/dbConnect'; 
import Snippet from '../../models/Snippet'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests 
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Connect to the database
  await connectDB();

  try {
    const { code, language, title } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required.' });
    }

    // Create a new snippet
    const newSnippet = new Snippet({
      code,
      language,
      title: title || 'Untitled Snippet',
    });

    const savedSnippet = await newSnippet.save();

    res.status(201).json({
      success: true,
      id: savedSnippet._id,
      message: 'Snippet created successfully.',
    });
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(500).json({ error: 'Failed to create snippet.' });
  }
}