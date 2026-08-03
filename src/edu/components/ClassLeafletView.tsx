// @ts-nocheck
import React from 'react';
import { SubjectClass, InstituteSettings } from '../types';
import { Printer, Share2, X, Phone, MapPin, Calendar, Clock, CheckCircle2, Sparkles, QrCode } from 'lucide-react';
import { generateQRCodeSvg, buildVerifyUrl } from '../utils/qr';

interface ClassLeafletViewProps {
  cls: SubjectClass;
  settings: InstituteSettings;
  darkMode: boolean;
  onClose: () => void;
}

export const ClassLeafletView: React.FC<ClassLeafletViewProps> = ({
  cls,
  settings,
  darkMode,
  onClose
}) => {
  const flyerQrData = buildVerifyUrl(cls.id);
  const qrSvg = generateQRCodeSvg(flyerQrData, 100);

  // Print the flyer alone in an isolated iframe so the app shell never
  // bleeds extra blank pages into the print job.
  const handlePrint = () => {
    const node = document.getElementById('printable-flyer');
    if (!node) {
      window.print();
      return;
    }

    const frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(frame);

    const doc = frame.contentDocument;
    const headStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('\n');

    doc.open();
    doc.write(`<!doctype html><html><head><meta charset="utf-8"/>${headStyles}
      <style>
        @page { size: A4 portrait; margin: 8mm; }
        html, body { margin:0; padding:0; background:#fff; color:#0f172a; }
        #flyer-print { width: 194mm; background:#fff; }
        #flyer-print * { break-inside: avoid; }
        img { max-width: 100%; }
      </style>
    </head><body><div id="flyer-print">${node.innerHTML}</div></body></html>`);
    doc.close();

    const run = () => {
      try {
        frame.contentWindow.focus();
        frame.contentWindow.print();
      } finally {
        setTimeout(() => frame.remove(), 1200);
      }
    };
    if (doc.readyState === 'complete') setTimeout(run, 350);
    else frame.onload = () => setTimeout(run, 350);
  };

  const handleWhatsAppShare = () => {
    const text = `*${settings.name} - Class Flyer*\n\n📘 *Class:* ${cls.name}\n👨‍🏫 *Teacher:* ${cls.teacherName} (${cls.teacherQualifications})\n🗓️ *Schedule:* Every ${cls.dayOfWeek} (${cls.startTime} - ${cls.endTime})\n🏛️ *Location:* ${cls.hallName}, ${settings.address}\n💰 *Fee:* Rs. ${cls.monthlyFee.toLocaleString()} / Month\n\n📞 *Contact:* ${settings.phonePrimary}`;
    openExternal(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-4 sm:my-8 cursor-default transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
      >
        
        {/* Top Control Bar (sticky so Print stays reachable on mobile) */}
        <div className="print:hidden sticky top-0 z-20 bg-slate-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 flex-wrap gap-2">

          <div className="flex items-center gap-2 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Class Promotional Flyer & Leaflet Poster</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share via WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Flyer</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white font-black px-3 py-1.5 rounded-lg text-xs transition shadow-md"
            >
              <X className="w-4 h-4" />
              <span>Exit Leaflet</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE FLYER CONTENT */}
        <div id="printable-flyer" className="p-6 sm:p-8 space-y-6 bg-white text-slate-900">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 text-center space-y-2 border-2 border-amber-400/50 shadow-lg">
            <div className="inline-block bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
              OFFICIAL CLASS FLYER
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              {settings.name}
            </h1>
            <p className="text-xs text-slate-300 font-medium">{settings.tagline}</p>
            <p className="text-[11px] text-amber-300 font-bold">{settings.address} • {settings.phonePrimary}</p>
          </div>

          {/* Main Subject Showcase */}
          <div className="text-center space-y-2 py-2 border-b border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(cls.badges && cls.badges.length > 0 ? cls.badges : [
                { id: 'b1', label: cls.grade.toUpperCase(), color: 'blue' },
                { id: 'b2', label: `${cls.medium.toUpperCase()} MEDIUM`, color: 'purple' },
                { id: 'b3', label: cls.type.toUpperCase(), color: 'emerald' }
              ]).map((badge) => (
                <span key={badge.id} className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
                  {badge.label}
                </span>
              ))}
            </div>

            {cls.coverImage && (
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden my-3 border shadow">
                <img src={cls.coverImage} alt={cls.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-left">
                  <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
                    {cls.name}
                  </h2>
                </div>
              </div>
            )}

            {!cls.coverImage && (
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight pt-1">
                {cls.name}
              </h2>
            )}

            {cls.description && (
              <p className="text-xs text-slate-600 italic max-w-xl mx-auto pt-1">
                "{cls.description}"
              </p>
            )}
          </div>

          {/* Lecturer Highlight */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <img
              src={cls.teacherPhoto}
              alt={cls.teacherName}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-600 shadow-md shrink-0"
            />
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block">Chief Subject Lecturer</span>
              <h3 className="text-xl font-black text-slate-900">{cls.teacherName}</h3>
              <p className="text-xs font-bold text-slate-700">{cls.teacherTitle}</p>
              <p className="text-xs text-slate-500 font-medium">{cls.teacherQualifications}</p>
            </div>
          </div>

          {/* Timetable & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-1 text-center">
              <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Class Schedule & Time
              </span>
              <p className="font-black text-slate-900 text-base">Every {cls.dayOfWeek}</p>
              <p className="font-bold text-blue-700 text-sm flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {cls.startTime} - {cls.endTime}
              </p>
              <span className="inline-block mt-1 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {cls.durationHours === 8 ? '8 Hours Master Revision' : `${cls.durationHours} Hours Session`}
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1 text-center">
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Hall Allocation & Fee
              </span>
              <p className="font-black text-slate-900 text-base">{cls.hallName}</p>
              <p className="font-extrabold text-emerald-700 text-base">
                Rs. {cls.monthlyFee.toLocaleString()} / Month
              </p>
              <span className="inline-block mt-1 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Air Conditioned Auditorium
              </span>
            </div>
          </div>

          {/* Footer QR & Contact Info */}
          <div className="border-t-2 border-dashed border-slate-300 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left text-xs">
              <p className="font-extrabold text-slate-900">EduMaster Institute Registration Counter</p>
              <p className="text-slate-600">Hotline: <strong>{settings.phonePrimary}</strong> | General: {settings.phoneSecondary}</p>
              <p className="text-slate-500">{settings.address}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <div className="text-[10px] font-bold text-slate-500 uppercase">
                Scan QR to<br />
                verify class<br />
                enrollments
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Exit Bar */}
        <div className="print:hidden bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-bold">Press button or tap outside to return to portal</p>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-black px-5 py-2 rounded-xl text-xs transition shadow border border-slate-700"
          >
            ← Leave Leaflet View
          </button>
        </div>

      </div>
    </div>
  );
};