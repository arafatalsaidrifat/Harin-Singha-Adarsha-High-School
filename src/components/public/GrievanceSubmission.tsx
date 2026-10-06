import React, { useState } from 'react';
import { GrievanceTicket } from '../../types';
import { appStorage } from '../../lib/storage';
import { 
  ShieldCheck, 
  AlertCircle, 
  Send, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText,
  UserCheck
} from 'lucide-react';

interface GrievanceSubmissionProps {
  lang: 'bn' | 'en';
}

export const GrievanceSubmission: React.FC<GrievanceSubmissionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'SUBMIT' | 'TRACK'>('SUBMIT');
  
  // Submit state
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Parent' | 'Student' | 'Citizen' | 'Alumni'>('Parent');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [newTicketCode, setNewTicketCode] = useState<string | null>(null);

  // Track state
  const [trackingCodeInput, setTrackingCodeInput] = useState('');
  const [trackedTicket, setTrackedTicket] = useState<GrievanceTicket | null>(null);
  const [hasTracked, setHasTracked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !subject.trim() || !description.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const code = `GRS-2026-${randomSuffix}`;

    const newTicket: GrievanceTicket = {
      id: 'grv-' + Date.now(),
      trackingCode: code,
      submitterName: name,
      submitterRole: role,
      contactPhone: phone,
      email: email || undefined,
      subject,
      description,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'PENDING',
    };

    const existing = appStorage.getGrievances();
    appStorage.saveGrievances([newTicket, ...existing]);

    setNewTicketCode(code);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasTracked(true);

    const existing = appStorage.getGrievances();
    const found = existing.find(
      (g) => g.trackingCode.toLowerCase().trim() === trackingCodeInput.toLowerCase().trim()
    );

    setTrackedTicket(found || null);
  };

  return (
    <div className="space-y-6 py-6 max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>{lang === 'bn' ? 'মাউশি নির্দেশিকা অনুচ্ছেদ ৯: নাগরিক অভিযোগ সেল' : 'DSHE Statutory Section 9: Grievance Redress System'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {lang === 'bn' ? 'অভিযোগ প্রতিকার ব্যবস্থা (জিআরএস)' : 'Grievance Redress System (GRS Portal)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'বিদ্যালয়ের সেবা, শিক্ষা কার্যক্রম বা পরিবেশ সম্পর্কিত যেকোনো সুনির্দিষ্ট অভিযোগ বা পরামর্শ দাখিল করুন। অভিযোগ প্রতিকার কর্মকর্তা (সহকারী প্রধান শিক্ষক) সর্বোচ্চ ৭ কর্মদিবসের মধ্যে প্রতিকার প্রদান করবেন।'
            : 'Submit institutional grievances, suggestions, or reports. Managed by designated Grievance Redress Officer (GRO) with a 7-day resolution commitment.'}
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('SUBMIT')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'SUBMIT'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'bn' ? 'নতুন অভিযোগ দাখিল করুন' : 'Submit New Grievance'}
          </button>
          <button
            onClick={() => setActiveTab('TRACK')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'TRACK'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {lang === 'bn' ? 'অভিযোগ ট্র্যাকিং ও অগ্রগতি' : 'Track Grievance Status'}
          </button>
        </div>
      </div>

      {activeTab === 'SUBMIT' ? (
        newTicketCode ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'অভিযোগ সফলভাবে গ্রহণ করা হয়েছে' : 'Grievance Logged Successfully'}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {lang === 'bn'
                ? 'আপনার অভিযোগটি বিদ্যালয় অভিযোগ প্রতিকার সেলে প্রেরিত হয়েছে। আপনার ট্র্যাকিং নম্বরটি সংরক্ষণ করুন:'
                : 'Forwarded to the Grievance Redress Officer. Keep this tracking code to check status:'}
            </p>
            <div className="bg-slate-50 border-2 border-dashed border-emerald-600 p-4 rounded-xl max-w-xs mx-auto font-mono text-lg font-black text-emerald-800">
              {newTicketCode}
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setNewTicketCode(null);
                  setName('');
                  setPhone('');
                  setSubject('');
                  setDescription('');
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {lang === 'bn' ? 'আরেকটি অভিযোগ দাখিল করুন' : 'Submit Another'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'আপনার পরিচয় *' : 'Your Role *'}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Parent">অভিভাবক (Parent / Guardian)</option>
                    <option value="Student">শিক্ষার্থী (Student)</option>
                    <option value="Citizen">স্থানীয় নাগরিক (Local Citizen)</option>
                    <option value="Alumni">প্রাক্তন শিক্ষার্থী (Alumni)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'যোগাযোগের মোবাইল নম্বর *' : 'Contact Mobile *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+88017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ইমেইল ঠিকানা (ঐচ্ছিক)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'অভিযোগের বিষয় *' : 'Subject of Grievance *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drinking water facility / Class routine"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'বিস্তারিত বিবরণ *' : 'Detailed Description *'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain the complaint clearly..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'অভিযোগ দাখিল করুন' : 'Submit Grievance'}</span>
                </button>
              </div>
            </form>
          </div>
        )
      ) : (
        /* Track Status Tab */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'ট্র্যাকিং কোড দিয়ে অনুসন্ধান করুন' : 'Enter Grievance Tracking Code'}
            </h3>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. GRS-2026-081"
                value={trackingCodeInput}
                onChange={(e) => setTrackingCodeInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono font-bold focus:outline-none focus:border-emerald-500 uppercase"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{lang === 'bn' ? 'অনুসন্ধান' : 'Track'}</span>
              </button>
            </form>
          </div>

          {hasTracked && (
            trackedTicket ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Tracking Code</span>
                    <h4 className="font-mono font-black text-lg text-emerald-800">
                      {trackedTicket.trackingCode}
                    </h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    trackedTicket.status === 'RESOLVED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : trackedTicket.status === 'UNDER_INVESTIGATION'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {trackedTicket.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <p><strong>Subject:</strong> {trackedTicket.subject}</p>
                  <p><strong>Submitted by:</strong> {trackedTicket.submitterName} ({trackedTicket.submitterRole}) on {trackedTicket.submittedAt}</p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-slate-600">{trackedTicket.description}</p>
                  </div>
                </div>

                {trackedTicket.adminResolution && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                      <UserCheck className="w-4 h-4 text-emerald-700" />
                      {lang === 'bn' ? 'প্রধান শিক্ষক ও জিআরএস অফিসারের সিদ্ধান্ত:' : 'Official Resolution by Headmaster:'}
                    </span>
                    <p className="text-xs text-slate-800">{trackedTicket.adminResolution}</p>
                    {trackedTicket.resolvedAt && (
                      <span className="text-[10px] text-slate-500 block pt-1">
                        Resolved on: {trackedTicket.resolvedAt}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-rose-600">
                  {lang === 'bn' ? 'কোনো অভিযোগ খুঁজে পাওয়া যায়নি।' : 'No grievance ticket found for this code.'}
                </p>
              </div>
            )
          )}
        </div>
      )}

    </div>
  );
};
