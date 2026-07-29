// @ts-nocheck
import React, { useRef, useState } from 'react';
import { SubjectClass, TutePaper } from '../types';
import { UploadCloud, FileText, Trash2, Download } from 'lucide-react';

interface MaterialsUploaderProps {
  classes: SubjectClass[];
  tutes: TutePaper[];
  darkMode: boolean;
  uploadedBy?: string;
  onAddTute: (tute: TutePaper) => void;
  onDeleteTute: (id: string) => void;
}

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export const MaterialsUploader: React.FC<MaterialsUploaderProps> = ({
  classes,
  tutes,
  darkMode,
  uploadedBy,
  onAddTute,
  onDeleteTute
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Paper' | 'Tute' | 'Revision Note'>('Tute');
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [fileName, setFileName] = useState('');
  const [pdfData, setPdfData] = useState('');

  const readFile = (file?: File) => {
    setError('');
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files can be uploaded.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('PDF too large. Please upload a file under 8MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPdfData(String(reader.result || ''));
      setFileName(file.name);
      if (!title) setTitle(file.name.replace(/\.pdf$/i, ''));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfData) { setError('Please attach a PDF file first.'); return; }
    if (!classId) { setError('Please select a class.'); return; }

    const cls = classes.find(c => c.id === classId);
    onAddTute({
      id: `tut-${Date.now()}`,
      title: title.trim() || fileName || 'Untitled material',
      classId,
      className: cls?.name || '',
      type,
      issuedDate: new Date().toISOString().split('T')[0],
      pdfUrl: pdfData,
      fileName,
      uploadedBy: uploadedBy || 'Faculty',
      issuedToAll: true,
      statusMap: {}
    });

    setTitle('');
    setPdfData('');
    setFileName('');
    setError('');
  };

  const panel = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border space-y-4 ${panel}`}>
        <div>
          <h3 className="font-black text-base flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-500" />
            Upload Tute / Paper PDF
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Uploaded PDFs are released to every student who participated in the selected class.
          </p>
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setIsOver(true); }}
          onDragLeave={() => setIsOver(false)}
          onDrop={e => { e.preventDefault(); setIsOver(false); readFile(e.dataTransfer.files?.[0]); }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition ${
            isOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:border-blue-400'
          }`}
        >
          <FileText className="w-8 h-8 mx-auto text-blue-500" />
          <p className="mt-2 font-black text-xs text-slate-700 dark:text-slate-200">
            {fileName || 'Drag & drop a PDF here, or click to browse'}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">PDF only, max 8MB</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={e => readFile(e.target.files?.[0])}
        />

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1 uppercase text-[10px] tracking-wider text-slate-400">Title:</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Combined Maths Paper 06 — Model Exam"
              className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1 uppercase text-[10px] tracking-wider text-slate-400">Material Type:</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
              >
                <option value="Tute">Tute</option>
                <option value="Paper">Paper</option>
                <option value="Revision Note">Revision Note</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 uppercase text-[10px] tracking-wider text-slate-400">Class:</label>
              <select
                value={classId}
                onChange={e => setClassId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.grade})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <p className="text-[11px] font-bold text-rose-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-2.5 rounded-xl shadow-md transition text-xs"
        >
          Publish PDF to Class Students
        </button>
      </form>

      <div className={`p-6 rounded-2xl border space-y-3 ${panel}`}>
        <h3 className="font-black text-base">Published Materials ({tutes.length})</h3>

        {tutes.length === 0 && (
          <p className="text-xs text-slate-500">No tutes or papers published yet.</p>
        )}

        <div className="space-y-2.5 max-h-[520px] overflow-y-auto">
          {tutes.map(t => {
            const cls = classes.find(c => c.id === t.classId);
            return (
              <div key={t.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <div className="min-w-0">
                  <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    {t.type}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white text-xs truncate">{t.title}</p>
                  <p className="text-[10px] text-slate-400">
                    {cls?.name || t.className || 'Unassigned class'} • {t.issuedDate}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={t.pdfUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    download={t.fileName || `${t.title}.pdf`}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
                    aria-label="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onDeleteTute(t.id)}
                    className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 hover:bg-rose-200 transition"
                    aria-label="Delete material"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
