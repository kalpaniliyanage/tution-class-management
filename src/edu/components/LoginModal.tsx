// @ts-nocheck
import React, { useState } from 'react';
import { Role, Student, Teacher } from '../types';
import { ADMIN_CODES, teacherCode, studentCode, parentCode, matches, getSavedLogin, saveLogin, clearSavedLogin } from '../utils/auth';
import { LogIn, Shield, UserCheck, GraduationCap, Users, X, Sparkles, Key, QrCode, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  darkMode: boolean;
  students: Student[];
  teachers: Teacher[];
  onSelectRole: (role: Role, userLabel?: string, studentId?: string, teacherId?: string) => void;
  onClose: () => void;
  onOpenGateSecurity?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  darkMode,
  students,
  teachers,
  onSelectRole,
  onClose,
  onOpenGateSecurity
}) => {
  const [selectedRoleOption, setSelectedRoleOption] = useState<Role>('admin');
  const [passcode, setPasscode] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || '');
  const [studentBarcodeCode, setStudentBarcodeCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Restore a saved student / parent login when that portal is picked
  React.useEffect(() => {
    if (selectedRoleOption !== 'student' && selectedRoleOption !== 'parent') return;
    const saved = getSavedLogin(selectedRoleOption);
    if (!saved) { setRememberMe(false); return; }
    setRememberMe(true);
    if (saved.studentId) setSelectedStudentId(saved.studentId);
    if (selectedRoleOption === 'student') setStudentBarcodeCode(saved.barcode || '');
    setPasscode(saved.code || '');
  }, [selectedRoleOption]);

  const persistLogin = (role: 'student' | 'parent', studentId: string, code: string, barcode?: string) => {
    if (rememberMe) saveLogin(role, { studentId, code, barcode });
    else clearSavedLogin(role);
  };

  // Find selected entities
  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const activeTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (selectedRoleOption === 'admin') {
      if (!passcode.trim()) {
        setLoginError('Administrator passcode is required to open this portal.');
        return;
      }
      if (!ADMIN_CODES.some(c => matches(passcode, c))) {
        setLoginError('Invalid Administrator Passcode. Access denied.');
        return;
      }
      onSelectRole('admin', 'System Administrator');
      onClose();
    } else if (selectedRoleOption === 'teacher') {
      const teacherObj = teachers.find(t => t.id === selectedTeacherId) || teachers[0];
      if (!teacherObj) {
        setLoginError('No teacher profile available.');
        return;
      }
      if (!passcode.trim()) {
        setLoginError('Teacher PIN is required to open this portal.');
        return;
      }
      if (!matches(passcode, teacherCode(teacherObj))) {
        setLoginError('Invalid Teacher PIN for this profile. Access denied.');
        return;
      }
      onSelectRole('teacher', teacherObj.name, undefined, teacherObj.id);
      onClose();
    } else if (selectedRoleOption === 'student') {
      let stu = activeStudent;
      if (studentBarcodeCode.trim()) {
        const found = students.find(s =>
          (s.studentNumber || '').toLowerCase().trim() === studentBarcodeCode.toLowerCase().trim() ||
          (s.barcodeId || '').toLowerCase().trim() === studentBarcodeCode.toLowerCase().trim() ||
          (s.id || '').toLowerCase().trim() === studentBarcodeCode.toLowerCase().trim()
        );
        if (found) {
          stu = found;
        } else {
          setLoginError(`Student Barcode / Index "${studentBarcodeCode}" not found. Please pick from list.`);
          return;
        }
      }
      if (!stu) {
        setLoginError('No student profile available.');
        return;
      }
      if (!passcode.trim()) {
        setLoginError('Your personal student PIN is required to open this portal.');
        return;
      }
      if (!matches(passcode, studentCode(stu))) {
        setLoginError('Invalid Student PIN. You can only access your own portal.');
        return;
      }
      persistLogin('student', stu.id, passcode, studentBarcodeCode.trim() || undefined);
      onSelectRole('student', stu.fullName, stu.id, undefined);
      onClose();
    } else if (selectedRoleOption === 'parent') {
      let stu = activeStudent;
      if (studentBarcodeCode.trim()) {
        const found = students.find(s =>
          (s.studentNumber || '').toLowerCase().trim() === studentBarcodeCode.toLowerCase().trim() ||
          (s.parentPhone || '').includes(studentBarcodeCode.trim())
        );
        if (found) stu = found;
      }
      if (!stu) {
        setLoginError('No student profile available.');
        return;
      }
      if (!passcode.trim()) {
        setLoginError('Guardian code is required (last 4 digits of the registered parent phone).');
        return;
      }
      if (!matches(passcode, parentCode(stu))) {
        setLoginError('Invalid Guardian code for this student. Access denied.');
        return;
      }
      persistLogin('parent', stu.id, passcode);
      onSelectRole('parent', `Guardian of ${stu.fullName}`, stu.id, undefined);
      onClose();
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl cursor-default my-8 transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg ring-4 ring-rose-500/20">
              EM
            </div>
            <h3 className="text-2xl font-black tracking-tight">Multi-Portal Authentication</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your portal & authenticate with unique Passcode, Teacher PIN, or Student Index Barcode
            </p>
          </div>

          {/* Role Choice Buttons Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setSelectedRoleOption('admin'); setLoginError(''); setPasscode(''); }}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                selectedRoleOption === 'admin'
                  ? 'bg-rose-600 text-white border-rose-500 ring-2 ring-rose-400 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Shield className="w-5 h-5 text-rose-300" />
              <span>Administrator</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRoleOption('teacher'); setLoginError(''); setPasscode(''); }}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                selectedRoleOption === 'teacher'
                  ? 'bg-purple-600 text-white border-purple-500 ring-2 ring-purple-400 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <UserCheck className="w-5 h-5 text-purple-300" />
              <span>Teacher Portal</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRoleOption('student'); setLoginError(''); setPasscode(''); }}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                selectedRoleOption === 'student'
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <GraduationCap className="w-5 h-5 text-emerald-300" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRoleOption('parent'); setLoginError(''); setPasscode(''); }}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                selectedRoleOption === 'parent'
                  ? 'bg-amber-600 text-white border-amber-500 ring-2 ring-amber-400 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Users className="w-5 h-5 text-amber-300" />
              <span>Parent / Guardian</span>
            </button>
          </div>

          {/* Form Controls Based on Selected Role */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-bold">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Admin Input */}
            {selectedRoleOption === 'admin' && (
              <div className="space-y-2 bg-rose-950/20 p-4 rounded-2xl border border-rose-800/30">
                <div className="flex items-center justify-between">
                  <label className="text-rose-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    System Admin Security Passcode
                  </label>
                  <span className="text-[10px] text-slate-400">Private code</span>
                </div>
                <input
                  type="password"
                  placeholder="Enter admin code (e.g. admin or 1234)..."
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-mono text-sm"
                />
              </div>
            )}

            {/* Teacher Input */}
            {selectedRoleOption === 'teacher' && (
              <div className="space-y-3 bg-purple-950/20 p-4 rounded-2xl border border-purple-800/30">
                <label className="text-purple-400 uppercase text-[10px] tracking-wider block">
                  Select Teacher Profile:
                </label>
                <select
                  value={selectedTeacherId}
                  onChange={e => setSelectedTeacherId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-sm"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      👨‍🏫 {t.title} {t.name} ({t.subject})
                    </option>
                  ))}
                </select>

                <div>
                  <label className="text-slate-400 text-[10px] uppercase block mb-1">
                    Teacher PIN Code (required)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter teacher PIN..."
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Student Input */}
            {selectedRoleOption === 'student' && (
              <div className="space-y-3 bg-emerald-950/20 p-4 rounded-2xl border border-emerald-800/30">
                <div>
                  <label className="text-emerald-400 uppercase text-[10px] tracking-wider block mb-1">
                    Scan / Enter Unique Student Barcode ID or Index Number:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. STU-1001 or STU-1002..."
                      value={studentBarcodeCode}
                      onChange={e => setStudentBarcodeCode(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-mono text-sm uppercase tracking-wider font-extrabold"
                    />
                    <QrCode className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="text-center text-slate-400 text-[10px] font-bold">— OR SELECT FROM REGISTERED STUDENTS —</div>

                <select
                  value={selectedStudentId}
                  onChange={e => { setSelectedStudentId(e.target.value); setStudentBarcodeCode(''); }}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-sm"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      🎓 {s.studentNumber} - {s.fullName} ({s.academicStream || s.grade})
                    </option>
                  ))}
                </select>

                <div>
                  <label className="text-emerald-400 uppercase text-[10px] tracking-wider block mb-1">
                    Personal Student PIN (required)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your student PIN..."
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-mono text-sm"
                  />
                </div>

                {activeStudent && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                    <img src={activeStudent.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-emerald-500" />
                    <div className="text-left leading-tight">
                      <p className="text-xs font-black text-emerald-400">{activeStudent.fullName}</p>
                      <p className="text-[10px] text-slate-400">Barcode: <span className="font-mono text-amber-300">{activeStudent.barcodeId}</span> • {activeStudent.grade}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Parent Input */}
            {selectedRoleOption === 'parent' && (
              <div className="space-y-3 bg-amber-950/20 p-4 rounded-2xl border border-amber-800/30">
                <label className="text-amber-400 uppercase text-[10px] tracking-wider block">
                  Select Child / Student to Monitor:
                </label>
                <select
                  value={selectedStudentId}
                  onChange={e => setSelectedStudentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-sm"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      👨‍👩‍👧 Parent of: {s.fullName} ({s.studentNumber})
                    </option>
                  ))}
                </select>

                <div>
                  <label className="text-amber-400 uppercase text-[10px] tracking-wider block mb-1">
                    Guardian Access Code (required)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="e.g. 3333"
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-mono text-sm"
                  />
                </div>

                {activeStudent && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <p className="font-bold text-amber-400">Guardian Contact: {activeStudent.parentName} ({activeStudent.parentPhone})</p>
                    <p className="text-[10px] text-slate-400">Monitored Student ID: <span className="text-white font-mono">{activeStudent.studentNumber}</span></p>
                  </div>
                )}
              </div>
            )}

            {(selectedRoleOption === 'student' || selectedRoleOption === 'parent') && (
              <label className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-500/25 bg-slate-500/5 cursor-pointer">
                <span className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => {
                      setRememberMe(e.target.checked);
                      if (!e.target.checked) clearSavedLogin(selectedRoleOption);
                    }}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  Save my login on this device
                </span>
                {getSavedLogin(selectedRoleOption) && (
                  <button
                    type="button"
                    onClick={() => { clearSavedLogin(selectedRoleOption); setRememberMe(false); setPasscode(''); setStudentBarcodeCode(''); }}
                    className="text-[10px] font-black text-rose-500 underline"
                  >
                    FORGET SAVED LOGIN
                  </button>
                )}
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 via-indigo-600 to-blue-600 hover:from-rose-500 hover:to-blue-500 text-white font-black py-3.5 rounded-2xl text-sm shadow-xl transition flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Confirm & Enter {selectedRoleOption.toUpperCase()} Portal</span>
            </button>
          </form>

          {/* Quick Security Gate Link */}
          {onOpenGateSecurity && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Gate Attendance Operator?</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenGateSecurity();
                }}
                className="text-amber-500 hover:text-amber-400 underline flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Launch Gate Barcode Terminal</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
