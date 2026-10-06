import React from 'react';
import { SchoolLogo } from '../common/SchoolLogo';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface FooterProps {
  lang: 'bn' | 'en';
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: School Brand & Seal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full shrink-0">
                <SchoolLogo size={52} variant="emerald" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base leading-tight">
                  {lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}
                </h3>
                <p className="text-xs text-emerald-400 font-mono">
                  EIIN: {SCHOOL_INFO.eiin} | MPO: {SCHOOL_INFO.mpoCode}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'bn' 
                ? '১৯৭০ সালে প্রতিষ্ঠিত গাইবান্ধা সদর উপজেলার ঐতিহ্যবাহী হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়। দিনাজপুর শিক্ষা বোর্ড ও মাউশি অনুমোদিত এমপিওভুক্ত সহ-শিক্ষা প্রতিষ্ঠান।' 
                : 'Founded on Jan 1, 1970 in Gaibandha Sadar, Harin Singha Adarsha High School has delivered secondary education across Science, Humanities, and Business Studies for over five decades.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'কার্যসময়: শনিবার - বৃহস্পতিবার (১০:০০ - ৪:০০)' : 'Hours: Sat - Thu (10:00 AM - 4:00 PM)'}</span>
            </div>
          </div>

          {/* Column 2: DSHE Compliance & Statutory Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1.5">
              {lang === 'bn' ? 'মাউশি ১১ দফা কমপ্লায়েন্স' : 'DSHE 11-Point Compliance'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('dshe')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'bn' ? '১. ইতিহাস ও ক্যাম্পাস (১৪৫ শতক)' : '1. Campus History (145 Decimals)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dshe')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'bn' ? '২. বোর্ড স্বীকৃতি (দিনাজপুর বোর্ড)' : '2. Dinajpur Board Recognition (1972)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dshe')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'bn' ? '৩. শিক্ষার্থী পরিসংখ্যান ও অনুপাত' : '3. Student Demographics & Ratios'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dshe')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'bn' ? '৬. এমপিও পে-রোল স্বচ্ছতা (৮৭০২০৯১৩০২)' : '6. MPO Payroll Transparency'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dshe')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'bn' ? '৮. নাগরিক সনদ ও সেবাসমূহ' : '8. Citizen Charter Commitments'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('grievance')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'bn' ? '৯. অভিযোগ প্রতিকার ব্যবস্থা (জিআরএস)' : '9. Grievance Redress System (GRS)'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Portals & Student Hub */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1.5">
              {lang === 'bn' ? 'ডিজিটাল সেবা ও পোর্টাল' : 'Digital Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                  <span>{lang === 'bn' ? 'অনলাইন ভর্তি আবেদন (২০২৭ সেশন)' : 'Online Admissions (Session 2027)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'বার্ষিক পরীক্ষার ট্রান্সক্রিপ্ট ও জিপিএ' : 'Academic Transcripts & GPA'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fees')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                  <span>{lang === 'bn' ? 'বিকাশ টোকেনাইজড পেমেন্ট পোর্টাল' : 'bKash Tokenized Fee Payment'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'bn' ? 'বিজ্ঞপ্তি ফলক ও পরীক্ষার রুটিন' : 'Notice Board & Schedules'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faculty')}
                  className="hover:text-emerald-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'bn' ? 'শিক্ষক ও কর্মচারী ডিরেক্টরি' : 'Faculty & Staff Roster'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Government Hotlines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1.5">
              {lang === 'bn' ? 'যোগাযোগ ও হেল্পলাইন' : 'Contact & Hotlines'}
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'bn'
                    ? 'হরিণ সিংহা, রহমতপুর ইউনিয়ন, গাইবান্ধা সদর, জেলা: গাইবান্ধা, রংপুর বিভাগ, পোস্টকোড: ৫৭০০'
                    : 'Village: Harin Singha, Union: Rahmatpur, Gaibandha Sadar, Gaibandha, Rangpur Division, Postcode: 5700'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-white font-mono">
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white">
                  {SCHOOL_INFO.email}
                </a>
              </div>
            </div>

            {/* National Emergency Hotline Badges */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                {lang === 'bn' ? 'জাতীয় জরুরি হটলাইনসমূহ:' : 'National Helplines:'}
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  ৯৯৯ (জাতীয় জরুরি)
                </span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  ৩৩৩ (সরকারি তথ্য)
                </span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  ১০৯ (নারী ও শিশু)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-black/80 py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-slate-200">
              {lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}
            </span>
            . {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'} (EIIN: {SCHOOL_INFO.eiin})
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>DSHE EMIS / IMS Compliant</span>
            <span>•</span>
            <span>Dinajpur Education Board</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
