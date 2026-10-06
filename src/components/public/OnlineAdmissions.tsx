import React, { useState } from 'react';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { AdmissionApplication } from '../../types';
import { appStorage } from '../../lib/storage';
import { SchoolLogo } from '../common/SchoolLogo';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  Printer, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  School, 
  Award, 
  ShieldCheck, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface OnlineAdmissionsProps {
  lang: 'bn' | 'en';
}

export const OnlineAdmissions: React.FC<OnlineAdmissionsProps> = ({ lang }) => {
  const [targetClass, setTargetClass] = useState<number>(6);
  const [targetGroup, setTargetGroup] = useState<'General' | 'Science' | 'Humanities' | 'Business Studies'>('General');
  const [applicantName, setApplicantName] = useState('');
  const [applicantNameBn, setApplicantNameBn] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dob, setDob] = useState('2014-01-01');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [guardianMobile, setGuardianMobile] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [previousGpa, setPreviousGpa] = useState<number>(5.0);
  const [quotaCategory, setQuotaCategory] = useState<'General' | 'Freedom Fighter' | 'Disability' | 'Catchment Area'>('General');

  const [submittedApplication, setSubmittedApplication] = useState<AdmissionApplication | null>(null);

  // Quotas calculations
  const class6Seats = SCHOOL_INFO.seatQuotas[6];
  const class6Enrolled = SCHOOL_INFO.currentEnrolledCounts[6];
  const class9SciSeats = SCHOOL_INFO.seatQuotas['9-Science'];
  const class9SciEnrolled = SCHOOL_INFO.currentEnrolledCounts['9-Science'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!applicantName.trim() || !guardianMobile.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে শিক্ষার্থীর নাম ও অভিভাবকের মোবাইল নম্বর দিন।' : 'Please enter applicant name and guardian phone.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const token = `ADM-2027-${targetClass}0${randomNum}`;

    const newApp: AdmissionApplication = {
      id: 'adm-' + Date.now(),
      applicationToken: token,
      applicantName,
      applicantNameBn: applicantNameBn || applicantName,
      appliedClass: targetClass,
      appliedGroup: targetGroup,
      gender,
      dob,
      fatherName,
      motherName,
      guardianMobile,
      previousSchool: previousSchool || 'Primary School, Gaibandha',
      previousPecOrJscGpa: Number(previousGpa) || 5.0,
      quotaCategory,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
    };

    // Save to storage
    const allAdmissions = appStorage.getAdmissions();
    const updated = [newApp, ...allAdmissions];
    appStorage.saveAdmissions(updated);

    setSubmittedApplication(newApp);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? '২০২৭ শিক্ষাবর্ষে ডিজিটাল ভর্তি কার্যক্রম' : 'Academic Session 2027 Admission Circular'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {lang === 'bn' ? 'অনলাইন ভর্তি আবেদন ও প্রবেশপত্র সংগ্রহ' : 'Online Admission Application Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {lang === 'bn'
              ? 'দিনাজপুর শিক্ষা বোর্ডের আওতাধীন হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়ে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে সরকারি ভর্তি নীতিমালা অনুসরণ করে অনলাইনে আবেদন গ্রহণ করা হচ্ছে। আবেদন সম্পন্ন হলে তাৎক্ষণিক ডিজিটাল প্রবেশপত্র ও টোকেন স্লিপ প্রিন্ট করুন।'
              : 'Official admission intake for Classes 6 through 9 under Dinajpur Education Board. Instant token generation adhering to authorized class enrollment quotas.'}
          </p>
        </div>

        {/* Quota Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/60">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[11px] text-emerald-300 block">Class 6 (৬ষ্ঠ শ্রেণি)</span>
            <span className="text-lg font-bold">{class6Seats} {lang === 'bn' ? 'আসন' : 'Seats'}</span>
            <span className="text-[10px] text-slate-400 block">{class6Seats - class6Enrolled} seats available</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[11px] text-emerald-300 block">Class 7 (৭ম শ্রেণি)</span>
            <span className="text-lg font-bold">{SCHOOL_INFO.seatQuotas[7]} {lang === 'bn' ? 'আসন' : 'Seats'}</span>
            <span className="text-[10px] text-slate-400 block">Transfer vacancies</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[11px] text-emerald-300 block">Class 8 (৮ম শ্রেণি)</span>
            <span className="text-lg font-bold">{SCHOOL_INFO.seatQuotas[8]} {lang === 'bn' ? 'আসন' : 'Seats'}</span>
            <span className="text-[10px] text-slate-400 block">Transfer vacancies</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[11px] text-emerald-300 block">Class 9 Science (৯ম বিজ্ঞান)</span>
            <span className="text-lg font-bold">{class9SciSeats} {lang === 'bn' ? 'আসন' : 'Seats'}</span>
            <span className="text-[10px] text-slate-400 block">{class9SciSeats - class9SciEnrolled} seats available</span>
          </div>
        </div>
      </div>

      {submittedApplication ? (
        /* Success Admit Token / Printable Application Slip */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {lang === 'bn' ? 'ভর্তি আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Admission Application Submitted!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'bn' ? 'আপনার আবেদন টোকেন ও প্রবেশপত্র প্রিন্ট করে সংরক্ষণ করুন' : 'Print and keep this official admit token slip'}
                </p>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রবেশপত্র প্রিন্ট করুন' : 'Print Admit Token'}</span>
            </button>
          </div>

          {/* Printable Official Admit Card Box */}
          <div className="p-6 bg-slate-50 border-2 border-dashed border-emerald-600 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div className="flex items-center gap-3">
                <SchoolLogo size={48} variant="emerald" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {SCHOOL_INFO.villageBn}, {SCHOOL_INFO.upazilaBn}, {SCHOOL_INFO.districtBn} • EIIN: {SCHOOL_INFO.eiin}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Official Token ID</span>
                <span className="text-base font-mono font-extrabold text-emerald-800">
                  {submittedApplication.applicationToken}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Applicant Name:</span>
                <span className="font-bold text-slate-900">{submittedApplication.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Applied Class & Group:</span>
                <span className="font-bold text-emerald-800">Class {submittedApplication.appliedClass} ({submittedApplication.appliedGroup})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Guardian Mobile:</span>
                <span className="font-mono font-bold text-slate-900">{submittedApplication.guardianMobile}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Quota Category:</span>
                <span className="font-semibold text-slate-800">{submittedApplication.quotaCategory}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Father's Name:</span>
                <span className="font-semibold text-slate-900">{submittedApplication.fatherName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mother's Name:</span>
                <span className="font-semibold text-slate-900">{submittedApplication.motherName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Date of Birth:</span>
                <span className="font-mono text-slate-900">{submittedApplication.dob}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Submission Date:</span>
                <span className="font-mono text-slate-900">{submittedApplication.submissionDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-600">
              <span className="italic">
                * Note: Bring this token slip and previous academic certificates on lottery/reporting day.
              </span>
              <span className="font-bold uppercase text-emerald-900">
                Verified by Admission Committee, HSAHS
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setSubmittedApplication(null)}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              + {lang === 'bn' ? 'আরেকটি নতুন আবেদন ফরম পূরণ করুন' : 'Submit Another Admission Application'}
            </button>
          </div>
        </div>
      ) : (
        /* The Application Form */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                {lang === 'bn' ? 'শিক্ষার্থীর ব্যক্তিগত ও প্রাতিষ্ঠানিক তথ্য' : 'Student & Academic Particulars'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'সকল তথ্য সতর্কতার সাথে বাংলা ও ইংরেজিতে পূরণ করুন' : 'Provide exact biographical data as per birth certificate'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Target Class */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'আবেদনকৃত শ্রেণি *' : 'Target Class *'}
                </label>
                <select
                  value={targetClass}
                  onChange={(e) => {
                    const c = Number(e.target.value);
                    setTargetClass(c);
                    if (c < 9) setTargetGroup('General');
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value={6}>Class 6 (৬ষ্ঠ শ্রেণি - ১৩০ আসন)</option>
                  <option value={7}>Class 7 (৭ম শ্রেণি - ১০ আসন)</option>
                  <option value={8}>Class 8 (৮ম শ্রেণি - ১০ আসন)</option>
                  <option value={9}>Class 9 (৯ম শ্রেণি)</option>
                </select>
              </div>

              {/* Group Offering */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'বিভাগ / শাখা' : 'Academic Group'}
                </label>
                <select
                  value={targetGroup}
                  disabled={targetClass < 9}
                  onChange={(e) => setTargetGroup(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                >
                  {targetClass < 9 ? (
                    <option value="General">General (সাধারণ)</option>
                  ) : (
                    <>
                      <option value="Science">Science (বিজ্ঞান বিভাগ - ২৫ আসন)</option>
                      <option value="Humanities">Humanities (মানবিক বিভাগ - ৫ আসন)</option>
                      <option value="Business Studies">Business Studies (ব্যবসায় শিক্ষা - ১৫ আসন)</option>
                    </>
                  )}
                </select>
              </div>

              {/* Quota Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'কোটা ক্যাটাগরি' : 'Quota Category'}
                </label>
                <select
                  value={quotaCategory}
                  onChange={(e) => setQuotaCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="General">General / সাধারণ</option>
                  <option value="Catchment Area">Catchment Area / ক্যাচমেন্ট এলাকা (হরিণ সিংহা ও রহমতপুর)</option>
                  <option value="Freedom Fighter">Freedom Fighter / বীর মুক্তিযোদ্ধা কোটা</option>
                  <option value="Disability">Disability / বিশেষ চাহিদা সম্পন্ন</option>
                </select>
              </div>

              {/* Applicant Name English */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম (ইংরেজি ক্যাপিটাল) *' : 'Applicant Full Name (English) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MOHAMMAD TANVIR ISLAM"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Applicant Name Bangla */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম (বাংলায়)' : 'Applicant Full Name (Bangla)'}
                </label>
                <input
                  type="text"
                  placeholder="যেমন: মোহাম্মদ তানভীর ইসলাম"
                  value={applicantNameBn}
                  onChange={(e) => setApplicantNameBn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'লিঙ্গ *' : 'Gender *'}
                </label>
                <div className="flex gap-4 pt-1">
                  <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'Male'}
                      onChange={() => setGender('Male')}
                      className="text-emerald-600"
                    />
                    <span>{lang === 'bn' ? 'ছাত্র (Male)' : 'Male'}</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'Female'}
                      onChange={() => setGender('Female')}
                      className="text-emerald-600"
                    />
                    <span>{lang === 'bn' ? 'ছাত্রী (Female)' : 'Female'}</span>
                  </label>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'জন্ম তারিখ *' : 'Date of Birth *'}
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'পিতার নাম' : "Father's Name"}
                </label>
                <input
                  type="text"
                  placeholder="Father's full name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Mother Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'মাতার নাম' : "Mother's Name"}
                </label>
                <input
                  type="text"
                  placeholder="Mother's full name"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Guardian Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'অভিভাবকের সক্রিয় মোবাইল নম্বর *' : 'Guardian Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+88017XXXXXXXX"
                  value={guardianMobile}
                  onChange={(e) => setGuardianMobile(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Previous School */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'পূর্ববর্তী প্রাথমিক/বিদ্যালয়ের নাম' : 'Previous School Name'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Harin Singha Govt Primary School"
                  value={previousSchool}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Previous GPA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'পূর্ববর্তী সমাপনী জিপিএ (PEC / JSC)' : 'Previous Terminal GPA'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="5"
                  value={previousGpa}
                  onChange={(e) => setPreviousGpa(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'bn' 
                    ? 'আবেদন জমার পর কোনো ফি দিতে হবে না। টোকেনটি নিয়ে নির্ধারিত তারিখে বিদ্যালয় ক্যাম্পাসে উপস্থিত হবেন।' 
                    : 'Instant free submission. Bring generated token copy during admissions verification.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-md shadow-emerald-900/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ভর্তি আবেদন দাখিল ও প্রবেশপত্র গ্রহণ' : 'Submit Application & Get Admit Token'}</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
