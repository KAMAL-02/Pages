import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { mangaId: string } }) {
  const { mangaId } = params;
  const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;

  if (!mangaApiUrl) {
    return NextResponse.json({ error: 'URL is missing' }, { status: 400 });
  }

  if (!mangaId) {
    return NextResponse.json({ error: 'Manga ID is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${mangaApiUrl}/chapter?id=${mangaId}`, {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}
