// @ts-nocheck
import React, { useState } from 'react';
import { Student, SubjectClass, PaymentRecord, InstituteSettings } from '../types';
import { Printer, X, CheckCircle2, Stamp, Phone } from 'lucide-react';
import { generateQRCodeSvg, generateBarcodeSvg } from '../utils/qr';

interface PaymentCardViewProps {
  student: Student;
  enrolledClasses: SubjectClass[];
  payments: PaymentRecord[];
  settings: InstituteSettings;
  darkMode: boolean;
  onClose: () => void;
  onStampPayment?: (studentId: string, classId: string, month: string) => void;
  isAdmin?: boolean;
}

/**
 * TWO PAYMENT CARD TEMPLATES
 *
 *  1. MONTHLY PAYMENT CARD  — small CR80 (85.6 × 54 mm)
 *     Single-month receipt / gate pass. Fits a wallet or lanyard sleeve.
 *
 *  2. 12-MONTH PAYMENT CARD — A5 landscape (210 × 148 mm)
 *     Full-year stamp grid, one box per month, one row per enrolled class.
 *     Admin can stamp cells as Paid; parents keep a physical record.
 *
 * Both use a scoped print stylesheet so Print → 100% scale outputs the
 * card at true physical size.
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const MONTH_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const PRINT_STYLES_MONTHLY = `
@media print {
  @page { size: 90mm 58mm; margin: 2mm; }
  html, body { background:#fff !important; margin:0 !important; padding:0 !important; }
  body * { visibility:hidden !important; }
  .pay-print-monthly, .pay-print-monthly * { visibility:visible !important; }
  .pay-print-monthly {
    position:absolute !important; left:0 !important; top:0 !important;
    width:85.6mm !important; height:53.98mm !important; box-shadow:none !important;
  }
  .no-print { display:none !important; }
}
`;
const PRINT_STYLES_YEARLY = `
@media print {
  @page { size: A5 landscape; margin: 6mm; }
  html, body { background:#fff !important; margin:0 !important; padding:0 !important; }
  body * { visibility:hidden !important; }
  .pay-print-yearly, .pay-print-yearly * { visibility:visible !important; }
  .pay-print-yearly {
    position:absolute !important; left:0 !important; top:0 !important;
    width:198mm !important; box-shadow:none !important;
  }
  .no-print { display:none !important; }
}
`;

export const PaymentCardView: React.FC<PaymentCardViewProps> = ({
  student,
  enrolledClasses,
  payments,
  settings,
  darkMode,
  onClose,
  onStampPayment,
  isAdmin,
}) => {
  const currentMonthName = MONTH_LONG[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const [tab, setTab] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedClassId, setSelectedClassId] = useState<string>(enrolledClasses[0]?.id || '');
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthName);

  const activeClass = enrolledClasses.find(c => c.id === selectedClassId) || enrolledClasses[0];

  const getPayment = (classId: string, monthName: string) =>
    payments.find(p =>
      p.studentId === student.id &&
      p.classId === classId &&
      (p.month || '').toLowerCase().includes(monthName.toLowerCase()),
    );

  const currentPayment = activeClass ? getPayment(activeClass.id, selectedMonth) : null;
  const isPaid = currentPayment?.status === 'Paid';

  const qrSvg = generateQRCodeSvg(student.studentNumber, 54);
  const barcodeSvg = generateBarcodeSvg(student.studentNumber, 160, 22);

  const handlePrint = () => window.print();

  const printStyles = tab === 'monthly' ? PRINT_STYLES_MONTHLY : PRINT_STYLES_YEARLY;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      <style>{printStyles}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-8 cursor-default ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Controls */}
        <div className="no-print bg-slate-950 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800 flex-wrap gap-3">
          <div className="flex rounded-xl p-1 bg-slate-900 border border-slate-800 text-xs font-black">
            <button
              onClick={() => setTab('monthly')}
              className={`px-3 py-1.5 rounded-lg transition ${
                tab === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              💳 Monthly Card (small)
            </button>
            <button
              onClick={() => setTab('yearly')}
              className={`px-3 py-1.5 rounded-lg transition ${
                tab === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📅 12-Month Card
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-lg px-2 py-1.5"
            >
              {enrolledClasses.map(c => (
                <option key={c.id} value={c.id}>{c.subjectName} — {c.teacherName}</option>
              ))}
            </select>

            {tab === 'monthly' && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-lg px-2 py-1.5"
              >
                {MONTH_LONG.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3.5 py-1.5 rounded-xl text-xs transition shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold px-3 py-1.5 rounded-xl text-xs transition border border-slate-700"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Stage */}
        <div className="p-6 sm:p-8 bg-slate-100 dark:bg-slate-950 flex flex-col items-center gap-4">

          {/* ============================================================ */}
          {/* TEMPLATE 1 — MONTHLY (small CR80)                            */}
          {/* ============================================================ */}
          {tab === 'monthly' && activeClass && (
            <div
              className="pay-print-monthly relative overflow-hidden rounded-[3mm] shadow-2xl text-slate-900 bg-white"
              style={{
                width: '85.6mm',
                height: '53.98mm',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                border: '0.3mm solid #0f172a',
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white px-2.5 py-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-[1mm] bg-amber-400 text-slate-950 font-black text-[8px] flex items-center justify-center">$</div>
                  <div className="leading-tight">
                    <p className="text-[7px] font-black uppercase tracking-wider">{settings.name}</p>
                    <p className="text-[5.5px] font-black text-amber-300 tracking-widest uppercase">Monthly Payment Card</p>
                  </div>
                </div>
                <span className={`text-[6px] font-black px-1.5 py-[1px] rounded-sm uppercase tracking-widest ${
                  isPaid ? 'bg-emerald-400 text-emerald-950' : 'bg-rose-400 text-rose-950'
                }`}>
                  {isPaid ? 'PAID' : 'DUE'}
                </span>
              </div>

              {/* Body */}
              <div className="px-2.5 py-1.5 flex gap-2">
                <div className="flex-1 min-w-0 space-y-[3px]">
                  <div>
                    <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Student</p>
                    <p className="text-[7.5px] font-black truncate">{student.fullName}</p>
                    <p className="text-[6px] font-black font-mono text-blue-800">{student.studentNumber}</p>
                  </div>
                  <div>
                    <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Class</p>
                    <p className="text-[6.5px] font-black truncate">{activeClass.subjectName}</p>
                    <p className="text-[5.5px] font-bold text-slate-600 truncate">
                      {activeClass.teacherName} • {activeClass.dayOfWeek} {activeClass.startTime}
                    </p>
                  </div>
                  <div className="flex items-end justify-between pt-[1px]">
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Month</p>
                      <p className="text-[8px] font-black">{selectedMonth} {currentYear}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Amount</p>
                      <p className="text-[10px] font-black text-emerald-700 leading-none">
                        Rs. {activeClass.monthlyFee.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center gap-[2px]">
                  <div className="bg-white rounded-[1mm] p-[1px] border border-slate-200">
                    <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
                  </div>
                  {isPaid ? (
                    <div className="flex items-center gap-[2px] text-emerald-700">
                      <CheckCircle2 className="w-2 h-2" />
                      <span className="text-[5px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  ) : isAdmin && onStampPayment ? (
                    <button
                      onClick={() => onStampPayment(student.id, activeClass.id, `${selectedMonth} ${currentYear}`)}
                      className="no-print flex items-center gap-[2px] bg-emerald-600 hover:bg-emerald-500 text-white text-[5px] font-black uppercase tracking-widest px-1 py-[1px] rounded-[1mm]"
                    >
                      <Stamp className="w-2 h-2" />
                      Stamp
                    </button>
                  ) : (
                    <span className="text-[5px] font-black text-rose-600 uppercase tracking-widest">Unpaid</span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-slate-900 text-white px-2.5 py-[2px] flex items-center justify-between">
                <span className="text-[5px] font-black tracking-widest uppercase">
                  Receipt {currentPayment?.receiptNumber || '—'}
                </span>
                <span className="text-[5px] font-black text-amber-300 tracking-widest uppercase">
                  Maharagama • edumaster.lk
                </span>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TEMPLATE 2 — 12-MONTH GRID (A5 landscape)                    */}
          {/* ============================================================ */}
          {tab === 'yearly' && (
            <div
              className="pay-print-yearly bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                width: '198mm',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                border: '0.4mm solid #0f172a',
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center">E</div>
                  <div className="leading-tight">
                    <p className="text-sm font-black uppercase tracking-wider">{settings.name}</p>
                    <p className="text-[10px] font-black text-amber-300 tracking-widest uppercase">
                      12-Month Payment Card • Academic Year {currentYear}
                    </p>
                  </div>
                </div>
                <div className="text-right leading-tight">
                  <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Student</p>
                  <p className="text-sm font-black">{student.fullName}</p>
                  <p className="text-[10px] font-black font-mono text-amber-200">{student.studentNumber}</p>
                </div>
              </div>

              {/* Student strip */}
              <div className="grid grid-cols-4 gap-2 px-4 py-2 text-[10px] font-bold border-b border-slate-200">
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Grade</p>
                  <p>{student.grade}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Medium</p>
                  <p>{student.medium}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Guardian</p>
                  <p className="truncate">{student.parentName}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Contact</p>
                  <p className="font-mono">{student.parentPhone}</p>
                </div>
              </div>

              {/* Grid */}
              <div className="px-4 py-3">
                <table className="w-full border-collapse text-[10px]">
                  <thead>
                    <tr>
                      <th className="text-left font-black uppercase tracking-widest text-[9px] text-slate-600 border border-slate-300 bg-slate-100 px-2 py-1 w-[38mm]">
                        Class / Subject
                      </th>
                      {MONTHS.map(m => (
                        <th key={m} className="font-black uppercase text-[9px] text-slate-600 border border-slate-300 bg-slate-100 px-1 py-1">
                          {m}
                        </th>
                      ))}
                      <th className="font-black uppercase text-[9px] text-slate-600 border border-slate-300 bg-slate-100 px-1 py-1 w-[18mm]">
                        Fee / mo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledClasses.map(cls => (
                      <tr key={cls.id}>
                        <td className="border border-slate-300 px-2 py-1 align-top">
                          <p className="font-black leading-tight">{cls.subjectName}</p>
                          <p className="text-[8px] text-slate-600 font-semibold">{cls.teacherName}</p>
                          <p className="text-[8px] text-slate-500">{cls.dayOfWeek} {cls.startTime}</p>
                        </td>
                        {MONTH_LONG.map(m => {
                          const p = getPayment(cls.id, m);
                          const paid = p?.status === 'Paid';
                          return (
                            <td
                              key={m}
                              className={`border border-slate-300 text-center align-middle p-0 ${
                                paid ? 'bg-emerald-50' : ''
                              }`}
                              style={{ height: '9mm' }}
                            >
                              {paid ? (
                                <div className="flex flex-col items-center justify-center leading-tight">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span className="text-[7px] font-black text-emerald-700 uppercase">Paid</span>
                                </div>
                              ) : isAdmin && onStampPayment ? (
                                <button
                                  onClick={() => onStampPayment(student.id, cls.id, `${m} ${currentYear}`)}
                                  className="no-print w-full h-full text-[8px] font-black text-slate-400 hover:bg-emerald-100 hover:text-emerald-700 uppercase tracking-widest"
                                >
                                  Stamp
                                </button>
                              ) : (
                                <span className="text-[8px] font-black text-slate-300">—</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="border border-slate-300 px-1 py-1 text-right font-black text-emerald-700">
                          Rs. {cls.monthlyFee.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {enrolledClasses.length === 0 && (
                      <tr>
                        <td colSpan={14} className="border border-slate-300 text-center py-3 text-slate-400 font-bold text-[10px]">
                          No enrolled classes for this student.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer strip: barcode + qr + rules */}
              <div className="grid grid-cols-3 gap-3 px-4 pb-3 items-end">
                <div>
                  <div dangerouslySetInnerHTML={{ __html: barcodeSvg }} />
                  <p className="text-[8px] font-mono font-black text-slate-600 mt-0.5">{student.studentNumber}</p>
                </div>
                <div className="text-[8px] text-slate-600 leading-tight">
                  <p className="font-black uppercase tracking-widest text-slate-500 mb-0.5">Rules</p>
                  <p>1. Present this card at counter for monthly stamping.</p>
                  <p>2. Non-transferable. Overdue after 7th of the month.</p>
                  <p>3. Duplicate charge: Rs. 200. Contact: {settings.phonePrimary}.</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <div className="text-right leading-tight">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Verify</p>
                    <p className="text-[9px] font-black">Scan QR at gate</p>
                  </div>
                  <div className="bg-white p-1 border border-slate-300 rounded">
                    <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white text-center py-1">
                <p className="text-[9px] font-black tracking-widest uppercase text-amber-300">
                  {settings.name} • Maharagama Campus • edumaster.lk
                </p>
              </div>
            </div>
          )}

          <p className="no-print text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
            {tab === 'monthly'
              ? 'Monthly card printed at CR80 wallet size (85.6 × 54 mm). Print at 100% scale.'
              : '12-Month card printed on A5 landscape (210 × 148 mm). Print at 100% scale.'}
          </p>
        </div>

        {/* Bottom Exit Bar */}
        <div className="no-print bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-bold">
            <Phone className="w-3 h-3 inline-block -mt-0.5 mr-1" />
            Support: <span className="font-mono">{settings.phonePrimary}</span>
          </p>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-black px-5 py-2 rounded-xl text-xs transition shadow border border-slate-700"
          >
            ← Leave Payment View
          </button>
        </div>
      </div>
    </div>
  );
};