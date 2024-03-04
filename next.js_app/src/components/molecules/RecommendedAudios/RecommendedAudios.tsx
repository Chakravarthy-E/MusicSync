import React from "react";
import AudioCard from "@/components/atoms/AudioCard/AudioCard";
import LoadingAnimation from "@/components/atoms/LoadingAnimation/LoadingAnimation";
import { useFetchRecommendedAudios } from "@/hooks/query";

interface Props {}

const RecommendedAudios = (props: Props) => {
  const { data, isLoading } = useFetchRecommendedAudios();

  if (isLoading) {
    return (
      <div className="flex flex-col px-5 py-3">
        <h1 className="py-2 text-xl font-semibold">Recommended Audios</h1>
        <div className="flex space-x-3">
          {[...Array(4)].map((_, index) => (
            <LoadingAnimation key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 px-5">

      <div className="flex items-center justify-between">
        <h1 className="py-2 text-xl font-semibold">Recommended Audios</h1>
        <p className="cursor-pointer rounded-full border px-3 py-2 text-xs hover:bg-primary hover:text-white">
          See All
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        {data?.slice(0, 5).map((item) => (
          <AudioCard
            key={item.id}
            title={item.title}
            poster={item.poster}
            about={item.about}
            file={item.file}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedAudios;
