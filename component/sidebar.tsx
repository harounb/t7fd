import { useState, useEffect, ReactNode } from "react";
import debounce from "lodash.debounce";
import XIcon from "./icons/x";
import Link from "next/link";

export const useSidebar = () => {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = debounce((e) => {
      if (e.matches) {
        setSidebarIsVisible(true);
      } else {
        setSidebarIsVisible(false);
      }
    });

    mediaQuery.addEventListener("change", handler);
    () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return { sidebarIsVisible, setSidebarIsVisible };
};

export default function Sidebar({
  state: { sidebarIsVisible, setSidebarIsVisible },
  children,
}: {
  state: ReturnType<typeof useSidebar>;
  children: ReactNode;
}) {
  return (
    <aside
      className={`${
        sidebarIsVisible ? "" : "hidden"
      } max-h-screen absolute md:relative z-10 overflow-scroll w-80 p-4 shrink-0 bg-gray-800`}
    >
      <span
        className={`md:hidden absolute top-0 right-0 p-3`}
        onClick={() => setSidebarIsVisible(false)}
      >
        <XIcon />
      </span>
      {children}
      <hr className="my-4"/>
      <Link className="underline hover:text-gray-300" href="/t7/fd/about">About</Link>
    </aside>
  );
}
