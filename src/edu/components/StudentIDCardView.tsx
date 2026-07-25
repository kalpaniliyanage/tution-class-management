// @ts-nocheck
import React, { useState } from 'react';
import { Student, InstituteSettings } from '../types';
import { Printer, X, Phone, ShieldCheck } from 'lucide-react';
import { generateQRCodeSvg, generateBarcodeSvg } from '../utils/qr';

interface StudentIDCardViewProps {
  student: Student;
  settings: InstituteSettings;
  darkMode: boolean;
  onClose: () => void;
}

/**
 * REAL ID CARD SIZE — ISO/IEC 7810 ID-1 (CR80)
 *   85.60 mm × 53.98 mm  (3.370 in × 2.125 in)
 *
 * Both the Digital ID pass and the Printable Plastic Card render at the
 * exact physical size using mm units so that Print → 100% scale produces
 * a card that fits a standard plastic ID card holder / lanyard sleeve.
 *
 * A dedicated print stylesheet (injected inline) hides the modal chrome
 * and prints only the currently-active card (digital OR printable) at 1:1.
 */

const PRINT_STYLES = `
@media print {
  @page { size: 90mm 58mm; margin: 2mm; }
  html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; }
  body * { visibility: hidden !important; }
  .id-print-area, .id-print-area * { visibility: visible !important; }
  .id-print-area {
    position: absolute !important;
    left: 0 !important; top: 0 !important;
    width: 85.6mm !important; height: 53.98mm !important;
    box-shadow: none !important;
    page-break-after: always;
  }
  .id-print-area + .id-print-area { margin-top: 4mm !important; }
  .no-print { display: none !important; }
}
`;

