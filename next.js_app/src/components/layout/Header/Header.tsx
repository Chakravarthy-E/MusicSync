import React from "react";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";


const Header = () => {



  return (
    <div className="flex w-full items-center justify-between border-b px-5 py-3">
      <div className="text-3xl font-bold">MusicSync</div>
      <div className="flex items-center space-x-3">
        <Button variant="link" >
          Logout
        </Button>
        <CircleUserRound className="cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
};

export default Header;
