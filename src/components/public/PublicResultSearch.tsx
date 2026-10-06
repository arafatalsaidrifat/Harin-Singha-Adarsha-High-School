import React, { useState } from 'react';
import { appStorage } from '../../lib/storage';
import { StudentExamResult } from '../../types';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { SchoolLogo } from '../common/SchoolLogo';
import { 
  Search, 
  Award, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  User, 
  Sparkles,
  Download
} from 'lucide-react';

interface PublicResultSearchProps {
  lang: 'bn' | 'en';
}

export const PublicResultSearch: React.FC<PublicResultSearchProps> = ({ lang }) => {
  const [selectedClass, setSelectedClass] = useState<number>(6);
  const [inputRoll, setInputRoll] = useState<number>(1);
  const [selectedExamId, setSelectedExamId] = useState<string>('exam-2026-annual');
  const [searchedResult, setSearchedResult] = useState<StudentExamResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const exams = appStorage.getExams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const allResults = appStorage.getResults();
    const found = allResults.find(
      (r) =>
        r.classLevel === Number(selectedClass) &&
        r.rollNumber === Number(inputRoll) &&
        r.examId === selectedExamId
    );

    setSearchedResult(found || null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'দিনাজপুর শিক্ষা বোর্ড ও এনসিটিবি গ্রেডিং' : 'Dinajpur Board & NCTB Standard'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {lang === 'bn' ? 'অনলাইন ফলাফল ও একাডেমিক ট্রান্সক্রিপ্ট' : 'Student Examination Results & Official Transcript'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'শ্রেণি ও রোল নম্বর দিয়ে বার্ষিক ও টার্মিনাল পরীক্ষার গ্রেড শিট অনুসন্ধান ও মুদ্রণ করুন।'
                : 'Lookup term-wise academic performance and download official report cards.'}
            </p>
          </div>
        </div>

        {/* Search Query Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'পরীক্ষা নির্বাচন করুন' : 'Examination Term'}
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {lang === 'bn' ? ex.titleBn : ex.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'শ্রেণি' : 'Class'}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value={6}>Class 6 (৬ষ্ঠ শ্রেণি)</option>
              <option value={7}>Class 7 (৭ম শ্রেণি)</option>
              <option value={8}>Class 8 (৮ম শ্রেণি)</option>
              <option value={9}>Class 9 (৯ম শ্রেণি)</option>
              <option value={10}>Class 10 (১০ম শ্রেণি)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'রোল নম্বর' : 'Roll Number'}
            </label>
            <input
              type="number"
              min="1"
              required
              value={inputRoll}
              onChange={(e) => setInputRoll(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ফলাফল অনুসন্ধান' : 'Search Result'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Result Display Box */}
      {hasSearched && (
        searchedResult ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {lang === 'bn' ? 'ট্রান্সক্রিপ্ট প্রিন্ট ভিউ' : 'Official Academic Transcript'}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified Result
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bn' ? 'মার্কশিট প্রিন্ট / সেভ (PDF)' : 'Print / Save as PDF'}</span>
              </button>
            </div>

            {/* Official Bangladesh Education Board Printable Transcript Layout */}
            <div className="p-6 sm:p-8 border-2 border-slate-800 rounded-2xl bg-white space-y-6">
              
              {/* Transcript Header with School Seal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-900 pb-5 text-center sm:text-left">
                <div className="shrink-0">
                  <SchoolLogo size={90} variant="emerald" />
                </div>

                <div className="flex-1 space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {SCHOOL_INFO.nameBn}
                  </h2>
                  <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide">
                    {SCHOOL_INFO.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {SCHOOL_INFO.villageBn}, {SCHOOL_INFO.upazilaBn}, {SCHOOL_INFO.districtBn} • EIIN: {SCHOOL_INFO.eiin} • MPO: {SCHOOL_INFO.mpoCode}
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    দিনাজপুর শিক্ষা বোর্ড অনুমোদিত • বার্ষিক একাডেমিক ট্রান্সক্রিপ্ট ও নম্বরপত্র
                  </p>
                </div>

                {/* Dinajpur Board Scale Table Mini */}
                <div className="border border-slate-300 rounded p-1.5 text-[9px] font-mono text-left hidden lg:block shrink-0 bg-slate-50">
                  <div className="font-bold border-b border-slate-300 pb-0.5 mb-0.5">NCTB Grading Scale</div>
                  <div>80-100: A+ (5.00)</div>
                  <div>70-79: A (4.00)</div>
                  <div>60-69: A- (3.50)</div>
                  <div>50-59: B (3.00)</div>
                  <div>40-49: C (2.00)</div>
                  <div>33-39: D (1.00)</div>
                  <div>00-32: F (0.00)</div>
                </div>
              </div>

              {/* Student Bio-data Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Student's Name:</span>
                  <span className="font-extrabold text-slate-900">{searchedResult.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class & Section:</span>
                  <span className="font-bold text-slate-900">Class {searchedResult.classLevel} (Section {searchedResult.section})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class Roll Number:</span>
                  <span className="font-mono font-bold text-slate-900">Roll #{searchedResult.rollNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Academic Session:</span>
                  <span className="font-mono font-bold text-slate-900">{searchedResult.sessionYear}</span>
                </div>
              </div>

              {/* Summary Grade Banner */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                searchedResult.hasFailed
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-center gap-3">
                  {searchedResult.hasFailed ? (
                    <XCircle className="w-8 h-8 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  )}
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-600 block">Overall Performance:</span>
                    <span className="text-lg font-black">
                      {searchedResult.hasFailed ? 'Result: Failed (অকৃতকার্য)' : `Result: Passed (${searchedResult.remarks})`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">GPA (Scale 5.00)</span>
                    <span className="text-2xl font-black font-mono text-emerald-700">
                      {searchedResult.gpa.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Letter Grade</span>
                    <span className="text-2xl font-black text-emerald-800">
                      {searchedResult.letterGrade}
                    </span>
                  </div>
                  {searchedResult.meritPosition && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Merit Position</span>
                      <span className="text-2xl font-black text-amber-600">
                        #{searchedResult.meritPosition}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject-wise Marks Table */}
              <div className="overflow-x-auto border border-slate-300 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Subject Name</th>
                      <th className="p-2.5 text-center">Written</th>
                      <th className="p-2.5 text-center">MCQ</th>
                      <th className="p-2.5 text-center">Practical</th>
                      <th className="p-2.5 text-center">Total Marks</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5 text-center">GP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {searchedResult.marks.map((m, idx) => (
                      <tr key={idx} className={m.isOptional ? 'bg-amber-50/40' : ''}>
                        <td className="p-2.5 font-mono text-slate-500">{m.subjectCode}</td>
                        <td className="p-2.5 font-bold text-slate-900">
                          {m.subjectName}
                          {m.isOptional && (
                            <span className="ml-1 text-[10px] text-amber-800 bg-amber-100 px-1 rounded font-medium">
                              (Optional 4th)
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 text-center font-mono">{m.writtenMarks}</td>
                        <td className="p-2.5 text-center font-mono">{m.mcqMarks}</td>
                        <td className="p-2.5 text-center font-mono">{m.practicalMarks}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-slate-900">{m.totalMarks}</td>
                        <td className="p-2.5 text-center font-bold">
                          <span className={`px-2 py-0.5 rounded text-[11px] ${
                            m.letterGrade === 'F' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {m.letterGrade}
                          </span>
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-slate-900">
                          {m.gradePoint.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t border-slate-300 text-xs">
                    <tr>
                      <td colSpan={5} className="p-2.5 text-right font-extrabold text-slate-700">
                        Total Marks Obtained:
                      </td>
                      <td className="p-2.5 text-center font-mono font-black text-slate-900">
                        {searchedResult.totalMarksObtained}
                      </td>
                      <td colSpan={2} className="p-2.5 text-right font-mono text-emerald-800">
                        4th Sub Bonus: +{searchedResult.fourthSubjectBonus.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Signatures & Verification footer */}
              <div className="pt-10 grid grid-cols-3 gap-6 text-center text-xs text-slate-700">
                <div className="border-t border-slate-400 pt-2">
                  <p className="font-bold">Class Teacher</p>
                  <p className="text-[10px] text-slate-500">শ্রেণি শিক্ষক</p>
                </div>
                <div className="border-t border-slate-400 pt-2">
                  <p className="font-bold">Exam Controller</p>
                  <p className="text-[10px] text-slate-500">পরীক্ষা নিয়ন্ত্রক</p>
                </div>
                <div className="border-t border-slate-400 pt-2">
                  <p className="font-bold">Headmaster</p>
                  <p className="text-[10px] text-slate-500">প্রধান শিক্ষক ও সিল</p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <XCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No Examination Record Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {lang === 'bn'
                ? `শ্রেণি ${selectedClass}, রোল ${inputRoll} এর জন্য এই পরীক্ষার ফলাফল এখনো প্রকাশিত হয়নি বা ডাটাবেজে এন্ট্রি করা হয়নি।`
                : `No published records for Class ${selectedClass}, Roll ${inputRoll} in ${selectedExamId}.`}
            </p>
          </div>
        )
      )}

    </div>
  );
};
