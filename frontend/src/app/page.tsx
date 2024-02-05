"use client"
import { getFromLocalStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const isAuthUser = getFromLocalStorage("AUTH_TOKEN");
  if (!isAuthUser) return router.push("/auth/login");
  return <main className="">Home</main>;
}
