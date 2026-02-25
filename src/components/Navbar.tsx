"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Daftar SBU", href: "/daftar" },
    { label: "Cek Status", href: "/cek-status" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-primary/[0.06]">
      <div className="max-w-6xl mx-auto flex h-[72px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/img/image.png"
            alt="Logo KADIN Jawa Tengah"
            width={44}
            height={44}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[1.05rem] font-extrabold tracking-tight text-primary">
              KADIN
            </span>
            <span className="text-[0.55rem] font-medium text-primary/40 tracking-[0.18em] uppercase">
              Jawa Tengah
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-[0.8125rem] font-semibold text-foreground/60 hover:text-primary hover:bg-primary/[0.04] transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-foreground/8 mx-3" />
          <Link
            href="/daftar"
            className="btn-gold rounded-full px-6 py-2.5 text-[0.8125rem]"
          >
            Daftar SBU
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-xl hover:bg-primary/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-primary/5">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-[0.875rem] font-semibold text-foreground/70 hover:text-primary hover:bg-primary/[0.04] transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/daftar"
              onClick={() => setMobileOpen(false)}
              className="mt-3 btn-gold rounded-full py-3 text-center text-[0.875rem]"
            >
              Daftar SBU Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
