import React from "react";

export default function Blogs() {
  return <>
    { /* Blog */}
    <section id="blogs" className="flex my-auto bg-white h-[calc(100vh-110px)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">What&#39;s happening...</p>
        </div>
        <div
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">Mar 16, 2020</time>
              <a href="#"
                 className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Aviation</a>
            </div>
            <div className="group">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span className="inset-0"></span>
                  Circuit Training 2
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">This is my second circuit training. The final part of landing is still very challenging: when do I raise the aircraft&#39;s nose?</p>
            </div>
            <div className="mt-8 flex items-center gap-x-4">
              <img
                src="/assets/profile.jpg"
                alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href="#">
                    <span className="inset-0"></span>
                    James Chen
                  </a>
                </p>
                <p className="text-gray-600">Author</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </>;
}
