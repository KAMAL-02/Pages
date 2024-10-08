"use client";

import { useEffect, useState, Suspense } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import GenreCard from "@/components/Genrecard";
import axios from "axios";
import ContentNotAvailable from "@/components/Notavai";
import Loader from "@/components/Loader";
import Footer from "@/section/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import { Manga } from "@/types/manga";

const MangaPage = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const { toast } = useToast();

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
        const response = await axios.get(`/api/mangas?text=${searchQuery}`);
        setMangas(response.data);
      } catch (err) {
        console.log("error is:", err);
        setError(true);
        toast({
          title: "Error fetching mangas",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchMangas();
    }
  }, [searchQuery, toast]);

  // Wrap the entire UI dependent on searchParams and data fetching in Suspense
  return (
    <Suspense fallback={<Loader />}>
      <TracingBeam>
        <div className="min-h-screen">
          <h1
            className="text-2xl font-bold m-4"
            style={{ fontFamily: "Balthazar, sans-serif" }}
          >
            Mangas
          </h1>
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <Loader />
            </div>
          ) : error || mangas.length === 0 ? (
            <ContentNotAvailable />
          ) : (
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
                <h2 className="text-3xl font-semibold text-white mb-6">
                  Genres
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {genres.map((genre) => (
                    <Link href={`/genre/${genre}`} key={genre}>
                      <Button text={genre} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </TracingBeam>
    </Suspense>
  );
};

export default MangaPage;
