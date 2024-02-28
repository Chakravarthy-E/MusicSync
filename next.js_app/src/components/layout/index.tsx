import React, { ReactNode } from "react";
import Header from "./Header/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <article>
        <div>{children}</div>
      </article>
    </main>
  );
};

export default Layout;
