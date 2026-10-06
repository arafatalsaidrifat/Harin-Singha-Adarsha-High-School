import { SubjectMark } from '../types';

export interface GpaGradeResult {
  letterGrade: 'A+' | 'A' | 'A-' | 'B' | 'C' | 'D' | 'F';
  gradePoint: number;
  remarks: string;
}

/**
 * Maps raw marks (0 - 100) to standard Bangladesh NCTB & Dinajpur Education Board Letter Grade & Grade Point
 */
export function getGradeAndPoint(marks: number): GpaGradeResult {
  const roundedMarks = Math.round(marks);

  if (roundedMarks >= 80 && roundedMarks <= 100) {
    return { letterGrade: 'A+', gradePoint: 5.0, remarks: 'Outstanding' };
  } else if (roundedMarks >= 70 && roundedMarks <= 79) {
    return { letterGrade: 'A', gradePoint: 4.0, remarks: 'Excellent' };
  } else if (roundedMarks >= 60 && roundedMarks <= 69) {
    return { letterGrade: 'A-', gradePoint: 3.5, remarks: 'Very Good' };
  } else if (roundedMarks >= 50 && roundedMarks <= 59) {
    return { letterGrade: 'B', gradePoint: 3.0, remarks: 'Good' };
  } else if (roundedMarks >= 40 && roundedMarks <= 49) {
    return { letterGrade: 'C', gradePoint: 2.0, remarks: 'Satisfactory' };
  } else if (roundedMarks >= 33 && roundedMarks <= 39) {
    return { letterGrade: 'D', gradePoint: 1.0, remarks: 'Basic Pass' };
  } else {
    return { letterGrade: 'F', gradePoint: 0.0, remarks: 'Failed' };
  }
}

/**
 * Maps cumulative GPA (0.00 - 5.00) to corresponding letter grade
 */
export function gpaToLetterGrade(gpa: number): string {
  if (gpa >= 5.0) return 'A+';
  if (gpa >= 4.0) return 'A';
  if (gpa >= 3.5) return 'A-';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.0) return 'C';
  if (gpa >= 1.0) return 'D';
  return 'F';
}

export interface CumulativeGpaCalculation {
  finalGpa: number;
  finalLetterGrade: string;
  hasFailed: boolean;
  failedSubjectNames: string[];
  compulsoryPointsSum: number;
  compulsoryCount: number;
  fourthSubjectBonus: number;
  fourthSubjectName?: string;
  totalMarksObtained: number;
  totalFullMarks: number;
  percentage: number;
  performanceRemarks: string;
}

/**
 * Implements NCTB and Dinajpur Education Board Secondary GPA Algorithm
 * 1. Mandatory audit: If any compulsory subject has GP == 0 (F), final GPA is 0.00 (F).
 * 2. 4th subject bonus: If 4th subject GP > 2.00, bonus = GP - 2.00. Else 0.
 * 3. Final GPA = min(5.00, (Sum of Compulsory GPs + Bonus) / Count of Compulsory Subjects).
 */
export function calculateCumulativeGpa(subjectMarks: SubjectMark[]): CumulativeGpaCalculation {
  const compulsorySubjects = subjectMarks.filter((s) => !s.isOptional);
  const optionalSubject = subjectMarks.find((s) => s.isOptional);

  let hasFailed = false;
  const failedSubjectNames: string[] = [];
  let compulsoryPointsSum = 0;
  let totalMarksObtained = 0;

  // 1. Audit compulsory subjects
  for (const subject of compulsorySubjects) {
    totalMarksObtained += subject.totalMarks;
    compulsoryPointsSum += subject.gradePoint;

    if (subject.gradePoint === 0 || subject.letterGrade === 'F') {
      hasFailed = true;
      failedSubjectNames.push(subject.subjectName);
    }
  }

  // 2. Add optional subject marks to total
  let fourthSubjectBonus = 0;
  let fourthSubjectName: string | undefined = undefined;

  if (optionalSubject) {
    totalMarksObtained += optionalSubject.totalMarks;
    fourthSubjectName = optionalSubject.subjectName;

    // Optional subject bonus is GP above 2.00
    if (optionalSubject.gradePoint > 2.0) {
      fourthSubjectBonus = Number((optionalSubject.gradePoint - 2.0).toFixed(2));
    }
  }

  const compulsoryCount = compulsorySubjects.length || 1;
  const totalSubjectsCount = subjectMarks.length || 1;
  const totalFullMarks = totalSubjectsCount * 100;
  const percentage = Number(((totalMarksObtained / totalFullMarks) * 100).toFixed(2));

  // If any compulsory subject failed, final GPA is 0.00
  if (hasFailed) {
    return {
      finalGpa: 0.0,
      finalLetterGrade: 'F',
      hasFailed: true,
      failedSubjectNames,
      compulsoryPointsSum: Number(compulsoryPointsSum.toFixed(2)),
      compulsoryCount,
      fourthSubjectBonus,
      fourthSubjectName,
      totalMarksObtained,
      totalFullMarks,
      percentage,
      performanceRemarks: 'Unsuccessful (Failed in ' + failedSubjectNames.join(', ') + ')',
    };
  }

  // Calculate GPA
  const rawGpa = (compulsoryPointsSum + fourthSubjectBonus) / compulsoryCount;
  const cappedGpa = Math.min(5.0, rawGpa);
  const finalGpa = Number(cappedGpa.toFixed(2));
  const finalLetterGrade = gpaToLetterGrade(finalGpa);

  let performanceRemarks = 'Satisfactory';
  if (finalGpa >= 5.0) performanceRemarks = 'Outstanding (Golden/GPA 5)';
  else if (finalGpa >= 4.0) performanceRemarks = 'Excellent Progress';
  else if (finalGpa >= 3.5) performanceRemarks = 'Very Good';
  else if (finalGpa >= 3.0) performanceRemarks = 'Good';

  return {
    finalGpa,
    finalLetterGrade,
    hasFailed: false,
    failedSubjectNames: [],
    compulsoryPointsSum: Number(compulsoryPointsSum.toFixed(2)),
    compulsoryCount,
    fourthSubjectBonus,
    fourthSubjectName,
    totalMarksObtained,
    totalFullMarks,
    percentage,
    performanceRemarks,
  };
}
