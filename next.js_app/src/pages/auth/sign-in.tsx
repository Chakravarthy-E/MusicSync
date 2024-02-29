import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import client, { apiList } from "@/utils/apiServices";
import constants from "../../json/constants.json";

const formSchema = z.object({
  email: z.string().email("email required !"),
  password: z.string().trim(),
});

const SignIn = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await client.post(apiList.signIn, values);
      if (response.status === 200) {
        Cookies.set("token", response.data?.token);
        toast({
          title: "Login Success",
          description: "Successfully logged in",
        });
        router.push("/");
      } else if (response.status === 403) {
        const errorMessage = response.data?.error || "Email/Password mismatch!";
        toast({
          title: response.statusText,
          description: errorMessage,
        });
      } else {
        toast({
          title: response.statusText,
          description: "An error occurred while logging in",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "email and password mismatched !",
      });
    }
  }

  const user = Cookies.get("token");
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Login With Your Accout
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-3 w-96 space-y-3 rounded border px-10 py-10 shadow"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your email"
                    {...field}
                    className="rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password"
                    {...field}
                    type="password"
                    className="w-full rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
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
