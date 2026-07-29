// @ts-nocheck
import React, { useState } from 'react';
import { SubjectClass, AttendanceRecord, ExamMark, Notice, Student, Teacher, TutePaper } from '../types';
import { UserCheck, Calendar, Clock, MapPin, CheckCircle2, AlertTriangle, Send, FileText, Award } from 'lucide-react';
import { MaterialsUploader } from './MaterialsUploader';

interface TeacherPortalProps {
  activeTeacher?: Teacher;
  classes: SubjectClass[];
  students: Student[];
  attendance: AttendanceRecord[];
  exams: ExamMark[];
  tutes?: TutePaper[];
  darkMode: boolean;
  onAddTute?: (tute: TutePaper) => void;
  onDeleteTute?: (id: string) => void;
  onMarkAttendance: (studentId: string, classId: string, status: 'Present' | 'Absent' | 'Late') => void;
  onPostNotice: (notice: Notice) => void;
  onRecordMark: (mark: ExamMark) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  activeTeacher,
  classes,
  students,
  attendance,
  exams,
  tutes = [],
  darkMode,
  onAddTute,
  onDeleteTute,
  onMarkAttendance,
  onPostNotice,
  onRecordMark
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'attendance' | 'marks' | 'materials' | 'notices'>('schedule');

  // Teacher Identity Defaults
  const teacherName = activeTeacher ? `${activeTeacher.title} ${activeTeacher.name}` : 'Mr. Dinesh Liyanage';
  const teacherSubject = activeTeacher ? activeTeacher.subject : 'Combined Mathematics';
  const teacherPhoto = activeTeacher ? activeTeacher.photoUrl : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // Filter teacher's own classes if matching, or all classes if default
  const teacherClasses = activeTeacher 
    ? classes.filter(c => 
        (c.teacherName || '').toLowerCase().includes((activeTeacher.name || '').toLowerCase()) || 
        (c.subject || '').toLowerCase().includes((activeTeacher.subject || '').toLowerCase())
      )
    : classes;
  const displayClasses = teacherClasses.length > 0 ? teacherClasses : classes;

  // Cancel notice state
  const [cancelReason, setCancelReason] = useState('');
  const [selectedClassIdToCancel, setSelectedClassIdToCancel] = useState(displayClasses[0]?.id || '');

  const handleCancelNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelReason.trim()) return;

    const targetCls = classes.find(c => c.id === selectedClassIdToCancel);
    const notice: Notice = {
      id: `not-teacher-${Date.now()}`,
      title: `CLASS CANCELLATION NOTICE: ${targetCls?.name}`,
      content: `Please note that ${targetCls?.name} session on ${targetCls?.dayOfWeek} has been cancelled. Reason: ${cancelReason}. Parent SMS alert dispatched.`,
      date: new Date().toISOString().split('T')[0],
      category: 'Urgent Alert',
      teacherName: teacherName,
      isHeaderBanner: true
    };

    onPostNotice(notice);
    setCancelReason('');
    alert('Cancellation notice published and SMS alert logged to all parents!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Teacher Portal Header */}
      <div className={`relative overflow-hidden lk-motif lk-rise p-6 rounded-3xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-md ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="lk-flagline absolute top-0 left-0 right-0" />
        <div className="flex items-center gap-4">
          <img
            src={teacherPhoto}
            alt="Teacher"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500 shadow-md shrink-0 lk-float"
          />
          <div>
            <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
              FACULTY LECTURER PORTAL
            </span>
            <h2 className="text-xl font-black lk-gradient-text">{teacherName}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Senior Lecturer in {teacherSubject}</p>
            <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">ගුරු පිවිසුම • Faculty Workspace</p>
          </div>
        </div>


        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'schedule' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            My Classes
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'attendance' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            Class Registers
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'materials' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            Tutes & Papers
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'notices' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            Emergency Cancellation
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map(cls => (
            <div key={cls.id} className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mr-2">
                    {cls.grade}
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">{cls.name}</h4>
                </div>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded">
                  Rs. {cls.monthlyFee.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs space-y-1 font-medium text-slate-600 dark:text-slate-300">
                <p>🗓️ Schedule: Every {cls.dayOfWeek} ({cls.startTime} - {cls.endTime})</p>
                <p>🏛️ Location: {cls.hallName}</p>
                <p>⏱️ Type: {cls.type} ({cls.durationHours} Hours)</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-black text-base">Register Gate Attendance</h3>
          <p className="text-xs text-slate-500">Mark student attendance status to trigger automatic parent SMS dispatches.</p>

          <div className="space-y-3">
            {students.map(stu => (
              <div key={stu.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img src={stu.photo} alt={stu.fullName} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white">{stu.fullName}</p>
                    <p className="text-[11px] text-slate-500">{stu.studentNumber} | Parent: {stu.parentPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMarkAttendance(stu.id, classes[0]?.id || '', 'Present')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition"
                  >
                    Mark Present
                  </button>
                  <button
                    onClick={() => onMarkAttendance(stu.id, classes[0]?.id || '', 'Absent')}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1.5 rounded-lg transition"
                  >
                    Mark Absent (SMS)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'materials' && (
        <MaterialsUploader
          classes={displayClasses.length > 0 ? displayClasses : classes}
          tutes={tutes}
          darkMode={darkMode}
          uploadedBy={teacherName}
          onAddTute={t => onAddTute && onAddTute(t)}
          onDeleteTute={id => onDeleteTute && onDeleteTute(id)}
        />
      )}

      {activeTab === 'notices' && (
        <div className={`p-6 rounded-2xl border space-y-4 max-w-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-black text-base text-rose-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Post Class Emergency Cancellation Notice
          </h3>
          <p className="text-xs text-slate-500">
            Publishing a cancellation notice immediately displays the banner alert on the website header and dispatches parent SMS logs.
          </p>

          <form onSubmit={handleCancelNoticeSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold mb-1">Select Class:</label>
              <select
                value={selectedClassIdToCancel}
                onChange={e => setSelectedClassIdToCancel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Reason for Cancellation:</label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Teacher illness / Special Poya day schedule..."
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-2.5 rounded-xl shadow-md transition"
            >
              Publish Cancellation & Dispatches
            </button>
          </form>
        </div>
      )}
    </div>
  );
};