import React, {useCallback, useEffect, useState} from "react";
import {fetchAPI} from "@/app/utils/fetch-api";
import PostList from "@/components/post-list";
import {Meta} from "@/models/meta";
import Loader from "@/components/loader";

export default function Blogs() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[] ) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;
  
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
