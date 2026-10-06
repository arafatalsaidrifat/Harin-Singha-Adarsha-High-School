import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_TEACHERS, SCHOOL_INFO } from '../../lib/mock-data';
import { Users, Search, Phone, Mail, GraduationCap, BookOpen, ShieldCheck, Award, Sprout, Dumbbell, ArrowRight } from 'lucide-react';

interface FacultyDirectoryProps {
  lang: 'bn' | 'en';
}

export const FacultyDirectory: React.FC<FacultyDirectoryProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const father = INITIAL_TEACHERS.find((teacher) => teacher.id === 'teacher-sajedur');
  const otherTeachers = INITIAL_TEACHERS.filter((teacher) => teacher.id !== 'teacher-sajedur');

  const filtered = INITIAL_TEACHERS.filter((teacher) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      teacher.name.toLowerCase().includes(q) ||
      teacher.nameBn.toLowerCase().includes(q) ||
      teacher.subjectSpecialty.toLowerCase().includes(q) ||
      teacher.designation.toLowerCase().includes(q) ||
      teacher.indexNumber.toLowerCase().includes(q)
    );
  });

  const renderTeacherCard = (teacher: typeof INITIAL_TEACHERS[number], index: number) => (
    <motion.article
      key={teacher.id}
      className="soft-card overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, delay: index * 0.045 }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-start gap-4 p-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
          <span className="text-sm font-black text-emerald-900">{teacher.nameBn.slice(0, 2)}</span>
        </div>
        <div className="min-w-0">
          <span className="text-[9px] font-black uppercase tracking-[.14em] text-[var(--brand-600)]">
            {teacher.designation}
          </span>
          <h3 className="mt-1 truncate text-sm font-black text-[var(--brand-950)]">
            {lang === 'bn' ? teacher.nameBn : teacher.name}
          </h3>
          <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
            {lang === 'bn' ? teacher.subjectSpecialtyBn : teacher.subjectSpecialty}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4">
        <div className="grid gap-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[var(--brand-700)]" />
            <span className="truncate">{teacher.educationalQualification}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-amber-600" />
            <span className="truncate">{teacher.assignedClasses.length ? teacher.assignedClasses.map((c) => `Class ${c}`).join(', ') : (lang === 'bn' ? 'দায়িত্ব তথ্য পরে যুক্ত হবে' : 'Assignment details to be added')}</span>
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="font-mono text-[9px] text-slate-400">Index: {teacher.indexNumber}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-[var(--brand-700)]">{teacher.mpoStatus}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );

  return (
    <div className="space-y-8 py-3">
      <section className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white shadow-[0_20px_60px_rgba(7,59,42,.08)]">
        <div className="relative overflow-hidden bg-[var(--brand-950)] px-6 py-8 text-white sm:px-8 lg:px-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[.16em] text-emerald-300">
                {lang === 'bn' ? 'অনুষদ · শিক্ষক · প্রশাসন' : 'Faculty · teaching · administration'}
              </span>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {lang === 'bn' ? 'শিক্ষক ও কর্মচারী পরিচিতি' : 'Faculty & Academic Staff'}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                {lang === 'bn'
                  ? 'প্রতিষ্ঠানের শিক্ষকবৃন্দ, বিষয়ভিত্তিক দায়িত্ব ও প্রাতিষ্ঠানিক পরিচিতি—একটি নির্ভরযোগ্য ডিজিটাল ডিরেক্টরিতে।'
                  : 'Teaching profiles, subject responsibilities and institutional identity in one dependable digital directory.'}
              </p>
            </div>
            <div className="relative">
              <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3 backdrop-blur">
                <Users className="h-5 w-5 text-emerald-300" />
                <div>
                  <span className="block text-xl font-black">{INITIAL_TEACHERS.length}</span>
                  <span className="block text-[9px] text-white/45">{lang === 'bn' ? 'নিবন্ধিত শিক্ষক' : 'Listed faculty'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-100 bg-slate-50/75 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'নাম, বিষয় বা পদবী দিয়ে খুঁজুন...' : 'Search by name, subject or designation...'}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-xs text-slate-700 outline-none transition focus:border-emerald-300"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            EIIN {SCHOOL_INFO.eiin}
            <span>·</span>
            MPO {SCHOOL_INFO.mpoCode}
          </div>
        </div>
      </section>

      {father && !searchQuery && (
        <motion.section
          className="overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white shadow-[0_20px_70px_rgba(7,59,42,.10)]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .55 }}
        >
          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative min-h-[340px] overflow-hidden bg-[var(--brand-950)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(25,184,131,.25),transparent_38%),linear-gradient(150deg,#06261c,#0b5a3f)]" />
              <div className="absolute -bottom-20 -right-8 text-white/10">
                <Sprout className="h-56 w-56" />
              </div>
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[.16em] text-emerald-200">Faculty spotlight</span>
                  <p className="mt-1 text-xs font-bold text-white/55">{lang === 'bn' ? 'বিশেষ শিক্ষক পরিচিতি' : 'Featured teacher profile'}</p>
                </div>
                <div className="mx-auto mt-6 w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur">
                  <img
                    src={father.avatarUrl}
                    alt={father.name}
                    className="aspect-[3/4] w-full rounded-[1.5rem] object-cover object-top"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-[var(--brand-700)]">{father.designation}</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-amber-700">Agriculture + Physical Education</span>
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--brand-950)] sm:text-4xl">
                  {lang === 'bn' ? father.nameBn : father.name}
                </h2>
                <p className="mt-2 text-base font-bold text-[var(--brand-700)]">
                  {lang === 'bn' ? father.designationBn : father.designation}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <Sprout className="h-5 w-5 text-emerald-700" />
                    <span className="mt-3 block text-[10px] font-black uppercase tracking-[.1em] text-emerald-800/65">Subject 01</span>
                    <p className="mt-1 text-sm font-black text-[var(--brand-950)]">{lang === 'bn' ? 'কৃষি শিক্ষা' : 'Agriculture Studies'}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{father.subjectSpecialty}</p>
                  </div>
                  <div className="rounded-2xl bg-sky-50 p-4">
                    <Dumbbell className="h-5 w-5 text-sky-700" />
                    <span className="mt-3 block text-[10px] font-black uppercase tracking-[.1em] text-sky-800/65">Subject 02</span>
                    <p className="mt-1 text-sm font-black text-[var(--brand-950)]">{lang === 'bn' ? 'শারীরিক শিক্ষা' : 'Physical Education'}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{lang === 'bn' ? father.subjectSpecialtyBn : father.subjectSpecialty}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                    <Award className="h-4 w-4 text-amber-600" />
                    {lang === 'bn' ? 'প্রাতিষ্ঠানিক পরিচয়' : 'Institutional profile'}
                  </div>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {lang === 'bn'
                      ? 'হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়ের সহকারী শিক্ষক হিসেবে কৃষি শিক্ষা ও শারীরিক শিক্ষা বিষয়ে দায়িত্ব পালন করেন।'
                      : 'Assistant Teacher at Harin Singha Adarsha High School, responsible for Agriculture Studies and Physical Education.'}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black text-[var(--brand-700)]">{lang === 'bn' ? 'এমপিওভুক্ত' : father.mpoStatus}</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400">
                  {lang === 'bn' ? 'অন্যান্য শিক্ষকদের ছবি পরে যুক্ত হবে' : 'Other faculty photos can be added later'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">{lang === 'bn' ? 'অন্যান্য শিক্ষকবৃন্দ' : 'Teaching team'}</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--brand-950)]">{lang === 'bn' ? 'একই ডিজাইনে পুরো অনুষদ' : 'The wider teaching team'}</h2>
          </div>
          <span className="text-[10px] font-semibold text-slate-400">{filtered.length} {lang === 'bn' ? 'জন মেলেছে' : 'profiles matching'}</span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(searchQuery ? filtered : otherTeachers).map((teacher, index) => renderTeacherCard(teacher, index))}
        </div>
      </section>
    </div>
  );
};

export default FacultyDirectory;
