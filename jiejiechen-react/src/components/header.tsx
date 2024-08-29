'use client'

import React, {useState} from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Login from './login'
import { Link, animateScroll as scroll, scrollSpy } from 'react-scroll';

export default function HeaderComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  
  return (
    <header className="bg-white sticky top-0">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Jiejie Chen</span>
            <img alt="JC logo" src="/assets/favicon-32x32.png" className="h-8 w-auto"/>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer" onClick={scrollToTop}>
            About Me
          </a>
          <Link className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer" smooth spy to="projects">
            Projects
          </Link>
          <Link className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer" smooth spy to="blogs">
            Blog
          </Link>
          <Link className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer" smooth spy to="contact_me">
            Contact Me
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <form action="/api/download-cv" method="POST">
            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Download CV</button>
          </form>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10"/>
        <DialogPanel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="https://www.jiejiechen.com" className="-m-1.5 p-1.5">
              <span className="sr-only">Jiejie Chen</span>
              <img
                alt=""
                src="https://www.jiejiechen.com/assets/images/favicon-32x32.png"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="https://www.jiejiechen.com"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About Me
                </a>
              </div>
              <div className="py-6">
                <Login isMobile={true} />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
