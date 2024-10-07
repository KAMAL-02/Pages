"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


interface MangaContextProps {
  mangas: any[];
  loading: boolean;
  error: string | null;
}

const MangaContext = createContext<MangaContextProps | undefined>(undefined);

export const MangaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;
        if (!mangaApiUrl) throw new Error("NO_URL");

        const response = await axios.get(`${mangaApiUrl}/latest`, {
          params: {
            page: 1,
            genres: "Shounen",
            nsfw: "true",
            type: "all",
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
          },
        });

        setMangas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch mangas");
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  return (
    <MangaContext.Provider value={{ mangas, loading, error }}>
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error("useManga must be used within a MangaProvider");
  }
  return context;
};
