import React, { useState } from 'react';
import { 
  User, 
  AdmissionApplication, 
  Invoice, 
  Notice, 
  GrievanceTicket, 
  StudentExamResult 
} from '../../types';
import { appStorage } from '../../lib/storage';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { SchoolLogo } from '../common/SchoolLogo';
import { 
  Users, 
  CreditCard, 
  Award, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Printer, 
  ShieldCheck, 
  Trash2,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

interface AdminPortalViewProps {
  currentUser: User;
  lang: 'bn' | 'en';
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ currentUser, lang }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ADMISSIONS' | 'RESULTS' | 'FEES' | 'GRIEVANCES' | 'NOTICES'>('OVERVIEW');

  // Live state from storage
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => appStorage.getAdmissions());
  const [invoices, setInvoices] = useState<Invoice[]>(() => appStorage.getInvoices());
  const [grievances, setGrievances] = useState<GrievanceTicket[]>(() => appStorage.getGrievances());
  const [notices, setNotices] = useState<Notice[]>(() => appStorage.getNotices());
  const [results, setResults] = useState<StudentExamResult[]>(() => appStorage.getResults());

  // New Notice form state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Academic' | 'Exam' | 'Urgent' | 'Administrative' | 'Routine'>('Academic');

  // New Invoice form state
  const [invTitle, setInvTitle] = useState('Monthly Tuition Fee - November 2026');
  const [invAmount, setInvAmount] = useState<number>(350);
  const [invClass, setInvClass] = useState<number>(6);

  // GRS resolve state
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  // Handle Admission Status
  const handleAdmissionDecision = (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    const updated = admissions.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status,
          assignedRoll: status === 'ACCEPTED' ? Math.floor(100 + Math.random() * 50) : undefined,
          assignedSection: status === 'ACCEPTED' ? 'A' : undefined,
        };
      }
      return a;
    });
    setAdmissions(updated);
    appStorage.saveAdmissions(updated);
  };

  // Handle Publish Notice
  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const newN: Notice = {
      id: 'not-' + Date.now(),
      title: noticeTitle,
      titleBn: noticeTitle,
      content: noticeContent,
      contentBn: noticeContent,
      category: noticeCategory,
      publishedAt: new Date().toISOString().split('T')[0],
      isFeatured: false,
      author: 'Headmaster',
    };

    const updated = [newN, ...notices];
    setNotices(updated);
    appStorage.saveNotices(updated);
    setNoticeTitle('');
    setNoticeContent('');
    alert(lang === 'bn' ? 'নোটিশ সফলভাবে প্রকাশিত হয়েছে!' : 'Notice published successfully!');
  };

  // Handle Batch Invoicing
  const handleGenerateInvoices = (e: React.FormEvent) => {
    e.preventDefault();
    const allStudents = appStorage.getStudents().filter((s) => s.classLevel === invClass);

    const newCreated: Invoice[] = allStudents.map((s, idx) => ({
      id: 'inv-' + Date.now() + '-' + idx,
      invoiceNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      studentId: s.id,
      studentName: s.name,
      classLevel: s.classLevel,
      rollNumber: s.rollNumber,
      title: invTitle,
      titleBn: invTitle,
      description: `Class ${invClass} academic session billing`,
      amount: invAmount,
      dueDate: '2026-11-20',
      status: 'UNPAID',
    }));

    const updated = [...newCreated, ...invoices];
    setInvoices(updated);
    appStorage.saveInvoices(updated);
    alert(lang === 'bn' ? `${newCreated.length} টি নতুন ইনভয়েস তৈরি হয়েছে!` : `Generated ${newCreated.length} invoices!`);
  };

  // Handle GRS Resolution
  const handleSaveResolution = (id: string) => {
    if (!resolutionText.trim()) return;
    const updated = grievances.map((g) => {
      if (g.id === id) {
        return {
          ...g,
          status: 'RESOLVED' as const,
          adminResolution: resolutionText,
          resolvedAt: new Date().toISOString().split('T')[0],
        };
      }
      return g;
    });
    setGrievances(updated);
    appStorage.saveGrievances(updated);
    setResolvingId(null);
    setResolutionText('');
  };

  // Financial Stats
  const totalPaidRevenue = invoices
    .filter((i) => i.status === 'PAID')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalUnpaidRevenue = invoices
    .filter((i) => i.status === 'UNPAID')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6 py-6">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-2xl shrink-0">
              <SchoolLogo size={60} variant="emerald" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                  Administrative Command Center
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  EIIN: {SCHOOL_INFO.eiin}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {currentUser.name}
              </h1>
              <p className="text-xs text-emerald-400 font-semibold">
                Headmaster & Institutional Administrator • Harin Singha Adarsha High School
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'রিপোর্ট প্রিন্ট করুন' : 'Print Summary Report'}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'OVERVIEW' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'bn' ? 'ড্যাশবোর্ড সারসংক্ষেপ' : 'Executive Overview'}
          </button>

          <button
            onClick={() => setActiveTab('ADMISSIONS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ADMISSIONS' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{lang === 'bn' ? 'অনলাইন ভর্তি অনুমোদন' : 'Admissions Manager'}</span>
            <span className="bg-emerald-800 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {admissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('RESULTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'RESULTS' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'bn' ? 'পরীক্ষা ও ফলাফল প্রকাশ' : 'Exam & Tabulation'}
          </button>

          <button
            onClick={() => setActiveTab('FEES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'FEES' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'bn' ? 'বিকাশ ও ফি হিসাব' : 'Fee Ledger & bKash'}
          </button>

          <button
            onClick={() => setActiveTab('GRIEVANCES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'GRIEVANCES' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{lang === 'bn' ? 'অভিযোগ নিষ্পত্তিকরণ (জিআরএস)' : 'GRS Inbox'}</span>
            <span className="bg-amber-700 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {grievances.filter((g) => g.status !== 'RESOLVED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('NOTICES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'NOTICES' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'bn' ? 'বিজ্ঞপ্তি প্রকাশনা' : 'Notice Publisher'}
          </button>
        </div>
      </div>

      {/* Tab 1: Executive Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block font-semibold">Active Enrolled Students</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">246 Learners</span>
              <span className="text-[11px] text-emerald-600 font-bold">54.2% Female Ratio</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block font-semibold">Sanctioned MPO Posts</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">12 Teachers</span>
              <span className="text-[11px] text-slate-500">MPO: 8702091302</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block font-semibold">bKash Collected Revenue</span>
              <span className="text-2xl font-black text-pink-700 font-mono mt-1 block">৳ {totalPaidRevenue}</span>
              <span className="text-[11px] text-slate-500">Settled to School Account</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block font-semibold">Pending Dues Receivable</span>
              <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">৳ {totalUnpaidRevenue}</span>
              <span className="text-[11px] text-slate-500">Current Session</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'bn' ? 'সাম্প্রতিক প্রাতিষ্ঠানিক কার্যক্রম' : 'Recent Institutional Activity'}
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <span>Total 2027 Admission Applications Submitted:</span>
                <span className="font-mono font-bold text-slate-900">{admissions.length} Applicants</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <span>Citizen Grievance Resolution Rate:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {Math.round((grievances.filter((g) => g.status === 'RESOLVED').length / (grievances.length || 1)) * 100)}% Resolved
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <span>Dinajpur Board Result Publication Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
                  Annual Exam 2026 Published
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Admission Applications Manager */}
      {activeTab === 'ADMISSIONS' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'bn' ? 'অনলাইন ভর্তি আবেদন পর্যালোচনা ও অনুমোদন' : 'Admission Applications Review'}
              </h3>
              <p className="text-xs text-slate-500">
                Verify applicant quota & seat caps before granting roll number.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Applied Class</th>
                  <th className="p-3">Quota</th>
                  <th className="p-3">Guardian Mobile</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-800">{adm.applicationToken}</td>
                    <td className="p-3 font-bold text-slate-900">{adm.applicantName}</td>
                    <td className="p-3">Class {adm.appliedClass} ({adm.appliedGroup})</td>
                    <td className="p-3 text-slate-600">{adm.quotaCategory}</td>
                    <td className="p-3 font-mono">{adm.guardianMobile}</td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        adm.status === 'ACCEPTED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : adm.status === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {adm.status} {adm.assignedRoll && `(Roll #${adm.assignedRoll})`}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {adm.status === 'PENDING' ? (
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => handleAdmissionDecision(adm.id, 'ACCEPTED')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAdmissionDecision(adm.id, 'REJECTED')}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Exam Results & Tabulation Sheets */}
      {activeTab === 'RESULTS' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'bn' ? 'দিনাজপুর শিক্ষা বোর্ড ফলাফল ট্যাবুলেশন শিট' : 'Dinajpur Board Tabulation Sheet & Audit'}
              </h3>
              <p className="text-xs text-slate-500">
                Annual Examination 2026 • Classes 6 through 10
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'bn' ? 'ট্যাবুলেশন শিট প্রিন্ট করুন' : 'Print Tabulation Sheet'}</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Class</th>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3 text-center">Total Marks</th>
                  <th className="p-3 text-center">4th Bonus</th>
                  <th className="p-3 text-center">Final GPA</th>
                  <th className="p-3 text-center">Grade</th>
                  <th className="p-3 text-center">Merit</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold">Class {res.classLevel}</td>
                    <td className="p-3 font-mono font-bold">#{res.rollNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{res.studentName}</td>
                    <td className="p-3 text-center font-mono font-bold">{res.totalMarksObtained}</td>
                    <td className="p-3 text-center font-mono text-emerald-700">+{res.fourthSubjectBonus.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono font-black text-emerald-800">{res.gpa.toFixed(2)}</td>
                    <td className="p-3 text-center font-bold">{res.letterGrade}</td>
                    <td className="p-3 text-center font-bold text-amber-600">#{res.meritPosition || 1}</td>
                    <td className="p-3 text-center font-bold">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px]">
                        PASSED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Fee Ledger & Billing */}
      {activeTab === 'FEES' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'bn' ? 'শ্রেণিভিত্তিক নতুন ফি ইনভয়েস তৈরি করুন' : 'Generate Class Invoices'}
            </h3>
            <form onSubmit={handleGenerateInvoices} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Class</label>
                <select
                  value={invClass}
                  onChange={(e) => setInvClass(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value={6}>Class 6</option>
                  <option value={7}>Class 7</option>
                  <option value={8}>Class 8</option>
                  <option value={9}>Class 9</option>
                  <option value={10}>Class 10</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fee Title</label>
                <input
                  type="text"
                  required
                  value={invTitle}
                  onChange={(e) => setInvTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount (BDT)</label>
                <input
                  type="number"
                  required
                  min="50"
                  value={invAmount}
                  onChange={(e) => setInvAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  + Generate Invoices
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'bn' ? 'সকল ইনভয়েস ও বিকাশ পেমেন্ট তালিকা' : 'All Billing Invoices & Payment Status'}
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Title</th>
                    <th className="p-3 font-mono">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">TrxID / Paid At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold">{inv.invoiceNumber}</td>
                      <td className="p-3 font-bold">{inv.studentName}</td>
                      <td className="p-3">Class {inv.classLevel} (Roll #{inv.rollNumber})</td>
                      <td className="p-3">{inv.title}</td>
                      <td className="p-3 font-mono font-bold">৳ {inv.amount}</td>
                      <td className="p-3 font-bold">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        {inv.transactionId || 'Pending Checkout'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Grievances Redress (GRS) Inbox */}
      {activeTab === 'GRIEVANCES' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'bn' ? 'নাগরিক অভিযোগ ও নিষ্পত্তি ব্যবস্থাপনা' : 'Grievance Redress System Inbox'}
            </h3>
            <p className="text-xs text-slate-500">
              Respond directly to parents and citizens under statutory SLA.
            </p>
          </div>

          <div className="space-y-4">
            {grievances.map((g) => (
              <div key={g.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800">{g.trackingCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    g.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {g.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{g.subject}</h4>
                <p className="text-xs text-slate-600">{g.description}</p>
                <div className="text-[11px] text-slate-500 flex gap-4 pt-1">
                  <span>Submitter: {g.submitterName} ({g.submitterRole})</span>
                  <span>Phone: {g.contactPhone}</span>
                  <span>Date: {g.submittedAt}</span>
                </div>

                {g.adminResolution ? (
                  <div className="mt-2 p-3 bg-emerald-100/70 border border-emerald-300 rounded-lg text-xs text-emerald-950 font-medium">
                    <strong>Admin Resolution:</strong> {g.adminResolution}
                  </div>
                ) : (
                  <div className="pt-2">
                    {resolvingId === g.id ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          placeholder="Type administrative resolution order..."
                          value={resolutionText}
                          onChange={(e) => setResolutionText(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveResolution(g.id)}
                            className="px-3 py-1 bg-emerald-700 text-white rounded text-xs font-bold cursor-pointer"
                          >
                            Resolve Ticket
                          </button>
                          <button
                            onClick={() => setResolvingId(null)}
                            className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setResolvingId(g.id)}
                        className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-bold cursor-pointer"
                      >
                        Provide Resolution & Close
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Notice Publisher */}
      {activeTab === 'NOTICES' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">
              {lang === 'bn' ? 'নতুন প্রাতিষ্ঠানিক নোটিশ প্রকাশ করুন' : 'Publish Institutional Notice'}
            </h3>
            <p className="text-xs text-slate-500">
              Publishes instantaneously to the public notice board and mobile app.
            </p>
          </div>

          <form onSubmit={handlePublishNotice} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule of SSC Preparatory Test"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Content *</label>
              <textarea
                rows={4}
                required
                placeholder="Notice description in English and/or Bangla..."
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Publish Notice Immediately
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
