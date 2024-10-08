import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("text");
  const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;

  if (!mangaApiUrl) {
    return NextResponse.json({ error: 'Manga API URL is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${mangaApiUrl}/search`, {
      params: {
        text: searchQuery,
        page: 1,
        nsfw: "true",
        type: "all",
      },
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error("Error fetching mangas:", error);
    return NextResponse.json({ error: 'Failed to fetch mangas' }, { status: 500 });
  }
}
