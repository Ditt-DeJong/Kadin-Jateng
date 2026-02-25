"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  User, Building2, Upload, ChevronRight, ChevronLeft, Check,
  Eye, EyeOff, AlertCircle, Copy, CheckCircle2, FileText,
  PartyPopper, MapPin,
} from "lucide-react";

interface FormData {
  namaLengkap: string; email: string; telepon: string;
  password: string; confirmPassword: string; bentukUsaha: string;
  namaPerusahaan: string; npwp: string; nib: string;
  jenisUsaha: string; jumlahKaryawan: string;
  files: Record<string, File | null>;
}

const init: FormData = {
  namaLengkap:"",email:"",telepon:"",password:"",confirmPassword:"",
  bentukUsaha:"",namaPerusahaan:"",npwp:"",nib:"",jenisUsaha:"",jumlahKaryawan:"",
  files:{},
};

const FILES = [
  {key:"akte",label:"Akte Pendirian & Perubahan Terakhir"},
  {key:"ktp_pimpinan",label:"KTP Pimpinan / Pengurus"},
  {key:"nib_oss",label:"NIB OSS"},
  {key:"izin_sektoral",label:"Surat Izin Khusus Sektoral"},
  {key:"domisili",label:"Keterangan Domisili Perusahaan"},
  {key:"keanggotaan_kadin",label:"Tanda Keanggotaan KADIN Jateng"},
  {key:"ijazah_tenaga_ahli",label:"Ijazah & KTP Tenaga Ahli"},
  {key:"kontrak_spk",label:"Kontrak/SPK (5-8 tahun terakhir)"},
  {key:"sppt_pph",label:"SPPT-PPh Badan (tahun terakhir)"},
  {key:"npwp_badan",label:"NPWP Badan / Perusahaan"},
  {key:"npwp_direktur",label:"NPWP Direktur Utama"},
  {key:"pas_photo",label:"Pas Photo Pimpinan 3x4 (2 lbr)"},
];

const BENTUK = ["PT (Perseroan Terbatas)","CV (Commanditaire Vennootschap)","UD (Usaha Dagang)","Firma","Koperasi","Perusahaan Perorangan"];
const JENIS = ["Jasa Konstruksi","Jasa Konsultansi Konstruksi","Pekerjaan Konstruksi Terintegrasi","Jasa Perencanaan","Jasa Pengawasan","Lainnya"];

function genCode() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
  return `KADIN-${s}`;
}

function pwCheck(pw: string) {
  return { len: pw.length >= 8, up: /[A-Z]/.test(pw), lo: /[a-z]/.test(pw), num: /[0-9]/.test(pw), sym: /[^A-Za-z0-9]/.test(pw) };
}
function pwOk(pw: string) { const v = pwCheck(pw); return v.len && v.up && v.lo && v.num && v.sym; }

