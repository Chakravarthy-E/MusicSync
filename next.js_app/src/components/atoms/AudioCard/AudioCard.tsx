import React, { FC } from "react";
import Image from "next/image";

interface Props {
  title: string;
  poster?: string;
  about: string;
  file: string;
}

const AudioCard: FC<Props> = ({ title, poster, about, file }: Props) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
      <Image
        src={poster ? poster : "/assets/poster.jpg"}
        width={200}
        height={200}
        alt={title}
        className="h-44 w-full rounded-lg object-cover"
      />

      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{about}</p>
      </div>
    </div>
  );
};

export default AudioCard;
