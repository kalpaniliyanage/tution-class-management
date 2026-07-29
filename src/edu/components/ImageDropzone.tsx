// @ts-nocheck
import React, { useRef, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface ImageDropzoneProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  hint?: string;
}

const MAX_BYTES = 2 * 1024 * 1024; // 2MB

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  value,
  onChange,
  label = 'Student Photo',
  hint = 'Drag & drop a photo here, or click to browse (JPG / PNG, max 2MB)'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState('');

  const readFile = (file?: File) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Image too large. Please use a file under 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ''));
    reader.readAsDataURL(file);
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
            <ImageIcon className="w-6 h-6 text-slate-400" />
          </div>
        )}

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-black text-xs text-slate-700 dark:text-slate-200">
            <UploadCloud className="w-4 h-4 text-emerald-500" />
            {value ? 'Photo attached — click or drop to replace' : 'Drop image here / click to upload'}
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
