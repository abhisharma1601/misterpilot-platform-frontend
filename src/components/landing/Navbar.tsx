"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
        scrolled
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
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing
            </Link>
            <a
              href="https://platform.misterpilot.online/docs"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green font-medium hover:text-text-primary transition-colors"
            >
              VS Code Extension
            </a>
          </div>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-green hover:bg-green-hover text-white transition-all shadow-lg shadow-green/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-md border-b border-border px-4 py-4 space-y-3">
          <Link
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-text-secondary hover:text-text-primary py-2 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-text-secondary hover:text-text-primary py-2 transition-colors"
          >
            Pricing
          </Link>
          <a
            href="https://platform.misterpilot.online/docs"
            className="block text-sm text-text-secondary hover:text-text-primary py-2 transition-colors"
          >
            Documentation
          </a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-green font-medium py-2 transition-colors"
          >
            VS Code Extension
          </a>
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-green hover:bg-green-hover text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
