import React from 'react';
import { CalendarDays, MapPin, Award, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../../lib/mock-data';

interface Props { lang: 'bn' | 'en'; }

export const HistoryProfile: React.FC<Props> = ({ lang }) => {
  const timeline = [
    { year: '1970', titleEn: 'The beginning', titleBn: 'প্রতিষ্ঠার সূচনা', copyEn: 'Founded on January 1, 1970, in Gaibandha Sadar, Harin Singha Adarsha High School received formal recognition on January 1, 1972, under the Dinajpur Education Board. For over five decades, it has served as an educational foundation for rural students, offering Secondary Education in Science, Humanities, and Business Studies.', copyBn: '১৯৭০ সালের ১ জানুয়ারি গাইবান্ধা সদর উপজেলার হরিণ সিংহা গ্রামে প্রতিষ্ঠিত হয় হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়।' },
    { year: '1972', titleEn: 'Formal recognition', titleBn: 'প্রাতিষ্ঠানিক স্বীকৃতি', copyEn: 'Received formal recognition on January 1, 1972, under the Board of Intermediate and Secondary Education, Dinajpur.', copyBn: '১৯৭২ সালের ১ জানুয়ারি দিনাজপুর শিক্ষাবোর্ডের অধীনে স্বীকৃতি লাভ করে প্রতিষ্ঠানটি।' },
    { year: '1972–Present', titleEn: 'Continuing the journey', titleBn: 'শিক্ষাযাত্রার ধারাবাহিকতা', copyEn: 'For over five decades, it has served as an educational foundation for rural students, offering Secondary Education in Science, Humanities, and Business Studies.', copyBn: 'দীর্ঘ ৫০ বছরেরও বেশি সময় ধরে স্থানীয় শিক্ষার্থীদের শিক্ষা প্রদান করে আসছে প্রতিষ্ঠানটি। বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগে মাধ্যমিক শিক্ষা প্রদান করা হয়।' },
  ];

  const profile = [
    ['EIIN', SCHOOL_INFO.eiin],
    [lang === 'bn' ? 'এমপিও' : 'MPO', SCHOOL_INFO.mpoCode],
    [lang === 'bn' ? 'বোর্ড' : 'Board', lang === 'bn' ? SCHOOL_INFO.boardBn : SCHOOL_INFO.boardEn],
    [lang === 'bn' ? 'অবস্থান' : 'Location', SCHOOL_INFO.village + ', ' + SCHOOL_INFO.union + ', ' + SCHOOL_INFO.district],
    [lang === 'bn' ? 'প্রতিষ্ঠিত' : 'Established', 'January 1, 1970'],
    [lang === 'bn' ? 'স্বীকৃত' : 'Recognized', 'January 1, 1972'],
    [lang === 'bn' ? 'ক্যাম্পাস' : 'Campus', '145 Decimals Total Area'],
    [lang === 'bn' ? 'বিভাগ' : 'Disciplines', 'Science · Humanities · Business Studies'],
  ];

  return (
    <div className="space-y-10 py-3">
      <section className="relative overflow-hidden rounded-[2.25rem] bg-[var(--brand-950)] text-white shadow-[0_25px_80px_rgba(7,59,42,.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(25,184,131,.2),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(216,162,59,.13),transparent_28%)]" />
        <div className="relative grid gap-10 px-6 py-9 sm:px-9 sm:py-12 lg:grid-cols-[1.2fr_.8fr] lg:px-12 lg:py-14">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-300">{lang === 'bn' ? 'About the Institution · 1970 → 2026' : 'About the Institution · 1970 → 2026'}</span>
            <h1 className="mt-3 text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{lang === 'bn' ? 'ঐতিহ্য, স্বীকৃতি ও ধারাবাহিক শিক্ষাযাত্রা' : 'Heritage, recognition and a continuing educational journey'}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{lang === 'bn' ? '১৯৭০ সালের প্রতিষ্ঠার গল্প থেকে আজকের ডিজিটাল সেবাকেন্দ্র—হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়ের পরিচয় তৈরি হয়েছে শিক্ষা, শৃঙ্খলা ও স্থানীয় মানুষের আস্থার ওপর।' : 'From its founding in 1970 to today’s digital service hub, the identity of Harin Singha Adarsha High School has grown through education, discipline and the trust of its community.'}</p>
            <div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black text-white/75">EIIN {SCHOOL_INFO.eiin}</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black text-emerald-200">MPO {SCHOOL_INFO.mpoCode}</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black text-amber-200">Established 01 Jan 1970</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end">
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4"><CalendarDays className="h-5 w-5 text-emerald-300"/><p className="mt-5 text-2xl font-black">1970</p><p className="mt-1 text-[10px] text-white/45">{lang === 'bn' ? 'প্রতিষ্ঠার বছর' : 'Founding year'}</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4"><Award className="h-5 w-5 text-amber-300"/><p className="mt-5 text-2xl font-black">1972</p><p className="mt-1 text-[10px] text-white/45">{lang === 'bn' ? 'স্বীকৃতির বছর' : 'Recognition year'}</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4"><MapPin className="h-5 w-5 text-rose-300"/><p className="mt-5 text-xl font-black">145</p><p className="mt-1 text-[10px] text-white/45">{lang === 'bn' ? 'মোট ডেসিমেল এলাকা' : 'Total campus decimals'}</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4"><BookOpen className="h-5 w-5 text-cyan-300"/><p className="mt-5 text-xl font-black">3</p><p className="mt-1 text-[10px] text-white/45">{lang === 'bn' ? 'শিক্ষা বিভাগ' : 'Academic tracks'}</p></div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
        <div className="soft-card p-6 sm:p-8"><span className="eyebrow">{lang === 'bn' ? 'প্রতিষ্ঠানের সারসংক্ষেপ' : 'Institutional summary'}</span><h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--brand-950)]">{lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}</h2><div className="mt-5 space-y-4 text-sm leading-7 text-slate-600"><p>{lang === 'bn' ? '১৯৭০ সালের ১ জানুয়ারি গাইবান্ধা সদর উপজেলার হরিণ সিংহা গ্রামে প্রতিষ্ঠিত হয় হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়।' : 'Founded on January 1, 1970, in Harin Singha, Gaibandha Sadar, Harin Singha Adarsha High School began as a local secondary education institution.'}</p><p>{lang === 'bn' ? '১৯৭২ সালের ১ জানুয়ারি দিনাজপুর শিক্ষাবোর্ডের অধীনে স্বীকৃতি লাভ করে প্রতিষ্ঠানটি দীর্ঘ ৫০ বছরেরও বেশি সময় ধরে স্থানীয় শিক্ষার্থীদের শিক্ষা প্রদান করে আসছে।' : 'The school received formal recognition on January 1, 1972, under the Dinajpur Education Board and has served local students for more than five decades.'}</p></div></div>
        <div className="soft-card p-6 sm:p-8"><span className="eyebrow">{lang === 'bn' ? 'প্রতিষ্ঠানের পরিচয়' : 'Institutional profile'}</span><div className="mt-5 grid gap-3 sm:grid-cols-2">{profile.map(([label, value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4"><span className="block text-[9px] font-black uppercase tracking-[.12em] text-slate-400">{label}</span><span className="mt-1.5 block text-sm font-black leading-6 text-[var(--brand-950)]">{value}</span></div>)}</div></div>
      </section>

      <section><div className="max-w-2xl"><span className="eyebrow">{lang === 'bn' ? 'টাইমলাইন' : 'Timeline'}</span><h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--brand-950)] sm:text-3xl">{lang === 'bn' ? '১৯৭০ থেকে বর্তমান' : '1970 to the present'}</h2></div><div className="mt-6 grid gap-4 md:grid-cols-3">{timeline.map((item,index) => <article key={item.year} className="soft-card relative overflow-hidden p-5 sm:p-6"><span className="font-mono text-4xl font-black text-emerald-100">{item.year}</span><span className="mt-4 block h-px w-12 bg-emerald-400"/><h3 className="mt-4 text-base font-black text-[var(--brand-950)]">{lang === 'bn' ? item.titleBn : item.titleEn}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{lang === 'bn' ? item.copyBn : item.copyEn}</p>{index<2&&<ArrowRight className="absolute right-4 top-5 hidden h-4 w-4 text-emerald-300 md:block"/>}</article>)}</div></section>

      <section className="soft-card overflow-hidden p-6 sm:p-8"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><span className="eyebrow">{lang === 'bn' ? 'একটি চলমান অঙ্গীকার' : 'A continuing commitment'}</span><h2 className="mt-2 text-2xl font-black text-[var(--brand-950)]">{lang === 'bn' ? 'ঐতিহ্য ধরে রেখে সেবাকে আরও সহজ করা' : 'Keeping the heritage while making service simpler'}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{lang === 'bn' ? 'ডিজিটাল প্ল্যাটফর্মটি ভর্তি, ফলাফল, নোটিশ, ফি, অভিযোগ এবং সরকারি তথ্যকে একটি নির্ভরযোগ্য, মোবাইল-ফ্রেন্ডলি অভিজ্ঞতায় একত্র করে।' : 'The digital platform brings admissions, results, notices, fees, grievances and statutory information into one dependable, mobile-friendly experience.'}</p></div><div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-black text-[var(--brand-800)]"><CheckCircle2 className="h-5 w-5 text-[var(--brand-600)]"/>{lang === 'bn' ? 'শিক্ষা · স্বচ্ছতা · সেবা' : 'Learning · transparency · service'}</div></div></section>
    </div>
  );
};

export default HistoryProfile;