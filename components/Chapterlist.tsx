import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Loader from './Loader';

interface ChapterListProps {
  mangaId: string;
}

const ChapterList: React.FC<ChapterListProps> = ({ mangaId }) => {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchChapters = async () => {
      const cachedChapters = sessionStorage.getItem(`chapters-${mangaId}`);

      if (cachedChapters) {
        setChapters(JSON.parse(cachedChapters));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/chapters/${mangaId}`);
        setChapters(response.data.data || []);
        sessionStorage.setItem(`chapters-${mangaId}`, JSON.stringify(response.data.data));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Failed to fetch data");
        } else {
          setError("Failed to fetch data");
        }
        toast({
          title: "Error fetching manga details",
          description: error || "Unknown error",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [mangaId, toast]);

  const handleReadNow = (chapterId: string, chapterTitle: string) => {
    router.push(`/read/${mangaId}/${chapterId}?title=${encodeURIComponent(chapterTitle)}`);
  };

  return (
    <div className="m-6 bg-white bg-opacity-5 rounded-lg shadow-md overflow-y-auto max-h-96 w-4/5">
      <h2 className="text-xl font-semibold mb-4 p-4 border-b border-white border-opacity-5">Chapters</h2>

      {loading || error || chapters.length === 0 ? (
       <div className="flex items-center justify-center">
       <Loader />
     </div>
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
