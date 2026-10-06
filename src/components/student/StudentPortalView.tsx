import React, { useState } from 'react';
import { Invoice, StudentExamResult, StudentProfile, User } from '../../types';
import { appStorage } from '../../lib/storage';
import { SCHOOL_INFO, CLASS_ROUTINES } from '../../lib/mock-data';
import { SchoolLogo } from '../common/SchoolLogo';
import { BkashCheckoutModal } from '../modals/BkashCheckoutModal';
import { ReceiptPrintModal } from '../modals/ReceiptPrintModal';
import { 
  UserCircle, 
  CreditCard, 
  Award, 
  Calendar, 
  BookOpen, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Clock,
  Download
} from 'lucide-react';

interface StudentPortalViewProps {
  currentUser: User;
  lang: 'bn' | 'en';
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({ currentUser, lang }) => {
  const [activeTab, setActiveTab] = useState<'FEES' | 'RESULTS' | 'ROUTINE' | 'PROFILE'>('FEES');
  
  // Find associated student profile or default to student 1 (Sumaiya Akter Rimi)
  const allStudents = appStorage.getStudents();
  const student = allStudents.find((s) => s.id === currentUser.associatedId) || allStudents[0];

  const allInvoices = appStorage.getInvoices();
  const studentInvoices = allInvoices.filter((inv) => inv.studentId === student.id);

  const allResults = appStorage.getResults();
  const studentResults = allResults.filter((r) => r.studentId === student.id);

  // Modals state
  const [checkoutInvoice, setCheckoutInvoice] = useState<Invoice | null>(null);
  const [receiptInvoice, setReceiptInvoice] = useState<Invoice | null>(null);

  const myRoutines = CLASS_ROUTINES.filter((r) => r.classLevel === student.classLevel);

  return (
    <div className="space-y-6 py-6">
      
      {/* Student Badge Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl || student.avatarUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  {student.studentId}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {lang === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'Student & Parent Portal'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {lang === 'bn' ? student.nameBn : student.name}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Class {student.classLevel} • Section {student.section} • Roll #{student.rollNumber} • Group: {student.group}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {lang === 'bn' ? 'উপস্থিতি হার:' : 'Attendance:'} {student.attendanceRate}%
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('FEES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'FEES'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ফি ও বেতন (বিকাশ)' : 'Fee Payment (bKash)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('RESULTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'RESULTS'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'পরীক্ষার ফলাফল ও মার্কশিট' : 'Results & Transcripts'}</span>
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
            <span>{lang === 'bn' ? 'শ্রেণি রুটিন' : 'Class Routine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'PROFILE'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <UserCircle className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'প্রোফাইল বিবরণ' : 'Full Bio-Data'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Fees & Invoicing */}
      {activeTab === 'FEES' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {lang === 'bn' ? 'বকেয়া ও পরিশোধিত ফি বিবরণী' : 'Fee Invoices & Billing Ledger'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'bn'
                    ? 'বিকাশ অনলাইন গেটওয়ের মাধ্যমে ঘরে বসেই বেতন পরিশোধ করুন ও মানি রিসিট সংগ্রহ করুন।'
                    : 'Settle tuition & session fees via bKash Tokenized Merchant Checkout.'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {studentInvoices.length > 0 ? (
                studentInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-500 font-bold">
                          {inv.invoiceNumber}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {lang === 'bn' ? inv.titleBn : inv.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {inv.description} • Due: {inv.dueDate}
                      </p>
                      {inv.status === 'PAID' && (
                        <p className="text-[11px] text-emerald-700 font-mono">
                          Paid via {inv.paymentMethod} • TrxID: {inv.transactionId} ({inv.paidAt})
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase">Amount</span>
                        <span className="text-lg font-black text-slate-900 font-mono">
                          ৳ {inv.amount}
                        </span>
                      </div>

                      {inv.status === 'UNPAID' ? (
                        <button
                          onClick={() => setCheckoutInvoice(inv)}
                          className="px-4 py-2 rounded-xl bg-[#D12053] hover:bg-[#b01742] text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'বিকাশে দিন' : 'Pay with bKash'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setReceiptInvoice(inv)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{lang === 'bn' ? 'মানি রিসিট' : 'Money Receipt'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No invoices for this student account.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Results & Grade Sheets */}
      {activeTab === 'RESULTS' && (
        <div className="space-y-4">
          {studentResults.length > 0 ? (
            studentResults.map((res) => (
              <div key={res.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      {res.sessionYear} Session
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Annual Examination 2026 (বার্ষিক পরীক্ষা)
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Final GPA</span>
                    <span className="text-2xl font-black font-mono text-emerald-700">
                      {res.gpa.toFixed(2)} ({res.letterGrade})
                    </span>
                  </div>
                </div>

                {/* Subject Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5 text-center">Written</th>
                        <th className="p-2.5 text-center">MCQ</th>
                        <th className="p-2.5 text-center">Practical</th>
                        <th className="p-2.5 text-center">Total</th>
                        <th className="p-2.5 text-center">Grade</th>
                        <th className="p-2.5 text-center">GP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {res.marks.map((m, idx) => (
                        <tr key={idx} className={m.isOptional ? 'bg-amber-50/40' : ''}>
                          <td className="p-2.5 font-bold text-slate-900">
                            {m.subjectName} {m.isOptional && '(4th Subject)'}
                          </td>
                          <td className="p-2.5 text-center font-mono">{m.writtenMarks}</td>
                          <td className="p-2.5 text-center font-mono">{m.mcqMarks}</td>
                          <td className="p-2.5 text-center font-mono">{m.practicalMarks}</td>
                          <td className="p-2.5 text-center font-bold text-slate-900 font-mono">{m.totalMarks}</td>
                          <td className="p-2.5 text-center font-bold">{m.letterGrade}</td>
                          <td className="p-2.5 text-center font-mono font-bold">{m.gradePoint.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'bn' ? 'অফিসিয়াল ট্রান্সক্রিপ্ট প্রিন্ট করুন' : 'Print Official Transcript'}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'এই শিক্ষার্থীর কোনো ফলাফল রেকর্ড নেই।' : 'No exam records published yet for this student.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Class Routine */}
      {activeTab === 'ROUTINE' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            {lang === 'bn' ? 'শ্রেণি সময়সূচি ও রুটিন' : `Class ${student.classLevel} Routine`}
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Period</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Teacher</th>
                  <th className="p-3">Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {myRoutines.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold font-mono">Period {r.periodNumber}</td>
                    <td className="p-3 font-mono text-slate-600">{r.timeSlot}</td>
                    <td className="p-3 font-bold text-slate-900">{r.subjectName}</td>
                    <td className="p-3 text-emerald-700">{r.teacherName}</td>
                    <td className="p-3 font-mono text-slate-600">{r.roomNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Student Profile */}
      {activeTab === 'PROFILE' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            {lang === 'bn' ? 'শিক্ষার্থীর ব্যক্তিগত ও প্রাতিষ্ঠানিক তথ্য' : 'Student Academic Particulars'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Father's Name:</span>
              <span className="font-bold text-slate-900">{student.fatherName}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Mother's Name:</span>
              <span className="font-bold text-slate-900">{student.motherName}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Guardian Mobile:</span>
              <span className="font-mono font-bold text-slate-900">{student.guardianPhone}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Residential Address:</span>
              <span className="font-semibold text-slate-900">{student.address}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Date of Birth:</span>
              <span className="font-mono font-bold text-slate-900">{student.dob}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Gender:</span>
              <span className="font-semibold text-slate-900">{student.gender}</span>
            </div>
          </div>
        </div>
      )}

      {/* bKash Checkout Modal */}
      {checkoutInvoice && (
        <BkashCheckoutModal
          invoice={checkoutInvoice}
          isOpen={!!checkoutInvoice}
          onClose={() => setCheckoutInvoice(null)}
          onPaymentSuccess={(updated) => {
            setReceiptInvoice(updated);
          }}
          lang={lang}
        />
      )}

      {/* Money Receipt Print Modal */}
      {receiptInvoice && (
        <ReceiptPrintModal
          invoice={receiptInvoice}
          isOpen={!!receiptInvoice}
          onClose={() => setReceiptInvoice(null)}
          lang={lang}
        />
      )}

    </div>
  );
};
