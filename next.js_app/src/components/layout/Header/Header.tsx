import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getAuthState } from "@/lib/slices/authSlice";
import Cookies from "js-cookie";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const { profile } = useSelector(getAuthState);

  return (
    <div className="flex w-full items-center  justify-between border-b px-5 py-3">
      <div
        className="cursor-pointer text-3xl font-bold text-primary"
        onClick={() => router.push("/")}
      >
        MusicSync
      </div>
      {token && (
        <div className="flex items-center space-x-3">
          <div
            className="flex w-fit cursor-pointer items-center space-x-3 rounded border py-2 px-2 hover:bg-secondary"
            onClick={() => router.push("/profile")}
          >
            <div className="w-fit rounded border bg-secondary px-1 py-1">
              <CircleUserRound
                size={30}
                className="cursor-pointer hover:text-primary"
              />
            </div>
            <div className="text-base font-semibold tracking-wide">
              {profile?.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
