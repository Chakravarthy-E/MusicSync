import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
    
      <article>
        <div>{children}</div>
      </article>
    </section>
  );
};

export default Layout;
