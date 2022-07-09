import { Link } from 'react-router-dom'

import { Menu, Transition } from '@headlessui/react'

import { GoogleLogo, List, X } from 'phosphor-react'

export default function Header() {
  return (
    <header className="w-full px-4 py-4 bg-black relative">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">My</span>Flix
          </h1>
        </Link>

        {/* Menu Screen */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                to="/"
                className="hover:text-red-600 font-medium transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/search"
                className="hover:text-red-600 font-medium transition"
              >
                Search
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded-full font-bold hover:bg-red-700 transition"
              >
                Login with Google
              </button>
            </li>
          </ul>
        </nav>

        {/* Menu Mobile */}
        <Menu as="nav" className="block md:hidden">
          {({ open }) => (
            <>
              <Menu.Button>
                {open ? (
                  <X className="text-white bg-red-600 p-1 w-8 h-8 rounded-sm hover:bg-red-600 transition" />
                ) : (
                  <List className="text-white bg-red-600 p-1 w-8 h-8 rounded-sm hover:bg-red-600 transition" />
                )}
              </Menu.Button>

              <Transition
                className="bg-black absolute top-[100%] left-0 right-0 px-4 z-50"
                enter="transition duration-300"
                enterFrom="opacity-0 translate-y-[-10%]"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-[-10%]"
              >
                <Menu.Items as="ul">
                  <Menu.Item as="li" className="border-t-red-600/30 border-t">
                    <Link
                      to="/"
                      className="hover:text-red-600 font-medium transition py-2 block"
                    >
                      Home
                    </Link>
                  </Menu.Item>

                  <Menu.Item as="li" className="border-t-red-600/30 border-t">
                    <Link
                      to="/search"
                      className="hover:text-red-600 font-medium transition py-2 block"
                    >
                      Search
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    as="li"
                    className="border-t-red-600/30 border-t py-2"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded-full font-bold hover:bg-red-700 transition"
                    >
                      Login with Google
                    </button>
                  </Menu.Item>
                </Menu.Items>

                {open && (
                  <div className="absolute top-[100%] left-0 right-0 h-screen bg-black/60 z-40" />
                )}
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </header>
  )
}
