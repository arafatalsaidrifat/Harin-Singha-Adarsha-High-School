import React from 'react';
import { SCHOOL_INFO, INITIAL_TEACHERS } from '../../lib/mock-data';
import { Notice } from '../../types';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  FileText, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Sparkles,
  TrendingUp,
  Scale
} from 'lucide-react';

interface HomeHeroProps {
  lang: 'bn' | 'en';
  notices: Notice[];
  onNavigate: (tab: string) => void;
  onOpenNotice: (notice: Notice) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  lang,
  notices,
  onNavigate,
  onOpenNotice,
}) => {
  const headmaster = INITIAL_TEACHERS[0];
  const featuredNotice = notices.find((n) => n.isFeatured) || notices[0];

  const quotas = [
    { class: 'Class 6 (৬ষ্ঠ শ্রেণি)', max: SCHOOL_INFO.seatQuotas[6], enrolled: SCHOOL_INFO.currentEnrolledCounts[6] },
    { class: 'Class 7 (৭ম শ্রেণি)', max: SCHOOL_INFO.seatQuotas[7], enrolled: SCHOOL_INFO.currentEnrolledCounts[7] },
    { class: 'Class 8 (৮ম শ্রেণি)', max: SCHOOL_INFO.seatQuotas[8], enrolled: SCHOOL_INFO.currentEnrolledCounts[8] },
    { class: 'Class 9 Science (৯ম বিজ্ঞান)', max: SCHOOL_INFO.seatQuotas['9-Science'], enrolled: SCHOOL_INFO.currentEnrolledCounts['9-Science'] },
    { class: 'Class 9 Humanities (৯ম মানবিক)', max: SCHOOL_INFO.seatQuotas['9-Humanities'], enrolled: SCHOOL_INFO.currentEnrolledCounts['9-Humanities'] },
    { class: 'Class 10 (১০ম শ্রেণি)', max: SCHOOL_INFO.seatQuotas[10], enrolled: SCHOOL_INFO.currentEnrolledCounts[10] },
  ];

  return (
    <div className="space-y-14 py-4 sm:py-6">
      
      {/* Ticker for Urgent School Announcements */}
      {featuredNotice && (
        <div className="soft-card border-amber-200/70 bg-amber-50/80 rounded-2xl p-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="shrink-0 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'জরুরি নোটিশ' : 'Notice'}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
              {lang === 'bn' ? featuredNotice.titleBn : featuredNotice.title}
            </p>
          </div>
          <button
            onClick={() => onOpenNotice(featuredNotice)}
            className="shrink-0 text-xs font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1 cursor-pointer"
          >
            {lang === 'bn' ? 'বিস্তারিত' : 'Read'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main 4 Action Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Online Admission */}
        <div
          onClick={() => onNavigate('admissions')}
          className="soft-card border-emerald-200/70 p-5 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
              {lang === 'bn' ? 'অনলাইন ভর্তি ২০২৭' : 'Online Admissions 2027'}
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {lang === 'bn' 
                ? '৬ষ্ঠ থেকে ৯ম শ্রেণিতে আসন কোটা অনুযায়ী সরাসরি আবেদন ও ডিজিটাল প্রবেশপত্র গ্রহণ।' 
                : 'Direct digital application with real-time seat quota verification and instant token.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>{lang === 'bn' ? 'আবেদন ফরম খুলুন' : 'Apply Now'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 2: Academic Results */}
        <div
          onClick={() => onNavigate('results')}
          className="soft-card p-5 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition">
              {lang === 'bn' ? 'ফলাফল ও মার্কশিট' : 'Results & Transcripts'}
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {lang === 'bn' 
                ? 'দিনাজপুর বোর্ড ও এনসিটিবি গ্রেডিং অনুসারে জিপিএ ৫.০০ ও বিষয়ভিত্তিক পূর্ণাঙ্গ নম্বরপত্র।' 
                : 'Instant transcript generation conforming to NCTB 5.00 GPA Dinajpur Board scale.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>{lang === 'bn' ? 'রেজাল্ট দেখুন' : 'Search Result'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 3: bKash Fee Payment */}
        <div
          onClick={() => onNavigate('fees')}
          className="soft-card p-5 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-pink-700 transition">
              {lang === 'bn' ? 'বিকাশ অনলাইন ফি' : 'bKash Fee Payment'}
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {lang === 'bn' 
                ? 'বিকাশ টোকেনাইজড পেমেন্ট গেটওয়ের মাধ্যমে বেতন পরিশোধ ও মানি রিসিট ডাউনলোড।' 
                : 'Direct fee settlement with automated bKash tokenization & printable receipts.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-700">
            <span>{lang === 'bn' ? 'ফি প্রদান করুন' : 'Pay Fees'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 4: DSHE Compliance 11 Point */}
        <div
          onClick={() => onNavigate('dshe')}
          className="soft-card p-5 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition">
              {lang === 'bn' ? 'মাউশি ১১ দফা পোর্টাল' : 'DSHE 11-Point Portal'}
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {lang === 'bn' 
                ? 'সরকারি শিক্ষা তথ্য ও ইএমআইএস যাচাইকরণের জন্য সংবিধিবদ্ধ ১১ দফা তথ্যকোষ।' 
                : 'Full statutory transparency matrix covering MPO, land deeds, and Citizen Charter.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
            <span>{lang === 'bn' ? 'কমপ্লায়েন্স দেখুন' : 'View Matrix'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

      </div>

      {/* Institutional Overview & Headmaster's Address */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Headmaster's Speech */}
        <div className="lg:col-span-2 soft-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-3 h-8 bg-emerald-600 rounded-full"></div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {lang === 'bn' ? 'প্রধান শিক্ষকের বাণী' : 'Message from the Headmaster'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'ঐতিহ্য, গুণগত শিক্ষা ও ডিজিটাল অগ্রযাত্রা' : 'Heritage, Quality Education & Digital Advance'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0 flex flex-col items-center">
              <img
                src={headmaster.avatarUrl}
                alt={headmaster.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-md border-2 border-emerald-500/40"
              />
              <span className="mt-2 text-xs font-bold text-slate-900 text-center">
                {lang === 'bn' ? headmaster.nameBn : headmaster.name}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold text-center">
                {lang === 'bn' ? headmaster.designationBn : headmaster.designation}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Index: {headmaster.indexNumber}
              </span>
            </div>

            <div className="flex-1 space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <p>
                {lang === 'bn'
                  ? 'বিসমিল্লাহির রাহমানির রাহিম। ১৯৭১ সালের মহান মুক্তিযুদ্ধের প্রাক্কালে ১৯৭০ সালের ১লা জানুয়ারি প্রতিষ্ঠিত হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয় গাইবান্ধা সদর উপজেলার প্রত্যন্ত পল্লীতে দীর্ঘ পাঁচ দশকেরও অধিক সময় ধরে শিক্ষার আলোকবর্তিকা প্রজ্বলিত করে আসছে। ১৯৭২ সালের ১লা জানুয়ারি বিদ্যালয়টি দিনাজপুর শিক্ষা বোর্ডের আনুষ্ঠানিক মাধ্যমিক স্বীকৃতি লাভ করে।'
                  : 'In the name of Allah, Most Gracious, Most Merciful. Established on January 1, 1970, on the eve of Bangladesh’s liberation, Harin Singha Adarsha High School has radiated the light of education across rural Gaibandha for over five decades, receiving formal Dinajpur Board recognition on January 1, 1972.'}
              </p>
              <p>
                {lang === 'bn'
                  ? 'বিদ্যালয়ের ১৪৫ শতক মোট ভূমিসম্পদ ও পাকা ভবন কমপ্লেক্সে আমরা বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার শিক্ষার্থীদের যুগোপযোগী শিক্ষাদান নিশ্চিত করছি। এই স্বয়ংক্রিয় ডিজিটাল ম্যানেজমেন্ট সিস্টেম ও মাউশি ১১-দফা কমপ্লায়েন্স পোর্টালের মাধ্যমে প্রত্যন্ত অঞ্চলের শিক্ষার্থী ও অভিভাবকগণ নির্ভুল ফলাফল, অনলাইন ভর্তি ও মোবাইল ফাইন্যান্সিং সুবিধা পাবেন।'
                  : 'Across our 145 decimals of land and dedicated structural facilities, we provide enriched curricula across Science, Humanities, and Business Studies. This unified digital SMIS fulfills government transparency standards and brings instant grades, online admissions, and bKash payments directly to our families.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-semibold">
                  M.Sc (Math), B.Ed
                </span>
                <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-md font-semibold">
                  {lang === 'bn' ? 'সদস্য সচিব, ম্যানেজিং কমিটি' : 'Member Secretary, SMC'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Seat Quota & Class Capacities */}
        <div className="soft-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              {lang === 'bn' ? 'অনুমোদিত আসন ও ভর্তি স্থিতি' : 'Authorized Seat Quotas'}
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              2026/2027
            </span>
          </div>

          <p className="text-xs text-slate-600">
            {lang === 'bn' 
              ? 'দিনাজপুর শিক্ষা বোর্ড ও সরকারি নীতিমালার অধীনে অনুমোদিত শ্রেণিভিত্তিক আসন বণ্টন:' 
              : 'Official enrollment capacity caps authorized by Dinajpur Education Board:'}
          </p>

          <div className="space-y-3 pt-1">
            {quotas.map((q, idx) => {
              const pct = Math.min(100, Math.round((q.enrolled / q.max) * 100));
              const available = Math.max(0, q.max - q.enrolled);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{q.class}</span>
                    <span className="font-mono text-slate-600">
                      {q.enrolled}/{q.max} ({available} {lang === 'bn' ? 'আসন ফাঁকা' : 'left'})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        pct >= 90 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('admissions')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'bn' ? 'খালি আসনে আবেদন করুন' : 'Apply for Available Seats'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

      </div>

      {/* Institutional Metric Baseline Cards */}
      <div className="overflow-hidden rounded-[2rem] bg-[var(--brand-950)] p-6 sm:p-8 text-white shadow-[0_24px_70px_rgba(7,59,42,.18)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {lang === 'bn' ? 'সরকারি প্রাতিষ্ঠানিক ডাটাবেজ' : 'Government Educational Infrastructure'}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              {lang === 'bn' ? 'বিদ্যালয়ের অবকাঠামোগত পরিসংখ্যান ও মেট্রিক্স' : 'Institutional Infrastructure Baseline'}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('dshe')}
            className="self-start sm:self-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition cursor-pointer"
          >
            {lang === 'bn' ? 'মাউশি ১১ দফা সম্পূর্ণ দেখুন' : 'View Full DSHE Report'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'bn' ? 'ইআইআইএন নম্বর' : 'EIIN Primary Key'}
            </span>
            <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
              {SCHOOL_INFO.eiin}
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'bn' ? 'এমপিও কোড' : 'MPO Code'}
            </span>
            <span className="text-base sm:text-lg font-mono font-bold text-amber-400">
              {SCHOOL_INFO.mpoCode}
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'bn' ? 'মোট জমি' : 'Total Land Area'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              145 {lang === 'bn' ? 'শতক' : 'Decimals'}
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'bn' ? 'মূল ক্যাম্পাস' : 'Campus Footprint'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              40 {lang === 'bn' ? 'শতক' : 'Decimals'}
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'bn' ? 'ভবন কমপ্লেক্স' : 'Building Area'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              5,925 {lang === 'bn' ? 'বর্গফুট' : 'Sq Ft'}
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'bn' ? 'শিক্ষক-শিক্ষার্থী' : 'Student-Teacher'}
            </span>
            <span className="text-base sm:text-lg font-bold text-cyan-400">
              38:1 Ratio
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
