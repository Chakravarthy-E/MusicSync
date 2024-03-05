import React from "react";
import { Heart } from "lucide-react";
import TrendingAudioAnimation from "@/components/atoms/LoadingAnimation/TrendingAudioAnimation";
import { Button } from "@/components/ui/button";
import { useFetchLatestAudios } from "@/hooks/query";

interface Props {}

const TrendingAudio = (props: Props) => {
  const { data, isLoading } = useFetchLatestAudios();

  if (isLoading) {
    return (
      <div className="flex flex-col px-5 py-3">
        <h1 className="text-xl font-semibold tracking-wide">
          Trending New Hits
        </h1>
        <div className="flex space-x-3">
          <TrendingAudioAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-2">
      <h1 className="text-xl font-semibold tracking-wide">Trending New Hits</h1>
      {data?.slice(0, 1).map((song) => (
        <div className="space-y-6 px-10 py-4">
          <div className="space-y-3">
            <h1 className="font-bold tracking-wide lg:text-6xl">
              {song.title}
            </h1>
            <div className="flex items-center space-x-4">
              <p className="text-xl font-semibold">{song.about}</p>
              <p className="text-lg font-normal">65 Million Plays</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="rounded-full">Listen Now</Button>
            <div className="rounded-full border bg-secondary px-3 py-3 text-center">
              <Heart />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingAudio;
