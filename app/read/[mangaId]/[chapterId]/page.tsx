"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from 'next/image';
import Footer from "@/section/Footer";
import { TracingBeam } from "@/components/ui/tracing-beam";


interface ChapterProps {
  params: {
    chapterId: string;
  };
}

const ReadChapter: React.FC<ChapterProps> = ({ params }) => {
  const { chapterId } = params;
  const [chapterImages, setChapterImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        const chapterApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;
        const response = await axios.get(`${chapterApiUrl}/image?id=${chapterId}`, {
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
          },
        });
        const imageLinks = response.data.data.map((item: any) => item.link);
        console.log(imageLinks);
        console.log(response.data.data)
        setChapterImages(imageLinks);
      } catch (error) {
        console.error("Error fetching chapter images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterImages();
  }, [chapterId]);

  if (loading) return <p>Loading...</p>;

  return (
    <TracingBeam>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      <div className="flex flex-col space-y-4">
        {chapterImages.map((imagesrc, index) => (
          <div key={index} className="w-full"> {/* Set height explicitly */}
            <Image
              src={imagesrc}
              alt={`Chapter ${chapterId} Image ${index + 1}`}
              width={500}
              height={600}
              layout="intrinsic" // Fill the parent container
              objectFit="contain" // Maintain aspect ratio while fitting inside
              className="rounded-md shadow-lg mx-auto"
              priority={index===0}// Load images in priority mode
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
