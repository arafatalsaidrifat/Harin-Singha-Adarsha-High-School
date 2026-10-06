import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SchoolCoverBanner } from './components/common/SchoolCoverBanner';
import { HomeHero } from './components/public/HomeHero';
import { DsheComplianceMatrix } from './components/public/DsheComplianceMatrix';
import { OnlineAdmissions } from './components/public/OnlineAdmissions';
import { PublicResultSearch } from './components/public/PublicResultSearch';
import { NoticeBoard } from './components/public/NoticeBoard';
import { FacultyDirectory } from './components/public/FacultyDirectory';
import { GrievanceSubmission } from './components/public/GrievanceSubmission';
import { AdminPortalView } from './components/admin/AdminPortalView';
import { TeacherPortalView } from './components/teacher/TeacherPortalView';
import { StudentPortalView } from './components/student/StudentPortalView';
import { appStorage } from './lib/storage';
import { User, UserRole, Notice } from './types';
import { INITIAL_USERS } from './lib/mock-data';

export function App() {
  const [lang, setLang] = useState<'bn' | 'en'>(() => appStorage.getLanguage());
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User>(() => appStorage.getCurrentUser());
  const [notices, setNotices] = useState<Notice[]>(() => appStorage.getNotices());

  const handleLangChange = (newLang: 'bn' | 'en') => {
    setLang(newLang);
    appStorage.setLanguage(newLang);
  };

  const handleSwitchUserRole = (targetRole: UserRole) => {
    const allUsers = appStorage.getUsers();
    let found = allUsers.find((u) => u.role === targetRole);
    if (!found) {
      found = INITIAL_USERS.find((u) => u.role === targetRole) || INITIAL_USERS[0];
    }
    setCurrentUser(found);
    appStorage.setCurrentUser(found);
  };

  const handleOpenNotice = (_notice: Notice) => {
    setCurrentTab('notices');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* Institutional Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={handleLangChange}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUserRole}
      />

      {/* Main Cover Banner featuring Official Seal and Campus Photo Uploader */}
      <SchoolCoverBanner
        lang={lang}
        onQuickAction={(action) => setCurrentTab(action)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {currentTab === 'home' && (
          <HomeHero
            lang={lang}
            notices={notices}
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenNotice={handleOpenNotice}
          />
        )}

        {currentTab === 'dshe' && (
          <DsheComplianceMatrix lang={lang} />
        )}

        {currentTab === 'admissions' && (
          <OnlineAdmissions lang={lang} />
        )}

        {currentTab === 'results' && (
          <PublicResultSearch lang={lang} />
        )}

        {currentTab === 'fees' && (
          /* Student & Parent fee portal with bKash Checkout */
          <StudentPortalView currentUser={currentUser} lang={lang} />
        )}

        {currentTab === 'notices' && (
          <NoticeBoard notices={notices} lang={lang} />
        )}

        {currentTab === 'faculty' && (
          <FacultyDirectory lang={lang} />
        )}

        {currentTab === 'grievance' && (
          <GrievanceSubmission lang={lang} />
        )}

        {currentTab === 'dashboard' && (
          <div>
            {currentUser.role === 'ADMIN' && (
              <AdminPortalView currentUser={currentUser} lang={lang} />
            )}
            {currentUser.role === 'TEACHER' && (
              <TeacherPortalView currentUser={currentUser} lang={lang} />
            )}
            {currentUser.role === 'STUDENT' && (
              <StudentPortalView currentUser={currentUser} lang={lang} />
            )}
          </div>
        )}

      </main>

      {/* Institutional Legal & Contact Footer */}
      <Footer
        lang={lang}
        onNavigate={(tab) => setCurrentTab(tab)}
      />

    </div>
  );
}

export default App;
