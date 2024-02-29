import React from "react";
import type { AppProps } from "next/app";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import Header from "@/components/layout/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}
