"use client";
import Card from "@/components/Card";
import axios from "axios";
import Loader from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Trending = () => {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const cachedMangas = sessionStorage.getItem("trendingMangas");

    if (cachedMangas) {
      setMangas(JSON.parse(cachedMangas));
      setLoading(false);
    } else {
      const fetchTrendingMangas = async () => {
        try {
          const response = await axios.get("/api/trending");
          setMangas(response.data);
          sessionStorage.setItem("trendingMangas", JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching mangas:", error);
          setError("Failed to fetch trending mangas.");
        } finally {
          setLoading(false);
        }
      };

      fetchTrendingMangas();
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching mangas/Too many requests",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (loading || error )
    return (
      <div className="flex items-center justify-center">
        <Loader /> 
      </div>
    );

  const handleCardClick = (mangaId: string) => {
    router.push(`/details/${mangaId}`);
  };

  return (
    <>
    <h2 className="text-3xl font-bold text-white mb-3 ml-4">Latest</h2>
    <div className="hidden sm:flex flex-nowrap justify-center gap-2 overflow-x-auto">
          {mangas.slice(0, 6).map((manga) => (
        <Card
          key={manga.id}
          title={manga.title.length > 25 ? manga.title.slice(0, 25) + "..." : manga.title}
          thumb={manga.thumb}
          author={manga.authors[0] || "Unknown Author"}
          summary={
            manga.summary.length > 100
              ? manga.summary.slice(0, 80) + "..."
              : manga.summary
          }
          onClick={() => handleCardClick(manga.id)}
        />
      ))}
      </div>
      </>
  );
};
