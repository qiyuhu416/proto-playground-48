"use client";
import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { NAV_ITEMS, navHref } from "./-navItems";

export function NavbarWrapper() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = NAV_ITEMS.map((item) => ({
    name: item,
    link: navHref(item),
  }));

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} currentPath={currentPath} />
        <a href="https://www.linkedin.com/in/qiyu-hu/" target="_blank" rel="noopener noreferrer">
          <NavbarButton variant="secondary">LinkedIn</NavbarButton>
        </a>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              to={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/qiyu-hu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              LinkedIn
            </NavbarButton>
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
