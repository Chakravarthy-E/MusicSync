"use client";
import Card from "@/components/atoms/Card/Card";
import client, { getClient } from "@/utils/apiServices";
import { getFromLocalStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const getLatestAudios = async () => {
    try {
      const response = await client.get("/audio/latest");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthUser = getFromLocalStorage("AUTH_TOKEN");
  if (!isAuthUser) return router.push("/auth/login");
  return <main className="">Home</main>;
}
