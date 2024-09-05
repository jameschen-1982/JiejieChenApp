import {useState} from "react";

export default function FormSubmittedPopupComponent({open, onClose}: {open: boolean, onClose: () => void}) {
  
  const handleClose = () => {
    onClose();
  }

  return (
    <div id="popup-modal" tabIndex={-1}
         className={(open ? "" : "hidden") + " backdrop-blur-2xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"}>
      <div className="relative p-4 w-full max-w-md max-h-full m-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Thank you for your message. I will reach out to you soon.</h3>
            <button data-modal-hide="popup-modal" type="button" onClick={handleClose}
                    className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
