import React, { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { FaAlignJustify, FaPlay } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };
  const location = useLocation();

  const navigation = [
    location.pathname === "/home"
      ? { name: "Home", to: "/home", current: true }
      : { name: "Home", to: "/home", current: false },
    location.pathname === "/add-note"
      ? { name: "Add Note", to: "/add-note", current: true }
      : { name: "Add Note", to: "/add-note", current: false },
    location.pathname === "/manage-note"
      ? { name: "Manage Note", to: "/manage-note", current: true }
      : { name: "Manage Note", to: "/manage-note", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaPlay className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaAlignJustify
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </Link>
                  <Link to="/">
                    <h1 className="text-white font-bold">Note Book</h1>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