export default function DaftarPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(init);
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = useCallback((f: keyof FormData, v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    setErrs(p => { const c = { ...p }; delete c[f]; return c; });
  }, []);

  const setFile = useCallback((k: string, f: File | null) => {
    setForm(p => ({ ...p, files: { ...p.files, [k]: f } }));
    setErrs(p => { const c = { ...p }; delete c[k]; return c; });
  }, []);

  const v1 = (): boolean => {
    const e: Record<string,string> = {};
    if (!form.namaLengkap.trim()) e.namaLengkap = "Wajib diisi";
    if (!form.email.trim()) e.email = "Wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.telepon.trim()) e.telepon = "Wajib diisi";
    if (!form.password) e.password = "Wajib diisi";
    else if (!pwOk(form.password)) e.password = "Belum memenuhi ketentuan";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Tidak cocok";
    setErrs(e); return !Object.keys(e).length;
  };

  const v2 = (): boolean => {
    const e: Record<string,string> = {};
    if (!form.bentukUsaha) e.bentukUsaha = "Wajib dipilih";
    if (!form.namaPerusahaan.trim()) e.namaPerusahaan = "Wajib diisi";
    if (!form.npwp.trim()) e.npwp = "Wajib diisi";
    if (!form.nib.trim()) e.nib = "Wajib diisi";
    if (!form.jenisUsaha) e.jenisUsaha = "Wajib dipilih";
    if (!form.jumlahKaryawan.trim()) e.jumlahKaryawan = "Wajib diisi";
    setErrs(e); return !Object.keys(e).length;
  };

  const v3 = (): boolean => {
    const e: Record<string,string> = {};
    FILES.forEach(f => { if (!form.files[f.key]) e[f.key] = "Wajib diupload"; });
    setErrs(e); return !Object.keys(e).length;
  };

  const next = () => { if (step === 1 && v1()) setStep(2); else if (step === 2 && v2()) setStep(3); };

  const submit = () => {
    if (!v3()) return;
    const c = genCode();
    const fn: Record<string,string> = {};
    Object.entries(form.files).forEach(([k,f]) => { if (f) fn[k] = f.name; });
    const reg = {
      code: c, namaLengkap: form.namaLengkap, email: form.email, telepon: form.telepon,
      bentukUsaha: form.bentukUsaha, namaPerusahaan: form.namaPerusahaan,
      npwp: form.npwp, nib: form.nib, jenisUsaha: form.jenisUsaha,
      jumlahKaryawan: form.jumlahKaryawan, files: fn,
      status: "on_progress", createdAt: new Date().toISOString(),
    };
    const ex = JSON.parse(localStorage.getItem("kadin_registrations") || "{}");
    ex[c] = reg;
    localStorage.setItem("kadin_registrations", JSON.stringify(ex));
    setCode(c);
  };

  const copyCode = () => { if (code) { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } };
  const pw = pwCheck(form.password);
  const ec = (f: string) => errs[f] ? "border-danger!" : "";

  if (code) {
    return (
      <main className="min-h-screen">
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-7">
            <PartyPopper className="h-9 w-9 text-success" />
          </div>
          <h1 className="font-[var(--font-heading)] text-[1.75rem] font-semibold text-foreground mb-2">Pendaftaran Berhasil!</h1>
          <p className="text-foreground/45 text-[0.875rem] mb-10 font-light">Simpan kode registrasi untuk mengecek status pendaftaran SBU Anda.</p>

          <div className="bg-primary rounded-2xl p-8 mb-8">
            <div className="text-[0.65rem] font-semibold text-white/35 uppercase tracking-[0.2em] mb-3">Kode Registrasi</div>
            <div className="text-3xl font-bold text-white tracking-[0.15em] font-mono mb-5">{code}</div>
            <button onClick={copyCode} className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-white/50 hover:text-white transition-colors">
              {copied ? <CheckCircle2 className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
              {copied ? "Tersalin!" : "Salin Kode"}
            </button>
          </div>

          <div className="text-left bg-gold/[0.06] rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3.5">
              <MapPin className="h-5 w-5 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-[0.8125rem] font-semibold text-foreground mb-1">Langkah Selanjutnya</p>
                <p className="text-[0.8125rem] text-foreground/50 leading-relaxed font-light">
                  Anda <strong className="font-semibold text-foreground/70">wajib datang langsung</strong> ke kantor KADIN Jateng untuk mengumpulkan berkas fisik.
                </p>
                <p className="text-[0.75rem] text-foreground/40 font-light mt-3">📍 Jl. Papandayan Sel. No.7, Gajahmungkur, Semarang</p>
                <p className="text-[0.75rem] text-foreground/40 font-light mt-1">🕐 Senin — Jumat, 08.00 — 16.00 WIB</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/cek-status" className="btn-primary flex-1 py-3.5">Cek Status</Link>
            <Link href="/" className="btn-secondary flex-1 py-3.5">Beranda</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-10">
          <div className="gold-line mb-5" />
          <h1 className="font-[var(--font-heading)] text-[1.75rem] md:text-[2.25rem] font-semibold text-foreground mb-1">Pendaftaran SBU</h1>
          <p className="text-foreground/40 text-[0.875rem] font-light">Langkah {step} dari 3</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-12">
          {[{n:1,l:"Data Pimpinan",ic:User},{n:2,l:"Data Perusahaan",ic:Building2},{n:3,l:"Upload Berkas",ic:Upload}].map((s,i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex items-center gap-3 flex-1">
                <div className={`step-indicator ${step > s.n ? "completed" : step === s.n ? "active" : "inactive"}`}>
                  {step > s.n ? <Check className="h-4 w-4" /> : <s.ic className="h-4 w-4" />}
                </div>
                <span className={`hidden sm:block text-[0.75rem] font-medium ${step >= s.n ? "text-primary" : "text-foreground/25"}`}>{s.l}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px mx-2 ${step > s.n ? "bg-success" : "bg-foreground/8"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div className="mb-2"><h2 className="text-base font-semibold">Data Pimpinan</h2><p className="text-[0.8125rem] text-foreground/40 font-light">Informasi pimpinan perusahaan</p></div>
            <div><label className="form-label">Nama Lengkap <span className="required">*</span></label><input type="text" className={`form-input ${ec("namaLengkap")}`} placeholder="Nama lengkap pimpinan" value={form.namaLengkap} onChange={e => set("namaLengkap",e.target.value)} />{errs.namaLengkap && <p className="text-xs text-danger mt-1.5 font-medium">{errs.namaLengkap}</p>}</div>
            <div><label className="form-label">Email <span className="required">*</span></label><input type="email" className={`form-input ${ec("email")}`} placeholder="email@perusahaan.com" value={form.email} onChange={e => set("email",e.target.value)} />{errs.email && <p className="text-xs text-danger mt-1.5 font-medium">{errs.email}</p>}</div>
            <div><label className="form-label">Nomor Telepon <span className="required">*</span></label><input type="tel" className={`form-input ${ec("telepon")}`} placeholder="08xxxxxxxxxx" value={form.telepon} onChange={e => set("telepon",e.target.value)} />{errs.telepon && <p className="text-xs text-danger mt-1.5 font-medium">{errs.telepon}</p>}</div>
            <div>
              <label className="form-label">Kata Sandi <span className="required">*</span></label>
              <div className="relative">
                <input type={showPw?"text":"password"} className={`form-input pr-12 ${ec("password")}`} placeholder="Buat kata sandi" value={form.password} onChange={e => set("password",e.target.value)} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors">{showPw ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}</button>
              </div>
              {form.password && (
                <div className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-4">
                  {[{ok:pw.len,t:"Min. 8 karakter"},{ok:pw.up,t:"Huruf besar"},{ok:pw.lo,t:"Huruf kecil"},{ok:pw.num,t:"Angka"},{ok:pw.sym,t:"Simbol"}].map((r,i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${r.ok?"bg-success":"bg-foreground/8"}`}>{r.ok && <Check className="h-2 w-2 text-white" />}</div>
                      <span className={`text-[0.7rem] ${r.ok?"text-success font-medium":"text-foreground/30"}`}>{r.t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Konfirmasi Kata Sandi <span className="required">*</span></label>
              <div className="relative">
                <input type={showCf?"text":"password"} className={`form-input pr-12 ${ec("confirmPassword")}`} placeholder="Ulangi kata sandi" value={form.confirmPassword} onChange={e => set("confirmPassword",e.target.value)} />
                <button type="button" onClick={() => setShowCf(!showCf)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors">{showCf ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}</button>
              </div>
              {errs.confirmPassword && <p className="text-xs text-danger mt-1.5 font-medium">{errs.confirmPassword}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="mb-2"><h2 className="text-base font-semibold">Data Perusahaan</h2><p className="text-[0.8125rem] text-foreground/40 font-light">Informasi detail perusahaan</p></div>
            <div><label className="form-label">Bentuk Usaha <span className="required">*</span></label><select className={`form-select ${ec("bentukUsaha")}`} value={form.bentukUsaha} onChange={e => set("bentukUsaha",e.target.value)}><option value="">Pilih bentuk usaha</option>{BENTUK.map(b => <option key={b} value={b}>{b}</option>)}</select>{errs.bentukUsaha && <p className="text-xs text-danger mt-1.5 font-medium">{errs.bentukUsaha}</p>}</div>
            <div><label className="form-label">Nama Perusahaan <span className="required">*</span></label><input type="text" className={`form-input ${ec("namaPerusahaan")}`} placeholder="PT / CV / UD Nama Perusahaan" value={form.namaPerusahaan} onChange={e => set("namaPerusahaan",e.target.value)} />{errs.namaPerusahaan && <p className="text-xs text-danger mt-1.5 font-medium">{errs.namaPerusahaan}</p>}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="form-label">NPWP <span className="required">*</span></label><input type="text" className={`form-input ${ec("npwp")}`} placeholder="00.000.000.0-000.000" value={form.npwp} onChange={e => set("npwp",e.target.value)} />{errs.npwp && <p className="text-xs text-danger mt-1.5 font-medium">{errs.npwp}</p>}</div>
              <div><label className="form-label">NIB <span className="required">*</span></label><input type="text" className={`form-input ${ec("nib")}`} placeholder="Nomor Induk Berusaha" value={form.nib} onChange={e => set("nib",e.target.value)} />{errs.nib && <p className="text-xs text-danger mt-1.5 font-medium">{errs.nib}</p>}</div>
            </div>
            <div><label className="form-label">Jenis Usaha <span className="required">*</span></label><select className={`form-select ${ec("jenisUsaha")}`} value={form.jenisUsaha} onChange={e => set("jenisUsaha",e.target.value)}><option value="">Pilih jenis usaha</option>{JENIS.map(j => <option key={j} value={j}>{j}</option>)}</select>{errs.jenisUsaha && <p className="text-xs text-danger mt-1.5 font-medium">{errs.jenisUsaha}</p>}</div>
            <div><label className="form-label">Jumlah Karyawan <span className="required">*</span></label><input type="number" className={`form-input ${ec("jumlahKaryawan")}`} placeholder="Jumlah karyawan" value={form.jumlahKaryawan} onChange={e => set("jumlahKaryawan",e.target.value)} />{errs.jumlahKaryawan && <p className="text-xs text-danger mt-1.5 font-medium">{errs.jumlahKaryawan}</p>}</div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="mb-2"><h2 className="text-base font-semibold">Upload Berkas</h2><p className="text-[0.8125rem] text-foreground/40 font-light">Format: PDF / JPG / PNG (maks. 5MB)</p></div>
            <div className="flex items-start gap-3 bg-primary/[0.03] rounded-2xl p-4 mb-2">
              <AlertCircle className="h-4 w-4 text-primary/50 shrink-0 mt-0.5" />
              <p className="text-[0.75rem] text-foreground/45 leading-relaxed font-light">Berkas online bersifat <strong className="font-semibold text-foreground/60">sementara</strong>. Anda wajib menyerahkan berkas fisik ke kantor KADIN Jateng.</p>
            </div>
            {FILES.map((f,i) => (
              <div key={f.key}>
                <label className="form-label text-[0.75rem] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-primary/[0.06] flex items-center justify-center text-[0.6rem] font-bold text-primary">{String.fromCharCode(97+i)}</span>
                  {f.label} <span className="required">*</span>
                </label>
                <label className={`file-upload ${form.files[f.key]?"has-file":""} ${ec(f.key)}`}>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(f.key,e.target.files?.[0]||null)} />
                  {form.files[f.key] ? (<><FileText className="h-4 w-4 text-success shrink-0" /><span className="text-[0.8125rem] text-success font-medium truncate">{form.files[f.key]!.name}</span><Check className="h-3.5 w-3.5 text-success ml-auto shrink-0" /></>) : (<><Upload className="h-4 w-4 text-foreground/25 shrink-0" /><span className="text-[0.8125rem] text-foreground/30 font-light">Pilih file...</span></>)}
                </label>
                {errs[f.key] && <p className="text-xs text-danger mt-1 font-medium">{errs[f.key]}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-foreground/[0.04]">
          {step > 1 ? (<button onClick={() => {setErrs({});setStep(step-1);}} className="btn-secondary py-3 px-6 text-[0.875rem]"><ChevronLeft className="h-4 w-4" /> Kembali</button>) : (<Link href="/" className="btn-secondary py-3 px-6 text-[0.875rem]"><ChevronLeft className="h-4 w-4" /> Beranda</Link>)}
          {step < 3 ? (<button onClick={next} className="btn-primary py-3 px-8 text-[0.875rem]">Selanjutnya <ChevronRight className="h-4 w-4" /></button>) : (<button onClick={submit} className="btn-gold py-3 px-8 text-[0.875rem]"><Check className="h-4 w-4" /> Kirim Pendaftaran</button>)}
        </div>
      </div>
    </main>
  );
}
