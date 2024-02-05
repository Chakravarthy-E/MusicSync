"use client";
import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";
import client from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { Keys, saveToLocalStorage } from "@/utils/storage";

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

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: signinSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        const response = await client.post("/auth/sign-in", { ...values });
        if (response.status === 200) {
          const data = response.data;
          await saveToLocalStorage(Keys.AUTH_TOKEN, data.token);
          router.push("/"); 
        }
      } catch (error) {
        console.error("Error:", error);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center space-y-3 space-x-3 font-Montserrat border px-10 py-10 rounded-md h-96">
        <h1 className="text-3xl text-center text-blue-600 font-semibold font-Alegreya">
          Login
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            type="text"
            name="email"
            inputDynamicClassName="w-[20rem]"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-center text-xs text-red-400">
              {formik.errors.email}
            </div>
          )}

          <TextField
            label="Password"
            type="password"
            name="password"
            inputDynamicClassName="w-[20rem]"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-center text-xs text-red-400">
              {formik.errors.password}
            </div>
          )}

          <div className="text-center flex items-center justify-center flex-col space-y-4">
            <Button variant="icon" buttonText="Submit" type="submit" />
            <p>
              Don't have an account?{" "}
              <button
                className="text-blue-500 hover:text-blue-600 text-base hover:underline"
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
