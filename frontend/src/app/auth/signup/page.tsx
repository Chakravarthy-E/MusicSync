"use client";
import { ChangeEventHandler, FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";
import * as yup from "yup";
import client from "@/utils/apiServices";

interface Props {}

const signupSchema = yup.object({
  name: yup
    .string()
    .trim("Name is missing!")
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim("Password is missing!")
    .min(8, "Password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
    )
    .required("Password is required!"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Signup: FC<Props> = (props) => {
  const [signUpData, setSignUpData] = useState(initialValues);
  const router = useRouter();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signUpData);
    const data = await client.post("/auth/create", {
      ...signUpData,
    });
    try {
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="flex  flex-col justify-center space-y-1 space-x-3 font-Montserrat border px-10 py-10 rounded-md h-96">
        <h1 className="text-xl text-center text-blue-600 font-semibold underline">
          Sign Up
        </h1>
        <TextField
          label="Name"
          type="text"
          name="name"
          inputDynamicClassName=" w-[20rem]"
          value={signUpData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          inputDynamicClassName=" w-[20rem]"
          value={signUpData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          inputDynamicClassName=" w-[20rem]"
          value={signUpData.password}
          onChange={handleInputChange}
        />
        <div className="text-center flex items-center justify-center flex-col space-y-4">
          <Button variant="icon" buttonText="Submit" onClick={handleSubmit} />
          <p>
            Alredy have account?{" "}
            <button
              className=" text-blue-500   hover:text-blue-600 text-base hover:underline"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </button>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
