import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";
import client from "@/utils/apiServices";

export default function SignUp() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      const response = await client.post("/auth/create", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="py-5 text-3xl font-semibold tracking-wide">
        Create An Account
      </h1>
      <div className="flex flex-col items-center space-y-2 rounded-md border px-10 py-8">
        <TextField
          label="Username"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          name="name"
          inputDynamicClassName="w-full"
        />
        <TextField
          label="Email"
          value={data.email}
          type="email"
          name="email"
          inputDynamicClassName="w-full"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          label="Password"
          value={data.password}
          type="password"
          name="password"
          inputDynamicClassName="w-full"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button variant="bullet" buttonText="Sign up" onClick={handleSignUp} />
      </div>
      <p className="mt-4">
        Already have an account?&nbsp;
        <span
          onClick={() => router.push("/auth/sign-in")}
          className="cursor-pointer text-blue-500"
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
