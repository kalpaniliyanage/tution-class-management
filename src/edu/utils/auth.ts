// @ts-nocheck
import { Student, Teacher } from '../types';

export const ADMIN_CODES = ['admin', '1234', '9999'];

const digits = (v?: string) => (v || '').replace(/\D/g, '');

/** Stable non-crypto hash so generated codes never change between sessions. */
const hash = (seed: string): number => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

/** System-generated 6 digit numeric passcode for a given identity seed. */
export const generateCode = (seed: string, prefix = ''): string => {
  const n = hash(seed) % 1000000;
  return `${prefix}${String(n).padStart(6, '0')}`;
};

export const teacherCode = (t?: Teacher): string =>
  (t?.accessCode && t.accessCode.trim()) ||
  generateCode(`teacher:${t?.id || ''}:${digits(t?.phone)}`, 'T');

export const studentCode = (s?: Student): string =>
  (s?.accessCode && s.accessCode.trim()) ||
  s?.pin ||
  generateCode(`student:${s?.id || ''}:${s?.studentNumber || ''}`, 'S');

export const parentCode = (s?: Student): string =>
  generateCode(`parent:${s?.id || ''}:${digits(s?.parentPhone)}`, 'P');

export const matches = (input: string, expected: string) =>
  (input || '').trim().toLowerCase() === (expected || '').trim().toLowerCase();

/** Masked rendering, e.g. T123456 -> T•••••6 */
export const maskCode = (code?: string): string => {
  const c = (code || '').trim();
  if (!c) return '••••••';
  if (c.length <= 2) return '••';
  return `${c[0]}${'•'.repeat(Math.max(c.length - 2, 2))}${c[c.length - 1]}`;
};
