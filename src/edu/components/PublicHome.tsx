import React, { useState } from 'react';
import { SubjectClass, Role, ClassBadge } from '../types';
import { Search, Calendar, Clock, MapPin, Share2, Plus, Tag, Sparkles, Filter, CheckCircle2, ShieldAlert, BookOpen, Layers, X, Grid, List, Check } from 'lucide-react';

interface PublicHomeProps {
  classes: SubjectClass[];
  currentRole: Role;
  darkMode: boolean;
  onOpenLeaflet: (cls: SubjectClass) => void;
  onUpdateClassBadges: (classId: string, updatedBadges: ClassBadge[]) => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  classes,
  currentRole,
  darkMode,
  onOpenLeaflet,
  onUpdateClassBadges
}) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('all');
  const [selectedBatchYear, setSelectedBatchYear] = useState<string>('all');
  const [selectedClassType, setSelectedClassType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewLayout, setViewLayout] = useState<'cardGrid' | 'catalogList'>('cardGrid');

  // State for Catalog Modal
  const [selectedCatalogClass, setSelectedCatalogClass] = useState<SubjectClass | null>(null);

  // State for Add Badge Modal/Popover for a specific class
  const [addingBadgeForClassId, setAddingBadgeForClassId] = useState<string | null>(null);
  const [newBadgeLabel, setNewBadgeLabel] = useState<string>('');
  const [newBadgeColor, setNewBadgeColor] = useState<string>('rose');

  // Filter logic
  const filteredClasses = classes.filter(cls => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cls.name.toLowerCase().includes(q);
      const matchTeacher = cls.teacherName.toLowerCase().includes(q);
      const matchSubject = cls.subjectName.toLowerCase().includes(q);
      const matchHall = cls.hallName.toLowerCase().includes(q);
      if (!matchName && !matchTeacher && !matchSubject && !matchHall) return false;
    }

    // Main Category Filter
    if (selectedMainCategory !== 'all') {
      if (selectedMainCategory === 'g6' && cls.grade !== 'Grade 6') return false;
      if (selectedMainCategory === 'g7' && cls.grade !== 'Grade 7') return false;
      if (selectedMainCategory === 'g8' && cls.grade !== 'Grade 8') return false;
      if (selectedMainCategory === 'g9' && cls.grade !== 'Grade 9') return false;
      if (selectedMainCategory === 'g10' && cls.grade !== 'Grade 10') return false;
      if (selectedMainCategory === 'g11' && cls.grade !== 'Grade 11 (O/L)') return false;
      if (selectedMainCategory === 'maths' && cls.stream !== 'Maths') return false;
      if (selectedMainCategory === 'science' && cls.stream !== 'Science') return false;
      if (selectedMainCategory === 'commerce' && cls.stream !== 'Commerce') return false;
      if (selectedMainCategory === 'arts' && cls.stream !== 'Arts') return false;
      if (selectedMainCategory === 'tech' && cls.stream !== 'Technology') return false;
      if (selectedMainCategory === 'common' && cls.stream !== 'Common') return false;
    }

    // Batch Year
    if (selectedBatchYear !== 'all') {
      if (cls.grade !== selectedBatchYear) return false;
    }

    // Class Type
    if (selectedClassType !== 'all') {
      if (cls.type !== selectedClassType) return false;
    }

    return true;
  });

  // Badge Add Handler
  const handleAddBadgeSubmit = (classId: string) => {
    if (!newBadgeLabel.trim()) return;
    const targetClass = classes.find(c => c.id === classId);
    if (!targetClass) return;

    const newBadge: ClassBadge = {
      id: `bg-custom-${Date.now()}`,
      label: newBadgeLabel.trim().toUpperCase(),
      color: newBadgeColor,
      category: 'custom'
    };

    const updatedBadges = [...(targetClass.badges || []), newBadge];
    onUpdateClassBadges(classId, updatedBadges);

    setNewBadgeLabel('');
    setAddingBadgeForClassId(null);
  };

  // Badge Remove Handler
  const handleRemoveBadge = (classId: string, badgeId: string) => {
    const targetClass = classes.find(c => c.id === classId);
    if (!targetClass) return;

    const updatedBadges = (targetClass.badges || []).filter(b => b.id !== badgeId);
    onUpdateClassBadges(classId, updatedBadges);
  };

  // Badge Color Style Utility
  const getBadgeColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 text-white border-blue-400';
      case 'purple':
        return 'bg-purple-600 text-white border-purple-400';
      case 'indigo':
        return 'bg-indigo-600 text-white border-indigo-400';
      case 'emerald':
        return 'bg-emerald-600 text-white border-emerald-400';
      case 'rose':
        return 'bg-rose-600 text-white border-rose-400';
      case 'amber':
        return 'bg-amber-500 text-slate-950 font-bold border-amber-300';
      case 'cyan':
        return 'bg-cyan-600 text-white border-cyan-400';
      default:
        return 'bg-slate-700 text-white border-slate-500';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <section className={`relative overflow-hidden rounded-2xl p-6 sm:p-10 border ${darkMode ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-slate-800 text-white' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-blue-800 text-white'} shadow-xl`}>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sri Lanka's #1 Smart Tuition Institute</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Comprehensive Tuition Institute Management System (SIMS)
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Grade 6 to Grade 13 (O/L & A/L) Subject Streams with Printable 12-Month Payment Stamp Cards, Student QR Identity, Entrance Gate Security, and Class Leaflet Posters.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
              ✨ Grade 6 – 11 Core & Aesthetics
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
              📘 2028 A/L (Theory Only)
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
              ⚡ 2027 A/L (Theory, Revision & Paper)
            </div>
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-lg text-xs font-bold">
              🏷️ Dynamic Badge Management Active
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter Section */}
      <section className="space-y-4">
        {/* Search & Top Title */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Class Directory & Timetables
            </h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Select Grade level or Advanced Level Stream below
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search subject, teacher, or hall..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Primary Stream & Grade Selector Buttons (Matching Requested Design) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedMainCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'all'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Classes
          </button>

          {/* Junior Grades */}
          <button
            onClick={() => setSelectedMainCategory('g6')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'g6'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Grade 6
          </button>
          <button
            onClick={() => setSelectedMainCategory('g7')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'g7'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Grade 7
          </button>
          <button
            onClick={() => setSelectedMainCategory('g8')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'g8'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Grade 8
          </button>
          <button
            onClick={() => setSelectedMainCategory('g9')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'g9'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Grade 9
          </button>
          <button
            onClick={() => setSelectedMainCategory('g10')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'g10'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Grade 10
          </button>
          <button
            onClick={() => setSelectedMainCategory('g11')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'g11'
                ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Grade 11 (O/L)
          </button>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1 shrink-0" />

          {/* A/L Streams */}
          <button
            onClick={() => setSelectedMainCategory('maths')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'maths'
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Maths Stream
          </button>
          <button
            onClick={() => setSelectedMainCategory('science')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'science'
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Science Stream
          </button>
          <button
            onClick={() => setSelectedMainCategory('commerce')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'commerce'
                ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Commerce Stream
          </button>
          <button
            onClick={() => setSelectedMainCategory('arts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'arts'
                ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Arts Stream
          </button>
          <button
            onClick={() => setSelectedMainCategory('tech')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'tech'
                ? 'bg-cyan-600 text-white ring-2 ring-cyan-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Technology Stream
          </button>
          <button
            onClick={() => setSelectedMainCategory('common')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedMainCategory === 'common'
                ? 'bg-slate-700 text-white ring-2 ring-slate-400'
                : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Common A/L
          </button>
        </div>

        {/* Sub-Filters: Batch Year & Class Mode */}
        <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-4 text-xs ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold flex items-center gap-1.5 text-slate-500 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              Batch Year:
            </span>
            <button
              onClick={() => setSelectedBatchYear('all')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedBatchYear === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              All Batches
            </button>
            <button
              onClick={() => setSelectedBatchYear('2028 A/L')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedBatchYear === '2028 A/L' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              2028 A/L (Theory Only)
            </button>
            <button
              onClick={() => setSelectedBatchYear('2027 A/L')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedBatchYear === '2027 A/L' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              2027 A/L (Theory & Revision)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-500 uppercase tracking-wider">Class Type:</span>
            <button
              onClick={() => setSelectedClassType('all')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedClassType === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              All Modes
            </button>
            <button
              onClick={() => setSelectedClassType('Theory')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedClassType === 'Theory' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Theory
            </button>
            <button
              onClick={() => setSelectedClassType('Revision')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedClassType === 'Revision' ? 'bg-rose-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Revision
            </button>
            <button
              onClick={() => setSelectedClassType('Paper Class')}
              className={`px-2.5 py-1 rounded font-semibold transition ${selectedClassType === 'Paper Class' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Paper Class
            </button>
          </div>

        </div>
      </section>

      {/* Class Cards & Catalog Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <span>Showing <strong>{filteredClasses.length}</strong> Scheduled Classes in Catalog</span>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setViewLayout('cardGrid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                  viewLayout === 'cardGrid'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Image Cards</span>
              </button>
              <button
                onClick={() => setViewLayout('catalogList')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                  viewLayout === 'catalogList'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Detailed Catalog</span>
              </button>
            </div>

            {currentRole === 'admin' && (
              <span className="text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 hidden md:inline-block">
                🛠️ Admin: Manage Badges & Images
              </span>
            )}
          </div>
        </div>

        {filteredClasses.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
            <p className="font-bold text-base">No subject classes matched your active filter criteria.</p>
            <p className="text-xs mt-1">Try switching Grade, Batch Year, or Class Type options above.</p>
          </div>
        ) : (
          <div className={viewLayout === 'cardGrid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredClasses.map(cls => (
              <div
                key={cls.id}
                className={`group relative rounded-2xl border transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col justify-between ${
                  darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Cancelled Alert Banner */}
                {cls.isCancelledToday && (
                  <div className="bg-rose-600 text-white text-xs font-bold py-1.5 px-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 animate-bounce" />
                      <span>CLASS CANCELLED TODAY</span>
                    </span>
                    <span className="opacity-90">{cls.cancelReason || 'Lecturer Urgent Reason'}</span>
                  </div>
                )}

                {/* COVER IMAGE HEADER SECTION */}
                <div 
                  className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950 cursor-pointer group/img"
                  onClick={() => setSelectedCatalogClass(cls)}
                >
                  <img
                    src={cls.coverImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80'}
                    alt={cls.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges over Cover Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="bg-blue-600/90 backdrop-blur text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow border border-blue-400/30">
                      {cls.grade}
                    </span>
                    <span className="bg-purple-600/90 backdrop-blur text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow border border-purple-400/30">
                      {cls.medium} MEDIUM
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg border border-amber-300">
                      Rs. {cls.monthlyFee.toLocaleString()} / mo
                    </span>
                  </div>

                  {/* Bottom Subject Name & Quick View CTA on Image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-black/60 backdrop-blur px-2 py-0.5 rounded border border-amber-400/30">
                        {cls.subjectName} • {cls.type}
                      </span>
                      <h4 className="text-base font-black text-white leading-snug drop-shadow-md line-clamp-1 group-hover/img:text-amber-300 transition-colors">
                        {cls.name}
                      </h4>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCatalogClass(cls);
                      }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur text-white p-1.5 rounded-lg border border-white/30 transition shrink-0"
                      title="View Full Catalog & Syllabus"
                    >
                      <BookOpen className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 space-y-4">
                  
                  {/* Dynamic Badges List */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(cls.badges && cls.badges.length > 0 ? cls.badges : [
                        { id: `b-default-grade-${cls.id}`, label: cls.grade.toUpperCase(), color: 'blue' },
                        { id: `b-default-med-${cls.id}`, label: `${cls.medium.toUpperCase()} MEDIUM`, color: 'purple' },
                        { id: `b-default-type-${cls.id}`, label: cls.type.toUpperCase(), color: 'emerald' }
                      ]).map((badge) => (
                        <span
                          key={badge.id}
                          className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md border shadow-2xs ${getBadgeColorClass(badge.color)}`}
                        >
                          <span>{badge.label}</span>
                          
                          {/* Admin Remove Badge Option */}
                          {currentRole === 'admin' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveBadge(cls.id, badge.id);
                              }}
                              className="ml-1 text-slate-200 hover:text-white hover:bg-black/20 rounded px-1 text-[10px] transition"
                              title="Remove this badge"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))}

                      {/* Admin Add Badge Button */}
                      {currentRole === 'admin' && (
                        <button
                          onClick={() => setAddingBadgeForClassId(cls.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border border-dashed border-amber-500 text-amber-500 hover:bg-amber-500/10 transition"
                          title="Add new custom badge to this class"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Badge</span>
                        </button>
                      )}
                    </div>

                    {/* Add Badge Inline Form for Admin */}
                    {addingBadgeForClassId === cls.id && (
                      <div className={`p-3 rounded-xl border text-xs space-y-2.5 ${darkMode ? 'bg-slate-950 border-amber-500/50' : 'bg-amber-50 border-amber-300'}`}>
                        <div className="flex items-center justify-between font-bold text-amber-600 dark:text-amber-400">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" />
                            Add Badge to Class
                          </span>
                          <button
                            onClick={() => setAddingBadgeForClassId(null)}
                            className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase">Badge Text Label:</label>
                          <input
                            type="text"
                            placeholder="e.g. HOT, NEW BATCH, ZOOM AVAILABLE"
                            value={newBadgeLabel}
                            onChange={e => setNewBadgeLabel(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded border text-xs font-bold uppercase focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-slate-900 border-slate-300"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase shrink-0">Badge Color:</label>
                          <select
                            value={newBadgeColor}
                            onChange={e => setNewBadgeColor(e.target.value)}
                            className="px-2 py-1 rounded border text-xs font-bold bg-white text-slate-900 border-slate-300"
                          >
                            <option value="rose">Rose Red</option>
                            <option value="amber">Amber Gold</option>
                            <option value="blue">Royal Blue</option>
                            <option value="purple">Purple</option>
                            <option value="emerald">Emerald Green</option>
                            <option value="cyan">Cyan Blue</option>
                            <option value="indigo">Indigo</option>
                          </select>

                          <button
                            onClick={() => handleAddBadgeSubmit(cls.id)}
                            className="ml-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3 py-1 rounded text-xs transition"
                          >
                            Add Badge
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Teacher Info Block */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <img
                      src={cls.teacherPhoto}
                      alt={cls.teacherName}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500/30 shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className={`font-bold text-sm leading-snug truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {cls.teacherName}
                      </h5>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate">
                        {cls.teacherTitle}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {cls.teacherQualifications}
                      </p>
                    </div>
                  </div>

                  {/* Description preview */}
                  {cls.description && (
                    <p className={`text-xs line-clamp-2 italic ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      "{cls.description}"
                    </p>
                  )}

                  {/* Schedule Details */}
                  <div className={`p-3 rounded-xl border text-xs space-y-2 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        Every {cls.dayOfWeek}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {cls.startTime} - {cls.endTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {cls.hallName}
                      </span>
                      <span className="font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {cls.durationHours === 8 ? '8 HOURS REVISION' : `${cls.durationHours} HOURS CLASS`}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className={`p-4 border-t grid grid-cols-2 gap-2 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <button
                    onClick={() => setSelectedCatalogClass(cls)}
                    className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Catalog</span>
                  </button>

                  <button
                    onClick={() => onOpenLeaflet(cls)}
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2 px-3 rounded-xl text-xs shadow-md transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Print Leaflet</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* FULL COURSE CATALOG MODAL */}
      {selectedCatalogClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            
            {/* Modal Cover Image Banner */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
              <img
                src={selectedCatalogClass.coverImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80'}
                alt={selectedCatalogClass.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setSelectedCatalogClass(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Top Info */}
              <div className="absolute bottom-4 left-6 right-6 z-10 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    Rs. {selectedCatalogClass.monthlyFee.toLocaleString()} / Month
                  </span>
                  <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase">
                    {selectedCatalogClass.grade}
                  </span>
                  <span className="bg-purple-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase">
                    {selectedCatalogClass.medium} Medium
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedCatalogClass.name}
                </h2>
              </div>
            </div>

            {/* Modal Body Details */}
            <div className="p-6 space-y-6">
              
              {/* Subject Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Subject Catalog Overview
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedCatalogClass.description || "Comprehensive syllabus coverage with theory explanation, model paper discussions, and past question analysis."}
                </p>
              </div>

              {/* Syllabus Topic Highlights */}
              {selectedCatalogClass.syllabusHighlights && selectedCatalogClass.syllabusHighlights.length > 0 && (
                <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className="text-xs font-black uppercase text-blue-500 tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Key Syllabus Topics Covered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedCatalogClass.syllabusHighlights.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lecturer Info */}
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-blue-50/50 border-blue-100'}`}>
                <img
                  src={selectedCatalogClass.teacherPhoto}
                  alt={selectedCatalogClass.teacherName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow shrink-0"
                />
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider block">Chief Subject Lecturer</span>
                  <h4 className="text-base font-black">{selectedCatalogClass.teacherName}</h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{selectedCatalogClass.teacherTitle}</p>
                  <p className="text-xs text-slate-400">{selectedCatalogClass.teacherQualifications}</p>
                </div>
              </div>

              {/* Schedule & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Schedule Day & Time</span>
                    <span>Every {selectedCatalogClass.dayOfWeek} ({selectedCatalogClass.startTime} - {selectedCatalogClass.endTime})</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Hall Location</span>
                    <span>{selectedCatalogClass.hallName}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const cls = selectedCatalogClass;
                    setSelectedCatalogClass(null);
                    onOpenLeaflet(cls);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-2.5 px-5 rounded-xl text-xs shadow-lg transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Print / Share Class Leaflet Poster</span>
                </button>

                <button
                  onClick={() => setSelectedCatalogClass(null)}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition"
                >
                  Close Catalog View
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
