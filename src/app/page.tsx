import {
  ChevronRight,
  Search,
  FileCheck,
  ShieldCheck,
  Award,
  BadgeCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const requiredDocs = [
  "Akte Pendirian & Perubahan Terakhir",
  "KTP Pimpinan / Pengurus",
  "NIB OSS",
  "Surat Izin Khusus Sektoral",
  "Keterangan Domisili Perusahaan",
  "Tanda Keanggotaan KADIN Jateng",
  "Ijazah & KTP Tenaga Ahli",
  "Kontrak/SPK (5–8 tahun terakhir)",
  "SPPT-PPh Badan (tahun terakhir)",
  "NPWP Badan / Perusahaan",
  "NPWP Direktur Utama",
  "Pas Photo Pimpinan 3x4 (2 lbr, berwarna)",
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* ======= HERO ======= */}
      <section className="relative overflow-hidden">
        {/* Ornamental shapes */}
        <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] rounded-full bg-primary/[0.03] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gold/[0.06] pointer-events-none animate-float" />
        <div className="absolute top-32 right-20 w-3 h-3 rounded-full bg-gold/30 animate-pulse-slow hidden lg:block" />
        <div className="absolute top-52 right-48 w-2 h-2 rounded-full bg-primary/20 animate-pulse-slow hidden lg:block" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 mb-8">
                <div className="gold-line" />
                <span className="text-[0.75rem] font-semibold text-primary/50 uppercase tracking-[0.15em]">
                  KADIN Jawa Tengah
                </span>
              </div>

              <h1 className="font-[var(--font-heading)] text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] font-bold text-primary leading-[1.05] tracking-tight mb-7">
                Urus Sertifikat
                <br />
                <span className="text-gradient-gold">Badan Usaha</span>
                <br />
                <span className="text-foreground/80">Dengan Mudah</span>
              </h1>

              <p className="text-foreground/50 text-[0.9375rem] md:text-base leading-relaxed max-w-xl mb-12 font-light">
                Daftarkan perusahaan Anda untuk mendapatkan SBU melalui KADIN Jawa Tengah.
                Proses cepat, terpercaya, dan diakui secara resmi.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/daftar"
                  className="group btn-gold rounded-full px-8 py-4 text-[0.9375rem]"
                >
                  Mulai Pendaftaran
                  <ChevronRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cek-status"
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-full text-[0.9375rem] font-semibold text-primary/70 hover:text-primary border-2 border-primary/15 hover:border-primary/30 bg-white hover:bg-primary/[0.03] transition-all duration-300"
                >
                  <Search className="h-4.5 w-4.5" />
                  Cek Status
                </Link>
              </div>
            </div>

            {/* Right: Floating Image Collage */}
            <div className="hidden lg:block relative h-[400px]">
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-gold/[0.08] to-primary/[0.04] blur-[60px] pointer-events-none" />

              {/* Main Image — largest, center-left */}
              <div className="hero-entrance hero-entrance-1 absolute top-[20px] left-[20px] w-[300px] h-[200px] z-20">
                <div className="hero-float hero-float-1 w-full h-full">
                  <div className="hero-img-wrap relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/15 ring-1 ring-white/60">
                    <Image
                      src="/img/image1.jpg"
                      alt="Penandatanganan kerjasama KADIN Jawa Tengah"
                      fill
                      className="object-cover"
                      sizes="300px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Secondary Image — top right */}
              <div className="hero-entrance hero-entrance-2 absolute top-[0px] right-[0px] w-[220px] h-[148px] z-30">
                <div className="hero-float hero-float-2 w-full h-full">
                  <div className="hero-img-wrap relative w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-primary/10 ring-1 ring-white/60">
                    <Image
                      src="/img/image5.jpg"
                      alt="CJTEC Launching dan Gathering"
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Tertiary Image — bottom right */}
              <div className="hero-entrance hero-entrance-3 absolute bottom-[20px] right-[0px] w-[260px] h-[170px] z-10">
                <div className="hero-float hero-float-3 w-full h-full">
                  <div className="hero-img-wrap relative w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-primary/10 ring-1 ring-white/60">
                    <Image
                      src="/img/image6.jpg"
                      alt="US-Indonesia Business Forum"
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute top-[10px] left-[5px] w-10 h-10 rounded-xl bg-gold/10 backdrop-blur-sm border border-gold/20 animate-float z-0" />
              <div className="absolute bottom-[40px] left-[0px] w-7 h-7 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/10 hero-float-reverse z-0" />
              <div className="absolute top-[150px] right-[20px] w-5 h-5 rounded-full bg-gold/20 animate-pulse-slow z-40" />

              {/* Gold accent bar */}
              <div className="absolute bottom-[5px] left-[40px] w-14 h-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* ======= ALUR ======= */}
      <section className="relative py-24 md:py-32">
        <div className="dot-pattern absolute inset-0 -z-10 opacity-60" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16 md:mb-20">
            <div className="gold-line mb-6" />
            <h2 className="font-[var(--font-heading)] text-[2rem] md:text-[2.5rem] font-semibold text-foreground leading-tight mb-4">
              Tiga Langkah Sederhana
            </h2>
            <p className="text-foreground/45 leading-relaxed text-[0.9375rem] font-light">
              Proses pendaftaran SBU yang dirancang agar mudah dan efisien untuk para pengusaha.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                num: "01",
                icon: FileCheck,
                title: "Isi Formulir",
                desc: "Lengkapi data pimpinan, data perusahaan, dan upload berkas persyaratan secara online.",
              },
              {
                num: "02",
                icon: ShieldCheck,
                title: "Verifikasi & Bayar",
                desc: "Tim KADIN memverifikasi data Anda. Setelah disetujui, lakukan pembayaran biaya SBU.",
              },
              {
                num: "03",
                icon: Award,
                title: "Sertifikat Terbit",
                desc: "Sertifikat siap — datang ke kantor KADIN Jateng untuk mengambil sertifikat Anda.",
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%+8px)] w-[calc(100%-60px)] h-px border-t-2 border-dashed border-primary/10 -z-1" />
                )}
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/15">
                      <item.icon className="text-gold h-6 w-6" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="text-[0.65rem] font-semibold text-gold uppercase tracking-[0.2em]">
                      Langkah {item.num}
                    </span>
                    <h3 className="text-base font-semibold text-foreground mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[0.85rem] text-foreground/45 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= TENTANG SBU ======= */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[80px] translate-x-1/4 translate-y-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="gold-line mb-6 opacity-60" />
              <h2 className="font-[var(--font-heading)] text-[2rem] md:text-[2.5rem] font-semibold text-white leading-tight mb-6">
                Mengapa <span className="text-gold">SBU</span> Penting?
              </h2>
              <p className="text-white/85 leading-relaxed mb-10 text-[0.9375rem] font-light">
                Sertifikat Badan Usaha (SBU) adalah pengakuan formal terhadap
                klasifikasi dan kualifikasi usaha di bidang konstruksi, yang menjadi
                kunci untuk mengikuti proyek pemerintah maupun swasta.
              </p>

              <div className="space-y-5">
                {[
                  "Wajib untuk mengikuti tender proyek pemerintah",
                  "Bukti legal kompetensi perusahaan",
                  "Meningkatkan kepercayaan klien & mitra bisnis",
                  "Akses ke proyek konstruksi berskala besar",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                    <span className="text-[0.875rem] text-white/80 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden md:flex justify-center">
              <div className="space-y-5 w-full max-w-sm">
                {[
                  { label: "Proses", val: "5–14 Hari Kerja" },
                  { label: "Layanan", val: "SBU Baru & Perpanjangan" },
                  { label: "Konsultasi", val: "Gratis" },
                  { label: "Pendaftaran", val: "Online & Offline" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-8 py-4 border-b border-white/[0.06] last:border-0"
                  >
                    <span className="text-[0.8125rem] text-white/75 uppercase tracking-wider font-medium">
                      {item.label}
                    </span>
                    <span className="text-[0.9375rem] font-semibold text-white/80">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= PERSYARATAN ======= */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <div className="gold-line mb-6" />
            <h2 className="font-[var(--font-heading)] text-[2rem] md:text-[2.5rem] font-semibold text-foreground leading-tight mb-4">
              Dokumen yang Dibutuhkan
            </h2>
            <p className="text-foreground/45 leading-relaxed text-[0.9375rem] font-light">
              Siapkan berkas-berkas berikut sebelum memulai pendaftaran SBU.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            {requiredDocs.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 group py-3">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/[0.06] flex items-center justify-center text-[0.7rem] font-bold text-primary group-hover:bg-primary group-hover:text-gold transition-all duration-300">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[0.85rem] text-foreground/55 leading-relaxed group-hover:text-foreground transition-colors duration-300 font-light">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA ======= */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/[0.08] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/[0.04] rounded-full blur-[60px] translate-x-1/4 translate-y-1/4" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-6">
                <BadgeCheck className="h-5 w-5 text-gold" />
                <span className="text-[0.75rem] font-semibold text-gold uppercase tracking-[0.15em]">
                  Daftar Sekarang
                </span>
              </div>

              <h2 className="font-[var(--font-heading)] text-[1.75rem] md:text-[2.5rem] font-semibold text-white mb-5 leading-tight">
                Siap Mendaftarkan
                <br />
                Perusahaan Anda?
              </h2>

              <p className="text-white/80 max-w-md mx-auto mb-10 text-[0.9375rem] leading-relaxed font-light">
                Lengkapi formulir online dan dapatkan kode registrasi
                untuk memantau status pendaftaran SBU Anda.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/daftar"
                  className="group btn-gold rounded-full px-10 py-4 text-[0.9375rem]"
                >
                  Mulai Pendaftaran
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cek-status"
                  className="flex items-center gap-2.5 rounded-full border border-white/15 px-10 py-4 text-[0.9375rem] font-semibold text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  <Search className="h-4.5 w-4.5" />
                  Cek Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
