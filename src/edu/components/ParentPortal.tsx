// @ts-nocheck
import React from 'react';
import { Student, SubjectClass, PaymentRecord, AttendanceRecord, ExamMark } from '../types';
import { Users, Shield, Clock, Send, CreditCard, Award, QrCode, Calendar } from 'lucide-react';

interface ParentPortalProps {
  student: Student;
  enrolledClasses: SubjectClass[];
  payments: PaymentRecord[];
  attendance: AttendanceRecord[];
  exams: ExamMark[];
  darkMode: boolean;
  onOpenPaymentCard: () => void;
  onOpenIDCard?: () => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  student,
  enrolledClasses,
  payments,
  attendance,
  exams,
  darkMode,
  onOpenPaymentCard,
  onOpenIDCard
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Guardian Header */}
      <div className={`relative overflow-hidden lk-motif lk-rise p-6 rounded-3xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-md ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="lk-flagline absolute top-0 left-0 right-0" />
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0 lk-float">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <span className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
              GUARDIAN & PARENT PORTAL
            </span>
            <h2 className="text-xl font-black lk-gradient-text">{student.parentName}</h2>
            <p className="text-xs text-slate-500">Parent / Guardian of <strong>{student.fullName}</strong> ({student.studentNumber})</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Registered Mobile: {student.parentPhone}</p>
            <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">දෙමාපිය පිවිසුම • Guardian Access</p>
          </div>
        </div>


        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenPaymentCard}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black px-3.5 py-2.5 rounded-xl text-xs shadow-md transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>💳 Monthly Subject Card</span>
          </button>

          <button
            onClick={onOpenPaymentCard}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-3.5 py-2.5 rounded-xl text-xs shadow-md transition"
          >
            <Calendar className="w-4 h-4" />
            <span>🗓️ 12-Month Matrix</span>
          </button>

          {onOpenIDCard && (
            <button
              onClick={onOpenIDCard}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-3.5 py-2.5 rounded-xl text-xs shadow-md transition"
            >
              <QrCode className="w-4 h-4" />
              <span>🪪 Digital ID Pass</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Gate Attendance Logs & SMS Dispatches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gate Check-In & Attendance History */}
        <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-black text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            Gate Check-In & Attendance Logs
          </h3>

          <div className="space-y-3 text-xs">
            {attendance.map(att => (
              <div key={att.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 dark:text-white text-sm">{att.className}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    att.status === 'Present' ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {att.status}
                  </span>
                </div>
                <p className="text-slate-500">Timestamp: {att.date} at {att.time}</p>
                {att.smsLogMessage && (
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <Send className="w-3 h-3" />
                    <span>{att.smsLogMessage}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Child Exam Marks */}
        <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-black text-base flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Academic Examination Progress
          </h3>

          <div className="space-y-3 text-xs">
            {exams.map(ex => (
              <div key={ex.id} className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{ex.examTitle}</p>
                <div className="flex items-center justify-between pt-1 text-slate-700 dark:text-slate-300 font-extrabold">
                  <span>Score: <strong className="text-emerald-600 text-sm">{ex.marks} / {ex.maxMarks} ({ex.gradeScore})</strong></span>
                  <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px]">Rank #{ex.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};