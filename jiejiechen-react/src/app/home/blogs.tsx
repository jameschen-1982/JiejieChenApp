import React, {useCallback, useEffect, useState} from "react";
import {fetchAPI} from "@/app/utils/fetch-api";
import PostList from "@/components/post-list";
import {Meta} from "@/models/meta";
import Loader from "@/components/loader";

export default function Blogs({data} : {data: any}) {
  
  return <>
    { /* Blog */}
    <section id="blogs" className="flex mx-auto my-auto bg-white lg:min-h-[calc(100vh-110px)] max-w-7xl py-24 sm:py-32">
      <div className="flex-grow px-6 lg:px-8 ">
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
