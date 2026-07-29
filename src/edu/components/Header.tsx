// @ts-nocheck
import React from 'react';
import { Shield, Phone, Clock, MapPin, Sun, Moon, LogIn, QrCode, AlertTriangle, Trophy, Calendar, Sparkles } from 'lucide-react';
import { Role, InstituteSettings, Notice } from '../types';

interface HeaderProps {
  settings: InstituteSettings;
  activeNotice?: Notice;
  currentRole: Role;
  onSelectRole: (role: Role) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenGateSecurity: () => void;
  onOpenQRScanner: () => void;
  onOpenLoginModal: () => void;
  currentUserLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activeNotice,
  currentRole,
  onSelectRole,
  darkMode,
  onToggleDarkMode,
  activeTab,
  onSelectTab,
  onOpenGateSecurity,
  onOpenQRScanner,
  onOpenLoginModal,
  currentUserLabel
}) => {
  return (
    <header className="sticky top-0 z-40 w-full shadow-md transition-colors duration-200">
      <div className="lk-flagline h-1 w-full" />
      {/* Top Banner Notice - Admin Controlled Urgent Broadcast */}
      {settings.showBannerNotice && settings.bannerNoticeText && (
        <div className="bg-amber-500 text-slate-950 font-medium text-xs sm:text-sm py-2 px-4 border-b border-amber-600 shadow-sm">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse text-slate-950" />
              <span>{settings.bannerNoticeText}</span>
            </div>
            {settings.bannerNoticeAuthor && (
              <span className="bg-slate-950 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs inline-flex items-center gap-1">
                <span>✍️ Author: {settings.bannerNoticeAuthor}</span>
                {settings.bannerNoticeRole && <span className="opacity-80">({settings.bannerNoticeRole})</span>}
                {settings.bannerNoticeDate && <span className="opacity-70">• {settings.bannerNoticeDate}</span>}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Top Contact & Hours Bar */}
      <div className={`text-xs py-2 px-4 border-b ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-900 text-slate-200 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hotline: <strong className="text-white">{settings.phonePrimary}</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>General: {settings.phoneSecondary}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{settings.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Weekdays: {settings.weekdayHours}</span>
            </div>

            {/* Gate Security Quick Trigger */}
            <button
              onClick={onOpenGateSecurity}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-xs transition shadow-sm"
              title="Open Gate Attendance Security Simulator"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Gate Security</span>
            </button>

            {/* QR Scanner */}
            <button
              onClick={onOpenQRScanner}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium px-2 py-1 rounded text-xs transition"
              title="Scan Student QR Card"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-1 rounded transition ${darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className={`${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} border-b py-3 px-4 transition-colors`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Institute Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('home')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white font-black text-xl shadow-md border border-blue-400/30">
              EM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`font-black text-lg sm:text-xl tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {settings.name}
                </h1>
                <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                  SRI LANKA
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {settings.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'home' ? 'bg-blue-600 text-white font-semibold' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Classes & Catalog
            </button>
            <button
              onClick={() => onSelectTab('timetable')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'timetable' ? 'bg-blue-600 text-white font-semibold' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Master Timetable</span>
            </button>
            <button
              onClick={() => onSelectTab('wallOfFame')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'wallOfFame' ? 'bg-blue-600 text-white font-semibold' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Best Results</span>
            </button>
          </nav>

          {/* User Portal Switcher / Login */}
          <div className="flex items-center gap-2">
            {currentRole === 'guest' ? (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-2 rounded-lg text-xs sm:text-sm shadow-md transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Portal Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTab(currentRole)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-bold transition shadow-sm ${
                    currentRole === 'admin'
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      : currentRole === 'teacher'
                      ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                      : currentRole === 'student'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="capitalize">{currentRole} Portal</span>
                  {currentUserLabel && <span className="opacity-75 font-normal">({currentUserLabel})</span>}
                </button>

                <button
                  onClick={() => {
                    onSelectRole('guest');
                    onSelectTab('home');
                  }}
                  className={`text-xs px-2.5 py-1.5 rounded border transition ${darkMode ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                  title="Switch back to Guest Mode"
                >
                  Switch Role
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sub Navigation */}
      <div className={`md:hidden flex items-center justify-around py-2 border-b text-xs font-semibold ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
        <button
          onClick={() => onSelectTab('home')}
          className={`px-3 py-1 rounded ${activeTab === 'home' ? 'bg-blue-600 text-white' : ''}`}
        >
          Classes
        </button>
        <button
          onClick={() => onSelectTab('timetable')}
          className={`px-3 py-1 rounded ${activeTab === 'timetable' ? 'bg-blue-600 text-white' : ''}`}
        >
          Timetable
        </button>
        <button
          onClick={() => onSelectTab('wallOfFame')}
          className={`px-3 py-1 rounded ${activeTab === 'wallOfFame' ? 'bg-blue-600 text-white' : ''}`}
        >
          Best Results
        </button>
      </div>
    </header>
  );
};