export type Role = 'guest' | 'admin' | 'teacher' | 'student' | 'parent';

export interface ClassBadge {
  id: string;
  label: string;
  color: string; // e.g., 'blue', 'purple', 'emerald', 'amber', 'rose', 'indigo', 'cyan', 'gray'
  category?: 'grade' | 'medium' | 'type' | 'custom' | 'status';
}

export interface SubjectClass {
  id: string;
  name: string;
  grade: string; // e.g. "Grade 6", "Grade 11 (O/L)", "2028 A/L", "2027 A/L"
  stream?: 'Maths' | 'Science' | 'Commerce' | 'Arts' | 'Technology' | 'Common' | 'Junior' | 'OL';
  medium: 'Sinhala' | 'English' | 'Tamil';
  subjectName: string;
  type: 'Theory' | 'Revision' | 'Paper Class' | 'Paper & Revision' | 'Special Extra';
  teacherId: string;
  teacherName: string;
  teacherTitle: string;
  teacherPhoto: string;
  teacherQualifications: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g. "08:30 AM"
  endTime: string;   // e.g. "10:30 AM"
  durationHours: number; // e.g. 2 or 8
  hallName: string;
  monthlyFee: number;
  badges: ClassBadge[]; // Badges attached to this class
  coverImage?: string; // Class card cover image URL
  description?: string; // Short subject catalog overview
  syllabusHighlights?: string[]; // Key topic bullets for catalog view
  isCancelledToday?: boolean;
  cancelReason?: string;
  replacementDate?: string;
  yearBatch?: string;
  maxCapacity?: number;
  enrolledCount?: number;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  photo: string;
  subjects: string[];
  qualifications: string;
  phone: string;
  email: string;
  availableDays: string[];
  salaryScale: number;
}

export interface Student {
  id: string;
  studentNumber: string; // EDU-2026-G11-00125
  fullName: string;
  nameWithInitials: string;
  photo: string;
  school: string;
  grade: string;
  stream?: string;
  medium: 'Sinhala' | 'English' | 'Tamil';
  dob: string;
  gender: 'Male' | 'Female';
  address: string;
  mobile: string;
  parentName: string;
  parentPhone: string;
  emergencyPhone: string;
  joinedDate: string;
  enrolledClassIds: string[];
  qrCodeUrl?: string;
  pin: string;
  lastAttendanceDate?: string;
  daysAbsentCount?: number;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  month: string; // e.g., "January 2026"
  year: number;
  amount: number;
  paidDate: string;
  receiptNumber: string;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Online';
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  status: 'Present' | 'Absent' | 'Late';
  smsSent: boolean;
  smsLogMessage?: string;
}

export interface ExamMark {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  examTitle: string; // e.g. "Paper 05 - Combined Maths Model Exam"
  marks: number;
  maxMarks: number;
  gradeScore: string; // A+, A, B, C, S, F
  rank?: number;
  totalStudents?: number;
  date: string;
}

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  facilities: string[];
  isAvailable?: boolean;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Urgent Alert' | 'Class Rescheduled' | 'General' | 'Exam' | 'Poya Holiday';
  teacherName?: string;
  targetGrades?: string[];
  isHeaderBanner?: boolean;
  isUrgent?: boolean;
  authorName?: string;
  authorRole?: string;
  authorPhoto?: string;
}

export interface WallOfFameItem {
  id: string;
  studentName: string;
  photo: string;
  examType: 'A/L' | 'O/L';
  year: string;
  streamOrGrade: string;
  school: string;
  resultsSummary: string; // e.g. "Island Rank 04 • Z-Score 2.8421" or "9 A's (Distinction)"
  islandRank?: string;
  districtRank?: string;
  zScore?: string;
  subjectGrades: { subject: string; grade: string }[];
}

export interface InstituteSettings {
  name: string;
  tagline: string;
  logo: string;
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  weekdayHours: string;
  weekendHours: string;
  poyaHolidayNotice: string;
  bannerNoticeText: string;
  showBannerNotice: boolean;
  bannerNoticeAuthor?: string;
  bannerNoticeRole?: string;
  bannerNoticeDate?: string;
}

export interface TutePaper {
  id: string;
  title: string;
  classId: string;
  type: 'Paper' | 'Tute' | 'Revision Note';
  issuedDate: string;
  pdfUrl?: string;
  issuedToAll: boolean;
  statusMap: Record<string, 'Issued' | 'Not Issued'>; // studentId -> status
}
