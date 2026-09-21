"use client";

import React, { useState, useEffect } from "react";
import { Scissors, Menu, X, PhoneCall, Calendar, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export default function Navbar({
  onOpenBooking,
  theme = "dark",
  onToggleTheme,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-[#09080b]/95 backdrop-blur-xl border-b border-[#e8a598]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-[#faf7f2]/95 backdrop-blur-xl border-b border-[#b87364]/20 py-3 shadow-[0_10px_30px_rgba(184,115,100,0.12)]"
          : theme === "dark"
            ? "bg-[#09080b]/80 backdrop-blur-md border-b border-[#e8a598]/10 py-4 shadow-sm"
            : "bg-[#faf7f2]/85 backdrop-blur-md border-b border-[#b87364]/15 py-4 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full border border-[#e8a598]/50 flex items-center justify-center bg-gradient-to-br from-[#1c1822] to-[#0d0b10] group-hover:border-[#e61c5d] transition-colors shadow-md">
            <Scissors className="w-4 h-4 text-[#e8a598] group-hover:text-[#e61c5d] transition-colors" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl md:text-2xl tracking-[0.2em] font-semibold transition-colors ${
                theme === "dark"
                  ? "text-[#f7e7ce] group-hover:text-white"
                  : "text-[#1c1822] group-hover:text-[#b87364]"
              }`}
            >
              NATALIE SAX
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#e8a598] -mt-1 font-sans font-medium">
              HAIR & BEAUTY • EST. 2022
            </span>
          </div>
        </a>

        {/* Desktop Nav Links in English */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 hover:text-[#e8a598] transition-colors font-medium"
          >
            Services
          </a>
          <a
            href="#transformations"
            className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 hover:text-[#e8a598] transition-colors font-medium"
          >
            Lookbook
          </a>
          <a
            href="#experience"
            className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 hover:text-[#e8a598] transition-colors font-medium"
          >
            The Sanctuary
          </a>
          <a
            href="#founder"
            className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 hover:text-[#e8a598] transition-colors font-medium"
          >
            Meet Natalie
          </a>
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 hover:text-[#e8a598] transition-colors font-medium"
          >
            Contact
          </a>
        </nav>

        {/* CTA, Theme Toggle & Phone in English */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer group ${
              theme === "dark"
                ? "border-[#e8a598]/30 hover:border-[#e61c5d] bg-[#121016]/70 backdrop-blur-md"
                : "border-[#b87364]/30 hover:border-[#e61c5d] bg-white/80 backdrop-blur-md shadow-sm"
            }`}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#ffd166] group-hover:rotate-45 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest text-[#f7e7ce] font-medium">
                  Light
                </span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#b87364] group-hover:-rotate-12 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest text-[#1c1822] font-medium">
                  Dark
                </span>
              </>
            )}
          </button>

          <a
            href="tel:+46700000000"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#e8a598] hover:text-[#f7e7ce] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#e61c5d]" />
            <span>Concierge</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="crimson-neon-button px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-white flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full border cursor-pointer ${
              theme === "dark"
                ? "border-[#e8a598]/30 bg-[#121016]/70 text-[#f7e7ce]"
                : "border-[#b87364]/30 bg-white text-[#1c1822] shadow-sm"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#ffd166]" />
            ) : (
              <Moon className="w-4 h-4 text-[#b87364]" />
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="crimson-neon-button px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold text-white cursor-pointer"
          >
            Book
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#e8a598] p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden backdrop-blur-2xl border-b border-[#e8a598]/20 px-6 py-6 space-y-4 ${
            theme === "dark" ? "bg-[#09080b]/98" : "bg-[#faf7f2]/98 text-[#1c1822]"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#e8a598]">
              Theme
            </span>
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#e8a598]/30 text-xs"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#ffd166]" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#b87364]" />
                  <span>Switch to Dark</span>
                </>
              )}
            </button>
          </div>

          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest hover:text-[#e8a598]"
          >
            Services & Pricing
          </a>
          <a
            href="#transformations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest hover:text-[#e8a598]"
          >
            Transformations / Lookbook
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest hover:text-[#e8a598]"
          >
            The Salon Experience
          </a>
          <a
            href="#founder"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest hover:text-[#e8a598]"
          >
            Meet Natalie Sax
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest hover:text-[#e8a598]"
          >
            Location & Contact
          </a>
          <div className="pt-3 border-t border-black/10 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full crimson-neon-button py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white"
            >
              Book Your Transformation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
