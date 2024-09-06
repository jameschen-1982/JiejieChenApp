import React, {FormEvent, useRef, useState} from "react";
import {EnquiryForm} from "@/models/enquiry-form";
import {postForm} from "@/services/deliveryService";

interface LeadForm {
  includeMessage?: boolean,
  onLeadSubmission: ({CvDownloadUrl}:{CvDownloadUrl: string}) => void,
  buttonText: string,
  isCvDownload?: boolean
}
export default function LeadForm({ onLeadSubmission, includeMessage, buttonText, isCvDownload } : LeadForm) {
  const [formInSubmission, setFormInSubmission] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: FormEvent<EnquiryForm>) {
    event.preventDefault();
    setFormInSubmission(true);

    const formData = new FormData(event.currentTarget);
    formData.append("isCvDownload", `${!!isCvDownload}`);

    try {
      const response = await postForm(formData);
      onLeadSubmission({CvDownloadUrl: response.data.CvDownloadUrl});
    } catch (e) {
      throw new Error("Failed to submit");
    } finally {
      setFormInSubmission(false);
    }
  }

  return (<form className="mx-auto max-w-xl" onSubmit={onSubmit} ref={formRef}>
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
      {includeMessage && (
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
        </div>)}
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
        {buttonText}
      </button>
    </div>
  </form>);
}
