import React from "react";
import { Heart } from "lucide-react";
import LoadingAnimation from "@/components/atoms/LoadingAnimation/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { useFetchLatestAudios } from "@/hooks/query";

interface Props {}

const TrendingAudio = (props: Props) => {
  const { data, isLoading } = useFetchLatestAudios();

  if (isLoading) {
    return (
      <div className="flex flex-col px-5 py-3">
        <h1 className="py-2 text-xl font-semibold">Latest Audios</h1>
        <div className="flex space-x-3">
          {[...Array(4)].map((_, index) => (
            <LoadingAnimation key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-secondary px-5 py-2">
      <h1 className="text-base font-semibold tracking-wide">
        Trending New Hits
      </h1>
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
            <div className="rounded-full border px-3 py-3 text-center">
              <Heart />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingAudio;
