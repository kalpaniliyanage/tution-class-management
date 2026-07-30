// @ts-nocheck
import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Wallet } from 'lucide-react';

/* ------------------------- Stat tiles ------------------------- */

export const StatTile: React.FC<{
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
  tone?: 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo';
  darkMode?: boolean;
}> = ({ label, value, hint, icon, tone = 'blue', darkMode }) => {
  const tones: Record<string, string> = {
    blue: 'from-blue-600 to-indigo-600',
    emerald: 'from-emerald-600 to-teal-600',
    amber: 'from-amber-500 to-orange-600',
    rose: 'from-rose-600 to-red-600',
    indigo: 'from-indigo-600 to-purple-600'
  };
  return (
    <div className={`relative overflow-hidden p-4 rounded-2xl border shadow-2xs ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tones[tone]}`} />
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">{value}</p>
          {hint && <p className="text-[10px] text-slate-500 font-semibold">{hint}</p>}
        </div>
        {icon && (
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tones[tone]} text-white flex items-center justify-center shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

/* --------------------- Role dashboard strip -------------------- */

export const RoleDashboard: React.FC<{
  role: 'admin' | 'teacher' | 'student' | 'parent';
  title?: string;
  tiles: { label: string; value: React.ReactNode; hint?: string; tone?: string; icon?: React.ReactNode }[];
  links?: { label: string; onClick: () => void; icon?: React.ReactNode }[];
  darkMode?: boolean;
}> = ({ role, title, tiles, links = [], darkMode }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <h3 className="font-black text-sm uppercase tracking-wider text-slate-500">
        {title || `${role} Dashboard`}
      </h3>
      {links.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {links.map(l => (
            <button
              key={l.label}
              onClick={l.onClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-amber-500 text-slate-200' : 'bg-white border-slate-200 hover:border-amber-500 text-slate-700'}`}
            >
              {l.icon}
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {tiles.map(t => (
        <StatTile key={t.label} {...t} darkMode={darkMode} />
      ))}
    </div>
  </div>
);

/* --------------------- Payment status panel -------------------- */

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function getPaymentStatus(payments: any[], classId: string, monthLabel: string) {
  const rec = payments.find(
    p => p.classId === classId && String(p.month || '').toLowerCase().includes(monthLabel.toLowerCase())
  );
  if (rec && rec.status === 'Paid') return { status: 'Paid', record: rec };
  if (rec) return { status: rec.status, record: rec };
  return { status: 'Pending', record: null };
}

export const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    Paid: 'bg-emerald-600 text-white',
    Pending: 'bg-amber-500 text-slate-950',
    Overdue: 'bg-rose-600 text-white'
  };
  const Icon = status === 'Paid' ? CheckCircle2 : status === 'Overdue' ? AlertCircle : Clock;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase ${map[status] || map.Pending}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

export const PaymentStatusPanel: React.FC<{
  enrolledClasses: any[];
  payments: any[];
  darkMode?: boolean;
  monthsBack?: number;
  onOpenPaymentCard?: () => void;
  audience?: 'student' | 'parent';
}> = ({ enrolledClasses, payments, darkMode, monthsBack = 3, onOpenPaymentCard, audience = 'student' }) => {
  const now = new Date();
  const monthList: string[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthList.push(MONTHS[d.getMonth()]);
  }
  const currentMonth = MONTHS[now.getMonth()];

  const rows = enrolledClasses.map(cls => ({
    cls,
    cells: monthList.map(m => ({ month: m, ...getPaymentStatus(payments, cls.id, m) }))
  }));

  const dueNow = rows.filter(r => r.cells[r.cells.length - 1].status !== 'Paid');
  const totalDue = dueNow.reduce((sum, r) => sum + (r.cls.monthlyFee || 0), 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-black text-base flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-500" />
          Payment Status — {currentMonth} {now.getFullYear()}
        </h3>
        {onOpenPaymentCard && (
          <button
            onClick={onOpenPaymentCard}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black px-3 py-1.5 rounded-lg text-[11px]"
          >
            💳 Open Payment Card
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
          <p className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Paid To Date</p>
          <p className="font-black text-emerald-700 dark:text-emerald-300 text-sm">Rs. {totalPaid.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
          <p className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400">Pending Now</p>
          <p className="font-black text-amber-700 dark:text-amber-300 text-sm">Rs. {totalDue.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
          <p className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400">Classes</p>
          <p className="font-black text-blue-700 dark:text-blue-300 text-sm">{enrolledClasses.length}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-[10px] uppercase text-slate-500 font-black">
              <th className="py-2 pr-2">Subject Class</th>
              {monthList.map(m => (
                <th key={m} className="py-2 px-2 text-center">{m.slice(0, 3)}</th>
              ))}
              <th className="py-2 pl-2 text-right">Fee</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ cls, cells }) => (
              <tr key={cls.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-2.5 pr-2">
                  <p className="font-extrabold text-slate-900 dark:text-white">{cls.name}</p>
                  <p className="text-[10px] text-slate-500">{cls.teacherName}</p>
                </td>
                {cells.map(c => (
                  <td key={c.month} className="py-2.5 px-2 text-center">
                    <StatusChip status={c.status} />
                    {c.record?.receiptNumber && (
                      <p className="text-[9px] text-slate-400 mt-0.5">{c.record.receiptNumber}</p>
                    )}
                  </td>
                ))}
                <td className="py-2.5 pl-2 text-right font-black text-slate-700 dark:text-slate-200">
                  Rs. {(cls.monthlyFee || 0).toLocaleString()}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={monthList.length + 2} className="py-4 text-center text-slate-500">No enrolled classes yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-slate-500 font-semibold">
        {audience === 'parent'
          ? 'Statuses are updated by the institute office when a payment is marked paid at the counter.'
          : 'Ask the office to stamp your card — the status updates here once the admin marks it paid.'}
      </p>
    </div>
  );
};
