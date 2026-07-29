// @ts-nocheck
import { Student, Teacher } from '../types';

export const ADMIN_CODES = ['admin', '1234', '9999'];

const digits = (v?: string) => (v || '').replace(/\D/g, '');

export const teacherCode = (t?: Teacher): string =>
  (t?.accessCode && t.accessCode.trim()) || `T${digits(t?.phone).slice(-4) || '0000'}`;

export const studentCode = (s?: Student): string =>
  (s?.accessCode && s.accessCode.trim()) || s?.pin || digits(s?.mobile).slice(-4) || '0000';

export const parentCode = (s?: Student): string =>
  digits(s?.parentPhone).slice(-4) || '0000';

export const matches = (input: string, expected: string) =>
  (input || '').trim().toLowerCase() === (expected || '').trim().toLowerCase();
