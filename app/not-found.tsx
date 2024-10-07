// app/404.tsx
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-between w-full max-w-4xl p-4">
          <div className="flex-1">
            <Image 
              src="/image.png"
              alt="404 Not Found" 
              width={300}
              height={300}
              className="object-cover rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
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

export default Custom404;
