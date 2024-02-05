"use client";

import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [singUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleLogin = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div className=" min-h-screen flex items-center justify-center flex-col">
      <div className="flex  flex-col justify-center space-y-3 space-x-3 font-Montserrat border px-10 py-10 rounded-md h-96">
        <h1 className=" text-xl text-center text-blue-600 font-semibold underline">Sign Up</h1>
        <TextField
          label="Name"
          type="text"
          name="name"
          inputDynamicClassName="w-96"
          value={singUpData.name}
          onChange={handleLogin}
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          inputDynamicClassName="w-96"
          value={singUpData.email}
          onChange={handleLogin}
        />
        <TextField
          label="Password"
          type="password"
          name="email"
          inputDynamicClassName=" w-96"
          value={singUpData.password}
          onChange={handleLogin}
        />
        <Button
          variant="icon"
          buttonText="Submit"
          className=" flex items-center justify-center hover:text-blue-600"
        />
        <div className="text-center">
          Already have account?{" "}
          <button
            className=" text-blue-600 text-base hover:underline"
            onClick={()=>router.push("/auth/login")}
          >
            Login
          </button>{" "}
          here
        </div>
      </div>
    </div>
  );
}
