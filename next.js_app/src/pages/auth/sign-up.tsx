"use client";

import React from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  name: z.string().min(3, "Invalid name!"),
  email: z.string().email("Invalid email!"),
  password: z
    .string()
    .min(8, "Password is too short!")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!",
    ),
});

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await client.post(apiList.createUser, values);
    if (response.status === 201) {
      toast({
        title: "Account created successfully",
        description: "successfully created",
      });
      router.push({
        pathname: "/auth/verification",
        query: { userInfo: JSON.stringify(response.data.user) },
      });
    } else {
      toast({
        title: "Error creating account",
        description: "Account creation failed",
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-semibold tracking-wide">
        Create An Accout
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-3 w-96 space-y-3 rounded border px-10 py-10 shadow"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your name"
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
