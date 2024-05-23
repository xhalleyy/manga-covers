import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid "url" query parameter' }, { status: 400 });
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];

    return new NextResponse(response.data, {
      headers: { 'Content-Type': contentType },
    });
  } catch (error) {
    console.error('Error fetching the image:', error);
    return NextResponse.json({ error: 'Error fetching the image' }, { status: 500 });
  }
}