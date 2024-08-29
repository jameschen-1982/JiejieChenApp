'use client'

import React from "react";
import AboutMe from "@/app/home/about-me";
import Projects from "@/app/home/projects";
import Blogs from "@/app/home/blogs";
import ContactMe from "@/app/home/contact-me";

export default function Home() {
  
  return (
    <div>
      <AboutMe/>
      <Projects/>
      <Blogs/>
      <ContactMe/>
    </div>
  );
}
