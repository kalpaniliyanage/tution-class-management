// @ts-nocheck
import React, { useState } from 'react';
import { QrCode, X, Search, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Student } from '../types';

interface QRScannerModalProps {
  students: Student[];
  darkMode: boolean;
  onClose: () => void;
  onSelectStudentCard: (student: Student) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  students,
  darkMode,
  onClose,
  onSelectStudentCard
}) => {
  const [inputVal, setInputVal] = useState('');
  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = () => {
    setErrorMsg('');
    const found = students.find(s => s.studentNumber.toLowerCase() === inputVal.trim().toLowerCase());
    if (found) {
      setSearchedStudent(found);
    } else {
      setErrorMsg('No student found matching this Student Number / QR Code string.');
      setSearchedStudent(null);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-3xl border p-6 shadow-2xl cursor-default ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
      >
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-black text-base">
            <QrCode className="w-5 h-5 text-blue-500" />
            <span>Optical Student Card & QR Verification</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white font-black px-2.5 py-1 rounded-lg text-xs transition shadow-md"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>

        <div className="py-6 space-y-4 text-xs">
          
          <p className="text-slate-500 dark:text-slate-400">
            Scan or enter a Student Registration ID (e.g., <strong>EDU-2026-G11-00125</strong> or <strong>EDU-2026-GAL-88492</strong>) to inspect student identity and 12-month payment cards.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Student Number..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border font-mono font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 text-xs"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl transition shrink-0"
            >
              Verify QR
            </button>
          </div>

          {errorMsg && (
            <p className="text-rose-600 font-bold text-xs flex items-center gap-1">
              <AlertOctagon className="w-4 h-4" />
              <span>{errorMsg}</span>
            </p>
          )}

          {searchedStudent && (
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={searchedStudent.photo}
                  alt={searchedStudent.fullName}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-blue-500 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{searchedStudent.fullName}</h4>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{searchedStudent.studentNumber}</p>
                  <p className="text-[11px] text-slate-500">{searchedStudent.school} | Grade: {searchedStudent.grade}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectStudentCard(searchedStudent);
                  onClose();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2 rounded-xl text-xs transition"
              >
                Inspect 12-Month Payment Card
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              ← Leave Scanner
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};