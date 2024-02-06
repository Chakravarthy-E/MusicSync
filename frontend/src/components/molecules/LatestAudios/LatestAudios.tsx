"use client";
import Card from "@/components/atoms/Card/Card";
import client from "@/utils/apiServices";
import { useEffect, useState } from "react";

interface Audio {
  id: string;
  title: string;
  about: string;
  category: string;
  file: string;
  poster: string;
  owner: {
    name: string;
    id: string;
  };
}

interface ApiResponse {
  audios: Audio[];
}
const LatestAudios = () => {
  const [latestAudios, setLatestAudios] = useState<Audio[]>([]);

  useEffect(() => {
    const getLatestAudios = async () => {
      try {
        const response = await client.get<ApiResponse>("/audio/latest");
        console.log("API Response:", response.data);
        if (response.status === 200) {
          setLatestAudios(response.data.audios);
        } else {
          console.error("Failed to fetch data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLatestAudios();
  }, []);

  return (
    <div>
      <h1 className="playlistHeader">Latest Audios</h1>
      <div className="flex flex-wrap space-x-2  items-center">
        {latestAudios.map((item, index) => (
          <Card
            key={item.id}
            title={item.title}
            poster={item.poster}
            file={item.file}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestAudios;
