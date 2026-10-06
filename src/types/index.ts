export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export type Language = 'bn' | 'en';

export interface User {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  role: UserRole;
  phone: string;
  avatarUrl?: string;
  associatedId?: string; // teacherId or studentId
}

export interface TeacherProfile {
  id: string;
  name: string;
  nameBn: string;
  designation: string;
  designationBn: string;
  indexNumber: string; // MPO Index Number
  mpoStatus: 'MPO Enrolled' | 'Non-MPO' | 'Contractual';
  mobile: string;
  email: string;
  subjectSpecialty: string;
  subjectSpecialtyBn: string;
  joiningDate: string;
  educationalQualification: string;
  assignedClasses: number[];
  assignedSubjects: string[];
  avatarUrl: string;
}

export interface StudentProfile {
  id: string;
  studentId: string; // e.g. "HSAHS-2026-601"
  rollNumber: number;
  name: string;
  nameBn: string;
  classLevel: number; // 6 to 10
  section: string; // 'A' | 'B'
  group: 'General' | 'Science' | 'Humanities' | 'Business Studies';
  gender: 'Male' | 'Female';
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  dob: string;
  address: string;
  avatarUrl?: string;
  attendanceRate: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  nameBn: string;
  classLevel: number;
  group: 'General' | 'Science' | 'Humanities' | 'Business Studies';
  isOptional: boolean; // 4th subject
  fullMarks: number;
  passMarks: number;
}

export interface Exam {
  id: string;
  title: string;
  titleBn: string;
  sessionYear: number;
  term: 'Half-Yearly' | 'Annual' | 'Pre-Test' | 'Test Examination';
  isPublished: boolean;
  publishedAt?: string;
}

export interface SubjectMark {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  isOptional: boolean;
  writtenMarks: number;
  mcqMarks: number;
  practicalMarks: number;
  totalMarks: number;
  letterGrade: string;
  gradePoint: number;
}

export interface StudentExamResult {
  id: string;
  studentId: string;
  examId: string;
  sessionYear: number;
  classLevel: number;
  section: string;
  rollNumber: number;
  studentName: string;
  studentNameBn: string;
  marks: SubjectMark[];
  totalMarksObtained: number;
  gpa: number;
  letterGrade: string;
  hasFailed: boolean;
  fourthSubjectBonus: number;
  meritPosition?: number;
  remarks: string;
  publishedDate: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  classLevel: number;
  rollNumber: number;
  title: string;
  titleBn: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'UNPAID' | 'PAID' | 'CANCELLED';
  paymentMethod?: 'bKash' | 'Cash' | 'Nagad';
  paymentId?: string;
  transactionId?: string;
  paidAt?: string;
  senderPhone?: string;
}

export interface Notice {
  id: string;
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  category: 'Academic' | 'Exam' | 'Urgent' | 'Administrative' | 'Routine';
  publishedAt: string;
  isFeatured: boolean;
  pdfAttachment?: string;
  author: string;
}

export interface AdmissionApplication {
  id: string;
  applicationToken: string;
  applicantName: string;
  applicantNameBn: string;
  appliedClass: number;
  appliedGroup: 'General' | 'Science' | 'Humanities' | 'Business Studies';
  gender: 'Male' | 'Female';
  dob: string;
  fatherName: string;
  motherName: string;
  guardianMobile: string;
  previousSchool: string;
  previousPecOrJscGpa?: number;
  quotaCategory: 'General' | 'Freedom Fighter' | 'Disability' | 'Catchment Area';
  submissionDate: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  assignedRoll?: number;
  assignedSection?: string;
}

export interface GrievanceTicket {
  id: string;
  trackingCode: string;
  submitterName: string;
  submitterRole: 'Parent' | 'Student' | 'Citizen' | 'Alumni';
  contactPhone: string;
  email?: string;
  subject: string;
  description: string;
  submittedAt: string;
  status: 'PENDING' | 'UNDER_INVESTIGATION' | 'RESOLVED';
  adminResolution?: string;
  resolvedAt?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  classLevel: number;
  section: string;
  teacherId: string;
  records: {
    studentId: string;
    rollNumber: number;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
  }[];
}

export interface ClassRoutineItem {
  id: string;
  classLevel: number;
  section: string;
  day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  periodNumber: number;
  timeSlot: string;
  subjectName: string;
  subjectNameBn: string;
  teacherName: string;
  roomNumber: string;
}

export interface DsheCategory {
  key: string;
  number: number;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  dataItems: {
    labelEn: string;
    labelBn: string;
    valueEn: string;
    valueBn: string;
    badge?: string;
  }[];
  pdfDocuments?: {
    name: string;
    fileSize: string;
    downloadUrl: string;
  }[];
  detailsHtml?: string;
}
