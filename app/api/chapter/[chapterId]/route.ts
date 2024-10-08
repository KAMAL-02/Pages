import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { chapterId: string } }) {
  const { chapterId } = params;
  const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;

  if (!mangaApiUrl) {
    return NextResponse.json({ error: 'Manga API URL is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${mangaApiUrl}/image?id=${chapterId}`, {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching chapter images:", error);
    return NextResponse.json({ error: 'Failed to fetch chapter images' }, { status: 500 });
  }
}
