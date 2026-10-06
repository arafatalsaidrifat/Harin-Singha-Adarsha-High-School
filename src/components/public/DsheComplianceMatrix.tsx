import React, { useState } from 'react';
import { 
  DSHE_COMPLIANCE_CATEGORIES, 
  MANAGING_COMMITTEE, 
  CITIZEN_CHARTER, 
  SCHOOL_INFO, 
  INITIAL_TEACHERS 
} from '../../lib/mock-data';
import { SchoolLogo } from '../common/SchoolLogo';
import { 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Printer, 
  FileText, 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

interface DsheComplianceMatrixProps {
  lang: 'bn' | 'en';
}

export const DsheComplianceMatrix: React.FC<DsheComplianceMatrixProps> = ({ lang }) => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(DSHE_COMPLIANCE_CATEGORIES[0].key);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = DSHE_COMPLIANCE_CATEGORIES.find((c) => c.key === selectedCategoryKey) || DSHE_COMPLIANCE_CATEGORIES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {lang === 'bn' ? 'মাউশি সংবিধিবদ্ধ কমপ্লায়েন্স' : 'DSHE Statutory Directive'}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-mono font-bold px-2.5 py-1 rounded-full">
                EIIN: {SCHOOL_INFO.eiin}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'bn' 
                ? 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (মাউশি) ১১ দফা তথ্য বাতায়ন' 
                : 'DSHE 11-Point Institutional Compliance & Transparency Portal'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {lang === 'bn'
                ? 'শিক্ষা মন্ত্রণালয় ও মাউশি নির্দেশনা মোতাবেক অত্র বিদ্যালয়ের ইএমআইএস ও আইএমএস যাচাইকরণে প্রয়োজনীয় ১১ দফা সংবিধিবদ্ধ প্রাতিষ্ঠানিক তথ্যসমূহ জনসাধারণের পরিদর্শন ও সরকারি নিরীক্ষার জন্য উন্মুক্ত করা হলো।'
                : 'Pursuant to operational directives by the Directorate of Secondary and Higher Education (DSHE) and Ministry of Education, this unified transparency matrix renders all 11 statutory categories for EMIS audit and public verification.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'bn' ? 'অডিট রিপোর্ট প্রিন্ট করুন' : 'Print / Export Audit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 11 Categories Navigation & Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 11 Mandated Category Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-slate-100/80 p-2 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{lang === 'bn' ? 'সংবিধিবদ্ধ ১১ দফা সূচি' : '11 Statutory Categories'}</span>
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px]">11/11</span>
          </div>

          <div className="space-y-1.5">
            {DSHE_COMPLIANCE_CATEGORIES.map((cat) => {
              const isSelected = cat.key === activeCategory.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategoryKey(cat.key)}
                  className={`w-full text-left p-3.5 rounded-xl transition flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-md font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-white text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {cat.number}
                    </span>
                    <span className="text-xs sm:text-sm line-clamp-1">
                      {lang === 'bn' ? cat.titleBn : cat.titleEn}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition ${isSelected ? 'text-white translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Category In-Depth Records */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Category Title & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  DSHE STATUTORY REQUIREMENT #{activeCategory.number}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {lang === 'bn' ? activeCategory.titleBn : activeCategory.titleEn}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn' ? activeCategory.summaryBn : activeCategory.summaryEn}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {lang === 'bn' ? 'যাচাইকৃত ডাটা' : 'EMIS Verified'}
              </span>
            </div>

            {/* Standard Key-Value Data Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCategory.dataItems.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      {lang === 'bn' ? item.labelBn : item.labelEn}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-extrabold text-slate-900">
                    {lang === 'bn' ? item.valueBn : item.valueEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Special Section: Citizen Charter Detailed Table if on category 8 */}
            {activeCategory.key === 'citizen-charter' && (
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  {lang === 'bn' ? 'অনুমোদিত নাগরিক সনদ (সিটিজেন চার্টার তালিকা)' : 'Approved Citizen Charter Commitments'}
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">{lang === 'bn' ? 'সেবার নাম' : 'Service Name'}</th>
                        <th className="p-3">{lang === 'bn' ? 'নিষ্পত্তির সময়সীমা' : 'Time Limit'}</th>
                        <th className="p-3">{lang === 'bn' ? 'নির্ধারিত ফি' : 'Fee'}</th>
                        <th className="p-3">{lang === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্মকর্তা' : 'Officer'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {CITIZEN_CHARTER.map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                          <td className="p-3 font-semibold text-slate-900">
                            {lang === 'bn' ? service.serviceNameBn : service.serviceNameEn}
                          </td>
                          <td className="p-3 text-emerald-700 font-bold">
                            {lang === 'bn' ? service.timeLimitBn : service.timeLimitEn}
                          </td>
                          <td className="p-3 font-mono">
                            {lang === 'bn' ? service.feeBn : service.feeEn}
                          </td>
                          <td className="p-3 text-slate-600">
                            {service.officerEn}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Special Section: Managing Committee Table if on category 10 */}
            {activeCategory.key === 'managing-committee' && (
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {lang === 'bn' ? 'বিদ্যালয় পরিচালনা পর্ষদের সদস্য তালিকা' : 'Managing Committee Members Roster'}
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{lang === 'bn' ? 'সদস্যের নাম' : 'Member Name'}</th>
                        <th className="p-3">{lang === 'bn' ? 'পদবি' : 'Designation'}</th>
                        <th className="p-3">{lang === 'bn' ? 'মেয়াদ' : 'Tenure'}</th>
                        <th className="p-3">{lang === 'bn' ? 'যোগাযোগ' : 'Mobile'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {MANAGING_COMMITTEE.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">
                            {lang === 'bn' ? m.nameBn : m.name}
                          </td>
                          <td className="p-3 text-emerald-800 font-semibold">{m.designation}</td>
                          <td className="p-3 font-mono text-slate-600">{m.tenure}</td>
                          <td className="p-3 font-mono text-slate-600">{m.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Special Section: Faculty Directory if on category 11 */}
            {activeCategory.key === 'faculty-directory' && (
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  {lang === 'bn' ? 'এমপিও ইনডেক্সধারী শিক্ষক ও কর্মচারী তালিকা' : 'Indexed Teaching & Staff Roster'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INITIAL_TEACHERS.map((teacher) => (
                    <div key={teacher.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-3">
                      <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-800 to-emerald-500 text-base font-black text-white shadow-md border border-emerald-300/20">{teacher.nameBn.slice(0, 2)}</div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-bold text-slate-900 truncate">
                          {lang === 'bn' ? teacher.nameBn : teacher.name}
                        </p>
                        <p className="text-emerald-700 font-medium">
                          {lang === 'bn' ? teacher.designationBn : teacher.designation}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          MPO Index: {teacher.indexNumber}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Attachments & Downloadable PDF Orders */}
            {activeCategory.pdfDocuments && activeCategory.pdfDocuments.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bn' ? 'সংযুক্ত সরকারি আদেশ ও গেজেট কপি:' : 'Attached Board Orders & Circulars:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategory.pdfDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between text-xs hover:bg-emerald-50 transition"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800 shrink-0">
                        {doc.fileSize}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
