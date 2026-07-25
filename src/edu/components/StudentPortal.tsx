// @ts-nocheck
import React, { useState } from 'react';
import { Student, SubjectClass, PaymentRecord, ExamMark, TutePaper } from '../types';
import { GraduationCap, CreditCard, QrCode, Download, Award, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface StudentPortalProps {
  student: Student;
  enrolledClasses: SubjectClass[];
  payments: PaymentRecord[];
  exams: ExamMark[];
  tutes: TutePaper[];
  darkMode: boolean;
  onOpenPaymentCard: () => void;
  onOpenIDCard: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  enrolledClasses,
  payments,
  exams,
  tutes,
  darkMode,
  onOpenPaymentCard,
  onOpenIDCard
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Student Welcome Header */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-md ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="flex items-center gap-4">
          <img
            src={student.photo}
            alt={student.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-4 border-emerald-500 shadow-md shrink-0"
          />
          <div>
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
              STUDENT DASHBOARD
            </span>
            <h2 className="text-xl font-black">{student.fullName}</h2>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold font-mono">{student.studentNumber}</p>
            <p className="text-xs text-slate-500">{student.school} | Grade: {student.grade}</p>
          </div>
        </div>

        {/* Quick Card Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenPaymentCard}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black px-3.5 py-2 rounded-xl text-xs shadow-md transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>💳 Monthly Subject Card</span>
          </button>

          <button
            onClick={onOpenPaymentCard}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-md transition"
          >
            <Calendar className="w-4 h-4" />
            <span>🗓️ 12-Month Matrix</span>
          </button>

          <button
            onClick={onOpenIDCard}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-md transition"
          >
            <QrCode className="w-4 h-4" />
            <span>🪪 Digital ID Pass</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Classes, Papers & Exam Marks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: Enrolled Classes & Downloadable Papers */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Enrolled Classes */}
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-black text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              My Active Enrolled Tuition Classes ({enrolledClasses.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledClasses.map(cls => (
                <div key={cls.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2.5 text-xs flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-1">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">{cls.grade}</span>
                      <span className="font-black text-emerald-600">Rs. {cls.monthlyFee.toLocaleString()}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{cls.name}</h4>
                    <p className="text-slate-500 font-semibold">👨‍🏫 {cls.teacherName}</p>
                    <p className="text-slate-500">🗓️ Every {cls.dayOfWeek} ({cls.startTime} - {cls.endTime})</p>
                    <p className="text-slate-500">🏛️ {cls.hallName}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={onOpenPaymentCard}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-2.5 py-1.5 rounded-lg text-[11px] transition text-center shadow-2xs"
                    >
                      💳 Print Monthly Card
                    </button>
                    <button
                      onClick={onOpenPaymentCard}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black px-2.5 py-1.5 rounded-lg text-[11px] transition text-center shadow-2xs"
                    >
                      🗓️ 12-Month Matrix
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Model Papers & Tutes */}
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-black text-base flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-500" />
              Class Model Papers & Tutes (PDF Downloads)
            </h3>

            <div className="space-y-3 text-xs">
              {tutes.map(tut => (
                <div key={tut.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <div className="space-y-0.5">
                    <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {tut.type}
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{tut.title}</p>
                    <p className="text-[10px] text-slate-400">Issued Date: {tut.issuedDate}</p>
                  </div>

                  <a
                    href={tut.pdfUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Col 3: Exam Results & Rank Performance */}
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-black text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Exam Marks & Class Rank
            </h3>

            <div className="space-y-3 text-xs">
              {exams.map(ex => (
                <div key={ex.id} className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-600">{ex.className}</span>
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
    </div>
  );
};