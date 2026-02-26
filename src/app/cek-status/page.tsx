"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  CreditCard,
  BadgeCheck,
  ArrowRight,
  MapPin,
  Phone,
  Calendar,
  Building2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface Registration {
  kode: string;
  nama_perusahaan: string;
  status: "on_progress" | "menunggu_pembayaran" | "terverifikasi";
  status_label: string;
  email?: string;
  payment_status?: string;
  payment_url?: string;
  payment_reference?: string;
  nominal_pembayaran?: string | number;
  tanggal_bayar?: string | null;
}

const STATUS_CONFIG = {
  on_progress: {
    label: "On Progress",
    badge: "badge-progress",
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning/8",
    desc: "Pendaftaran Anda sedang dalam proses verifikasi oleh tim KADIN Jawa Tengah.",
  },
  menunggu_pembayaran: {
    label: "Menunggu Pembayaran",
    badge: "badge-payment",
    icon: CreditCard,
    color: "text-primary",
    bg: "bg-primary/8",
    desc: "Pendaftaran telah disetujui. Silakan lakukan pembayaran biaya SBU.",
  },
  terverifikasi: {
    label: "Terverifikasi",
    badge: "badge-verified",
    icon: BadgeCheck,
    color: "text-success",
    bg: "bg-success/8",
    desc: "Selamat! Sertifikat Badan Usaha Anda telah terbit dan siap diambil.",
  },
};

