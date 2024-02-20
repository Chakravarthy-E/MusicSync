import React, { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <article className="h-full pt-24">
        <div className="mx-auto max-w-[1390px]">{children}</div>
      </article>
    </main>
  );
}
