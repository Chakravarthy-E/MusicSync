import React from "react";
import AudioCard from "@/components/atoms/AudioCard/AudioCard";
import LoadingAnimation from "@/components/atoms/LoadingAnimation/LoadingAnimation";
import { useFetchLatestAudios } from "@/hooks/query";

const LatestAudios = () => {
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
    <div className="py-3 px-5">
      <h1 className="py-2 text-xl font-semibold">Latest Audios</h1>
      <div className="grid gap-3 lg:grid-cols-5">
        {data?.map((item) => (
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

export default LatestAudios;
