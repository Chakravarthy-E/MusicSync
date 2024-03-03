import React, { useState } from "react";
import { useRouter } from "next/router";
import { clearProfile } from "@/lib/slices/authSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getClient } from "@/utils/apiServices";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (fromAll?: boolean) => {
    setIsLoading(true);
    const endpoint = "/auth/log-out?fromAll=" + (fromAll ? "yes" : "");
    try {
      const client = await getClient();
      await client.post(endpoint);
      await Cookies.remove("token");
      dispatch(clearProfile());
      router.push("/auth/sign-in");
      toast({
        title: "Logged out Successfully",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Logged out Error",
      });
    }
  };
  return (
    <Button onClick={() => handleLogout(true)}>
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default Logout;
