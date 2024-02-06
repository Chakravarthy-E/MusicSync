import { FC, useState } from "react";
import LikeButton from "../LikeButton/LikeButton";
import { FaPause, FaPlay } from "react-icons/fa";

interface Props {
  title: string;
  poster?: string;
  file?: string;
  onLongPress?(): void;
  onClick?(): void;
}

const Card: FC<Props> = ({ title, poster, file }) => {
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

  return (
    <div
      className="border border-gray-500 relative shadow-md w-56 h-56 overflow-hidden rounded-md cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={poster} className="relative" />
      <div className="absolute right-4 top-4">
        <LikeButton />
      </div>
      <div className="text-white text-base flex justify-between items-center absolute bottom-0 px-4 py-2  w-full">
        <p className=" font-Montserrat font-semibold">{title}</p>
        <audio ref={(element) => (audioRef = element)} controls={false}>
          <source src={file} />
        </audio>
        <div
          className={`flex justify-center mt-2 ${isHovered ? "" : "opacity-0"}`}
        >
          <button onClick={togglePlay} className="text-blue-500 mb-2">
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
