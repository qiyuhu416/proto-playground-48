"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function NavbarWrapper() {
  const [pastLanding, setPastLanding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setPastLanding(window.scrollY > window.innerHeight * 0.5);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-16 right-16 z-40 transition-opacity duration-300"
      style={{ opacity: pastLanding ? 1 : 0, pointerEvents: pastLanding ? "auto" : "none" }}
    >
      <a
        href="https://www.linkedin.com/in/qiyu-hu/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ cursor: "pointer" }}
        className="group flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors duration-300 hover:border-transparent hover:bg-neutral-900 hover:text-white"
      >
        <span className="size-2 shrink-0 rounded-full bg-emerald-400" />
        <span className="whitespace-nowrap group-hover:hidden">
          Qiyu is prototyping the HCI "what-if" for Apple
        </span>
        <span className="hidden items-center gap-1 whitespace-nowrap group-hover:flex">
          Qiyu's LinkedIn
          <ArrowUpRight className="size-3.5" />
        </span>
      </a>
    </div>
  );
}
