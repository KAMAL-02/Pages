import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get('genre') || 'Shounen';
  const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;

  if (!mangaApiUrl) {
    return NextResponse.json({ error: 'URL is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${mangaApiUrl}/latest`, {
      params: {
        page: 1,
        genres: genre,
        nsfw: 'true',
        type: 'all',
      },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ error: 'Failed to fetch genre data' }, { status: 500 });
  }
}
