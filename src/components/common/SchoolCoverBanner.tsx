import React, { useState, useEffect } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { appStorage } from '../../lib/storage';
import { 
  Building2, 
  MapPin, 
  Award, 
  Calendar, 
  GraduationCap, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SchoolCoverBannerProps {
  lang: 'bn' | 'en';
  onQuickAction?: (action: string) => void;
}

export const SchoolCoverBanner: React.FC<SchoolCoverBannerProps> = ({ lang, onQuickAction }) => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

  useEffect(() => {
    const saved = appStorage.getCoverImage();
    if (saved) setCoverImage(saved);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setCoverImage(base64);
          appStorage.setCoverImage(base64);
          setShowPhotoModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetUrl = () => {
    if (customUrlInput.trim()) {
      setCoverImage(customUrlInput.trim());
      appStorage.setCoverImage(customUrlInput.trim());
      setShowPhotoModal(false);
      setCustomUrlInput('');
    }
  };

  const handleResetToDefault = () => {
    setCoverImage(null);
    localStorage.removeItem('hsahs_cover_image_v1');
    setShowPhotoModal(false);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-800">
      {/* Background Graphic or Uploaded School Campus Photo */}
      <div className="absolute inset-0 z-0">
        {coverImage ? (
          <img
            src={coverImage}
            alt="Harin Singha Adarsha High School Campus"
            className="w-full h-full object-cover object-center filter brightness-[0.38]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 relative overflow-hidden">
            {/* Architectural Grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
            {/* Watermark of School Logo in background */}
            <div className="absolute -right-16 -top-20 opacity-10 pointer-events-none transform rotate-12 scale-150">
              <SchoolLogo size={420} variant="white" />
            </div>
            {/* Ambient light effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          
          {/* Main Logo Card matching user's official seal h1.jpg / h2.jpg */}
          <div className="group relative shrink-0">
            <div className="relative p-2 sm:p-2.5 bg-white rounded-full shadow-2xl ring-4 ring-emerald-500/30 transition-all duration-300 hover:scale-105">
              <SchoolLogo size={140} variant="emerald" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow border border-emerald-500 uppercase tracking-wider whitespace-nowrap">
                {lang === 'bn' ? 'স্থাপিত ১৯৭০' : 'Est. 1970'}
              </div>
            </div>
          </div>

          {/* School Titles, Identifiers & Meta */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {/* Badges bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'bn' ? 'দিনাজপুর শিক্ষা বোর্ড অনুমোদিত' : 'Affiliated with Dinajpur Education Board'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                EIIN: {SCHOOL_INFO.eiin}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                MPO: {SCHOOL_INFO.mpoCode}
              </span>
            </div>

            {/* School Main Titles */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}
              </h1>
              <p className="text-sm sm:text-base text-emerald-200/90 font-medium mt-1">
                {lang === 'bn' ? SCHOOL_INFO.nameEn : SCHOOL_INFO.nameBn}
              </p>
            </div>

            {/* Institutional Geographic & Historical Baseline */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                {lang === 'bn' 
                  ? 'হরিণ সিংহা, রহমতপুর ইউনিয়ন, গাইবান্ধা সদর, রংপুর বিভাগ (৫৭০০)' 
                  : 'Harin Singha, Rahmatpur Union, Gaibandha Sadar, Rangpur Division (5700)'}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {lang === 'bn' ? 'বোর্ড স্বীকৃতি: ১ জানুয়ারি ১৯৭২' : 'Board Recognition: Jan 1, 1972'}
              </span>
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                {lang === 'bn' ? 'বিজ্ঞান • মানবিক • ব্যবসায় শিক্ষা' : 'Science • Humanities • Business Studies'}
              </span>
            </div>

            {/* Statutory Key Figures Micro-Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-lg p-2 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'bn' ? 'মোট ভূমিসম্পদ' : 'Total Land Area'}
                </span>
                <span className="text-sm font-bold text-white">
                  145 {lang === 'bn' ? 'শতক' : 'Decimals'}
                </span>
              </div>
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-lg p-2 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'bn' ? 'ক্যাম্পাস আয়তন' : 'Campus Footprint'}
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  40 {lang === 'bn' ? 'শতক' : 'Decimals'}
                </span>
              </div>
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-lg p-2 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'bn' ? 'ভবন অবকাঠামো' : 'Building Complex'}
                </span>
                <span className="text-sm font-bold text-white">
                  5,925 {lang === 'bn' ? 'বর্গফুট' : 'Sq Ft'}
                </span>
              </div>
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-lg p-2 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'bn' ? 'শিক্ষক-শিক্ষার্থী অনুপাত' : 'Student-Teacher Ratio'}
                </span>
                <span className="text-sm font-bold text-cyan-400">
                  38:1
                </span>
              </div>
            </div>

          </div>

          {/* Action Hub / Photo Upload Control */}
          <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
            <button
              onClick={() => onQuickAction && onQuickAction('admissions')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {lang === 'bn' ? '২০২৭ অনলাইন ভর্তি আবেদন' : 'Online Admission 2027'}
            </button>
            <button
              onClick={() => onQuickAction && onQuickAction('results')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 shadow transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {lang === 'bn' ? 'রেজাল্ট ও মার্কশিট' : 'Results & Transcripts'}
            </button>
            
            {/* School Photo Collection Note & Button */}
            <button
              onClick={() => setShowPhotoModal(true)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer"
              title="Add or update school campus photo"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              {coverImage 
                ? (lang === 'bn' ? 'ক্যাম্পাস ছবি পরিবর্তন' : 'Change Cover Photo')
                : (lang === 'bn' ? 'ক্যাম্পাসের ছবি যুক্ত করুন' : 'Add School Campus Photo')}
            </button>
          </div>

        </div>
      </div>

      {/* Modal for adding/updating school pictures later */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2 text-emerald-400">
                <ImageIcon className="w-5 h-5" />
                {lang === 'bn' ? 'বিদ্যালয়ের কভার ছবি যুক্তকরণ' : 'Update School Cover Photo'}
              </h3>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              {lang === 'bn' 
                ? 'আপনার সংগৃহীত বিদ্যালয় ভবনের ছবি সরাসরি আপলোড করুন অথবা ছবির ওয়েব লিঙ্ক পেস্ট করুন। ছবি তাৎক্ষণিকভাবে কভারে যুক্ত হবে।' 
                : 'Upload your collected school building or campus photo directly or paste an image URL. It will instantly appear as the hero banner background.'}
            </p>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                {lang === 'bn' ? '১. কম্পিউটার/ফোন থেকে ছবি আপলোড করুন:' : '1. Upload picture from device:'}
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-lg p-4 cursor-pointer bg-slate-800/40 transition">
                <Upload className="w-7 h-7 text-emerald-400 mb-1" />
                <span className="text-xs text-slate-300 font-medium">
                  {lang === 'bn' ? 'ফাইল নির্বাচন করুন (JPG / PNG)' : 'Select image file (JPG / PNG)'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="shrink-0 px-2 text-[11px] text-slate-500 uppercase">
                  {lang === 'bn' ? 'অথবা লিঙ্ক ব্যবহার করুন' : 'Or Image URL'}
                </span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/school-building.jpg"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleSetUrl}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {lang === 'bn' ? 'সংরক্ষণ' : 'Save'}
                </button>
              </div>

              {coverImage && (
                <div className="pt-2">
                  <button
                    onClick={handleResetToDefault}
                    className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer"
                  >
                    {lang === 'bn' ? 'ডিফল্ট থিম ও লোগো গ্রাফিকে ফিরে যান' : 'Reset to default theme graphic'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 cursor-pointer"
              >
                {lang === 'bn' ? 'বাতিল' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
