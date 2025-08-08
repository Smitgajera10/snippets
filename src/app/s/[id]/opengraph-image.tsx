import { ImageResponse } from 'next/og';

// Set the runtime to 'edge' to enable ImageResponse
export const runtime = 'edge';

// Set the dimensions for the Open Graph image
export const size = {
  width: 1200,
  height: 630,
};

// Set the content type to a PNG image
export const contentType = 'image/png';

// Image generation handler for a dynamic route
export default async function Image({ params }: { params: { id: string } }) {
  const { id } = params;

  const apiEndpoint = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/snippets/${id}`;

  const res = await fetch(apiEndpoint);
  const data = await res.json();

  if (!data.success) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'black'
          }}
        >
          Snippet Not Found
        </div>
      ),
      size,
    );
  }

  const snippet = data.snippet;
  const codeLines = snippet.code.split('\n');
  const previewLines = codeLines.slice(0, 10);
  const hasMoreLines = codeLines.length > 10;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#0d1117',
          color: '#c9d1d9',
          width: '100%',
          height: '100%',
          padding: '40px',
        }}
      >
        <h1 style={{ fontSize: '48px', color: '#58a6ff', marginBottom: '20px' }}>{snippet.title}</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#161b22',
            padding: '20px',
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
            overflow: 'hidden',
          }}
        >
          {previewLines.map((line : string, index : string) => (
            <div key={index} style={{ fontFamily: 'monospace', fontSize: '24px' }}>
              {line}
            </div>
          ))}
          {hasMoreLines && (
            <div style={{ fontFamily: 'monospace', fontSize: '24px', color: '#6a737d', marginTop: '10px' }}>
              ...
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
