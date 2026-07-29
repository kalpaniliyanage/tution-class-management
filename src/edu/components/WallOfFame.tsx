// @ts-nocheck
import React, { useState } from 'react';
import { WallOfFameItem, Role } from '../types';
import { Trophy, Award, Star, Plus, Sparkles, Crown, Medal, GraduationCap } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';

interface WallOfFameProps {
  items: WallOfFameItem[];
  currentRole: Role;
  darkMode: boolean;
  onAddItem: (item: WallOfFameItem) => void;
}

export const WallOfFame: React.FC<WallOfFameProps> = ({
  items,
  currentRole,
  darkMode,
  onAddItem
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
  const [examType, setExamType] = useState<'A/L' | 'O/L'>('A/L');
  const [year, setYear] = useState('2025 A/L');
  const [streamOrGrade, setStreamOrGrade] = useState('Physical Science Stream');
  const [school, setSchool] = useState('Royal College, Colombo');
  const [islandRank, setIslandRank] = useState('01');
  const [districtRank, setDistrictRank] = useState('01');
  const [zScore, setZScore] = useState('2.9812');
  const [resultsSummary, setResultsSummary] = useState('Island Rank 01 • Z-Score 2.9812');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const newItem: WallOfFameItem = {
      id: `wof-${Date.now()}`,
      studentName: studentName.trim(),
      photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      examType,
      year,
      streamOrGrade,
      school,
      resultsSummary,
      islandRank: islandRank || undefined,
      districtRank: districtRank || undefined,
      zScore: zScore || undefined,
      subjectGrades: [
        { subject: 'Subject 01', grade: 'A' },
        { subject: 'Subject 02', grade: 'A' },
        { subject: 'Subject 03', grade: 'A' }
      ]
    };

    onAddItem(newItem);
    setShowAddModal(false);
    setStudentName('');
  };

  return (
    <div className="space-y-10 pb-14">
      {/* Hero header */}
      <div
        className={`relative overflow-hidden rounded-[2rem] border p-8 sm:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 ${
          darkMode
            ? 'bg-gradient-to-br from-slate-950 via-amber-950/50 to-slate-950 border-amber-500/30 text-white'
            : 'bg-gradient-to-br from-amber-50 via-orange-100 to-rose-50 border-amber-300 text-slate-900'
        }`}
      >
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-amber-400/25 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-28 -left-10 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse [animation-delay:1s]" />

        {/* Traditional Sri Lankan style corner motif */}
        <div className="pointer-events-none absolute top-6 right-8 opacity-20">
          <Sparkles className="w-24 h-24 text-amber-500 animate-[spin_18s_linear_infinite]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-amber-500/30 animate-in zoom-in duration-500">
            <Crown className="w-4 h-4" />
            <span>Wall of Fame • Best Results in Sri Lanka</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Our Proud Achievers &amp;{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Island Rankers
            </span>
          </h2>

          <p className={`text-sm sm:text-base font-medium leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            We celebrate the top G.C.E. Advanced Level island rankers, Z-Score champions and
            G.C.E. Ordinary Level 9A students of EduMaster Institute. Every name here is a story of
            hard work, family support and great teaching.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { icon: Trophy, label: 'Achievers', value: items.length },
              { icon: Medal, label: 'Island Ranks', value: items.filter(i => i.islandRank).length },
              { icon: GraduationCap, label: 'A/L Champions', value: items.filter(i => i.examType === 'A/L').length }
            ].map((s, i) => (
              <div
                key={s.label}
                style={{ animationDelay: `${i * 120}ms` }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-backwards ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-white/70 border-amber-200'
                }`}
              >
                <s.icon className="w-4 h-4 text-amber-500" />
                <span className="font-black text-lg leading-none">{s.value}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>

          {currentRole === 'admin' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Achiever Record</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Achievers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {items.map((item, idx) => (
          <div
            key={item.id}
            style={{ animationDelay: `${idx * 90}ms` }}
            className={`group relative rounded-[1.75rem] border p-6 space-y-4 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards ${
              darkMode ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50' : 'bg-white border-slate-200 hover:border-amber-400'
            }`}
          >
            {/* Shine sweep on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />

            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] px-3.5 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-md">
              {item.year}
            </div>

            <div className="relative flex items-center gap-4 pt-3">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-[1.4rem] bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 blur-[6px] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={item.photo}
                  alt={item.studentName}
                  className="relative w-20 h-20 rounded-2xl object-cover border-4 border-amber-400 shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 rounded-full p-1 shadow">
                  <Star className="w-3 h-3" fill="currentColor" />
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block">{item.examType} DISTINCTION</span>
                <h3 className={`text-base font-black truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.studentName}</h3>
                <p className="text-xs font-semibold text-slate-500 truncate max-w-[180px]">{item.school}</p>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 truncate">{item.streamOrGrade}</p>
              </div>
            </div>

            {/* Rank / Z-Score Badge */}
            <div className="relative bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/30 p-3.5 rounded-2xl space-y-1 text-center">
              <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm block">
                {item.resultsSummary}
              </span>
              {item.zScore && (
                <div className="flex items-center justify-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Z-Score: <strong className="text-emerald-600 dark:text-emerald-400">{item.zScore}</strong></span>
                  {item.islandRank && <span>Island Rank: <strong className="text-amber-500">{item.islandRank}</strong></span>}
                </div>
              )}
            </div>

            {/* Subject Grades */}
            <div className="relative space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject Results:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.subjectGrades.map((sg, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-transform duration-200 hover:scale-105"
                  >
                    {sg.subject}: <strong className="text-emerald-600 dark:text-emerald-400">{sg.grade}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Achiever Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Add Achiever to Wall of Fame
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <ImageDropzone
                value={photo}
                onChange={setPhoto}
                label="Achiever Photo"
                hint="Drag & drop the ranker's photo here, or click to browse (JPG / PNG, max 2MB)"
              />

              <div>
                <label className="block font-bold mb-1">Student Full Name:</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Exam Type:</label>
                  <select
                    value={examType}
                    onChange={e => setExamType(e.target.value as 'A/L' | 'O/L')}
                    className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                  >
                    <option value="A/L">G.C.E. Advanced Level (A/L)</option>
                    <option value="O/L">G.C.E. Ordinary Level (O/L)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Exam Year Tag:</label>
                  <input
                    type="text"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">School & Stream:</label>
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Results Summary (e.g., Island Rank 01 • Z-Score 2.9812):</label>
                <input
                  type="text"
                  value={resultsSummary}
                  onChange={e => setResultsSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
