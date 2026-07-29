// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Student, ExamMark, SubjectClass, FreeCardAward } from '../types';
import {
  HeartHandshake, CalendarClock, Trophy, Send, Trash2, Search,
  CheckCircle2, AlertTriangle, Award, MessageSquare
} from 'lucide-react';

interface FinancialAidPanelProps {
  students: Student[];
  classes: SubjectClass[];
  exams: ExamMark[];
  freeCards: FreeCardAward[];
  darkMode: boolean;
  onUpdateStudent?: (student: Student) => void;
  onAddFreeCard?: (award: FreeCardAward) => void;
  onDeleteFreeCard?: (id: string) => void;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const todayISO = () => new Date().toISOString().split('T')[0];
const currentMonthLabel = () => `${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`;

export const FinancialAidPanel: React.FC<FinancialAidPanelProps> = ({
  students,
  classes,
  exams,
  freeCards,
  darkMode,
  onUpdateStudent,
  onAddFreeCard,
  onDeleteFreeCard
}) => {
  const [search, setSearch] = useState('');

  // Concession form
  const [concessionStudentId, setConcessionStudentId] = useState(students[0]?.id || '');
  const [concessionReason, setConcessionReason] = useState('Economic hardship — family income difficulty');
  const [graceUntil, setGraceUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  // Free card form
  const alStudents = useMemo(
    () => students.filter(s => (s.grade || '').toUpperCase().includes('A/L') || (s.stream || '') !== ''),
    [students]
  );
  const [awardStudentId, setAwardStudentId] = useState(alStudents[0]?.id || students[0]?.id || '');
  const [awardClassId, setAwardClassId] = useState(classes[0]?.id || '');
  const [awardExamTitle, setAwardExamTitle] = useState('A/L Monthly Model Exam');
  const [awardMarks, setAwardMarks] = useState(92);
  const [awardMonth, setAwardMonth] = useState(currentMonthLabel());
  const [flash, setFlash] = useState('');

  const concessionStudents = students.filter(s => s.feeConcession?.active);
  const filteredCards = freeCards.filter(c =>
    !search.trim() ||
    c.studentName.toLowerCase().includes(search.toLowerCase()) ||
    (c.studentNumber || '').toLowerCase().includes(search.toLowerCase())
  );

  const grantConcession = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find(s => s.id === concessionStudentId);
    if (!stu || !onUpdateStudent) return;
    onUpdateStudent({
      ...stu,
      feeConcession: {
        active: true,
        reason: concessionReason,
        graceUntil,
        approvedBy: 'System Administrator',
        grantedDate: todayISO()
      }
    });
    setFlash(`Grace period granted to ${stu.fullName} until ${graceUntil}.`);
  };

  const revokeConcession = (stu: Student) => {
    if (!onUpdateStudent) return;
    onUpdateStudent({ ...stu, feeConcession: { ...(stu.feeConcession || {}), active: false } });
  };

  const grantFreeCard = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find(s => s.id === awardStudentId);
    if (!stu || !onAddFreeCard) return;
    const cls = classes.find(c => c.id === awardClassId);
    const smsMessage = `EduMaster: Congratulations! ${stu.fullName} (${stu.studentNumber}) achieved ${awardMarks}/100 in ${awardExamTitle} and has been awarded a FREE CLASS CARD for ${awardMonth}. No class fee is due this month.`;
    onAddFreeCard({
      id: `free-${Date.now()}`,
      studentId: stu.id,
      studentName: stu.fullName,
      studentNumber: stu.studentNumber,
      photo: stu.photo,
      grade: stu.grade,
      stream: stu.stream,
      classId: cls?.id,
      className: cls?.name,
      examTitle: awardExamTitle,
      marks: Number(awardMarks),
      maxMarks: 100,
      gradeScore: Number(awardMarks) >= 75 ? 'A' : Number(awardMarks) >= 65 ? 'B' : 'C',
      month: awardMonth,
      awardedDate: todayISO(),
      parentPhone: stu.parentPhone,
      smsSent: true,
      smsMessage
    });
    setFlash(`Free card issued to ${stu.fullName} • SMS dispatched to ${stu.parentPhone}.`);
  };

  const card = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const field = 'w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-xs';

  return (
    <div className="space-y-6">
      {flash && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {flash}
        </div>
      )}

      {/* Fee Concession / Grace Period */}
      <div className={`rounded-2xl border p-5 ${card}`}>
        <div className="flex items-center gap-2 mb-4">
          <HeartHandshake className="w-5 h-5 text-amber-500" />
          <h3 className="font-black text-sm">Fee Concessions — Extended Payment Grace Period</h3>
        </div>
        <p className="text-[11px] text-slate-500 mb-4">
          Students who cannot pay on the due date because of economic problems are tracked here separately and given
          a free extended time period to settle their class fees.
        </p>

