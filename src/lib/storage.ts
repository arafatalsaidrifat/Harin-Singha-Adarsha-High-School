import {
  AdmissionApplication,
  AttendanceRecord,
  Exam,
  GrievanceTicket,
  Invoice,
  Notice,
  StudentExamResult,
  StudentProfile,
  Subject,
  TeacherProfile,
  User,
} from '../types';
import {
  INITIAL_ADMISSIONS,
  INITIAL_EXAMS,
  INITIAL_GRIEVANCES,
  INITIAL_INVOICES,
  INITIAL_NOTICES,
  INITIAL_RESULTS,
  INITIAL_STUDENTS,
  INITIAL_SUBJECTS,
  INITIAL_TEACHERS,
  INITIAL_USERS,
} from './mock-data';

const STORAGE_KEYS = {
  USERS: 'hsahs_users_v1',
  TEACHERS: 'hsahs_teachers_v1',
  STUDENTS: 'hsahs_students_v1',
  SUBJECTS: 'hsahs_subjects_v1',
  EXAMS: 'hsahs_exams_v1',
  RESULTS: 'hsahs_results_v1',
  INVOICES: 'hsahs_invoices_v1',
  NOTICES: 'hsahs_notices_v1',
  ADMISSIONS: 'hsahs_admissions_v1',
  GRIEVANCES: 'hsahs_grievances_v1',
  ATTENDANCE: 'hsahs_attendance_v1',
  CURRENT_USER: 'hsahs_current_user_v1',
  LANGUAGE: 'hsahs_lang_v1',
  COVER_IMAGE: 'hsahs_cover_image_v1',
};

function getStoredOrInitial<T>(key: string, initialData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw) as T;
  } catch {
    return initialData;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

export const appStorage = {
  getUsers: (): User[] => getStoredOrInitial(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUsers: (data: User[]) => saveToStorage(STORAGE_KEYS.USERS, data),

  getTeachers: (): TeacherProfile[] => getStoredOrInitial(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS),
  saveTeachers: (data: TeacherProfile[]) => saveToStorage(STORAGE_KEYS.TEACHERS, data),

  getStudents: (): StudentProfile[] => getStoredOrInitial(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS),
  saveStudents: (data: StudentProfile[]) => saveToStorage(STORAGE_KEYS.STUDENTS, data),

  getSubjects: (): Subject[] => getStoredOrInitial(STORAGE_KEYS.SUBJECTS, INITIAL_SUBJECTS),
  saveSubjects: (data: Subject[]) => saveToStorage(STORAGE_KEYS.SUBJECTS, data),

  getExams: (): Exam[] => getStoredOrInitial(STORAGE_KEYS.EXAMS, INITIAL_EXAMS),
  saveExams: (data: Exam[]) => saveToStorage(STORAGE_KEYS.EXAMS, data),

  getResults: (): StudentExamResult[] => getStoredOrInitial(STORAGE_KEYS.RESULTS, INITIAL_RESULTS),
  saveResults: (data: StudentExamResult[]) => saveToStorage(STORAGE_KEYS.RESULTS, data),

  getInvoices: (): Invoice[] => getStoredOrInitial(STORAGE_KEYS.INVOICES, INITIAL_INVOICES),
  saveInvoices: (data: Invoice[]) => saveToStorage(STORAGE_KEYS.INVOICES, data),

  getNotices: (): Notice[] => getStoredOrInitial(STORAGE_KEYS.NOTICES, INITIAL_NOTICES),
  saveNotices: (data: Notice[]) => saveToStorage(STORAGE_KEYS.NOTICES, data),

  getAdmissions: (): AdmissionApplication[] => getStoredOrInitial(STORAGE_KEYS.ADMISSIONS, INITIAL_ADMISSIONS),
  saveAdmissions: (data: AdmissionApplication[]) => saveToStorage(STORAGE_KEYS.ADMISSIONS, data),

  getGrievances: (): GrievanceTicket[] => getStoredOrInitial(STORAGE_KEYS.GRIEVANCES, INITIAL_GRIEVANCES),
  saveGrievances: (data: GrievanceTicket[]) => saveToStorage(STORAGE_KEYS.GRIEVANCES, data),

  getAttendance: (): AttendanceRecord[] => getStoredOrInitial(STORAGE_KEYS.ATTENDANCE, []),
  saveAttendance: (data: AttendanceRecord[]) => saveToStorage(STORAGE_KEYS.ATTENDANCE, data),

  getCurrentUser: (): User => getStoredOrInitial(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]),
  setCurrentUser: (user: User) => saveToStorage(STORAGE_KEYS.CURRENT_USER, user),

  getLanguage: (): 'bn' | 'en' => {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return (val === 'en' ? 'en' : 'bn'); // default to Bangla for authentic rural Bangladesh school
    } catch {
      return 'bn';
    }
  },
  setLanguage: (lang: 'bn' | 'en') => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.error(e);
    }
  },

  getCoverImage: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.COVER_IMAGE);
    } catch {
      return null;
    }
  },
  setCoverImage: (url: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COVER_IMAGE, url);
    } catch (e) {
      console.error(e);
    }
  },

  resetAllData: () => {
    localStorage.clear();
    window.location.reload();
  },
};
