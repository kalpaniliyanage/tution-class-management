import React, { useState } from 'react';
import { SubjectClass } from '../types';
import { Calendar, Clock, MapPin, Printer, Filter, Sparkles } from 'lucide-react';

interface TimetableViewProps {
  classes: SubjectClass[];
  darkMode: boolean;
}

export const TimetableView: React.FC<TimetableViewProps> = ({ classes, darkMode }) => {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredClasses = classes.filter(cls => {
    if (selectedDay !== 'all' && cls.dayOfWeek !== selectedDay) return false;
    if (selectedGradeFilter !== 'all' && cls.grade !== selectedGradeFilter) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Master Institute Timetable Matrix
            </h2>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Weekly class schedule organized by day, hall allocation, and teacher assignment.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Master Timetable</span>
        </button>
      </div>

      {/* Day & Grade Filters */}
      <div className={`p-4 rounded-xl border space-y-3 text-xs ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="font-bold text-slate-500 shrink-0 uppercase tracking-wider">Day Filter:</span>
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${selectedDay === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            All 7 Days
          </button>
          {daysOfWeek.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${selectedDay === day ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-500 shrink-0 uppercase tracking-wider">Grade Filter:</span>
          <button
            onClick={() => setSelectedGradeFilter('all')}
            className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${selectedGradeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            All Grades
          </button>
          <button
            onClick={() => setSelectedGradeFilter('Grade 6')}
            className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${selectedGradeFilter === 'Grade 6' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Grade 6
          </button>
          <button
            onClick={() => setSelectedGradeFilter('Grade 7')}
            className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${selectedGradeFilter === 'Grade 7' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Grade 7
          </button>
          <button
            onClick={() => setSelectedGradeFilter('Grade 11 (O/L)')}
            className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${selectedGradeFilter === 'Grade 11 (O/L)' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Grade 11 (O/L)
          </button>
          <button
            onClick={() => setSelectedGradeFilter('2028 A/L')}
            className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${selectedGradeFilter === '2028 A/L' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            2028 A/L
          </button>
          <button
            onClick={() => setSelectedGradeFilter('2027 A/L')}
            className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${selectedGradeFilter === '2027 A/L' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            2027 A/L
          </button>
        </div>
      </div>

      {/* Timetable Table */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b font-extrabold text-slate-500 uppercase tracking-wider ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <th className="p-3.5">Day</th>
                <th className="p-3.5">Time & Duration</th>
                <th className="p-3.5">Subject & Class Name</th>
                <th className="p-3.5">Grade / Medium</th>
                <th className="p-3.5">Teacher</th>
                <th className="p-3.5">Lecture Hall</th>
                <th className="p-3.5 text-right">Fee (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredClasses.map(cls => (
                <tr key={cls.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${cls.isCancelledToday ? 'bg-rose-50/50 dark:bg-rose-950/20' : ''}`}>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    {cls.dayOfWeek}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-blue-600 dark:text-blue-400">{cls.startTime} - {cls.endTime}</div>
                    <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded inline-block mt-0.5">
                      {cls.durationHours === 8 ? '8 Hrs Revision' : `${cls.durationHours} Hrs Class`}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{cls.name}</div>
                    <span className="text-[10px] text-slate-500 font-semibold">{cls.type}</span>
                  </td>
                  <td className="p-3.5 space-y-1">
                    <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded block w-fit">
                      {cls.grade}
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded block w-fit">
                      {cls.medium.toUpperCase()} MEDIUM
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{cls.teacherName}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{cls.teacherQualifications}</div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{cls.hallName}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    Rs. {cls.monthlyFee.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
