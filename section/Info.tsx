"use client";
import React, { useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from "react-icons/fa";

const Info = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying)
    }
  };

  return (
    
    <div className="flex flex-col lg:flex-row justify-between mx-4 my-4 items-start">
      <div className="w-full lg:w-4/5 p-4 flex flex-col justify-center ml-0 lg:ml-8 h-56">
        <p className="text-lg leading-relaxed text-white pl-0 lg:pl-6" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          Pages is a platform for reading manga online for free. With an
          extensive library boasting chapters across various genres, we ensure
          that every manga enthusiast finds something they love. No registration
          is required—just dive into the world of manga with a simple click.
        </p>
      </div>

      <div className="hidden lg:block w-1/5 relative h-56 pl-4">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          className="rounded-md w-full h-full object-cover"
        >
          <source src="/InfoVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            onClick={togglePlayPause} 
            className="p-2 rounded-full bg-white bg-opacity-5 text-white hover:bg-gray-600 transition"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <FaPause size={20} />
            ) : (
              <FaPlay size={20} />
            )}
          </button>

          <button 
            onClick={toggleMute} 
            className="p-2 rounded-full bg-white bg-opacity-5 text-white hover:bg-gray-600 transition"
            aria-label="Toggle Mute"
          >
            {isMuted ? (
              <FaVolumeMute size={20} /> 
            ) : (
              <FaVolumeUp size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
