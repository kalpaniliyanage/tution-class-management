import React, { useState } from 'react';
import { WallOfFameItem, Role } from '../types';
import { Trophy, Award, Star, Plus, Sparkles } from 'lucide-react';

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
      photo,
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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-xl ${darkMode ? 'bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-amber-500/30 text-white' : 'bg-gradient-to-r from-amber-50 via-amber-100 to-orange-50 border-amber-300 text-slate-900'}`}>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-slate-950" />
            <span>Wall of Fame • Best Examination Results</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Our Proud Achievers & Island Rankers
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Celebrating the top-performing G.C.E. Advanced Level Island Rankers, Z-Score Champions, and G.C.E. Ordinary Level 9A Distinction Achievers produced by EduMaster Institute.
          </p>

          {currentRole === 'admin' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-md transition pt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Achiever Record</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Achievers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            className={`rounded-2xl border p-6 space-y-4 relative overflow-hidden transition-all duration-200 hover:shadow-xl ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm">
              {item.year}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <img
                src={item.photo}
                alt={item.studentName}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-amber-400 shadow-md shrink-0"
              />
              <div>
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block">{item.examType} DISTINCTION</span>
                <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.studentName}</h3>
                <p className="text-xs font-semibold text-slate-500 truncate max-w-[180px]">{item.school}</p>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">{item.streamOrGrade}</p>
              </div>
            </div>

            {/* Rank / Z-Score Badge */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl space-y-1 text-center">
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
            <div className="space-y-1 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject Results:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.subjectGrades.map((sg, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-lg font-black mb-4">Add Achiever to Wall of Fame</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
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
                  className="bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-lg"
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
