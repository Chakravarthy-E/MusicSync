import React from "react";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Create An Accout
      </h1>

      <form className="flex w-96 flex-col space-y-2 border px-10 py-10 text-sm my-3">
        <label htmlFor="name">Name</label>
        <input
          placeholder="enter your name"
          id="name"
          type="text"
          className="rounded border px-2 py-2"
        />
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
        Already have account?&nbsp;
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => router.push("/auth/sign-in")}
        >
          Sign in
        </span>
        &nbsp;here
      </p>
    </div>
  );
};

export default SignUp;
