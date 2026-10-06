import React, { useState } from 'react';
import { SchoolLogo } from '../common/SchoolLogo';
import { SCHOOL_INFO } from '../../lib/mock-data';
import { User, UserRole } from '../../types';
import { 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  UserCircle2, 
  Menu, 
  X, 
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  FileText,
  Users,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  currentUser: User;
  onSwitchUser: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  currentUser,
  onSwitchUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', labelBn: 'মূল পাতা', labelEn: 'Home' },
    { id: 'dshe', labelBn: 'মাউশি ১১ দফা কমপ্লায়েন্স', labelEn: 'DSHE Compliance', badge: '11' },
    { id: 'admissions', labelBn: 'অনলাইন ভর্তি', labelEn: 'Admissions' },
    { id: 'results', labelBn: 'ফলাফল ও মার্কশিট', labelEn: 'Results' },
    { id: 'fees', labelBn: 'ফি ও বেতন (বিকাশ)', labelEn: 'Fee Payment' },
    { id: 'notices', labelBn: 'বিজ্ঞপ্তি ফলক', labelEn: 'Notice Board' },
    { id: 'faculty', labelBn: 'শিক্ষক-কর্মচারী', labelEn: 'Faculty' },
    { id: 'grievance', labelBn: 'অভিযোগ (জিআরএস)', labelEn: 'Grievance' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          
          {/* Contact and Gov Identifiers */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400">
              EIIN: {SCHOOL_INFO.eiin} | MPO: {SCHOOL_INFO.mpoCode}
            </span>
            <a href={`tel:${SCHOOL_INFO.phone}`} className="inline-flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{SCHOOL_INFO.phone}</span>
            </a>
            <a href={`mailto:${SCHOOL_INFO.email}`} className="hidden md:inline-flex items-center gap-1 hover:text-white transition">
              <Mail className="w-3 h-3 text-cyan-400" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
            <span className="hidden lg:inline text-slate-400">
              {lang === 'bn' ? 'দিনাজপুর শিক্ষা বোর্ড অনুমোদিত' : 'Dinajpur Education Board'}
            </span>
          </div>

          {/* Right Controls: Role Persona Switcher & Language Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Persona Role Switcher for Interactive Testing */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-700 transition cursor-pointer"
                title="Switch active user persona to test RBAC capabilities"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">{lang === 'bn' ? 'রোল:' : 'Role:'}</span>
                <span className="font-semibold text-emerald-300">
                  {currentUser.role === 'ADMIN'
                    ? (lang === 'bn' ? 'প্রধান শিক্ষক' : 'Headmaster')
                    : currentUser.role === 'TEACHER'
                    ? (lang === 'bn' ? 'শিক্ষক' : 'Teacher')
                    : (lang === 'bn' ? 'শিক্ষার্থী' : 'Student')}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-semibold">
                    {lang === 'bn' ? 'ব্যবহারকারী রোল পরিবর্তন করুন' : 'Switch RBAC Persona'}
                  </div>
                  <button
                    onClick={() => {
                      onSwitchUser('ADMIN');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      currentUser.role === 'ADMIN' ? 'text-emerald-400 font-bold bg-slate-800/60' : 'text-slate-200'
                    }`}
                  >
                    <span>{lang === 'bn' ? 'অ্যাডমিন / প্রধান শিক্ষক' : 'Headmaster / Admin'}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                      Full Control
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchUser('TEACHER');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      currentUser.role === 'TEACHER' ? 'text-emerald-400 font-bold bg-slate-800/60' : 'text-slate-200'
                    }`}
                  >
                    <span>{lang === 'bn' ? 'শিক্ষক (অনিমেষ বর্মন)' : 'Teacher (Animesh Barman)'}</span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">
                      Marks / Attendance
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchUser('STUDENT');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      currentUser.role === 'STUDENT' ? 'text-emerald-400 font-bold bg-slate-800/60' : 'text-slate-200'
                    }`}
                  >
                    <span>{lang === 'bn' ? 'শিক্ষার্থী (সুমাইয়া আক্তার)' : 'Student (Sumaiya Akter)'}</span>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">
                      Results / bKash
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center rounded bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setLang('bn')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  lang === 'bn' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  lang === 'en' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                ENG
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Title Header */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <SchoolLogo size={56} variant="emerald" />
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition tracking-tight text-base sm:text-lg lg:text-xl leading-tight">
                {lang === 'bn' ? SCHOOL_INFO.nameBn : SCHOOL_INFO.nameEn}
              </span>
              <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
                {lang === 'bn' ? SCHOOL_INFO.nameEn : SCHOOL_INFO.nameBn}
              </span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                EIIN: {SCHOOL_INFO.eiin} • MPO: {SCHOOL_INFO.mpoCode} • {SCHOOL_INFO.boardEn}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/80 shadow-xs'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                  {item.badge && (
                    <span className="bg-emerald-600 text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Role Dashboard Jump Button */}
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`ml-2 px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {currentUser.role === 'ADMIN'
                  ? (lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Portal')
                  : currentUser.role === 'TEACHER'
                  ? (lang === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher Portal')
                  : (lang === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'Student Portal')}
              </span>
            </button>
          </nav>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white flex items-center gap-1 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="p-2 mb-2 bg-slate-50 rounded-lg flex items-center justify-between text-xs text-slate-700">
            <span className="font-semibold">
              {lang === 'bn' ? 'লগইন প্রোফাইল:' : 'Logged as:'} {currentUser.name}
            </span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
              {currentUser.role}
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between cursor-pointer ${
                currentTab === item.id ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
              {item.badge && (
                <span className="bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => {
              setCurrentTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 text-left px-3 py-3 rounded-lg text-sm font-bold bg-slate-900 text-white flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              {currentUser.role === 'ADMIN'
                ? (lang === 'bn' ? 'প্রধান শিক্ষক ড্যাশবোর্ড' : 'Headmaster Dashboard')
                : currentUser.role === 'TEACHER'
                ? (lang === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher Portal')
                : (lang === 'bn' ? 'শিক্ষার্থী / অভিভাবক ড্যাশবোর্ড' : 'Student / Parent Portal')}
            </span>
            <span className="text-xs text-emerald-400">→</span>
          </button>
        </div>
      )}
    </header>
  );
};
