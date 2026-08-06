// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Student, SubjectClass, PaymentRecord, InstituteSettings } from '../types';
import { Printer, X, CheckCircle2, Stamp, Phone, RotateCcw } from 'lucide-react';
import { generateQRCodeSvg, generateBarcodeSvg, buildVerifyUrl } from '../utils/qr';

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

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/**
 * Scoped print stylesheet.
 * Hides EVERYTHING on the page except the .pay-print-area, so the physical
 * card is the only thing that reaches the printer. Also forces a white
 * page background and prints backgrounds/colors accurately.
 */
const PRINT_STYLES = `
@media print {
  @page { size: A4 landscape; margin: 6mm; }
  html, body {
    background: #ffffff !important;
    color: #0f172a !important;
    margin: 0 !important; padding: 0 !important;
    width: 297mm !important; height: 210mm !important;
    overflow: hidden !important;
  }
  body * { visibility: hidden !important; }
  body > div {
    display: block !important;
    min-height: 0 !important;
    height: 0 !important;
    overflow: visible !important;
  }
  body > div > header,
  body > div > main,
  body > div > footer {
    display: none !important;
  }
  .print-modal-root,
  .print-modal-panel,
  .print-modal-stage {
    position: static !important;
    display: block !important;
    width: 0 !important;
    height: 0 !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    overflow: visible !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .pay-print-area, .pay-print-area * { visibility: visible !important; }
  .pay-print-area {
    position: fixed !important;
    left: 0 !important; top: 0 !important;
    margin: 0 !important; padding: 0 !important;
    background: #ffffff !important;
    color: #0f172a !important;
    box-shadow: none !important;
    overflow: hidden !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    page-break-after: avoid !important;
    break-after: avoid !important;
  }
  .no-print { display: none !important; }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  .pay-print-area.pay-monthly { width: 85.6mm !important; height: 53.98mm !important; }
  .pay-print-area.pay-yearly  { width: 277mm !important; max-height: 190mm !important; transform-origin: top left !important; }
  .pay-print-dash { display: inline !important; }
}
`;

const MONTHLY_ISOLATED_PRINT_STYLES = `
@page { size: 90mm 58mm; margin: 2mm; }
html, body {
  background: #ffffff !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 90mm !important;
  height: 58mm !important;
  overflow: hidden !important;
}
body, * {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  color-adjust: exact !important;
}
.print-shell {
  width: 85.6mm !important;
  height: 53.98mm !important;
  overflow: hidden !important;
}
.pay-print-area.pay-monthly {
  width: 85.6mm !important;
  height: 53.98mm !important;
  margin: 0 !important;
  box-shadow: none !important;
  overflow: hidden !important;
}
.no-print { display: none !important; }
`;

const YEARLY_ISOLATED_PRINT_STYLES = `
@page { size: A4 landscape; margin: 8mm; }
html, body {
  background: #ffffff !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 297mm !important;
  height: 210mm !important;
  overflow: hidden !important;
}
body, * {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  color-adjust: exact !important;
}
.print-shell {
  width: 281mm !important;
  height: 194mm !important;
  overflow: hidden !important;
}
.pay-print-area.pay-yearly {
  width: 277mm !important;
  max-height: 190mm !important;
  margin: 0 !important;
  box-shadow: none !important;
  overflow: hidden !important;
}
.pay-print-dash { display: inline !important; }
.no-print { display: none !important; }
`;

const printInIsolatedFrame = (element: HTMLElement, styles: string) => {
  const iframe = document.createElement('iframe');
  iframe.title = 'Payment card print frame';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  document.body.appendChild(iframe);

  const printDocument = iframe.contentDocument || iframe.contentWindow?.document;
  const printWindow = iframe.contentWindow;

  if (!printDocument || !printWindow) {
    iframe.remove();
    window.print();
    return;
  }

  const documentStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');

  printDocument.open();
  printDocument.write(`<!doctype html><html><head><meta charset="utf-8" />${documentStyles}<style>${styles}</style></head><body><main class="print-shell">${element.outerHTML}</main></body></html>`);
  printDocument.close();

  window.setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    window.setTimeout(() => iframe.remove(), 1000);
  }, 350);
};

