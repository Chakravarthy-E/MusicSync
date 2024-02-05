'use client'

import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";
import client from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FC, useState } from "react";
import * as yup from "yup";

const signinSchema = yup.object({
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim("Password is missing!")
    .min(8, "Password is too short!")
    .required("Password is required!"),
});

interface Props {}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const Login: FC<Props> = (props) => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setloginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signinSchema.validate(loginData, { abortEarly: false });
      console.log("Form data is valid:", loginData);
      const data = await client.post("/auth/sign-in", loginData);
    
    } catch (validationErrors: any) {
      const errors: Record<string, string> = {};
      validationErrors.inner.forEach((error: any) => {
        errors[error.path as string] = error.message;
      });
      setErrors(errors);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center space-y-3 space-x-3 font-Montserrat border px-10 py-10 rounded-md h-96">
        <h1 className=" text-xl text-center text-blue-600 font-semibold underline">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="text"
            name="email"
            inputDynamicClassName="w-[20rem]"
            value={loginData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            inputDynamicClassName="w-[20rem]"
            value={loginData.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <div className="text-center flex items-center justify-center flex-col space-y-4">
            <Button variant="icon" buttonText="Submit" type="submit" />
            <p>
              Don't have an account?{" "}
              <button
                className=" text-blue-500   hover:text-blue-600 text-base hover:underline"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </button>{" "}
              here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
