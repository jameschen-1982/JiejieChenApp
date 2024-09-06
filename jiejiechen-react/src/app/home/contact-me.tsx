'use client'

import React, {FormEvent, useEffect, useRef, useState} from "react";
import FormSubmittedPopup from "@/components/form-submitted-popup";
import LeadForm from "@/components/lead-form";

export default function ContactMe() {
  const [openPopup, setPopupOpen] = useState<boolean>(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  
  return <>
    { /* Contact Me */}
    <section id="contact_me"
             className="flex lg:min-h-[calc(100vh-200px)] items-center justify-center px-5 py-48 bg-contact-me">
      <div className="flex-grow bg-white px-6 py-6 sm:py-12 lg:px-16 max-w-2xl rounded-md shadow-xl">
        <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Me</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            For a quick chat
          </p>
        </div>
        <LeadForm onLeadSubmission={ handleOpenPopup } includeMessage={true} buttonText={"Let's talk"} /> 
      </div>
    </section>
    <FormSubmittedPopup open={openPopup} onClose={handlePopupClose} />
  </>;
}
