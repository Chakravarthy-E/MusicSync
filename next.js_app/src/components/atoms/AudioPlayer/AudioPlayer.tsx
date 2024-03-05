import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface Props {
  file: any;
}

const AudioPlayer: React.FC<Props> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [file]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="audio-player">
      <ReactPlayer
        url={file}
        width="100%"
        height="50px"
        controls
        playing={isPlaying}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default AudioPlayer;
