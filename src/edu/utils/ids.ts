// @ts-nocheck
/**
 * One student = one unique lifetime identity number.
 * Format: EDU-<year>-<grade tag>-<5 digit serial>
 * The serial is checked against every existing student so it can never repeat,
 * no matter how many classes the student joins.
 */
export function gradeTag(grade = ''): string {
  const m = String(grade).match(/(\d{1,2})/);
  if (m) return `G${m[1].padStart(2, '0')}`;
  if (/a\/?l/i.test(grade)) return 'AL';
  if (/o\/?l/i.test(grade)) return 'OL';
  return 'GEN';
}

export function generateStudentNumber(existing: { studentNumber?: string }[] = [], grade = ''): string {
  const year = new Date().getFullYear();
  const taken = new Set((existing || []).map(s => (s.studentNumber || '').toUpperCase()));
  const serials = (existing || [])
    .map(s => Number(String(s.studentNumber || '').split('-').pop()))
    .filter(n => Number.isFinite(n));
  let next = (serials.length ? Math.max(...serials) : 100) + 1;
  let candidate = '';
  do {
    candidate = `EDU-${year}-${gradeTag(grade)}-${String(next).padStart(5, '0')}`;
    next += 1;
  } while (taken.has(candidate.toUpperCase()));
  return candidate;
}

/** True when this number already belongs to another student. */
export function isDuplicateStudentNumber(
  number: string,
  existing: { id: string; studentNumber?: string }[] = [],
  ignoreId?: string,
): boolean {
  const n = (number || '').trim().toUpperCase();
  if (!n) return false;
  return (existing || []).some(s => s.id !== ignoreId && (s.studentNumber || '').toUpperCase() === n);
}
