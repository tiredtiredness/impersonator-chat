import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {imageUrl} = await req.json();

    if (!imageUrl) {
      return NextResponse.json({error: 'Image URL is required'}, {status: 400});
    }

    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Next.js App Router)',
      },
    });

    if (!imageResponse.ok) {
      return NextResponse.json(
        {error: `Failed to fetch image: ${imageResponse.status}`},
        {status: imageResponse.status},
      );
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/webp';
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
        'Content-Length': buffer.length.toString(),
        'Content-Disposition': 'inline',
      },
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
