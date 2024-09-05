import { fetchAPI } from "@/app/utils/fetch-api";
import React from "react";


export default async function LayoutRoute({
                                            params,
                                            children,
                                          }: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <section className="mx-auto flex lg:min-h-[calc(100vh-170px)] max-w-7xl justify-between p-6 lg:px-8">
      <div className="flex-grow">
        <div>{children}</div>
      </div>
    </section>
  );
}

