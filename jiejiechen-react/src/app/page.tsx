import React from "react";
import AboutMe from "@/app/home/about-me";
import Projects from "@/app/home/projects";
import Blogs from "@/app/home/blogs";
import {fetchAPI} from "@/app/utils/fetch-api";
import ContactMe from "@/app/home/contact-me";

export default async function Home() {
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
      start: 0,
      limit: 3,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const responseData = await fetchAPI(path, urlParamsObject, options);
  
  return (
    <div>
      <AboutMe/>
      <Projects/>
      <Blogs data={responseData.data}/>
      <ContactMe />
    </div>
  );
}
