import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Header = () => {
  const router = useRouter();
  const user = Cookies.get("token");
  const handleLogout = () => {
    Cookies.remove("token");
    toast({
      title: "Logged out Successfully",
    });
    router.push("/auth/sign-in");
  };
  
  return (
    <div className="flex w-full items-center justify-between border-b px-5 py-3">
      <div
        className="cursor-pointer text-3xl font-bold text-primary"
        onClick={() => router.push("/")}
      >
        MusicSync
      </div>
      {user && (
        <div className="flex items-center space-x-3">
          <Button variant={"link"} onClick={handleLogout}>
            Logout
          </Button>
          <CircleUserRound
            size={35}
            className="cursor-pointer hover:text-primary"
            onClick={() => router.push("/profile")}
          />
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
