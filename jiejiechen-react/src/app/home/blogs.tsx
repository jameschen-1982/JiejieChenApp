import React from "react";
import PostList from "@/components/post-list";

export default function Blogs({data} : {data: any}) {
  
  return <>
    { /* Blog */}
    <section id="blogs" className="flex bg-white lg:min-h-[calc(100vh-110px)] py-24 sm:py-32">
      <div className="flex-grow px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Blog</h2>
          <p className="mt-2 text-lg text-gray-600">What&#39;s happening...</p>
        </div>
        <PostList data={data}>
        </PostList>
      </div>
    </section>
  </>;
}
