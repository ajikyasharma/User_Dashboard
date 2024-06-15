import React, { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import { Transition } from "@headlessui/react";

function Layout() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowSideBar(false);
      setIsMobile(true);
    } else {
      setShowSideBar(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-row  bg-neutral-100 overflow-hidden">
      <Transition
        as={Fragment}
        show={showSideBar}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showSideBar={showSideBar} />
      </Transition>

      <div className="flex-1">
        <Header setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <div
          className={`pt-20 p-4 transition-all duration-[400ms] ${
            showSideBar && !isMobile ? "pl-60 p-4" : ""
          }`}
        >
          <Outlet className="px-4 md:px-16" />
        </div>
      </div>
    </div>
  );
}

export default Layout;
