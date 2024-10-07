"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
    <div className="w-60 h-60 group/card mt-4 mx-4">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card rounded-md shadow-lg h-full backgroundImage flex flex-col justify-between p-2"
        )}
        style={{ backgroundImage: `url(${thumb})`, backgroundSize: 'cover' }}
        onClick={onClick}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="z-10 p-2">
          <p className="font-normal text-sm text-gray-50 relative z-10 drop-shadow">
            {author}
          </p>
        </div>
        <div className="z-10 p-2">
          <h1 className="font-bold text-base text-gray-50 relative z-10 drop-shadow">
            {title}
          </h1>
          <p className="font-normal text-xs text-gray-50 relative z-10 my-2 drop-shadow">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};

// Wrap the Card component with React.memo
export default React.memo(Card);
