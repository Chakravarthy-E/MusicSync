import React from "react";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Login With Your Accout
      </h1>
      <form className="my-3 flex w-96 flex-col space-y-2 border px-10 py-10 text-sm">
        <label htmlFor="email">Email</label>
        <input
          placeholder="enter your email"
          id="email"
          type="email"
          className="rounded border px-2 py-2"
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="enter your password"
          id="password"
          type="password"
          className="rounded border px-2 py-2"
        />
        <button className="rounded bg-blue-500 py-2 text-white">Sign in</button>
      </form>
      <p>
        Don't have account?&nbsp;
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => router.push("/auth/sign-up")}
        >
          Sign up
        </span>
        &nbsp;here
      </p>
    </div>
  );
};

export default SignIn;
