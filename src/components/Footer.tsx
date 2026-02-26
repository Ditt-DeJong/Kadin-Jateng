import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/img/image.png"
                alt="KADIN Jateng"
                width={40}
                height={40}
                className="object-contain brightness-0 invert opacity-80"
              />
              <span className="text-base font-extrabold tracking-tight">
                KADIN <span className="text-gold">JATENG</span>
              </span>
            </div>
            <p className="text-white/85 text-[0.8125rem] leading-relaxed max-w-xs">
              Kamar Dagang dan Industri Provinsi Jawa Tengah — Melayani penerbitan Sertifikat Badan Usaha (SBU) untuk pelaku usaha di Jawa Tengah.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold mb-5">
              Navigasi
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Beranda", href: "/" },
                { label: "Daftar SBU", href: "/daftar" },
                { label: "Cek Status", href: "/cek-status" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.8125rem] text-white/85 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold mb-5">
              Kontak
            </h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold/70 mt-0.5 shrink-0" />
                <span className="text-[0.8125rem] text-white/85">
                  Jl. Papandayan Sel. No.7, Gajahmungkur, Kec. Gajahmungkur, Kota Semarang, Jawa Tengah 50232
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold/70 shrink-0" />
                <span className="text-[0.8125rem] text-white/85">(024) 3561463</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold/70 shrink-0" />
                <span className="text-[0.8125rem] text-white/85">info@kadinjateng.or.id</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold/70 shrink-0" />
                <span className="text-[0.8125rem] text-white/85">Sen — Jum: 08.00 — 16.00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/75 text-[0.75rem]">
            &copy; {new Date().getFullYear()} KADIN Jawa Tengah. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
