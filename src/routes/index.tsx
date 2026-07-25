import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const EduApp = lazy(() => import("../edu/App"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduMaster — Tuition Institute Management" },
      { name: "description", content: "EduMaster institute management: classes, students, payments, attendance, ID cards and gate security." },
      { property: "og:title", content: "EduMaster — Tuition Institute Management" },
      { property: "og:description", content: "Manage classes, students, payments, attendance and ID cards for your tuition institute." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <EduApp />
    </Suspense>
  );
}
