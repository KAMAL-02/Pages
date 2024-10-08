"use client";

import { useEffect, useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useToast } from "@/hooks/use-toast";
import GenreCard from "@/components/Genrecard";
import Button from "@/components/Button";
import Link from "next/link";
import Loader from "@/components/Loader";
import ContentNotAvailable from "@/components/Notavai";
import Footer from "@/section/Footer";
import axios from "axios";
import { Manga } from "@/types/manga";

interface Props {
  params: {
    genre: string;
  };
}

const GenrePage: React.FC<Props> = ({ params }) => {
  const { genre } = params;
  const { toast } = useToast();
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchGenreData = async () => {
      const cachedMangas = sessionStorage.getItem(genre);
      if (cachedMangas) {
        setMangas(JSON.parse(cachedMangas));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/genres?genre=${genre}`);
        setMangas(response.data);
        sessionStorage.setItem(genre, JSON.stringify(response.data));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Failed to fetch data");
        } else {
          setError("Failed to fetch data");
        }
        toast({
          title: "Error fetching mangas/Too many requests",
          description: error || "An unknown error occurred.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
  }, [genre, error, toast]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  if (error) return <ContentNotAvailable />

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

  return (
    <div className="bg-[#171717]">
    <TracingBeam>
      <h1 className="text-2xl font-bold m-4" style={{ fontFamily: 'Balthazar, sans-serif' }}>{genre} Mangas</h1>
      <div className="flex m-4 space-x-4">
        <div className="grid grid-cols-2 gap-5 w-3/5 max-w-6xl">
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
          <h2 className="text-3xl font-semibold text-white mb-6" style={{ fontFamily: 'Balthazar, sans-serif' }}>Genres</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre) => (
              <Link href={`/genre/${genre}`} key={genre}>
                <Button text={genre} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </TracingBeam>
    </div>
  );
};

export default GenrePage;