        <form onSubmit={grantConcession} className="grid md:grid-cols-4 gap-3 mb-5 text-xs">
          <div className="md:col-span-2">
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Student</label>
            <select value={concessionStudentId} onChange={e => setConcessionStudentId(e.target.value)} className={field}>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.studentNumber} — {s.fullName} ({s.grade})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Pay Before (Grace Date)</label>
            <input type="date" value={graceUntil} onChange={e => setGraceUntil(e.target.value)} className={field} />
          </div>
          <div className="md:col-span-3">
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Reason / Hardship Note</label>
            <input type="text" value={concessionReason} onChange={e => setConcessionReason(e.target.value)} className={field} />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5">
              <CalendarClock className="w-4 h-4" /> Grant Grace Period
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {concessionStudents.length === 0 && (
            <p className="text-[11px] text-slate-500 italic">No students currently on a fee concession.</p>
          )}
          {concessionStudents.map(s => {
            const overdue = s.feeConcession?.graceUntil && s.feeConcession.graceUntil < todayISO();
            return (
              <div key={s.id} className={`flex flex-wrap items-center gap-3 p-3 rounded-xl border ${overdue ? 'border-rose-500/40 bg-rose-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
                <img src={s.photo} alt={s.fullName} className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-[180px]">
                  <p className="text-xs font-black">{s.fullName} <span className="text-slate-500 font-mono">({s.studentNumber})</span></p>
                  <p className="text-[10px] text-slate-500">{s.feeConcession?.reason}</p>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${overdue ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'}`}>
                  {overdue ? <><AlertTriangle className="w-3 h-3 inline mr-1" />Grace expired {s.feeConcession?.graceUntil}</> : `Pay before ${s.feeConcession?.graceUntil}`}
                </span>
                <button onClick={() => revokeConcession(s)} className="text-[10px] font-bold text-slate-500 hover:text-rose-500 underline">
                  Revoke
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Free Card Awards */}
      <div className={`rounded-2xl border p-5 ${card}`}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-emerald-500" />
          <h3 className="font-black text-sm">Monthly Free Card — Best A/L Achievers</h3>
        </div>
        <p className="text-[11px] text-slate-500 mb-4">
          Award a free class card for the month to A/L students with the best exam marks. Parents are notified by SMS automatically.
        </p>

        <form onSubmit={grantFreeCard} className="grid md:grid-cols-5 gap-3 mb-5 text-xs">
          <div className="md:col-span-2">
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">A/L Student</label>
            <select value={awardStudentId} onChange={e => setAwardStudentId(e.target.value)} className={field}>
              {(alStudents.length ? alStudents : students).map(s => (
                <option key={s.id} value={s.id}>{s.studentNumber} — {s.fullName} ({s.stream || s.grade})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Class</label>
            <select value={awardClassId} onChange={e => setAwardClassId(e.target.value)} className={field}>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Marks /100</label>
            <input type="number" min={0} max={100} value={awardMarks} onChange={e => setAwardMarks(Number(e.target.value))} className={field} />
          </div>
          <div>
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Free Month</label>
            <input type="text" value={awardMonth} onChange={e => setAwardMonth(e.target.value)} className={field} />
          </div>
          <div className="md:col-span-4">
            <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Exam Title</label>
            <input type="text" value={awardExamTitle} onChange={e => setAwardExamTitle(e.target.value)} className={field} />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" /> Issue Free Card + SMS
            </button>
          </div>
        </form>

        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search free card holders..."
            className={`${field} pl-9`}
          />
        </div>

        <div className="space-y-2">
          {filteredCards.length === 0 && (
            <p className="text-[11px] text-slate-500 italic">No free cards issued yet.</p>
          )}
          {filteredCards.map(c => (
            <div key={c.id} className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <img src={c.photo} alt={c.studentName} className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-[180px]">
                  <p className="text-xs font-black">{c.studentName} <span className="text-slate-500 font-mono">({c.studentNumber})</span></p>
                  <p className="text-[10px] text-slate-500">{c.examTitle} • {c.marks}/{c.maxMarks} • {c.className || c.grade}</p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white">FREE CARD • {c.month}</span>
                {onDeleteFreeCard && (
                  <button onClick={() => onDeleteFreeCard(c.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {c.smsSent && (
                <div className="text-[10px] text-slate-400 flex items-start gap-1.5 bg-slate-950/40 rounded-lg p-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b className="text-emerald-400">SMS sent to {c.parentPhone}:</b> {c.smsMessage}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
