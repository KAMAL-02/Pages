// components/ContentNotAvailable.tsx
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const ContentNotAvailable: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-between w-full max-w-4xl p-4">
          <div className="flex-1">
            <Image 
              src="/image.png"  // Replace with your image
              alt="Content Not Available" 
              width={300}
              height={300}
              className="object-cover rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
          <div className="flex-2 text-center ml-4">
            <h2 className="text-3xl font-bold mb-4 text-white">Content Not Available</h2>
            <p className="mb-4 text-white">We are working! Please check back later.</p>
            <Link href="/">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNotAvailable;