export const StudentIDCardView: React.FC<StudentIDCardViewProps> = ({
  student,
  settings,
  darkMode,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'digital' | 'printable'>('digital');
  const qrSvg = generateQRCodeSvg(student.studentNumber, 70);
  const qrSvgSmall = generateQRCodeSvg(student.studentNumber, 54);
  const barcodeSvg = generateBarcodeSvg(student.studentNumber, 180, 28);

  const handlePrint = () => window.print();

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto cursor-pointer"
    >
      <style>{PRINT_STYLES}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-6 cursor-default ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Controls Bar */}
        <div className="no-print bg-slate-950 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 flex-wrap gap-2">
          <div className="flex rounded-xl p-1 bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('digital')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                activeTab === 'digital' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📱 Digital ID Pass
            </button>
            <button
              onClick={() => setActiveTab('printable')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                activeTab === 'printable' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🖨️ Printable Plastic ID (CR80)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              85.6 × 54 mm • ISO CR80
            </span>
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

        {/* CARD STAGE */}
        <div className="p-6 sm:p-8 bg-slate-100 dark:bg-slate-950 flex flex-col items-center gap-6">

          {/* ============================================================ */}
          {/* TAB 1 — DIGITAL ID (real CR80 size)                          */}
          {/* ============================================================ */}
          {activeTab === 'digital' && (
            <div
              className="id-print-area relative overflow-hidden rounded-[3mm] shadow-2xl text-white"
              style={{
                width: '85.6mm',
                height: '53.98mm',
                background:
                  'linear-gradient(135deg, #0b1437 0%, #142266 55%, #1e3aa8 100%)',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              }}
            >
              {/* decorative glow */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500/25 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-6 w-28 h-28 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

              {/* Header strip */}
              <div className="flex items-center justify-between px-2.5 pt-2 pb-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-[1mm] bg-amber-400 text-slate-950 font-black text-[8px] flex items-center justify-center">E</div>
                  <div className="leading-tight">
                    <p className="text-[7px] font-black uppercase tracking-wider text-white">
                      {settings.name}
                    </p>
                    <p className="text-[5.5px] font-black text-amber-300 tracking-[0.2em] uppercase">
                      Student Identity • CR80
                    </p>
                  </div>
                </div>
                <span className="bg-amber-400 text-slate-950 font-black text-[5.5px] px-1.5 py-[1px] rounded-sm uppercase tracking-widest">
                  Maharagama
                </span>
              </div>

              {/* Body */}
              <div className="flex gap-2 px-2.5 pt-1">
                {/* Photo */}
                <div className="shrink-0">
                  <div
                    className="rounded-[1.5mm] border border-amber-400/70 p-[1px] bg-white/10"
                    style={{ width: '22mm', height: '28mm' }}
                  >
                    <img
                      src={student.photo}
                      alt={student.fullName}
                      className="w-full h-full object-cover rounded-[1mm]"
                    />
                  </div>
                  <p className="text-center text-[5.5px] font-black text-amber-300 mt-[1px] font-mono tracking-tight">
                    {student.studentNumber}
                  </p>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-[2px] pt-[1px]">
                  <div>
                    <p className="text-[5px] font-black text-blue-300 uppercase tracking-widest">Name</p>
                    <p className="text-[8.5px] font-black leading-tight truncate">{student.fullName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <p className="text-[5px] font-black text-blue-300 uppercase tracking-widest">Grade</p>
                      <p className="text-[7px] font-black leading-tight truncate">{student.grade}</p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-blue-300 uppercase tracking-widest">Medium</p>
                      <p className="text-[7px] font-black leading-tight truncate">{student.medium}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[5px] font-black text-blue-300 uppercase tracking-widest">School</p>
                    <p className="text-[6.5px] font-bold text-slate-200 leading-tight truncate">{student.school}</p>
                  </div>
                  <div>
                    <p className="text-[5px] font-black text-blue-300 uppercase tracking-widest">Guardian</p>
                    <p className="text-[6.5px] font-bold text-slate-200 leading-tight truncate">
                      {student.parentName} • <span className="font-mono">{student.parentPhone}</span>
                    </p>
                  </div>
                </div>

                {/* QR */}
                <div className="shrink-0 flex flex-col items-center justify-start">
                  <div className="bg-white rounded-[1mm] p-[1mm]">
                    <div dangerouslySetInnerHTML={{ __html: qrSvgSmall }} />
                  </div>
                  <p className="text-[5px] font-black text-amber-300 mt-[1px] uppercase tracking-widest">Scan Gate</p>
                </div>
              </div>

              {/* Footer strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-2.5 py-[2px] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[5.5px] font-black text-white">
                  <ShieldCheck className="w-2 h-2 text-emerald-400" />
                  <span>Valid — Academic Year {new Date().getFullYear()}</span>
                </div>
                <span className="text-[5.5px] font-black text-slate-300 tracking-widest uppercase">
                  edumaster.lk
                </span>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2 — PRINTABLE PLASTIC CARD (FRONT + BACK, CR80)          */}
          {/* ============================================================ */}
          {activeTab === 'printable' && (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* FRONT */}
              <div
                className="id-print-area relative overflow-hidden rounded-[3mm] bg-white shadow-2xl text-slate-900"
                style={{
                  width: '85.6mm',
                  height: '53.98mm',
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                  border: '0.3mm solid #0f172a',
                }}
              >
                <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-2.5 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-[1mm] bg-amber-400 text-slate-950 font-black text-[8px] flex items-center justify-center">E</div>
                    <p className="text-[7px] font-black uppercase tracking-wider">{settings.name}</p>
                  </div>
                  <span className="text-[5.5px] font-black text-amber-300 tracking-widest uppercase">Student ID</span>
                </div>

                <div className="flex gap-2 px-2.5 pt-1.5">
                  <div className="rounded-[1.5mm] border border-blue-700 p-[1px] shrink-0" style={{ width: '22mm', height: '28mm' }}>
                    <img src={student.photo} alt={student.fullName} className="w-full h-full object-cover rounded-[1mm]" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-[2px]">
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Name</p>
                      <p className="text-[8px] font-black leading-tight truncate">{student.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Index No.</p>
                      <p className="text-[7px] font-black font-mono text-blue-800">{student.studentNumber}</p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Grade / Medium</p>
                      <p className="text-[6.5px] font-bold">{student.grade} • {student.medium}</p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">School</p>
                      <p className="text-[6.5px] font-bold truncate">{student.school}</p>
                    </div>
                    <div className="pt-[1px]">
                      <div dangerouslySetInnerHTML={{ __html: barcodeSvg }} />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-slate-900 text-white text-center py-[2px]">
                  <p className="text-[5.5px] font-black tracking-widest uppercase">Maharagama Campus • Sri Lanka</p>
                </div>
              </div>

              {/* BACK */}
              <div
                className="id-print-area relative overflow-hidden rounded-[3mm] bg-white shadow-2xl text-slate-900"
                style={{
                  width: '85.6mm',
                  height: '53.98mm',
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                  border: '0.3mm solid #0f172a',
                }}
              >
                <div className="bg-slate-900 text-white px-2.5 py-1 flex items-center justify-between border-b-2 border-amber-400">
                  <p className="text-[6.5px] font-black uppercase tracking-widest text-amber-300">Guardian & Gate Info</p>
                  <p className="text-[5.5px] font-black text-slate-400 tracking-widest uppercase">Confidential</p>
                </div>

                <div className="flex gap-2 px-2.5 py-1.5">
                  <div className="flex-1 min-w-0 space-y-[3px]">
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Parent / Guardian</p>
                      <p className="text-[6.5px] font-black truncate">{student.parentName}</p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Emergency</p>
                      <p className="text-[6.5px] font-black text-blue-800 font-mono">
                        {student.parentPhone}{student.emergencyPhone ? ` / ${student.emergencyPhone}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Address</p>
                      <p className="text-[5.5px] font-semibold leading-tight line-clamp-3">{student.address}</p>
                    </div>
                    <div>
                      <p className="text-[5px] font-black text-slate-500 uppercase tracking-widest">Rules</p>
                      <p className="text-[5px] leading-tight text-slate-700">
                        Non-transferable. Present at gate for QR scan. If found, return to {settings.name}, Maharagama.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center justify-center">
                    <div className="bg-white rounded-[1mm] p-[1px] border border-slate-200">
                      <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
                    </div>
                    <p className="text-[5px] font-black text-slate-600 mt-[1px] uppercase tracking-widest">Gate Scan</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-slate-900 text-slate-300 text-center py-[2px]">
                  <p className="text-[5px] font-bold tracking-widest uppercase">
                    Property of {settings.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="no-print text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
            Preview shown at real CR80 size (85.6 × 54 mm). Print at 100% scale.
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
            ← Leave ID View
          </button>
        </div>
      </div>
    </div>
  );
};