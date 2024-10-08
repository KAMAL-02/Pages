"use client";

import { useEffect, useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import ChapterList from "@/components/Chapterlist";
import Footer from "@/section/Footer";
import Loader from "@/components/Loader";
import ContentNotAvailable from "@/components/Notavai";

interface MangaDetailsProps {
  params: {
    mangaId: string;
  };
}

const MangaDetails: React.FC<MangaDetailsProps> = ({ params }) => {
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mangaId = params.mangaId;
  const { toast } = useToast();

  useEffect(() => {
    const fetchMangaDetails = async () => {
      console.log("mangaid is: " ,mangaId);
      const cachedManga = sessionStorage.getItem(`manga_${mangaId}`);
      if (cachedManga) {
        setManga(JSON.parse(cachedManga));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/manga/${mangaId}`);
        setManga(response.data.data);
        sessionStorage.setItem(`manga_${mangaId}`, JSON.stringify(response.data.data));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Failed to fetch data");
        } else {
          setError("Failed to fetch data");
        }
        toast({
          title: "Error fetching manga details",
          description: error||"Unknown error",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [mangaId, toast]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  if (error) return <ContentNotAvailable />;

  const genres = manga.genres || ["Unknown Genre"];
  const author = manga.authors?.[0] || "Unknown Author";

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
                <h1 className="text-4xl font-bold mt-2 mb-4" style={{ fontFamily: 'Balthazar, sans-serif' }}>{manga.title}</h1>

                <div className="mb-4">
                  {genres.slice(0, 5).map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="mr-2 bg-white bg-opacity-5 p-2 rounded-md"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-lg mb-4" style={{ fontFamily: 'Titillium Web, sans-serif' }}>{manga.summary.slice(0, 600)}</p>

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
