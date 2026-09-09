"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

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
      className="fixed top-6 right-6 z-40 transition-opacity duration-300"
      style={{ opacity: pastLanding ? 1 : 0, pointerEvents: pastLanding ? "auto" : "none" }}
    >
      <Badge variant="outline" className="bg-white">
        Qiyu is designing at Apple
      </Badge>
    </div>
  );
}
