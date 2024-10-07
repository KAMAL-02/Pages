"use client";
import Card from "@/components/Card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useManga } from "@/context/MangaContext";

export const Trending = () => {
  const { mangas, loading, error } = useManga();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching mangas",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (loading || error ) return <Loader />;

  const handleCardClick = (mangaId: string) => {
    router.push(`/details/${mangaId}`);
  };

  return (
    <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto">
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
  );
};