export const PaymentCardView: React.FC<PaymentCardViewProps> = ({
  student, enrolledClasses, payments, settings, darkMode, onClose, onStampPayment, isAdmin,
}) => {
  const currentMonthName = MONTH_LONG[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const [tab, setTab] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedClassId, setSelectedClassId] = useState<string>(enrolledClasses[0]?.id || '');
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthName);
  const printRef = useRef<HTMLDivElement>(null);

  const activeClass = enrolledClasses.find(c => c.id === selectedClassId) || enrolledClasses[0];

  const getPayment = (classId: string, monthName: string) =>
    payments.find(p =>
      p.studentId === student.id &&
      p.classId === classId &&
      (p.month || '').toLowerCase().includes(monthName.toLowerCase()),
    );

  const currentPayment = activeClass ? getPayment(activeClass.id, selectedMonth) : null;
  const isPaid = currentPayment?.status === 'Paid';

  const qrSvg = generateQRCodeSvg(buildVerifyUrl(student.studentNumber), 54);
  const barcodeSvg = generateBarcodeSvg(student.studentNumber, 160, 22);

  const handlePrint = () => {
    if (!printRef.current) {
      window.print();
      return;
    }
    printInIsolatedFrame(
      printRef.current,
      tab === 'monthly' ? MONTHLY_ISOLATED_PRINT_STYLES : YEARLY_ISOLATED_PRINT_STYLES,
    );
  };
  const handleToggle = (classId: string, monthLabel: string) => {
    if (!isAdmin || !onStampPayment) return;
    onStampPayment(student.id, classId, monthLabel);
  };

  // Chrome (non-print) surface classes — always readable in both themes.
  const chromeSurface = darkMode
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';
  const stageSurface = darkMode ? 'bg-slate-950' : 'bg-slate-100';

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="print-modal-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      <style>{PRINT_STYLES}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`print-modal-panel relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-8 cursor-default ${chromeSurface}`}
      >
        {/* Top Controls */}
        <div className="no-print bg-slate-950 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800 flex-wrap gap-3">
          <div className="flex rounded-xl p-1 bg-slate-900 border border-slate-800 text-xs font-black">
            <button
              onClick={() => setTab('monthly')}
              className={`px-3 py-1.5 rounded-lg transition ${tab === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >💳 Monthly Card</button>
            <button
              onClick={() => setTab('yearly')}
              className={`px-3 py-1.5 rounded-lg transition ${tab === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >📅 12-Month Card</button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
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

            {isAdmin && onStampPayment && tab === 'monthly' && activeClass && (
              <button
                onClick={() => handleToggle(activeClass.id, `${selectedMonth} ${currentYear}`)}
                className={`flex items-center gap-1.5 font-black px-3.5 py-1.5 rounded-xl text-xs transition shadow-lg ${
                  isPaid ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
                title={isPaid ? 'Mark this month as UNPAID' : 'Mark this month as PAID'}
              >
                {isPaid ? <RotateCcw className="w-4 h-4" /> : <Stamp className="w-4 h-4" />}
                <span>{isPaid ? 'Mark Unpaid' : 'Mark Paid'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-black px-3.5 py-1.5 rounded-xl text-xs transition shadow-lg"
            >
              <Printer className="w-4 h-4" /><span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold px-3 py-1.5 rounded-xl text-xs transition border border-slate-700"
            >
              <X className="w-4 h-4" /><span>Close</span>
            </button>
          </div>
        </div>

        {/* Stage */}
        <div className={`print-modal-stage p-6 sm:p-8 flex flex-col items-center gap-4 ${stageSurface}`}>

          {/* MONTHLY CARD */}
          {tab === 'monthly' && activeClass && (
            <div
              ref={printRef}
              className="pay-print-area pay-monthly relative overflow-hidden rounded-[3mm] shadow-2xl text-slate-900 bg-white"
              style={{
                width: '85.6mm',
                height: '53.98mm',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                border: '0.3mm solid #0f172a',
              }}
            >
              {/* Subject artwork watermark */}
              {activeClass.coverImage && (
                <img
                  src={activeClass.coverImage}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.1 }}
                />
              )}
              <div
                className="absolute inset-y-0 right-0"
                style={{ width: '18mm', background: 'linear-gradient(135deg, rgba(251,191,36,0.20), rgba(4,120,87,0.12))' }}
                aria-hidden
              />

              <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-700 to-teal-700 text-white px-2.5 py-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {activeClass.coverImage || student.photo ? (
                    <img
                      src={activeClass.coverImage || student.photo}
                      alt=""
                      className="w-4 h-4 rounded-[1mm] object-cover border border-amber-300"
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-[1mm] bg-amber-400 text-slate-950 font-black text-[8px] flex items-center justify-center">$</div>
                  )}
                  <div className="leading-tight">
                    <p className="text-[7px] font-black uppercase tracking-wider">{settings.name}</p>
                    <p className="text-[5.5px] font-black text-amber-300 tracking-widest uppercase">Monthly Payment Card</p>
                  </div>
                </div>
                <span className={`text-[6px] font-black px-1.5 py-[1px] rounded-sm uppercase tracking-widest ${
                  isPaid ? 'bg-emerald-400 text-emerald-950' : 'bg-rose-400 text-rose-950'
                }`}>{isPaid ? 'PAID' : 'DUE'}</span>
              </div>

              <div className="relative px-2.5 py-1.5 flex gap-2">

                <div className="flex-1 min-w-0 space-y-[3px]">
                  <div>
                    <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Student</p>
                    <p className="text-[7.5px] font-black truncate text-slate-900">{student.fullName}</p>
                    <p className="text-[6px] font-black font-mono text-blue-800">{student.studentNumber}</p>
                  </div>
                  <div>
                    <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Class</p>
                    <p className="text-[6.5px] font-black truncate text-slate-900">{activeClass.subjectName}</p>
                    <p className="text-[5.5px] font-bold text-slate-600 truncate">
                      {activeClass.teacherName} • {activeClass.dayOfWeek} {activeClass.startTime}
                    </p>
                  </div>
                  <div className="flex items-end justify-between pt-[1px]">
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Month</p>
                      <p className="text-[8px] font-black text-slate-900">{selectedMonth} {currentYear}</p>
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
                  ) : (
                    <span className="text-[5px] font-black text-rose-600 uppercase tracking-widest">Unpaid</span>
                  )}
                </div>
              </div>

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

          {/* 12-MONTH GRID */}
          {tab === 'yearly' && (
            <div
              ref={printRef}
              className="pay-print-area pay-yearly bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                width: '198mm',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                border: '0.4mm solid #0f172a',
              }}
            >
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

              <div className="grid grid-cols-4 gap-2 px-4 py-2 text-[10px] font-bold border-b border-slate-200 text-slate-900">
                <div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Grade</p><p>{student.grade}</p></div>
                <div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Medium</p><p>{student.medium}</p></div>
                <div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Guardian</p><p className="truncate">{student.parentName}</p></div>
                <div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Contact</p><p className="font-mono">{student.parentPhone}</p></div>
              </div>

              <div className="px-4 py-3">
                <table className="w-full border-collapse text-[10px] text-slate-900">
                  <thead>
                    <tr>
                      <th className="text-left font-black uppercase tracking-widest text-[9px] text-slate-600 border border-slate-300 bg-slate-100 px-2 py-1 w-[38mm]">Class / Subject</th>
                      {MONTHS.map(m => (
                        <th key={m} className="font-black uppercase text-[9px] text-slate-600 border border-slate-300 bg-slate-100 px-1 py-1">{m}</th>
                      ))}
                      <th className="font-black uppercase text-[9px] text-slate-600 border border-slate-300 bg-slate-100 px-1 py-1 w-[18mm]">Fee / mo</th>
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
                              className={`border border-slate-300 text-center align-middle p-0 ${paid ? 'bg-emerald-50' : ''}`}
                              style={{ height: '9mm' }}
                            >
                              {paid ? (
                                isAdmin && onStampPayment ? (
                                  <button
                                    onClick={() => handleToggle(cls.id, `${m} ${currentYear}`)}
                                    className="w-full h-full flex flex-col items-center justify-center leading-tight hover:bg-rose-100"
                                    title="Click to mark UNPAID"
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span className="text-[7px] font-black text-emerald-700 uppercase">Paid</span>
                                  </button>
                                ) : (
                                  <div className="flex flex-col items-center justify-center leading-tight">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span className="text-[7px] font-black text-emerald-700 uppercase">Paid</span>
                                  </div>
                                )
                              ) : isAdmin && onStampPayment ? (
                                <>
                                  <button
                                    onClick={() => handleToggle(cls.id, `${m} ${currentYear}`)}
                                    className="no-print w-full h-full text-[8px] font-black text-slate-400 hover:bg-emerald-100 hover:text-emerald-700 uppercase tracking-widest"
                                    title="Click to mark PAID"
                                  >Mark</button>
                                  <span className="pay-print-dash hidden text-[8px] font-black text-slate-300">—</span>
                                </>
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
                    <p className="text-[9px] font-black text-slate-900">Scan QR at gate</p>
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

          <p className={`no-print text-[10px] font-bold uppercase tracking-widest text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {tab === 'monthly'
              ? 'Monthly card printed at CR80 wallet size (85.6 × 54 mm). Print at 100% scale.'
              : '12-Month card printed on A5 landscape (210 × 148 mm). Print at 100% scale.'}
            {isAdmin && ' • Admin: click any month cell to toggle Paid / Unpaid.'}
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
          >← Leave Payment View</button>
        </div>
      </div>
    </div>
  );
};
