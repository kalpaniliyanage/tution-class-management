// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { INITIAL_STUDENTS, INITIAL_CLASSES, INITIAL_INSTITUTE_SETTINGS } from "../edu/data/mockData";
import { CheckCircle2, AlertOctagon, GraduationCap, CalendarDays, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/verify/$code")({
  head: () => ({
    meta: [
      { title: "Verify ID — EduMaster Institute" },
      { name: "description", content: "Scan-to-verify page for EduMaster student ID cards, payment cards and class flyers." },
      { property: "og:title", content: "Verify ID — EduMaster Institute" },
      { property: "og:description", content: "Confirm a student registration or class session from an EduMaster QR code." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const { code } = Route.useParams();
  const raw = decodeURIComponent(code || "").trim();
  const key = raw.toLowerCase();

  const student = INITIAL_STUDENTS.find(
    (s) => s.studentNumber.toLowerCase() === key || s.id.toLowerCase() === key,
  );
  const cls = INITIAL_CLASSES.find((c) => c.id.toLowerCase() === key);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-600" />
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-black">{INITIAL_INSTITUTE_SETTINGS.name}</h1>
          <p className="text-xs text-slate-400">QR Verification Portal · ශ්‍රී ලංකා</p>
        </header>

        {student && (
          <section className="rounded-3xl border border-emerald-700 bg-emerald-950/50 p-6 space-y-4">
            <p className="flex items-center gap-2 font-black text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5" /> Valid student registration
            </p>
            <div className="flex items-center gap-4">
              <img src={student.photo} alt={student.fullName} className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500" />
              <div className="text-sm space-y-0.5">
                <p className="font-bold text-base">{student.fullName}</p>
                <p className="font-mono text-emerald-300 text-xs">{student.studentNumber}</p>
                <p className="text-slate-300 text-xs">{student.grade} · {student.medium} medium</p>
                <p className="text-slate-400 text-xs">{student.school}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Enrolled classes: {student.enrolledClassIds.length} · Joined {student.joinedDate}
            </p>
          </section>
        )}

        {cls && (
          <section className="rounded-3xl border border-blue-700 bg-blue-950/50 p-6 space-y-3 text-sm">
            <p className="flex items-center gap-2 font-black text-blue-300">
              <GraduationCap className="w-5 h-5" /> Verified class session
            </p>
            <p className="font-bold text-base">{cls.name}</p>
            <p className="text-slate-300 text-xs">{cls.teacherTitle} {cls.teacherName} · {cls.subjectName} ({cls.type})</p>
            <p className="flex items-center gap-2 text-xs text-slate-300">
              <CalendarDays className="w-4 h-4" /> {cls.dayOfWeek} {cls.startTime} – {cls.endTime}
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4" /> {cls.hallName}
            </p>
            <p className="text-xs font-bold text-amber-300">Rs. {cls.monthlyFee.toLocaleString()} / month</p>
          </section>
        )}

        {!student && !cls && (
          <section className="rounded-3xl border border-rose-700 bg-rose-950/50 p-6 space-y-2">
            <p className="flex items-center gap-2 font-black text-rose-300 text-sm">
              <AlertOctagon className="w-5 h-5" /> Code not recognised
            </p>
            <p className="text-xs text-slate-300">
              We could not match <span className="font-mono">{raw || "(empty)"}</span> to any student registration or class.
              Please contact the office counter for manual verification.
            </p>
          </section>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs text-slate-400 space-y-1">
          <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {INITIAL_INSTITUTE_SETTINGS.address}</p>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {INITIAL_INSTITUTE_SETTINGS.phonePrimary}</p>
        </div>

        <Link to="/" className="block text-center rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3 font-black text-sm">
          ← Go to EduMaster home
        </Link>
      </div>
    </main>
  );
}
