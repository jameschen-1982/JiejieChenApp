import React from "react";

export default function LayoutRoute({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex lg:min-h-[calc(100vh-170px)] max-w-7xl justify-between p-6 lg:px-8">
      <div className="flex-grow">
        <div>{children}</div>
      </div>
    </section>
  );
}
