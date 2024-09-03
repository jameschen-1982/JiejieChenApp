'use client'

import {Field, Label, Switch} from "@headlessui/react";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {useAuth} from "react-oidc-context";
import {EnquiryForm} from "@/models/enquiry-form";
import {postForm} from "@/services/deliveryService";
import FormSubmittedPopup from "@/components/form-submitted-popup";

export default function ContactMe() {
  const [formInSubmission, setFormInSubmission] = useState<boolean>(false);
  const [openPopup, setPopupOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    formRef.current?.reset();
  };

  async function onSubmit(event: FormEvent<EnquiryForm>) {
    event.preventDefault();
    setFormInSubmission(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      await postForm(formData);
      handleOpenPopup();
    } catch (e) {
      throw new Error("Failed to submit");
    } finally {
      setFormInSubmission(false);
    }
  }
  
  return <>
    { /* Contact Me */}
    <section id="contact_me" className="flex my-auto lg:min-h-[calc(100vh-200px)] items-center justify-center p-5">
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 w-full">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Me</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            For a quick chat
          </p>
        </div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={onSubmit} ref={formRef}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                Phone number
              </label>
              <div className="mt-2.5">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={formInSubmission}
              className={
                formInSubmission ?
                  "btn block w-full rounded-md bg-gray-300 px-4 py-2 opacity-50" :
                  "btn block text-white bg-blue-500 w-full rounded-md hover:hover:bg-blue-800 active:bg-blue-800 px-4 py-2"
              }
            >
              Lets talk
            </button>
          </div>
        </form>
      </div>
    </section>
    <FormSubmittedPopup open={openPopup} onClose={handlePopupClose}/>
  </>;
}
