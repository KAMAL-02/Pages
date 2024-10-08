"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  title: string;
  thumb: string;
  author: string;
  summary: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, thumb, author, summary, onClick }) => {
  return (
    <div className="w-full max-w-xs h-60 group/card mt-4 mx-4">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card rounded-md shadow-lg h-full backgroundImage flex flex-col justify-between p-2"
        )}
        style={{ backgroundImage: `url(${thumb})`, backgroundSize: 'cover' }}
        onClick={onClick}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="z-10 p-2">
          <p className="font-normal text-sm text-gray-50 relative z-10 drop-shadow" style={{ fontFamily: 'Balthazar, sans-serif' }}>
            {author}
          </p>
        </div>
        <div className="z-10 p-2">
          <h1 className="font-bold text-sm sm:text-base md:text-lg text-gray-50 relative z-10 drop-shadow" style={{ fontFamily: 'Balthazar, sans-serif' }}>
            {title}
          </h1>
          <p className="font-normal text-xs sm:text-sm text-gray-50 relative z-10 my-2 drop-shadow" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
            {summary}
          </p>
        </div>
      </div>
    </div>

  );
}

export default React.memo(Card);
