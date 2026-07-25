// @ts-nocheck
import React from 'react';
import { MapPin, Phone, Mail, Shield, Award, Clock } from 'lucide-react';
import { InstituteSettings } from '../types';

interface FooterProps {
  settings: InstituteSettings;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ settings, darkMode }) => {
  return (
    <footer className={`border-t transition-colors ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Institute Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white font-black text-lg">
                EM
              </div>
              <h2 className="text-white font-bold text-lg tracking-tight">{settings.name}</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sri Lanka's leading tuition institute management platform delivering student cards, printable 12-month payment stamp cards, gate attendance security, and stream-wise tuition classes.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                SIMS VERIFIED v2.4
              </span>
              <span className="bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                SRI LANKA
              </span>
            </div>
          </div>

          {/* Col 2: Operating Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Institute Schedule
            </h3>
            <ul className="text-xs space-y-2">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Weekday Classes:</strong>
                  <span>{settings.weekdayHours}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Weekend Batches:</strong>
                  <span>{settings.weekendHours}</span>
                </div>
              </li>
              <li className="flex items-start gap-2 pt-1 text-slate-400">
                <Shield className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{settings.poyaHolidayNotice}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Contact Helplines
            </h3>
            <ul className="text-xs space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Primary Hotline: <strong className="text-white">{settings.phonePrimary}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Secondary Helpline: {settings.phoneSecondary}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Academic Offerings */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Curriculum Streams
            </h3>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Grade 6 – 10 Junior</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Grade 11 (O/L)</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">2028 A/L Theory</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">2027 A/L Revision</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Maths / Physics / Chemistry</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Bio / Ag. Science</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Commerce / Accounting</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Technology (ET/SFT/BST)</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">Arts & Languages</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EduMaster Institute. All rights reserved. Sri Lanka Student & Institute Management System.</p>
          <div className="flex items-center gap-4">
            <span>Powered by SIMS Smart Class Engine</span>
            <span className="text-emerald-500">🟢 Systems Online</span>
          </div>
        </div>

      </div>
    </footer>
  );
};