"use client";
import { FC, useState } from "react";
import LikeButton from "../LikeButton/LikeButton";
import { FaPause, FaPlay } from "react-icons/fa";

interface Owner {
  name?: string;
  id?: string;
}

interface Props {
  title: string;
  poster?: string;
  file?: string;
  owner?: string | Owner;
  onLongPress?(): void;
  onClick?(): void;
}

const Card: FC<Props> = ({ title, poster, file, owner }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  let audioRef: HTMLAudioElement | null = null;

  const togglePlay = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const ownerName =
    typeof owner === "string" ? owner : owner?.name || "Unknown";

  return (
    <div
      className=" relative shadow-md w-56 h-56 overflow-hidden shadow-gray-800 rounded-md hover:shadow-blue-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={poster} className="relative" />
      <div className="absolute right-4 top-4">
        <LikeButton />
      </div>
      <div className="text-white text-base flex justify-between items-center absolute bottom-0 px-4 py-2  w-full">
        <div className="flex flex-col">
          <p className="font-Montserrat font-semibold">{title}</p>
          <p className="font-Montserrat text-xs text-gray-400">{ownerName}</p>
        </div>
        <audio ref={(element) => (audioRef = element)}>
          <source src={file} />
        </audio>
        <div
          className={`flex justify-center mt-2 ${isHovered ? "" : "opacity-0"}`}
        >
          <button onClick={togglePlay} className="text-blue-500   text-center  rounded-full px-3 py-3 border-blue-500 border-4">
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
