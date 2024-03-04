import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import Layout from "@/components/layout";
import RecommendedAudios from "@/components/molecules/RecommendedAudios/RecommendedAudios";
import LatestAudios from "@/components/molecules/latestAudios/LatestAudios";

export default function Home() {
  const router = useRouter();
  const [cookies] = useCookies();
  const user = Cookies.get("token");
  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      router.push("/");
    }
  }, [cookies, user]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="space-y-3">
          <LatestAudios />
          <RecommendedAudios />
        </div>
      </Layout>
    </>
  );
}
