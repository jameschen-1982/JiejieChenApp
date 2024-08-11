import React from "react";

export default function Home() {
  return (
    <div className="p-24">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-4 lg:py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hi, I Am James Chen
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              Stay tuned for the update of this site
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/background"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                See My Background
              </a>
              <a
                href="https://github.com/jameschen-1982/JiejieChenApp"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Check Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
