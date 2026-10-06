import React, { useState } from 'react';
import { User, TeacherProfile, Subject, StudentProfile, StudentExamResult } from '../../types';
import { appStorage } from '../../lib/storage';
import { INITIAL_TEACHERS, CLASS_ROUTINES } from '../../lib/mock-data';
import { getGradeAndPoint } from '../../lib/gpa-calculator';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Save, 
  Calendar, 
  CheckSquare, 
  XSquare, 
  Clock, 
  Sparkles,
  Award
} from 'lucide-react';

interface TeacherPortalViewProps {
  currentUser: User;
  lang: 'bn' | 'en';
}

export const TeacherPortalView: React.FC<TeacherPortalViewProps> = ({ currentUser, lang }) => {
  const [activeTab, setActiveTab] = useState<'MARKS' | 'ATTENDANCE' | 'ROUTINE'>('MARKS');

  // Teacher Profile
  const allTeachers = appStorage.getTeachers();
  const teacher = allTeachers.find((t) => t.id === currentUser.associatedId) || allTeachers[3]; // Animesh Chandra Barman by default

  const allStudents = appStorage.getStudents();
  const allSubjects = appStorage.getSubjects();
  const allExams = appStorage.getExams();

  // Marks Input State
  const [selectedClass, setSelectedClass] = useState<number>(6);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-6-3'); // Mathematics
  const [selectedExamId, setSelectedExamId] = useState<string>('exam-2026-annual');

  const filteredStudents = allStudents.filter((s) => s.classLevel === selectedClass);
  const classSubjects = allSubjects.filter((s) => s.classLevel === selectedClass);

  // Draft marks for the selected class & subject
  const [draftMarks, setDraftMarks] = useState<Record<string, { written: number; mcq: number; practical: number }>>({
    'student-1': { written: 60, mcq: 29, practical: 0 },
    'student-2': { written: 52, mcq: 24, practical: 0 },
  });

  const [savedNotice, setSavedNotice] = useState(false);

  // Attendance State
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>({
    'student-1': 'PRESENT',
    'student-2': 'PRESENT',
  });

  const handleMarkChange = (studentId: string, field: 'written' | 'mcq' | 'practical', value: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    setDraftMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { written: 0, mcq: 0, practical: 0 }),
        [field]: clamped,
      },
    }));
  };

  const handleSaveMarks = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const markAllPresent = () => {
    const updated: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    filteredStudents.forEach((s) => {
      updated[s.id] = 'PRESENT';
    });
    setAttendanceStatus(updated);
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Teacher Profile Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-800 to-emerald-500 text-base font-black text-white shadow-md border border-emerald-300/20">{teacher.nameBn.slice(0, 2)}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  MPO Index: {teacher.indexNumber}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {lang === 'bn' ? 'শিক্ষক পোর্টাল' : 'Academic Faculty Portal'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {lang === 'bn' ? teacher.nameBn : teacher.name}
              </h1>
              <p className="text-xs text-emerald-700 font-semibold">
                {lang === 'bn' ? teacher.designationBn : teacher.designation} • {teacher.subjectSpecialty}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold">
              {teacher.mpoStatus}
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('MARKS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'MARKS'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নম্বর এন্ট্রি ও মূল্যায়ন' : 'Marks Entry Spreadsheet'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ATTENDANCE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ATTENDANCE'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'দৈনিক ডিজিটাল হাজিরা' : 'Digital Attendance Register'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ROUTINE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ROUTINE'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'আমার ক্লাস রুটিন' : 'My Schedule'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Marks Spreadsheet Interface */}
      {activeTab === 'MARKS' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'bn' ? 'পরীক্ষার নম্বর ইনপুট শিট (CA ও টার্ম ফাইনাল)' : 'Subject Marks Evaluation Sheet'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? 'লিখিত, নৈর্ব্যক্তিক ও ব্যবহারিক নম্বর এন্ট্রি করুন। দিনাজপুর বোর্ড গ্রেডিং রিয়েল-টাইমে হিসাব হবে।'
                  : 'Enter component scores with live NCTB Dinajpur Board GP and letter grade derivation.'}
              </p>
            </div>

            <button
              onClick={handleSaveMarks}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নম্বর সংরক্ষণ করুন' : 'Save Marks'}</span>
            </button>
          </div>

          {savedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? 'নম্বর সফলভাবে সংরক্ষিত ও ডাটাবেজে লক হয়েছে।' : 'Marks saved & committed successfully.'}</span>
            </div>
          )}

          {/* Selection Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'শ্রেণি নির্বাচন' : 'Class'}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
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
                {lang === 'bn' ? 'বিষয় নির্বাচন' : 'Subject'}
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                {classSubjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} (Code: {sub.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'পরীক্ষা' : 'Exam Term'}
              </label>
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                {allExams.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {lang === 'bn' ? ex.titleBn : ex.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Spreadsheet Table */}
          <div className="overflow-x-auto border border-slate-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3 text-center">Written (CQ / 70)</th>
                  <th className="p-3 text-center">MCQ (30)</th>
                  <th className="p-3 text-center">Practical</th>
                  <th className="p-3 text-center">Total (100)</th>
                  <th className="p-3 text-center">Grade</th>
                  <th className="p-3 text-center">GP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.map((stu) => {
                  const current = draftMarks[stu.id] || { written: 50, mcq: 20, practical: 0 };
                  const total = current.written + current.mcq + current.practical;
                  const evalGrade = getGradeAndPoint(total);

                  return (
                    <tr key={stu.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-700">#{stu.rollNumber}</td>
                      <td className="p-3 font-bold text-slate-900">{stu.name}</td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="70"
                          value={current.written}
                          onChange={(e) => handleMarkChange(stu.id, 'written', parseInt(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-mono font-bold border border-slate-300 rounded focus:border-emerald-500"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={current.mcq}
                          onChange={(e) => handleMarkChange(stu.id, 'mcq', parseInt(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-mono font-bold border border-slate-300 rounded focus:border-emerald-500"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={current.practical}
                          onChange={(e) => handleMarkChange(stu.id, 'practical', parseInt(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-mono font-bold border border-slate-300 rounded focus:border-emerald-500"
                        />
                      </td>
                      <td className="p-3 text-center font-mono font-extrabold text-sm text-slate-900">
                        {total}
                      </td>
                      <td className="p-3 text-center font-bold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          evalGrade.letterGrade === 'F' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {evalGrade.letterGrade}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono font-bold">
                        {evalGrade.gradePoint.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Daily Attendance Register */}
      {activeTab === 'ATTENDANCE' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'bn' ? 'দৈনিক শ্রেণি হাজিরা রেজিস্টার' : 'Daily Classroom Attendance Register'}
              </h3>
              <p className="text-xs text-slate-500">
                Class {selectedClass} • Session 2026
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllPresent}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold cursor-pointer"
              >
                {lang === 'bn' ? 'সকলকে উপস্থিত চিহ্নিত করুন' : 'Mark All Present'}
              </button>
              <button
                onClick={() => alert('Attendance saved!')}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'হাজিরা সেভ করুন' : 'Save Attendance'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.map((stu) => {
                  const status = attendanceStatus[stu.id] || 'PRESENT';
                  return (
                    <tr key={stu.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold">#{stu.rollNumber}</td>
                      <td className="p-3 font-bold text-slate-900">{stu.name}</td>
                      <td className="p-3 text-center font-bold">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          status === 'PRESENT'
                            ? 'bg-emerald-100 text-emerald-800'
                            : status === 'ABSENT'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => setAttendanceStatus((p) => ({ ...p, [stu.id]: 'PRESENT' }))}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                              status === 'PRESENT' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            P
                          </button>
                          <button
                            onClick={() => setAttendanceStatus((p) => ({ ...p, [stu.id]: 'ABSENT' }))}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                              status === 'ABSENT' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => setAttendanceStatus((p) => ({ ...p, [stu.id]: 'LATE' }))}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                              status === 'LATE' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            L
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Routine */}
      {activeTab === 'ROUTINE' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            {lang === 'bn' ? 'আমার সাপ্তাহিক ক্লাস রুটিন' : 'Faculty Teaching Schedule'}
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Day</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Period</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {CLASS_ROUTINES.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold">{r.day}</td>
                    <td className="p-3 font-bold">Class {r.classLevel}</td>
                    <td className="p-3 font-mono">Period {r.periodNumber}</td>
                    <td className="p-3 font-mono text-slate-600">{r.timeSlot}</td>
                    <td className="p-3 font-bold text-emerald-800">{r.subjectName}</td>
                    <td className="p-3 font-mono text-slate-600">{r.roomNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
