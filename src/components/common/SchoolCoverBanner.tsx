import React, { useEffect, useState } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { appStorage } from '../../lib/storage';
import {
  MapPin,
  Award,
  Calendar,
  GraduationCap,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';

interface Props {
  lang: 'bn' | 'en';
  onQuickAction?: (action: string) => void;
}

export const SchoolCoverBanner: React.FC<Props> = ({ lang, onQuickAction }) => {
  const [cover, setCover] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const saved = appStorage.getCoverImage();
    if (saved) setCover(saved);
  }, []);

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (!base64) return;
      setCover(base64);
      appStorage.setCoverImage(base64);
      setModal(false);
    };
    reader.readAsDataURL(file);
  };

  const saveUrl = () => {
    const value = url.trim();
    if (!value) return;
    setCover(value);
    appStorage.setCoverImage(value);
    setUrl('');
    setModal(false);
  };

  const reset = () => {
    setCover(null);
    localStorage.removeItem('hsahs_cover_image_v1');
    setModal(false);
  };

  return (
    <section className="relative isolate min-h-[420px] overflow-hidden bg-[var(--brand-950)] text-white sm:min-h-[470px] lg:min-h-[540px]">
      <div className="absolute inset-0">
        <img
          src={cover || '/hsahs-building.webp'}
          alt="Harin Singha Adarsha High School campus building"
          className="hero-image-motion h-full w-full object-cover object-center"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-950)] via-[var(--brand-950)]/82 to-[var(--brand-950)]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-950)]/95 via-[var(--brand-950)]/25 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-25 [background-image:linear-gradient(rgba(255,255,255,.11)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.11)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-end px-4 py-8 sm:min-h-[470px] sm:px-6 sm:py-10 lg:min-h-[540px] lg:px-8 lg:py-14">
        <div className="grid w-full items-end gap-8 lg:grid-cols-[1.18fr_.82fr]">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.13em] text-emerald-100 backdrop-blur">
                <Award className="h-3.5 w-3.5" />
                {lang === 'bn' ? 'দিনাজপুর শিক্ষা বোর্ড' : 'Dinajpur Education Board'}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 font-mono text-[10px] text-white/80 backdrop-blur">EIIN {SCHOOL_INFO.eiin}</span>
              <span className="rounded-full border border-amber-200/15 bg-amber-200/[.06] px-3 py-1.5 font-mono text-[10px] text-amber-100/90 backdrop-blur">MPO {SCHOOL_INFO.mpoCode}</span>
            </div>

            <div className="mt-6 flex items-start gap-4 sm:gap-5">
              <div className="hidden shrink-0 sm:block">
                <div className="float-slow rounded-[2rem] border border-white/15 bg-white/10 p-2.5 shadow-2xl backdrop-blur-md">
                  <SchoolLogo size={96} variant="white" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-200/70">
                  {lang === 'bn' ? 'প্রতিষ্ঠিত ১৯৭০ · ঐতিহ্য, শিক্ষা ও অগ্রযাত্রা' : 'Established 1970 · Heritage, learning & progress'}
                </p>
                <h1 className="text-balance mt-2 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
                  {lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
                  {lang === 'bn' ? SCHOOL_INFO.nameEn : SCHOOL_INFO.nameBn}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-rose-300" />{lang === 'bn' ? 'হরিণ সিংহা, রহমতপুর, গাইবান্ধা সদর, রংপুর — ৫৭০০' : 'Harin Singha, Rahmatpur, Gaibandha Sadar, Rangpur — 5700'}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-amber-300" />{lang === 'bn' ? 'বোর্ড স্বীকৃতি: ১৯৭২' : 'Board recognition: 1972'}</span>
              <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-cyan-300" />{lang === 'bn' ? 'বিজ্ঞান · মানবিক · ব্যবসায় শিক্ষা' : 'Science · Humanities · Business Studies'}</span>
            </div>

            <div className="mt-7 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ['145', lang === 'bn' ? 'শতক ভূমি' : 'Land decimals'],
                ['40', lang === 'bn' ? 'শতক ক্যাম্পাস' : 'Campus decimals'],
                ['5,925', lang === 'bn' ? 'বর্গফুট ভবন' : 'Building sq ft'],
                ['38:1', lang === 'bn' ? 'শিক্ষক-শিক্ষার্থী' : 'Student-teacher'],
              ].map(([value, label]) => (
                <div key={label} className="glass-panel rounded-2xl p-3.5 !border-white/10 !bg-white/[.08]">
                  <span className="block text-[10px] text-white/50">{label}</span>
                  <span className="mt-1 block text-sm font-black text-white sm:text-base">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="justify-self-stretch rounded-[2rem] border border-white/10 bg-[rgba(6,38,28,.56)] p-4 shadow-2xl backdrop-blur-xl sm:p-5 lg:max-w-md lg:justify-self-end">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[.16em] text-emerald-200/65">{lang === 'bn' ? 'ডিজিটাল সেবা' : 'Digital services'}</span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] text-white/45">HSAHS</span>
            </div>

            <div className="mt-4 space-y-2.5">
              <button type="button" onClick={() => onQuickAction?.('admissions')} className="shine-sweep flex w-full items-center justify-between gap-3 rounded-2xl bg-emerald-500 px-4 py-3.5 text-left transition hover:-translate-y-0.5 hover:bg-emerald-400">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15"><Sparkles className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-xs font-black">{lang === 'bn' ? 'অনলাইন ভর্তি ২০২৭' : 'Online Admissions 2027'}</span>
                    <span className="mt-0.5 block text-[10px] font-medium text-white/70">{lang === 'bn' ? 'আবেদন ও আসন যাচাই' : 'Apply & check seats'}</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button type="button" onClick={() => onQuickAction?.('results')} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3.5 text-left transition hover:-translate-y-0.5 hover:bg-white/10">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><CheckCircle2 className="h-4 w-4 text-emerald-200" /></span>
                  <span className="text-xs font-black">{lang === 'bn' ? 'ফলাফল ও মার্কশিট' : 'Results & transcripts'}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-white/40" />
              </button>

              <button type="button" onClick={() => setModal(true)} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-left text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                <span className="inline-flex items-center gap-2"><ImageIcon className="h-4 w-4 text-emerald-200" />{cover ? (lang === 'bn' ? 'কভার ছবি পরিবর্তন' : 'Change cover photo') : (lang === 'bn' ? 'ক্যাম্পাস ছবি আপডেট করুন' : 'Update campus photo')}</span>
                <span className="font-mono text-[9px] text-white/35">IMG</span>
              </button>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4 text-[10px] leading-5 text-white/40">
              {lang === 'bn' ? 'পরিবারের জন্য দ্রুত অনলাইন সেবা ও প্রাতিষ্ঠানিক তথ্য—একই ডিজিটাল ঠিকানায়।' : 'Fast online services and institutional information for families, in one digital address.'}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--brand-950)] text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.14em] text-emerald-300">{lang === 'bn' ? 'কভার মিডিয়া' : 'Cover media'}</p>
                <h3 className="mt-1 text-base font-black">{lang === 'bn' ? 'বিদ্যালয়ের কভার ছবি আপডেট করুন' : 'Update school cover photo'}</h3>
              </div>
              <button type="button" onClick={() => setModal(false)} className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-300/20 bg-white/[.04] p-6 text-center transition hover:border-emerald-300/40 hover:bg-white/[.06]">
                <Upload className="h-7 w-7 text-emerald-300" />
                <span className="mt-2 text-xs font-bold">{lang === 'bn' ? 'JPG / PNG নির্বাচন করুন' : 'Choose JPG / PNG'}</span>
                <span className="mt-1 text-[10px] text-white/35">{lang === 'bn' ? 'আপলোড করলে কভার ছবি সংরক্ষিত হবে' : 'The selected image is saved as the cover'}</span>
                <input type="file" accept="image/*" onChange={upload} className="hidden" />
              </label>

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[9px] font-black uppercase tracking-[.16em] text-white/35">{lang === 'bn' ? 'অথবা URL' : 'or URL'}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="flex gap-2">
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/campus.jpg" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2.5 text-xs text-white placeholder:text-white/25 outline-none focus:border-emerald-300/40" />
                <button type="button" onClick={saveUrl} className="rounded-xl bg-emerald-500 px-3.5 py-2.5 text-xs font-black transition hover:bg-emerald-400">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
              </div>

              {cover && (
                <button type="button" onClick={reset} className="text-xs font-bold text-rose-300 underline underline-offset-4 hover:text-rose-200">
                  {lang === 'bn' ? 'ডিফল্ট ভবন ছবিতে ফিরুন' : 'Reset to the default building photo'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
