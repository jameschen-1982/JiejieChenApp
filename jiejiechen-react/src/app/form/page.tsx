'use client'

import React, {FormEvent, useEffect, useRef, useState} from "react";
import {postForm} from "@/services/deliveryService";
import {EnquiryForm} from "@/models/enquiry-form";
import FormSubmittedPopup from "@/components/form-submitted-popup";
import {useAuth} from "react-oidc-context";


export default function Page() {
  const [formInSubmission, setFormInSubmission] = useState<boolean>(false);
  const [openPopup, setPopupOpen] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const auth = useAuth();
  
  useEffect(() => {
    if (auth.isAuthenticated) {
      var names = auth.user?.profile.name?.split(" ");
      setFirstName(names && names.length > 0 ? names[0] : "");
      setLastName(names && names.length > 1 ? names[1] : "");
      setEmail(auth.user?.profile.email ?? "");
    }
  }, [auth]);

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

  return (
    <>
      <div className="mx-auto max-w-7xl p-6">
        <form className="max-w-md mx-auto" onSubmit={onSubmit} ref={formRef}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email"
                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required defaultValue={email} />
            <label htmlFor="email"
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
              address</label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="firstName" id="firstName"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required defaultValue={firstName}/>
              <label htmlFor="firstName"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First
                name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="lastName" id="lastName"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required defaultValue={lastName}/>
              <label htmlFor="lastName"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last
                name</label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required/>
              <label htmlFor="phone"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone
                number (123-456-7890)</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="company" id="company"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required/>
              <label htmlFor="company"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company
                (Ex. Google)</label>
            </div>
          </div>
          <button type="submit"
                  disabled={formInSubmission}
                  className={
                    formInSubmission ?
                      "bg-gray-300 px-4 py-2 rounded-md opacity-50" :
                      "bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 px-4 py-2 rounded-md text-white"
                  }>Submit
          </button>
        </form>
      </div>
      <FormSubmittedPopup open={openPopup} onClose={handlePopupClose}/>
    </>
  );
}
