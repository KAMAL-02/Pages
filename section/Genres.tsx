"use client"
import React from 'react';
import Button from '@/components/Button';
import Link from 'next/link';

const genres = [
  'Shounen', 'Seinen', 'Harem', 'Romance', 'Fantasy', 'Ecchi', 'Adventure', 'Action', 
  'Horror', 'Comedy', 'Isekai', 'Shoujo', 'Magic', 'Drama', 'Mystery', 'Mecha', 'Sports'
];

const Genres = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-semibold text-white mb-6" style={{ fontFamily: 'Balthazar, sans-serif' }}>Genres</h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
        {genres.map((genre) => (
          <Link href={`/genre/${genre}`} key={genre}>
            <Button text={genre} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
