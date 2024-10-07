"use client";
import { useEffect, useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import GenreCard from "@/components/Genrecard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ContentNotAvailable from "@/components/Notavai";
import Loader from "@/components/Loader";
import Footer from "@/section/Footer";
import Link from "next/link";
import Button from "@/components/Button";

const MangaPage = () => {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const genres = [
    "Shounen",
    "Seinen",
    "Harem",
    "Romance",
    "Fantasy",
    "Ecchi",
    "Adventure",
    "Action",
    "Horror",
    "Comedy",
    "Isekai",
    "Shoujo",
    "Magic",
    "Drama",
    "Mystery",
    "Mecha",
    "Sports",
  ];

  useEffect(() => {
    const fetchMangas = async () => {
      setLoading(true);
      setError(false);

      try {
        const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;
        if (!mangaApiUrl) throw new Error("NO_URL");
  
        const response = await axios.get(`${mangaApiUrl}/search?text=${searchQuery}`, {
          params: { page: 1, nsfw: "true", type: "all" },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
          },
        });
        setMangas(response.data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchMangas();
    }
  }, [searchQuery]);

  if (loading) return <Loader />;

  if (error || mangas.length === 0) {
    return <ContentNotAvailable />;
  }

  return (
    <TracingBeam>
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold m-4">Mangas</h1>
      <div className="flex m-4 space-x-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-3/5 max-w-6xl">
          {mangas.map((manga) => (
            <GenreCard
              key={manga.id}
              title={
                manga.title.length > 25
                  ? manga.title.slice(0, 25) + "..."
                  : manga.title
              }
              summary={
                manga.summary.length > 100
                  ? manga.summary.slice(0, 80) + "..."
                  : manga.summary
              }
              thumb={manga.thumb}
              link={`/details/${manga.id}`}
            />
          ))}
        </div>
        <div className="flex flex-col justify-start items-center w-2/5 bg-transparent p-4 rounded-lg">
          <h2 className="text-3xl font-semibold text-white mb-6">Genres</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre) => (
              <Link href={`/genre/${genre}`} key={genre}>
                <Button text={genre} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </TracingBeam>
  );
};

export default MangaPage;
