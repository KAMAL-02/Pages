// components/ChapterList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ChapterListProps {
  mangaId: string;
}

const ChapterList: React.FC<ChapterListProps> = ({ mangaId }) => {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chapterInput, setChapterInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const chapterApiUrl = `${process.env.NEXT_PUBLIC_MANGA_API_URL}/chapter?id=${mangaId}`; // Adjust your API endpoint accordingly
        const response = await axios.get(chapterApiUrl, {
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
          },
        });
        setChapters(response.data.data || []); // Adjust according to the response structure
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [mangaId]);

  const handleReadNow = (chapterId: string, chapterTitle: string) => {
    router.push(`/read/${mangaId}/${chapterId}?title=${encodeURIComponent(chapterTitle)}`);
  };

  return (
    <div className="m-6 bg-white bg-opacity-5 rounded-lg shadow-md overflow-y-auto max-h-96 w-4/5">
      <h2 className="text-xl font-semibold mb-4 p-4 border-b border-white border-opacity-5">Chapters</h2>

      {loading ? (
        <p>Loading chapters...</p>
      ) : (
        <div className="p-4">
          {chapters.length === 0 ? (
            <p>No chapters available</p>
          ) : (
            chapters.map((chapter: any, index: number) => (
              <div key={chapter.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">{chapter.title}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 text-sm rounded-full"
                    onClick={() => handleReadNow(chapter.id, chapter.title)}
                  >
                    Read
                  </button>
                </div>
                {index < chapters.length - 1 && (
                  <div className="border-b border-white border-opacity-5 mb-2" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterList;
