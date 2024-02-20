import { useRouter } from "next/router";
import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";

export default function SignIn() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="py-5 text-3xl font-semibold tracking-wide">
        Login Into Your Account
      </h1>
      <div className="flex flex-col items-center space-y-2 rounded-md border px-10 py-8">
        <TextField
          label="Email"
          value=""
          onChange={() => {}}
          type="email"
          name="email"
          inputDynamicClassName="w-full"
        />
        <TextField
          label="Password"
          value=""
          onChange={() => {}}
          type="password"
          name="password"
          inputDynamicClassName="w-full"
        />
        <Button variant="bullet" buttonText="Login" />
      </div>
      <p className="mt-4">
        Don't have an account?&nbsp;
        <span
          onClick={() => router.push("/auth/sign-up")}
          className="cursor-pointer text-blue-500"
        >
          Signup
        </span>
      </p>
    </div>
  );
}
