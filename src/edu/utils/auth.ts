// @ts-nocheck
import { Student, Teacher } from '../types';

export const ADMIN_CODES = ['admin', '1234', '9999'];

const digits = (v?: string) => (v || '').replace(/\D/g, '');

export const teacherCode = (t?: Teacher): string =>
  (t?.accessCode && t.accessCode.trim()) || `T${digits(t?.phone).slice(-4) || '0000'}`;

export const studentCode = (s?: Student): string =>
  (s?.accessCode && s.accessCode.trim()) || s?.pin || digits(s?.mobile).slice(-4) || '0000';

export const parentCode = (s?: Student): string =>
  (s?.parentAccessCode && s.parentAccessCode.trim()) || digits(s?.parentPhone).slice(-4) || '0000';

export const maskCode = (code?: string): string =>
  '•'.repeat(Math.max(4, (code || '').length));

export const matches = (input: string, expected: string) =>
  (input || '').trim().toLowerCase() === (expected || '').trim().toLowerCase();

/* ---- "Remember me" saved logins for student & parent portals ---- */
const SAVED_KEY = 'edu_saved_logins_v1';

export type SavedLogin = { studentId: string; code: string; barcode?: string };

const readAll = (): Record<string, SavedLogin> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(SAVED_KEY) || '{}');
  } catch {
    return {};
  }
};

export const getSavedLogin = (role: 'student' | 'parent'): SavedLogin | null =>
  readAll()[role] || null;

export const saveLogin = (role: 'student' | 'parent', data: SavedLogin) => {
  if (typeof window === 'undefined') return;
  const all = readAll();
  all[role] = data;
  window.localStorage.setItem(SAVED_KEY, JSON.stringify(all));
};

export const clearSavedLogin = (role: 'student' | 'parent') => {
  if (typeof window === 'undefined') return;
  const all = readAll();
  delete all[role];
  window.localStorage.setItem(SAVED_KEY, JSON.stringify(all));
};
