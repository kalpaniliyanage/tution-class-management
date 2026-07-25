// @ts-nocheck
import {
  SubjectClass, Teacher, Student, PaymentRecord, AttendanceRecord,
  ExamMark, Notice, WallOfFameItem, InstituteSettings, TutePaper, Hall
} from '../types';
import {
  INITIAL_INSTITUTE_SETTINGS, INITIAL_TEACHERS, INITIAL_CLASSES,
  INITIAL_STUDENTS, INITIAL_PAYMENTS, INITIAL_ATTENDANCE,
  INITIAL_EXAMS, INITIAL_WALL_OF_FAME, INITIAL_NOTICES, INITIAL_TUTES,
  INITIAL_HALLS
} from '../data/mockData';

const KEYS = {
  CLASSES: 'edumaster_classes_v2',
  TEACHERS: 'edumaster_teachers_v2',
  STUDENTS: 'edumaster_students_v2',
  PAYMENTS: 'edumaster_payments_v2',
  ATTENDANCE: 'edumaster_attendance_v2',
  EXAMS: 'edumaster_exams_v2',
  SETTINGS: 'edumaster_settings_v2',
  NOTICES: 'edumaster_notices_v2',
  WALL_OF_FAME: 'edumaster_wof_v2',
  TUTES: 'edumaster_tutes_v2',
  HALLS: 'edumaster_halls_v2'
};

export const getStoredHalls = (): Hall[] => {
  const data = localStorage.getItem(KEYS.HALLS);
  return data ? JSON.parse(data) : INITIAL_HALLS;
};

export const saveStoredHalls = (halls: Hall[]) => {
  localStorage.setItem(KEYS.HALLS, JSON.stringify(halls));
};

export const getStoredClasses = (): SubjectClass[] => {
  const data = localStorage.getItem(KEYS.CLASSES);
  return data ? JSON.parse(data) : INITIAL_CLASSES;
};

export const saveStoredClasses = (classes: SubjectClass[]) => {
  localStorage.setItem(KEYS.CLASSES, JSON.stringify(classes));
};

export const getStoredTeachers = (): Teacher[] => {
  const data = localStorage.getItem(KEYS.TEACHERS);
  return data ? JSON.parse(data) : INITIAL_TEACHERS;
};

export const saveStoredTeachers = (teachers: Teacher[]) => {
  localStorage.setItem(KEYS.TEACHERS, JSON.stringify(teachers));
};

export const getStoredStudents = (): Student[] => {
  const data = localStorage.getItem(KEYS.STUDENTS);
  return data ? JSON.parse(data) : INITIAL_STUDENTS;
};

export const saveStoredStudents = (students: Student[]) => {
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
};

export const getStoredPayments = (): PaymentRecord[] => {
  const data = localStorage.getItem(KEYS.PAYMENTS);
  return data ? JSON.parse(data) : INITIAL_PAYMENTS;
};

export const saveStoredPayments = (payments: PaymentRecord[]) => {
  localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(payments));
};

export const getStoredAttendance = (): AttendanceRecord[] => {
  const data = localStorage.getItem(KEYS.ATTENDANCE);
  return data ? JSON.parse(data) : INITIAL_ATTENDANCE;
};

export const saveStoredAttendance = (records: AttendanceRecord[]) => {
  localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(records));
};

export const getStoredExams = (): ExamMark[] => {
  const data = localStorage.getItem(KEYS.EXAMS);
  return data ? JSON.parse(data) : INITIAL_EXAMS;
};

export const saveStoredExams = (exams: ExamMark[]) => {
  localStorage.setItem(KEYS.EXAMS, JSON.stringify(exams));
};

export const getStoredSettings = (): InstituteSettings => {
  const data = localStorage.getItem(KEYS.SETTINGS);
  return data ? JSON.parse(data) : INITIAL_INSTITUTE_SETTINGS;
};

export const saveStoredSettings = (settings: InstituteSettings) => {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

export const getStoredNotices = (): Notice[] => {
  const data = localStorage.getItem(KEYS.NOTICES);
  return data ? JSON.parse(data) : INITIAL_NOTICES;
};

export const saveStoredNotices = (notices: Notice[]) => {
  localStorage.setItem(KEYS.NOTICES, JSON.stringify(notices));
};

export const getStoredWallOfFame = (): WallOfFameItem[] => {
  const data = localStorage.getItem(KEYS.WALL_OF_FAME);
  return data ? JSON.parse(data) : INITIAL_WALL_OF_FAME;
};

export const saveStoredWallOfFame = (items: WallOfFameItem[]) => {
  localStorage.setItem(KEYS.WALL_OF_FAME, JSON.stringify(items));
};

export const getStoredTutes = (): TutePaper[] => {
  const data = localStorage.getItem(KEYS.TUTES);
  return data ? JSON.parse(data) : INITIAL_TUTES;
};

export const saveStoredTutes = (tutes: TutePaper[]) => {
  localStorage.setItem(KEYS.TUTES, JSON.stringify(tutes));
};

export const resetSystemToDefaults = () => {
  localStorage.clear();
  window.location.reload();
};