import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/layout/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.scss";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </QueryClientProvider>
  );
}
