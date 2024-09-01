import React from "react";
import Link from "next/link";

export default function Projects() {
  return <>
    { /* Projects */}
    <section id="projects" className="flex my-auto lg:min-h-[calc(100vh-120px)] items-center justify-center p-5">
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Projects that I have delivered
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-1 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img className="object-cover h-48 w-96"
                  src="/assets/store.jpg"
                  alt="Standards Australia Store Image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Standards Australia Store</h2>
                <p>E-Commerce website and online document reader for 90,000 standards</p>
                <Link href="page/standards-australia-store-project" className="card-actions justify-end">
                  <button className="btn hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                    Read</button>
                </Link>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img className="object-cover h-48 w-96"
                  src="/assets/controlcentre.png"
                  alt="Everlight Control Centre Image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Everlight Control Centre</h2>
                <p>Portal for Radiographers to track their orders</p>
                <div className="card-actions justify-end">
                  <Link href="page/everlight-control-centre-project" className="btn hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                    Read</Link>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img className="object-cover h-48 bg-white"
                  src="assets/propertyme.jpg"
                  alt="PropertyMe App Image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">PropertyMe Web App</h2>
                <p>Web app for real-estate agents managing their rental properties</p>
                <div className="card-actions justify-end">
                  <Link href="page/propertyme-app-project" className="btn hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                    Read</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}
