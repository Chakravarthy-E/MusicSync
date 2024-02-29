import React from "react";
import type { AppProps } from "next/app";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Header from "@/components/layout/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.scss";

let persister = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
