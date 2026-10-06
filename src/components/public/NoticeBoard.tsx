import React, { useState } from 'react';
import { Notice } from '../../types';
import { 
  FileText, 
  Search, 
  Calendar, 
  Download, 
  Pin, 
  Filter, 
  ArrowRight,
  Printer,
  X,
  User
} from 'lucide-react';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { SchoolLogo } from '../common/SchoolLogo';

interface NoticeBoardProps {
  notices: Notice[];
  lang: 'bn' | 'en';
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const categories = ['ALL', 'Academic', 'Exam', 'Administrative', 'Routine'];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.contentBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 py-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              {lang === 'bn' ? 'অফিসিয়াল ডিজিটাল নোটিশ বোর্ড' : 'Official Digital Notice Board'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'bn' ? 'প্রাতিষ্ঠানিক বিজ্ঞপ্তি ও সার্কুলার' : 'Institutional Announcements & Circulars'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'পরীক্ষার সময়সূচি, ভর্তি সংক্রান্ত বিজ্ঞপ্তি ও শিক্ষা মন্ত্রণালয়ের জরুরি নির্দেশনা।'
                : 'Official academic circulars, exam schedules, and statutory directives.'}
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? (lang === 'bn' ? 'সকল নোটিশ' : 'All') : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'নোটিশ খুঁজুন...' : 'Search circulars...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setActiveNoticeModal(notice)}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${
                  notice.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  <FileText className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {notice.isFeatured && (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" /> {notice.publishedAt}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition">
                    {lang === 'bn' ? notice.titleBn : notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {lang === 'bn' ? notice.contentBn : notice.content}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition flex items-center gap-1">
                  {lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Notice'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-500">
              {lang === 'bn' ? 'কোনো নোটিশ পাওয়া যায়নি।' : 'No circulars match this search criteria.'}
            </p>
          </div>
        )}
      </div>

      {/* Notice Detail Reader Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            
            <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {lang === 'bn' ? 'প্রাতিষ্ঠানিক নোটিশ বিবরণ' : 'Notice Reader'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                  title="Print Notice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveNoticeModal(null)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Header Letterhead */}
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <SchoolLogo size={60} variant="emerald" />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {SCHOOL_INFO.nameBn}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {SCHOOL_INFO.nameEn} • EIIN: {SCHOOL_INFO.eiin}
                  </p>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Category: {activeNoticeModal.category}
                  </span>
                  <span>Published: {activeNoticeModal.publishedAt}</span>
                  <span>Authority: {activeNoticeModal.author}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {lang === 'bn' ? activeNoticeModal.titleBn : activeNoticeModal.title}
                </h2>
              </div>

              {/* Full Content */}
              <div className="text-sm text-slate-800 leading-relaxed space-y-4 whitespace-pre-line bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans">
                <p>{lang === 'bn' ? activeNoticeModal.contentBn : activeNoticeModal.content}</p>
                <p className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                  {lang === 'bn' ? activeNoticeModal.content : activeNoticeModal.contentBn}
                </p>
              </div>

              {/* Attachment if present */}
              {activeNoticeModal.pdfAttachment && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Download className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-slate-800 truncate">
                      {activeNoticeModal.pdfAttachment}
                    </span>
                  </div>
                  <span className="font-mono text-emerald-800 text-[11px] bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Verified Circular PDF
                  </span>
                </div>
              )}

              {/* Signoff */}
              <div className="pt-4 flex justify-between items-end text-xs text-slate-600 border-t border-slate-200">
                <span>Ref: HSAHS/Notice/{new Date().getFullYear()}</span>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{activeNoticeModal.author}</p>
                  <p className="text-[11px]">Harin Singha Adarsha High School</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
