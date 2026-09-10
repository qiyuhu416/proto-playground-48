"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const MATRIX_TEXT = 'Qiyu is prototyping the HCI "what-if" for Apple';
const REFLECTION_TEXT = "Qiyu is learning what is overthinking";
const OVERVIEW_TEXT = "Qiyu would rather meet you than the site";

export function NavbarWrapper() {
  const [pastLanding, setPastLanding] = useState(false);
  const [badgeText, setBadgeText] = useState(MATRIX_TEXT);

  useEffect(() => {
    const handleScroll = () => {
      setPastLanding(window.scrollY > window.innerHeight * 0.5);

      const overviewEl = document.querySelector('[aria-label="Overview"]');
      const inOverview = overviewEl
        ? overviewEl.getBoundingClientRect().top <= window.innerHeight * 0.5
        : false;

      const reflectionEl = document.querySelector('[aria-label="Reflection"]');
      const inReflection = reflectionEl
        ? reflectionEl.getBoundingClientRect().top <= window.innerHeight * 0.5
        : false;

      setBadgeText(inOverview ? OVERVIEW_TEXT : inReflection ? REFLECTION_TEXT : MATRIX_TEXT);
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
        className="group grid items-center overflow-hidden rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm transition-colors duration-300 hover:border-transparent hover:bg-neutral-900 hover:text-white"
      >
        {/* Invisible sizer, always present, never shown — permanently pins the grid
            column's width to the longest possible text (the matrix line), so the
            badge never resizes no matter which text or hover state is showing. */}
        <span aria-hidden className="invisible col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap">
          <span className="size-1.5 shrink-0 rounded-full" />
          {MATRIX_TEXT}
        </span>

        <span className="col-start-1 row-start-1 flex items-center justify-between whitespace-nowrap group-hover:invisible">
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
          {badgeText}
        </span>

        <span className="invisible col-start-1 row-start-1 flex items-center justify-between whitespace-nowrap group-hover:visible">
          <span className="text-[11px] text-neutral-400">
            🔑🫵 Key-You fyi
          </span>
          <span className="flex items-center gap-1">
            Qiyu's LinkedIn
            <ArrowUpRight className="size-3 shrink-0" />
          </span>
        </span>
      </a>
    </div>
  );
}
