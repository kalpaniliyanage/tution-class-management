// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Student, Teacher } from '../types';
import { teacherCode, studentCode, parentCode, ADMIN_CODES } from '../utils/auth';
import { KeyRound, Eye, EyeOff, RefreshCw, Save, Search, Shield, Copy, CheckCircle2 } from 'lucide-react';

interface Props {
  darkMode: boolean;
  students: Student[];
  teachers: Teacher[];
  onUpdateStudent?: (s: Student) => void;
  onUpdateTeacher?: (t: Teacher) => void;
}

const randomCode = (prefix = '') =>
  prefix + Math.floor(1000 + Math.random() * 9000).toString();

export const CredentialsPanel: React.FC<Props> = ({
  darkMode,
  students,
  teachers,
  onUpdateStudent,
  onUpdateTeacher
}) => {
  const [reveal, setReveal] = useState(false);
  const [search, setSearch] = useState('');
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string>('');
  const [copied, setCopied] = useState<string>('');

  const card = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';

  const q = search.trim().toLowerCase();
  const filteredTeachers = useMemo(
    () => teachers.filter(t => !q || `${t.name} ${t.subject || ''} ${t.phone || ''}`.toLowerCase().includes(q)),
    [teachers, q]
  );
  const filteredStudents = useMemo(
    () => students.filter(s => !q || `${s.fullName} ${s.studentNumber || ''} ${s.parentPhone || ''}`.toLowerCase().includes(q)),
    [students, q]
  );

  const mask = (v: string) => (reveal ? v : '•'.repeat(Math.max(4, (v || '').length)));

  const draftKey = (kind: string, id: string) => `${kind}:${id}`;
  const getDraft = (kind: string, id: string, current: string) => {
    const k = draftKey(kind, id);
    return drafts[k] !== undefined ? drafts[k] : current;
  };
  const setDraft = (kind: string, id: string, val: string) =>
    setDrafts(p => ({ ...p, [draftKey(kind, id)]: val }));

  const flashSaved = (k: string) => {
    setSaved(k);
    setTimeout(() => setSaved(''), 1600);
  };

  const copy = async (value: string, k: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(k);
      setTimeout(() => setCopied(''), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  const saveTeacher = (t: Teacher) => {
    const val = getDraft('t', t.id, teacherCode(t)).trim();
    if (!val) return;
    onUpdateTeacher?.({ ...t, accessCode: val });
    flashSaved(draftKey('t', t.id));
  };

  const saveStudent = (s: Student) => {
    const val = getDraft('s', s.id, studentCode(s)).trim();
    if (!val) return;
    onUpdateStudent?.({ ...s, accessCode: val, pin: val });
    flashSaved(draftKey('s', s.id));
  };

  const saveParent = (s: Student) => {
    const val = getDraft('p', s.id, parentCode(s)).trim();
    if (!val) return;
    onUpdateStudent?.({ ...s, parentAccessCode: val });
    flashSaved(draftKey('p', s.id));
  };

  const inputCls = `w-full px-3 py-2 rounded-xl border font-mono text-xs ${
    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  }`;

  const CodeRow = ({ label, value, kind, id, onSave, onReset }: any) => {
    const k = draftKey(kind, id);
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-slate-500 w-24 font-bold">{label}</span>
        {reveal ? (
          <input value={value} onChange={e => setDraft(kind, id, e.target.value)} className={`${inputCls} max-w-[160px]`} />
        ) : (
          <span className="px-3 py-2 rounded-xl bg-slate-500/10 font-mono text-xs tracking-[0.3em]">{mask(value)}</span>
        )}
        <button
          type="button"
          onClick={() => copy(value, k)}
          className="p-2 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-400"
          title="Copy code"
        >
          {copied === k ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-2.5 py-2 rounded-lg bg-amber-500/15 text-amber-500 text-[10px] font-black flex items-center gap-1 hover:bg-amber-500/25"
        >
          <RefreshCw className="w-3 h-3" /> RESET
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-2.5 py-2 rounded-lg bg-emerald-600 text-white text-[10px] font-black flex items-center gap-1 hover:bg-emerald-500"
        >
          <Save className="w-3 h-3" /> {saved === k ? 'SAVED' : 'SAVE'}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl border p-5 ${card}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-500" />
              Login Passwords & Access Codes
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Only the administrator can open this tab. View, reset and save the login codes for every teacher, student and parent.
            </p>
          </div>
          <button
            onClick={() => setReveal(r => !r)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${
              reveal ? 'bg-rose-600 text-white' : 'bg-slate-600 text-white'
            }`}
          >
            {reveal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {reveal ? 'Hide all passwords' : 'Show all passwords'}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search teacher / student / index number..."
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-bold ${
                darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300'
              }`}
            />
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs font-bold text-rose-500 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Administrator passcodes: <code className="font-mono text-amber-500">{reveal ? ADMIN_CODES.join('  /  ') : '••••'}</code>
        </div>
      </div>

      {/* Teachers */}
      <div className={`rounded-2xl border p-5 ${card}`}>
        <h4 className="font-black text-sm mb-3">Teacher Portal PINs ({filteredTeachers.length})</h4>
        <div className="space-y-3">
          {filteredTeachers.map(t => (
            <div key={t.id} className="p-3 rounded-xl border border-slate-500/20 space-y-2">
              <p className="text-xs font-black">
                {t.title} {t.name} <span className="text-slate-500 font-bold">• {t.subject}</span>
              </p>
              <CodeRow
                label="Teacher PIN"
                value={getDraft('t', t.id, teacherCode(t))}
                kind="t"
                id={t.id}
                onSave={() => saveTeacher(t)}
                onReset={() => { setReveal(true); setDraft('t', t.id, randomCode('T')); }}
              />
            </div>
          ))}
          {filteredTeachers.length === 0 && <p className="text-xs text-slate-500">No teachers found.</p>}
        </div>
      </div>

      {/* Students + Parents */}
      <div className={`rounded-2xl border p-5 ${card}`}>
        <h4 className="font-black text-sm mb-3">Student & Parent Login Codes ({filteredStudents.length})</h4>
        <div className="space-y-3">
          {filteredStudents.map(s => (
            <div key={s.id} className="p-3 rounded-xl border border-slate-500/20 space-y-2">
              <p className="text-xs font-black">
                {s.fullName}{' '}
                <span className="text-slate-500 font-bold">• {s.studentNumber} • {s.grade}</span>
              </p>
              <CodeRow
                label="Student PIN"
                value={getDraft('s', s.id, studentCode(s))}
                kind="s"
                id={s.id}
                onSave={() => saveStudent(s)}
                onReset={() => { setReveal(true); setDraft('s', s.id, randomCode()); }}
              />
              <CodeRow
                label="Parent code"
                value={getDraft('p', s.id, parentCode(s))}
                kind="p"
                id={s.id}
                onSave={() => saveParent(s)}
                onReset={() => { setReveal(true); setDraft('p', s.id, randomCode()); }}
              />
            </div>
          ))}
          {filteredStudents.length === 0 && <p className="text-xs text-slate-500">No students found.</p>}
        </div>
      </div>
    </div>
  );
};
