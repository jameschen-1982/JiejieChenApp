import React from "react";

export default function Home() {
  return (
    <div className="p-24">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-4 lg:py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              React Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              using React, NextJS, TailwindCSS, and TypeScript
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/table"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Table Demo
              </a>
              <a
                href="/form"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Form Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
