"use client";
import { Badge } from "@/components/ui/badge";

export function NavbarWrapper() {
  return (
    <div className="fixed top-6 right-6 z-40">
      <Badge variant="outline" className="bg-white">
        Qiyu is designing at Apple
      </Badge>
    </div>
  );
}
