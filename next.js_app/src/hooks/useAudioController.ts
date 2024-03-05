import { useEffect, useState } from "react";
import { AudioData } from "@/@types/audio";
import { getPlayerState, updateOnGoingAudio } from "@/lib/slices/playerSlice";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

const useAudioController = (audioDataList: any) => {
  const { onGoingAudio } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  const [currentAudioIndex, setCurrentAudioIndex] = useState(-1);

  const handleAudioEnded = () => {
    if (currentAudioIndex < audioDataList.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    }
  };

  useEffect(() => {
    if (onGoingAudio) {
      const newIndex = audioDataList.findIndex(
        (audio: any) => audio.id === onGoingAudio.id,
      );
      setCurrentAudioIndex(newIndex);
    }
  }, [onGoingAudio]);

  const playAudio = (audio: any) => {
    dispatch(updateOnGoingAudio(audio));
  };

  return {
    currentAudioIndex,
    playAudio,
    handleAudioEnded,
  };
};

export default useAudioController;
