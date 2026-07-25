// @ts-nocheck
import React, { useState } from 'react';
import { Student, SubjectClass, PaymentRecord, AttendanceRecord } from '../types';
import { Shield, QrCode, CheckCircle2, AlertOctagon, X, Send, Smartphone } from 'lucide-react';

interface GateSecurityModalProps {
  students: Student[];
  classes: SubjectClass[];
  payments: PaymentRecord[];
  onMarkAttendance: (studentId: string, classId: string, status: 'Present' | 'Absent' | 'Late') => void;
  darkMode: boolean;
  onClose: () => void;
}

export const GateSecurityModal: React.FC<GateSecurityModalProps> = ({
  students,
  classes,
  payments,
  onMarkAttendance,
  darkMode,
  onClose
}) => {
  const [scannedNumber, setScannedNumber] = useState('EDU-2026-G11-00125');
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [scanResult, setScanResult] = useState<{
    student?: Student;
    isPaid?: boolean;
    status: 'IDLE' | 'GRANTED' | 'OVERDUE' | 'NOT_FOUND';
    message: string;
    smsSent?: boolean;
  }>({ status: 'IDLE', message: 'Ready to scan student card at entrance gate...' });

  const handleSimulateScan = () => {
    const student = students.find(s => s.studentNumber.toLowerCase() === scannedNumber.trim().toLowerCase());
    if (!student) {
      setScanResult({
        status: 'NOT_FOUND',
        message: 'INVALID STUDENT CARD NUMBER. Access Denied at Entrance Barrier.'
      });
      return;
    }

    const currentClass = classes.find(c => c.id === selectedClassId);
    if (!currentClass) return;

    // Check payment status for July 2026
    const payment = payments.find(p => p.studentId === student.id && p.classId === currentClass.id && p.month.toLowerCase().includes('july'));
    const isPaid = payment && payment.status === 'Paid';

    if (isPaid) {
      onMarkAttendance(student.id, currentClass.id, 'Present');
      setScanResult({
        student,
        isPaid: true,
        status: 'GRANTED',
        message: `TURNSTILE UNLOCKED ✔ Welcome ${student.fullName}. Gate attendance logged.`,
        smsSent: true
      });
    } else {
      onMarkAttendance(student.id, currentClass.id, 'Absent');
      setScanResult({
        student,
        isPaid: false,
        status: 'OVERDUE',
        message: `OVERDUE PAYMENT ALERT 🔴 Gate locked. Parent SMS dispatched to ${student.parentPhone}`,
        smsSent: true
      });
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 cursor-default transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
      >
        
        {/* Modal Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-black">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>EduMaster Smart Gate Entrance Security Simulator</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white font-black px-3 py-1.5 rounded-lg text-xs transition shadow-md"
          >
            <X className="w-4 h-4" />
            <span>Exit Gate Simulator</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Quick Explanation */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              How Gate Attendance Security Works:
            </h4>
            <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed">
              1. Student presents physical ID card or digital QR code at entrance gate.<br />
              2. System verifies payment card status in sub-150ms database lookup.<br />
              3. Turnstile opens for paid students. Unpaid students trigger security officer alert.<br />
              4. Automated SMS is instantly dispatched to parent's phone.
            </p>
          </div>

          {/* Controls Form */}
          <div className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-extrabold mb-1">Select Target Session Class:</label>
                <select
                  value={selectedClassId}
                  onChange={e => setSelectedClassId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.dayOfWeek} {c.startTime})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-extrabold mb-1">Student Number / QR Code Data:</label>
                <input
                  type="text"
                  value={scannedNumber}
                  onChange={e => setScannedNumber(e.target.value)}
                  placeholder="e.g. EDU-2026-G11-00125"
                  className="w-full px-3 py-2 rounded-xl border font-mono font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-bold text-slate-500 text-[11px]">Test Presets:</span>
              <button
                type="button"
                onClick={() => setScannedNumber('EDU-2026-G11-00125')}
                className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-300"
              >
                Kalpani (Paid Student)
              </button>
              <button
                type="button"
                onClick={() => setScannedNumber('EDU-2026-GAL-88492')}
                className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-bold px-2.5 py-1 rounded border border-rose-300"
              >
                Kasun (Overdue Student)
              </button>
            </div>

            <button
              onClick={handleSimulateScan}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-2xl text-sm shadow-lg transition flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Simulate Entrance Gate Scan & Dispatch Parent SMS</span>
            </button>

          </div>

          {/* Scan Results Feedback Box */}
          {scanResult.status !== 'IDLE' && (
            <div className={`p-5 rounded-2xl border text-xs space-y-3 ${
              scanResult.status === 'GRANTED'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-950 dark:text-rose-100'
            }`}>
              <div className="flex items-center gap-2 font-black text-sm">
                {scanResult.status === 'GRANTED' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-600" />
                )}
                <span>{scanResult.message}</span>
              </div>

              {scanResult.student && (
                <div className="flex items-center gap-4 pt-2 border-t border-slate-300 dark:border-slate-800">
                  <img
                    src={scanResult.student.photo}
                    alt={scanResult.student.fullName}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-slate-400 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm">{scanResult.student.fullName}</p>
                    <p className="text-[11px] opacity-80">{scanResult.student.studentNumber} | Parent: {scanResult.student.parentPhone}</p>
                    {scanResult.smsSent && (
                      <p className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Send className="w-3 h-3" />
                        <span>Parent SMS Alert Sent to {scanResult.student.parentPhone}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Exit Bar */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-bold">Tap outside or press button to exit simulator</p>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-black px-5 py-2 rounded-xl text-xs transition shadow border border-slate-700"
          >
            ← Leave Gate Simulator
          </button>
        </div>

      </div>
    </div>
  );
};