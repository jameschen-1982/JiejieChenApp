'use client'

import {useState} from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon, PhoneIcon, PlayCircleIcon} from '@heroicons/react/20/solid'

const products = [
  {name: 'TableDemo', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon},
  {name: 'FormDemo', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon},
  {name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon},
  {name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon},
  {name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon},
]
const callsToAction = [
  {name: 'Watch demo', href: '#', icon: PlayCircleIcon},
  {name: 'Contact sales', href: '#', icon: PhoneIcon},
]

export default function HeaderComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Jiejie Chen</span>
            <img alt="JC logo" src="https://www.jiejiechen.com/assets/images/favicon-32x32.png" className="h-8 w-auto"/>
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
          <a href="/table" className="text-sm font-semibold leading-6 text-gray-900">
            Table Demo
          </a>
          <a href="/form" className="text-sm font-semibold leading-6 text-gray-900">
            Form Demo
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
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
                  href="/table"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Table Demo
                </a>
                <a
                  href="/form"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Form Demo
                </a>
                <a
                  href="https://www.jiejiechen.com"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About Me
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
