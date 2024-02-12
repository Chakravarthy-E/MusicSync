"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@/components/atoms/TextField/TextField";
import { Button } from "@/components/atoms/Button/Button";
import client from "@/utils/apiServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaEarDeaf } from "react-icons/fa6";
import { useState } from "react";

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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        const response = await client.post("/auth/create", { ...values });
        if (response.status === 201) {
          router.push("/auth/verification");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <div className=" min-h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center space-y-3 space-x-3 font-Montserrat border px-10 py-10 rounded-md h-96">
        <h1 className=" text-3xl text-center text-blue-600 font-semibold  font-Alegreya">
          Sign Up
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            type="text"
            label="Name"
            inputDynamicClassName="w-[20rem]"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-center text-xs text-red-400">
              {formik.errors.name}
            </div>
          )}
          <TextField
            name="email"
            type="email"
            inputDynamicClassName="w-[20rem]"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-center text-xs text-red-400">
              {formik.errors.email}
            </div>
          )}

          <div className=" flex flex-col items-end">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              inputDynamicClassName="w-[20rem] "
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Button
              variant="bullet"
              buttonText={showPassword ? <FaEye /> : <FaEyeSlash />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-center text-xs text-red-400">
              {formik.errors.password}
            </div>
          )}
          <div className="text-center flex items-center justify-center flex-col space-y-4">
            <Button variant="icon" buttonText="Submit" type="submit" />
            <p>
              Already have an account?{" "}
              <button
                className=" text-blue-500   hover:text-blue-600 text-base hover:underline"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </button>{" "}
              here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
