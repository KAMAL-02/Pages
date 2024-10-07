"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ChapterList from "@/components/Chapterlist";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Footer from "@/section/Footer";

interface MangaDetailsProps {
  params: {
    mangaId: string;
  };
}

const MangaDetails: React.FC<MangaDetailsProps> = ({ params }) => {
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mangaId = params.mangaId;

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;
        const response = await axios.get(`${mangaApiUrl}?id=${mangaId}`, {
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
          },
        });
        setManga(response.data.data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [mangaId]);

  if (loading) return <p>Loading...</p>;
  if (!manga) return <p>Manga not found</p>;

  const genres = manga.genres || ["Unknown Genre"];
  const author = manga.authors?.[0] || "Unknown Author";

  // const handleReadNow = () => {
  //   router.push(`/read/${mangaId}`);
  // };

  return (
      <TracingBeam>
        <div className="flex flex-wrap justify-between p-4">
          <div className="w-4/5 p-4">
            <div className="rounded-lg shadow-lg bg-white bg-opacity-5 p-6 flex">
              <img
                src={manga.thumb || "/default-cover.png"}
                alt={manga.title}
                className="w-48 h-auto object-cover rounded-lg shadow-md mr-4"
              />

              <div className="flex flex-col w-full">
                <h1 className="text-4xl font-bold mt-2 mb-4">{manga.title}</h1>

                <div className="mb-4">
                  {genres.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="mr-2 bg-white bg-opacity-5 p-2 rounded-md"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-lg mb-4">{manga.summary}</p>

                {/* <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full shadow-md w-40"
                  onClick={handleReadNow}
                >
                  Read Now
                </button> */}
              </div>
            </div>
          </div>

          <div className="w-1/5 p-4 rounded-lg shadow-md h-auto">
            <div className="mb-2">
              <strong>Type: </strong>
              <span>{manga.type || "Unknown"}</span>
            </div>

            <div className="mb-2">
              <strong>Chapters: </strong>
              <span>{manga.total_chapter || "10+"}</span>
            </div>

            <div className="mb-2">
              <strong>Views: </strong>
              <span>10k+</span>
            </div>

            <div className="mb-2">
              <strong>Author: </strong>
              <span>{author}</span>
            </div>

            <div className="mb-2">
              <strong>Status: </strong>
              <span>{manga.status || "Ongoing"}</span>
            </div>
            <div className="mb-2">
              <strong>Nsfw: </strong>
              <span>{manga.nsfw || "False"}</span>
            </div>
          </div>
        </div>
        <ChapterList mangaId={mangaId} />
        <Footer />
      </TracingBeam>
  );
};

export default MangaDetails;
