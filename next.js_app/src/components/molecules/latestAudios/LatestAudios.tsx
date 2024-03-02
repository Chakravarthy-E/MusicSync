import React, { useEffect } from "react";
import client, { apiList } from "@/utils/apiServices";

interface Props {}

const LatestAudios = (props: Props) => {
  useEffect(() => {
    (async function getLatestAudios() {
      const response = await client(apiList.latestAudios);
      console.log(response.data.audios);
    })();
  });

  return <div>Latest Audios</div>;
};

export default LatestAudios;
