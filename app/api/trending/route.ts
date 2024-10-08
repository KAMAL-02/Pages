import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;
    if (!mangaApiUrl) throw new Error("URL is missing.");

    const response = await axios.get(`${mangaApiUrl}/latest`, {
      params: {
        page: 1,
        genres: "Shounen",
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
    return NextResponse.json({ error: "Failed to fetch mangas" }, { status: 500 });
  }
}
