import React from "react";
import { useQuery } from "@tanstack/react-query";
import client, { apiList } from "@/utils/apiServices";

interface Props {}

const LatestAudios = (props: Props) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["latest-audios"],
    queryFn: () => client.get(apiList.latestAudios),
  });
  console.log(data);
  return <div>Latest Audios</div>;
};

export default LatestAudios;
