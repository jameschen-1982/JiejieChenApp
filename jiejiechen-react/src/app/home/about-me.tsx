import {Github, Linkedin} from "react-bootstrap-icons";
import React from "react";

export default function AboutMe() {
  return <>
    { /* About Me */}
    <section className="bg-white flex my-auto lg:min-h-[calc(100vh)] items-center justify-center p-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-dark"><span className="text-blue-500">Hi,</span> I&#39;m a Full
              Stack Developer</h1>
            <p className="mb-6 text-dark text-lg">Hello. I&#39;m James Chen, a lead full stack developer based in
              Sydney,
              Australia. I have 15 years of experience in end-to-end Web development, specialised in Angular, React,
              .NET, AWS and Azure. </p>
            <div className="flex justify-center space-x-10 text-3xl text-gray-600">
              <a href="https://www.linkedin.com/in/jameschen-1982-au/"><Linkedin className="hover:text-blue-500"/></a>
              <a href="https://github.com/jameschen-1982"><Github className="hover:text-blue-500"/></a>
            </div>
          </div>
          <div className="mx-auto">
            <img src="/assets/profile.jpg"
                 alt="James Chen Profile Photo" className="md:size-96 size-72 rounded-full"/>
          </div>
        </div>
      </div>
    </section>
  </>;
}
