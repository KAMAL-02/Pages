"use client";

import { useGenreContext } from "@/context/GenreContext";
import { useEffect } from "react";
import GenreCard from "@/components/Genrecard";
import Button from "@/components/Button";
import Link from "next/link";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Footer from "@/section/Footer";

interface Props {
  params: {
    genre: string;
  };
}

const GenrePage: React.FC<Props> = ({ params }) => {
  const { genre } = params;
  const { genresData, fetchGenreData, loading, error } = useGenreContext();

  useEffect(() => {
    fetchGenreData(genre);
  }, [genre]);

  const mangas: any[] = genresData[genre] || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
      <h1 className="text-2xl font-bold m-4">{genre} Mangas</h1>
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
      <Footer />
    </TracingBeam>
    </div>
  );
};

export default GenrePage;
