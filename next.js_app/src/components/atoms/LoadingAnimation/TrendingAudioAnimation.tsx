import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const TrendingAudioAnimation = (props: Props) => {
  return (
    <div className="mt-2 ml-5 flex flex-col space-y-2">
      <Skeleton className="mb-3 h-[80px] w-[450px] rounded-xl" />
      <div className="flex space-x-3">
        <Skeleton className="h-6 w-[300px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
      <div className="flex space-x-3">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[50px]" />
      </div>
    </div>
  );
};

export default TrendingAudioAnimation;
