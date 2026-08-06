// @ts-nocheck
import React, { useRef, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageDropzoneProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  hint?: string;
}

const MAX_BYTES = 8 * 1024 * 1024; // 8MB source file
const MAX_EDGE = 640; // stored photo edge in px (keeps cloud sync fast)

/** Downscale + compress so photos stay small enough to sync to every device. */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('That file is not a readable image.'));
      img.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  });
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  value,
  onChange,
  label = 'Student Photo',
  hint = 'Drag & drop a photo, or click to browse — it is saved to the cloud so it shows on every phone.'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const readFile = async (file?: File) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Image too large. Please use a file under 8MB.');
      return;
    }
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } catch (e) {
      setError(e?.message || 'Could not process that image.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">{label}:</label>

      <div
        onDragOver={e => { e.preventDefault(); setIsOver(true); }}
        onDragLeave={() => setIsOver(false)}
        onDrop={e => {
          e.preventDefault();
          setIsOver(false);
          readFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 flex items-center gap-4 transition ${
          isOver
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:border-emerald-400'
        }`}
      >
        {value ? (
          <img src={value} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
            {busy ? <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" /> : <ImageIcon className="w-6 h-6 text-slate-400" />}
          </div>
        )}

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-black text-xs text-slate-700 dark:text-slate-200">
            <UploadCloud className="w-4 h-4 text-emerald-500" />
            {busy ? 'Optimising photo…' : value ? 'Photo attached — click or drop to replace' : 'Drop image here / click to upload'}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">{hint}</p>
        </div>

        {value && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onChange(''); }}
            className="ml-auto shrink-0 p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 hover:bg-rose-200 transition"
            aria-label="Remove photo"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={undefined}
        className="hidden"
        onChange={e => readFile(e.target.files?.[0])}
      />

      <input
        type="url"
        value={value.startsWith('data:') ? '' : value}
        onChange={e => onChange(e.target.value)}
        placeholder="…or paste an image URL (https://…)"
        className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-xs"
      />

      {error && <p className="text-[11px] font-bold text-rose-600">{error}</p>}
    </div>
  );
};
