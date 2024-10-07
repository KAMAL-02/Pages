"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js

interface Manga {
  title: string;
  description: string;
  image: string;
}

// Manga data
const mangas: Manga[] = [
  {
    title: 'Jujutsu Kaisen',
    description: 'Jujutsu Kaisen is a Japanese manga series about a high school student who joins a secret organization of sorcerers to defeat a powerful curse',
    image: '/jjk.png',
  },
  {
    title: "JoJo's Bizarre Adventure",
    description: 'JoJos Bizarre Adventure is a Japanese manga series by Hirohiko Araki about the Joestar familys battle against evil. The series is known for its unique art style, wild humor, and supernatural powers',
    image: '/Jojo.jpeg',
  },
  {
    title: 'One Piece',
    description: 'One Piece is a Japanese manga series about a young pirates quest to find the legendary treasure, "One Piece", and become the King of the Pirates',
    image: '/Onepiece.jpg',
  },
  {
    title: 'Naruto',
    description: 'Naruto is a Japanese manga series about a young ninja named Naruto Uzumaki who wants to become the leader of his village, the Hokage',
    image: '/Naruto.jpeg',
  },
  {
    title: 'Solo Leveling',
    description: 'Solo Leveling is a Korean comic series, or manhwa, about a weak hunter named Sung Jin-Woo who discovers a hidden world of powerful beings and gains the ability to level up',
    image: '/sololeveling.png',
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mangas.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [mangas.length]);

  return (
    <div className='m-5 bg-slate-800'>
      <div className="relative w-full h-[500px] flex items-center justify-between overflow-hidden p-4 rounded-md">
        <div className="absolute inset-0 z-0">
          <Image
            src={mangas[currentIndex].image}
            alt={`Background Image ${currentIndex}`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'blur(10px)' }} // Apply blur
          />
        </div>

        <div className="flex w-full h-full items-center justify-between z-10 relative px-10">
          <div className="flex flex-col justify-center w-1/2">
            <h2 className="text-3xl font-semibold text-white text-left">
              {mangas[currentIndex].title}
            </h2>
            <p className="mt-2 text-lg text-white text-left" style={{ fontFamily: "'Road Rage', cursive" }}>
              {mangas[currentIndex].description}
            </p>
            <Link href="/details" className="mt-4">
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                Read Now
              </button>
            </Link>
          </div>

          {/* Right Side: Focused Image */}
          <div className="w-1/2 flex justify-end">
            <div className="relative">
              <Image
                src={mangas[currentIndex].image}
                alt={`Cover ${currentIndex}`}
                width={250} // Adjust size for cover image
                height={375}
                className="rounded-lg shadow-lg transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
