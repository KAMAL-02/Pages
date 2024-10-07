"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const GenreContext = createContext<any>(null);

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [genresData, setGenresData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchGenreData = async (genre: string) => {
    if (genresData[genre]) {
      return;
    }

    try {
      setLoading(true);
      const mangaApiUrl = process.env.NEXT_PUBLIC_MANGA_API_URL;
      if (!mangaApiUrl) throw new Error("NO_URL");

      const response = await axios.get(`${mangaApiUrl}/latest`, {
        params: { page: 1, genres: genre, nsfw: "true", type: "all" },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        },
      });

      setGenresData((prev) => ({ ...prev, [genre]: response.data.data }));
    } catch (err) {
      setError("Failed to fetch genre data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GenreContext.Provider value={{ genresData, fetchGenreData, loading, error }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenreContext = () => {
  return useContext(GenreContext);
};