export default function CekStatusPage() {
  const [kode, setKode] = useState("");
  const [result, setResult] = useState<Registration | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!kode.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pendaftar/cek-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ kode: kode.trim().toUpperCase() }),
      });
      const json = await res.json();
      
      if (res.ok && json.success) {
        setResult(json.data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  let cfg = result ? { ...STATUS_CONFIG[result.status] } : null;
  if (result && cfg) {
    if (result.status_label) {
      cfg.label = result.status_label;
    }
    if (result.status === "on_progress" && result.status_label.toLowerCase().includes("cetak")) {
      cfg.icon = FileText;
      cfg.color = "text-primary";
      cfg.bg = "bg-primary/8";
      cfg.desc = "Sertifikat Badan Usaha Anda sedang dalam tahap pencetakan oleh tim KADIN Jawa Tengah.";
    }
  }

  const StatusIcon = cfg?.icon || Clock;

  const getStepKey = (res: Registration) => {
    if (res.status === "on_progress") {
      return res.status_label?.toLowerCase().includes("cetak") ? "cetak" : "verifikasi";
    }
    return res.status;
  };

  const steps = [
    { key: "verifikasi", label: "Verifikasi", icon: Clock },
    { key: "menunggu_pembayaran", label: "Pembayaran", icon: CreditCard },
    { key: "cetak", label: "Proses Cetak", icon: FileText },
    { key: "terverifikasi", label: "Selesai", icon: BadgeCheck },
  ];

  const getStepStatus = (k: string) => {
    if (!result) return "inactive";
    const currentStepKey = getStepKey(result);
    const order = ["verifikasi", "menunggu_pembayaran", "cetak", "terverifikasi"];
    const ci = order.indexOf(currentStepKey);
    const si = order.indexOf(k);
    return si < ci ? "completed" : si === ci ? "active" : "inactive";
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-heading)] text-[1.75rem] md:text-[2.25rem] font-semibold text-foreground mb-1">
            Cek Status Pendaftaran
          </h1>
          <p className="text-foreground/40 text-[0.875rem]">
            Masukkan kode registrasi Anda
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-14">
          <input
            type="text"
            className="form-input flex-1 uppercase tracking-[0.15em] font-mono font-bold text-center text-base"
            placeholder="KADIN-XXXXXX"
            value={kode}
            onChange={(e) => setKode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !kode.trim()}
            className="btn-primary px-6 shrink-0"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          </button>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-danger/8 flex items-center justify-center mb-5">
              <AlertCircle className="h-7 w-7 text-danger" />
            </div>
            <h3 className="text-lg font-bold mb-2">Kode Tidak Ditemukan</h3>
            <p className="text-[0.85rem] text-foreground/45 mb-8 max-w-sm mx-auto">
              Kode <span className="font-mono font-bold">{kode}</span> tidak terdaftar. Pastikan kode yang Anda masukkan benar.
            </p>
            <Link href="/daftar" className="btn-primary">
              Daftar SBU <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Result */}
        {result && cfg && (
          <div className="space-y-8">
            {/* Stepper */}
            <div className="flex items-center justify-center gap-0 mb-4">
              {steps.map((s, i) => {
                const st = getStepStatus(s.key);
                return (
                  <div key={s.key} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`step-indicator ${st}`}>
                        {st === "completed" ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                      </div>
                      <span className={`text-[0.6rem] font-bold mt-2 ${st !== "inactive" ? "text-primary" : "text-foreground/25"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-14 sm:w-24 h-px mx-2 mb-5 ${st === "completed" ? "bg-success" : "bg-foreground/8"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status */}
            <div className="text-center py-6">
              <div className={`inline-flex mx-auto h-14 w-14 rounded-full ${cfg.bg} items-center justify-center mb-4`}>
                <StatusIcon className={`h-6 w-6 ${cfg.color}`} />
              </div>
              <div className={`badge ${cfg.badge} mx-auto mb-3`}>{cfg.label}</div>
              <p className="text-[0.85rem] text-foreground/45 max-w-md mx-auto">{cfg.desc}</p>
            </div>

            {/* Info */}
            <div className="space-y-3 py-6 border-t border-b border-foreground/[0.04]">
              {[
                { l: "Kode Registrasi", v: result.kode, mono: true },
                { l: "Perusahaan", v: result.nama_perusahaan },
                { l: "Status", v: result.status_label },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <span className="text-[0.75rem] text-foreground/35 uppercase tracking-wider">{row.l}</span>
                  <span className={`text-[0.85rem] font-semibold ${row.mono ? "font-mono tracking-widest" : ""}`}>{row.v}</span>
                </div>
              ))}
            </div>

            {/* On Progress instruction */}
            {result.status === "on_progress" && !result.status_label?.toLowerCase().includes("cetak") && (
              <div className="bg-gold/[0.04] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[0.9rem] font-bold mb-2">Kumpulkan Berkas Fisik</h3>
                    <p className="text-[0.8125rem] text-foreground/45 leading-relaxed mb-4">
                      Selagi menunggu verifikasi, Anda <strong className="text-foreground/60">wajib datang</strong> ke
                      kantor KADIN Jateng untuk menyerahkan berkas fisik.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="h-3.5 w-3.5 text-primary/40" />
                        <span className="text-[0.8rem] font-semibold text-foreground/70">KADIN Provinsi Jawa Tengah</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-3.5 w-3.5 text-foreground/25" />
                        <span className="text-[0.8rem] text-foreground/40">Jl. Papandayan Sel. No.7, Gajahmungkur, Semarang 50232</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar className="h-3.5 w-3.5 text-foreground/25" />
                        <span className="text-[0.8rem] text-foreground/40">Senin — Jumat, 08.00 — 16.00 WIB</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-3.5 w-3.5 text-foreground/25" />
                        <span className="text-[0.8rem] text-foreground/40">(024) 3561463</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Proses Cetak instruction */}
            {result.status === "on_progress" && result.status_label?.toLowerCase().includes("cetak") && (
              <div className="bg-primary/[0.04] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[0.9rem] font-bold mb-2">Sertifikat Sedang Dicetak</h3>
                    <p className="text-[0.8125rem] text-foreground/45 leading-relaxed mb-4">
                      Berkas pendaftaran fisik Anda telah diterima. Saat ini <strong className="text-foreground/60">Sertifikat Badan Usaha (SBU)</strong> Anda sedang dalam tahap pencetakan.
                    </p>
                    <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-foreground/5">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-[0.8rem] text-foreground/60">Mohon menunggu pembaruan status untuk informasi selanjutnya.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment instruction */}
            {result.status === "menunggu_pembayaran" && (
              <div className="bg-primary/[0.02] rounded-2xl p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[0.9rem] font-bold mb-2">Instruksi Pembayaran</h3>
                      <p className="text-[0.8125rem] text-foreground/45 leading-relaxed mb-2">
                        Pendaftaran disetujui. Lakukan pembayaran sesuai informasi yang dikirim ke email 
                        <strong className="text-foreground/60"> {result.email || "yang terdaftar"}</strong>.
                      </p>
                      <p className="text-[0.8125rem] text-foreground/45 leading-relaxed">
                        Setelah pembayaran terkonfirmasi, status berubah menjadi <strong className="text-foreground/60">&quot;Terverifikasi&quot;</strong>.
                      </p>
                    </div>
                  </div>

                  {result.payment_url && (
                    <div className="mt-4 border-t border-foreground/5 pt-5">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div>
                          <p className="text-[0.75rem] text-foreground/40 mb-1">Nominal Pembayaran</p>
                          <p className="font-bold text-lg text-foreground">
                            Rp {parseInt(result.nominal_pembayaran?.toString() || "0").toLocaleString("id-ID")}
                          </p>
                          {result.payment_reference && (
                             <p className="text-[0.7rem] text-foreground/35 mt-1 font-mono">
                               Ref: {result.payment_reference}
                             </p>
                          )}
                        </div>
                        <a 
                          href={result.payment_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-primary shrink-0"
                        >
                          Bayar Sekarang <ArrowRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Verified instruction */}
            {result.status === "terverifikasi" && (
              <div className="bg-success/[0.03] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[0.9rem] font-bold mb-2">Pengambilan Sertifikat</h3>
                    <p className="text-[0.8125rem] text-foreground/45 leading-relaxed mb-4">
                      Sertifikat telah diterbitkan. Silakan <strong className="text-foreground/60">datang langsung</strong> untuk mengambil sertifikat Anda.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="h-3.5 w-3.5 text-primary/40" />
                        <span className="text-[0.8rem] font-semibold text-foreground/70">KADIN Provinsi Jawa Tengah</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-3.5 w-3.5 text-foreground/25" />
                        <span className="text-[0.8rem] text-foreground/40">Jl. Papandayan Sel. No.7, Gajahmungkur, Semarang 50232</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar className="h-3.5 w-3.5 text-foreground/25" />
                        <span className="text-[0.8rem] text-foreground/40">Senin — Jumat, 08.00 — 16.00 WIB</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-3.5 w-3.5 text-foreground/25" />
                        <span className="text-[0.8rem] text-foreground/40">(024) 3561463</span>
                      </div>
                    </div>
                    <p className="text-[0.7rem] text-foreground/30 mt-4">
                      * Bawa KTP asli pimpinan dan bukti pembayaran.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!result && !notFound && !loading && (
          <div className="text-center py-16">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/[0.04] flex items-center justify-center mb-6">
              <Search className="h-7 w-7 text-primary/20" />
            </div>
            <p className="text-[0.85rem] text-foreground/30 max-w-xs mx-auto">
              Kode registrasi diberikan setelah menyelesaikan pendaftaran SBU.{" "}
              <Link href="/daftar" className="text-primary font-semibold hover:underline">
                Daftar di sini
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
