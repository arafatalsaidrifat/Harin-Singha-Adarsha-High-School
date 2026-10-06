import React, { useState } from 'react';
import { INITIAL_TEACHERS, SCHOOL_INFO } from '../../lib/mock-data';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface FacultyDirectoryProps {
  lang: 'bn' | 'en';
}

export const FacultyDirectory: React.FC<FacultyDirectoryProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = INITIAL_TEACHERS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjectSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.indexNumber.includes(searchQuery)
  );

  return (
    <div className="space-y-8 py-3">
      
      {/* Header Card */}
      <div className="soft-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'এমপিও ইনডেক্সধারী শিক্ষক ও কর্মকর্তা তালিকা' : 'MPO Indexed Faculty & Administration'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'bn' ? 'শিক্ষক ও কর্মচারী পরিচিতি' : 'Faculty & Academic Staff Directory'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'দিনাজপুর শিক্ষা বোর্ড ও মাউশি অনুমোদিত শিক্ষকবৃন্দের জীবনবৃত্তান্ত, এমপিও কোড ও বিষয়ভিত্তিক দায়িত্ব।'
                : 'Verified teaching staff directory including MPO index numbers, designations, and contacts.'}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'শিক্ষক বা বিষয় খুঁজুন...' : 'Search teacher or subject...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((teacher) => (
          <div
            key={teacher.id}
            className="soft-card p-6 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-800 to-emerald-500 text-base font-black text-white shadow-md border border-emerald-300/20">{teacher.nameBn.slice(0, 2)}</div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full inline-block">
                  Index: {teacher.indexNumber}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight mt-1 truncate">
                  {lang === 'bn' ? teacher.nameBn : teacher.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-700">
                  {lang === 'bn' ? teacher.designationBn : teacher.designation}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {lang === 'bn' ? teacher.subjectSpecialtyBn : teacher.subjectSpecialty}
                </p>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{teacher.educationalQualification}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href={`tel:${teacher.mobile}`} className="hover:text-slate-900">
                  {teacher.mobile}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                <a href={`mailto:${teacher.email}`} className="truncate hover:text-slate-900">
                  {teacher.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate text-slate-700 font-medium">
                  Classes: {teacher.assignedClasses.map((c) => `Class ${c}`).join(', ')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Joined: {teacher.joiningDate}</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {teacher.mpoStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
