"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { DOCS_URL, MARKETPLACE_URL } from "./shared";

const links = [
  { label: "Auto", href: "#auto" },
  { label: "Models", href: "#models" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-bg-primary/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/icon.png"
              alt="MisterPilot"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-bold text-text-primary text-base tracking-tight">
              MisterPilot
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Docs
            </a>
          </div>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-2"
            >
              Login
            </Link>
            <a
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-green hover:bg-green-hover text-white transition-all shadow-lg shadow-green/20"
            >
              Install for VS Code
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-md border-b border-border px-4 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-text-secondary hover:text-text-primary py-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-text-secondary hover:text-text-primary py-2 transition-colors"
          >
            Docs
          </a>
          <div className="flex items-center gap-3 pt-3">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Create account
            </Link>
            <a
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm font-semibold px-4 py-2 rounded-lg bg-green hover:bg-green-hover text-white"
            >
              Install
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
