"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Image from 'next/image';
import Footer from "@/section/Footer";
import Loader from "@/components/Loader";
import ContentNotAvailable from "@/components/Notavai";


interface ChapterProps {
  params: {
    chapterId: string;
  };
}

const ReadChapter: React.FC<ChapterProps> = ({ params }) => {
  const { chapterId } = params;
  const [chapterImages, setChapterImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } =  useToast();

  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  useEffect(() => {
    const fetchChapterImages = async () => {
      const cachedImages = sessionStorage.getItem(`chapter-images-${chapterId}`);

      if (cachedImages) {
        setChapterImages(JSON.parse(cachedImages));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/chapter/${chapterId}`);
        const imageLinks = response.data.data.map((item: any) => item.link);

        setChapterImages(imageLinks);
        sessionStorage.setItem(`chapter-images-${chapterId}`, JSON.stringify(imageLinks));
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

    fetchChapterImages();
  }, [chapterId, toast]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  if (error) return <ContentNotAvailable />

  return (
    <TracingBeam>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'Balthazar, sans-serif' }}>{title}</h1>
      <div className="flex flex-col space-y-4">
        {chapterImages.map((imagesrc, index) => (
          <div key={index} className="w-full">
            <Image
              src={imagesrc}
              alt={`Chapter ${chapterId} Image ${index + 1}`}
              width={500}
              height={600}
              layout="intrinsic"
              objectFit="contain"
              className="rounded-md shadow-lg mx-auto"
              priority={index===0}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
    </TracingBeam>
  );
};

export default ReadChapter;
