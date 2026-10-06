import React from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, Facebook, Globe2 } from 'lucide-react';
import { SCHOOL_INFO } from '../../lib/mock-data';

interface FooterProps {
  lang: 'bn' | 'en';
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const links = [
    ['home', lang === 'bn' ? 'হোম' : 'Home'],
    ['about', lang === 'bn' ? 'ইতিহাস ও পরিচিতি' : 'About & History'],
    ['admissions', lang === 'bn' ? 'অনলাইন ভর্তি' : 'Admissions'],
    ['results', lang === 'bn' ? 'ফলাফল' : 'Results'],
    ['notices', lang === 'bn' ? 'নোটিশ' : 'Notices'],
    ['faculty', lang === 'bn' ? 'শিক্ষকবৃন্দ' : 'Faculty'],
    ['grievance', lang === 'bn' ? 'অভিযোগ' : 'Grievance'],
  ];

  return (
    <footer className="mt-12 overflow-hidden bg-[var(--brand-950)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.55fr_.75fr]">
          <div>
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[.08] ring-1 ring-white/10">
                <Globe2 className="h-5 w-5 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-base font-black sm:text-lg">{SCHOOL_INFO.nameBn}</h2>
                <p className="mt-0.5 text-[11px] font-semibold text-emerald-200/65">{SCHOOL_INFO.nameEn}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-xs leading-6 text-white/50">
              {lang === 'bn'
                ? 'ঐতিহ্য, শৃঙ্খলা ও আধুনিক শিক্ষার সমন্বয়ে গড়ে উঠছে হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়ের ডিজিটাল প্রতিষ্ঠানিক অভিজ্ঞতা।'
                : 'A modern institutional experience for Harin Singha Adarsha High School, connecting heritage, discipline and contemporary education.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono text-white/55">
              <span className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1">EIIN {SCHOOL_INFO.eiin}</span>
              <span className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1">MPO {SCHOOL_INFO.mpoCode}</span>
              <span className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1">EST. 1970</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[.15em] text-emerald-200/55">{lang === 'bn' ? 'দ্রুত লিংক' : 'Explore'}</p>
            <div className="mt-4 grid gap-2">
              {links.map(([id, label]) => (
                <button key={id} type="button" onClick={() => onNavigate?.(id)} className="group flex items-center justify-between rounded-xl px-2 py-1.5 text-left text-xs font-bold text-white/60 transition hover:bg-white/[.05] hover:text-white">
                  <span>{label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-200" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[.15em] text-emerald-200/55">{lang === 'bn' ? 'যোগাযোগ' : 'Contact'}</p>
            <div className="mt-4 space-y-3 text-xs text-white/55">
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><span>{lang === 'bn' ? 'হরিণ সিংহা, গাইবান্ধা সদর, গাইবান্ধা, রংপুর বিভাগ' : 'Harin Singha, Gaibandha Sadar, Gaibandha, Rangpur Division'}</span></div>
              <a href={'tel:' + SCHOOL_INFO.phone} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-emerald-300" />{SCHOOL_INFO.phone}</a>
              <a href={'mailto:' + SCHOOL_INFO.email} className="flex items-center gap-2 break-all hover:text-white"><Mail className="h-4 w-4 shrink-0 text-emerald-300" />{SCHOOL_INFO.email}</a>
              <a href={SCHOOL_INFO.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"><Facebook className="h-3.5 w-3.5" />{lang === 'bn' ? 'অফিসিয়াল ওয়েব রিসোর্স' : 'Official web resource'} <ArrowUpRight className="h-3 w-3" /></a>
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-white/10 pt-6">
          <div className="rounded-2xl border border-white/10 bg-white/[.045] p-4 sm:p-5">
            <p className="text-[10px] font-black uppercase tracking-[.14em] text-emerald-200/55">{lang === 'bn' ? 'আইনি ও ডেভেলপার ক্রেডিট' : 'Legal & developer credit'}</p>
            <p className="mt-2 text-xs font-semibold leading-6 text-white/75">
              Copyright © 2026 Harin Singha Adarsha High School. All Rights Reserved.
            </p>
            <p className="text-xs leading-6 text-white/50">
              Developed by <span className="font-bold text-white/80">Md Arafat Al Said Rifat</span>, BSc in Computer Science & Engineering
            </p>
          </div>
          <p className="mt-4 text-[10px] leading-5 text-white/30">
            {lang === 'bn' ? 'এই ফুটারটি সাইটের প্রতিটি পেজে একই প্রতিষ্ঠানের পরিচয় ও ক্রেডিট নিশ্চিত করে।' : 'Institutional identity and credit are consistently displayed across every page.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
