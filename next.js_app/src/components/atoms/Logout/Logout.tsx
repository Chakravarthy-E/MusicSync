import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    toast({
      title: "Logged out Successfully",
    });
    router.push("/auth/sign-in");
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
