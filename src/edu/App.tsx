// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Role, SubjectClass, Teacher, Student, PaymentRecord,
  AttendanceRecord, ExamMark, Notice, WallOfFameItem,
  InstituteSettings, TutePaper, ClassBadge, Hall
} from './types';
import {
  getStoredClasses, saveStoredClasses,
  getStoredTeachers, saveStoredTeachers,
  getStoredStudents, saveStoredStudents,
  getStoredPayments, saveStoredPayments,
  getStoredAttendance, saveStoredAttendance,
  getStoredExams, saveStoredExams,
  getStoredSettings, saveStoredSettings,
  getStoredNotices, saveStoredNotices,
  getStoredWallOfFame, saveStoredWallOfFame,
  getStoredTutes, saveStoredTutes,
  getStoredHalls, saveStoredHalls,
  getStoredFreeCards, saveStoredFreeCards
} from './utils/storage';
import { seedCollectionToFirestore, subscribeToCollection, bulkSyncToFirestore } from './lib/firebaseSync';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PublicHome } from './components/PublicHome';
import { TimetableView } from './components/TimetableView';
import { ClassLeafletView } from './components/ClassLeafletView';
import { PaymentCardView } from './components/PaymentCardView';
import { StudentIDCardView } from './components/StudentIDCardView';
import { WallOfFame } from './components/WallOfFame';
import { GateSecurityModal } from './components/GateSecurityModal';
import { LoginModal } from './components/LoginModal';
import { AIChatWidget } from './components/AIChatWidget';
import { QRScannerModal } from './components/QRScannerModal';

import { AdminPortal } from './components/AdminPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { StudentPortal } from './components/StudentPortal';
import { ParentPortal } from './components/ParentPortal';

export default function App() {
  const [classes, setClasses] = useState<SubjectClass[]>(getStoredClasses);
  const [teachers, setTeachers] = useState<Teacher[]>(getStoredTeachers);
  const [students, setStudents] = useState<Student[]>(getStoredStudents);
  const [payments, setPayments] = useState<PaymentRecord[]>(getStoredPayments);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(getStoredAttendance);
  const [exams, setExams] = useState<ExamMark[]>(getStoredExams);
  const [settings, setSettings] = useState<InstituteSettings>(getStoredSettings);
  const [notices, setNotices] = useState<Notice[]>(getStoredNotices);
  const [wallOfFame, setWallOfFame] = useState<WallOfFameItem[]>(getStoredWallOfFame);
  const [tutes, setTutes] = useState<TutePaper[]>(getStoredTutes);
  const [halls, setHalls] = useState<Hall[]>(getStoredHalls);
  const [freeCards, setFreeCards] = useState<any[]>(getStoredFreeCards);

  // App State
  const [currentRole, setCurrentRole] = useState<Role>('guest');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentUserLabel, setCurrentUserLabel] = useState<string>('');
  const [activeStudentId, setActiveStudentId] = useState<string>('');
  const [activeTeacherId, setActiveTeacherId] = useState<string>('');

  // Modals
  const [selectedLeafletClass, setSelectedLeafletClass] = useState<SubjectClass | null>(null);
  const [selectedPaymentCardStudent, setSelectedPaymentCardStudent] = useState<Student | null>(null);
  const [selectedIDCardStudent, setSelectedIDCardStudent] = useState<Student | null>(null);
  const [showGateSecurity, setShowGateSecurity] = useState<boolean>(false);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Persistence Effects (local cache + shared cloud)
  useEffect(() => { saveStoredClasses(classes); bulkSyncToFirestore('classes', classes); }, [classes]);
  useEffect(() => { saveStoredTeachers(teachers); bulkSyncToFirestore('teachers', teachers); }, [teachers]);
  useEffect(() => { saveStoredStudents(students); bulkSyncToFirestore('students', students); }, [students]);
  useEffect(() => { saveStoredPayments(payments); bulkSyncToFirestore('payments', payments); }, [payments]);
  useEffect(() => { saveStoredAttendance(attendance); bulkSyncToFirestore('attendance', attendance); }, [attendance]);
  useEffect(() => { saveStoredExams(exams); bulkSyncToFirestore('exams', exams); }, [exams]);
  useEffect(() => { saveStoredSettings(settings); bulkSyncToFirestore('settings', settings); }, [settings]);
  useEffect(() => { saveStoredNotices(notices); bulkSyncToFirestore('notices', notices); }, [notices]);
  useEffect(() => { saveStoredWallOfFame(wallOfFame); bulkSyncToFirestore('wallOfFame', wallOfFame); }, [wallOfFame]);
  useEffect(() => { saveStoredTutes(tutes); bulkSyncToFirestore('tutes', tutes); }, [tutes]);
  useEffect(() => { saveStoredHalls(halls); bulkSyncToFirestore('halls', halls); }, [halls]);
  useEffect(() => { saveStoredFreeCards(freeCards); bulkSyncToFirestore('freeCards', freeCards); }, [freeCards]);

  // Lovable Cloud realtime sync — same data on every phone & account
  useEffect(() => {
    const collections: [string, unknown, (v: never) => void][] = [
      ['students', students, setStudents],
      ['teachers', teachers, setTeachers],
      ['classes', classes, setClasses],
      ['attendance', attendance, setAttendance],
      ['payments', payments, setPayments],
      ['notices', notices, setNotices],
      ['exams', exams, setExams],
      ['settings', settings, setSettings],
      ['wallOfFame', wallOfFame, setWallOfFame],
      ['tutes', tutes, setTutes],
      ['halls', halls, setHalls],
      ['freeCards', freeCards, setFreeCards],
    ];

    collections.forEach(([name, local, setter]) => {
      seedCollectionToFirestore(name, local, setter);
    });

    const unsubs = collections.map(([name, , setter]) => subscribeToCollection(name, setter));
    return () => unsubs.forEach(u => u());
  }, []);


  // Dark Mode side effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers for Badges
  const handleUpdateClassBadges = (classId: string, updatedBadges: ClassBadge[]) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, badges: updatedBadges } : c));
  };

  // Class Management
  const handleAddClass = (newCls: SubjectClass) => {
    setClasses(prev => [newCls, ...prev]);
  };

  const handleUpdateClass = (updatedCls: SubjectClass) => {
    setClasses(prev => prev.map(c => c.id === updatedCls.id ? updatedCls : c));
  };

  const handleDeleteClass = (classId: string) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
  };

  // Student Deletion
  const handleDeleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  // Stamp Payment Handler (Toggle Paid / Unpaid)
  const handleStampPayment = (studentId: string, classId: string, month: string) => {
    const student = students.find(s => s.id === studentId);
    const cls = classes.find(c => c.id === classId);

    const existingIndex = payments.findIndex(
      p => p.studentId === studentId && p.classId === classId && p.month.toLowerCase().includes(month.toLowerCase())
    );

    if (existingIndex >= 0 && payments[existingIndex].status === 'Paid') {
      // Toggle to Unpaid by removing the paid record
      setPayments(prev => prev.filter((_, idx) => idx !== existingIndex));
      return;
    }

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      studentId,
      studentName: student?.fullName || 'Student',
      classId,
      className: cls?.name || 'Class',
      month: `${month} 2026`,
      year: 2026,
      amount: cls?.monthlyFee || 2500,
      paidDate: new Date().toISOString().split('T')[0],
      receiptNumber: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      paymentMethod: 'Cash',
      status: 'Paid'
    };

    setPayments(prev => [newPayment, ...prev]);
  };

  // Attendance Handler
  const handleMarkAttendance = (studentId: string, classId: string, status: 'Present' | 'Absent' | 'Late') => {
    const student = students.find(s => s.id === studentId);
    const cls = classes.find(c => c.id === classId);

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentId,
      studentName: student?.fullName || '',
      studentNumber: student?.studentNumber || '',
      classId,
      className: cls?.name || '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status,
      smsSent: true,
      smsLogMessage: status === 'Present'
        ? `SMS Dispatched to ${student?.parentPhone}: Student ${student?.fullName} checked in at EduMaster Gate.`
        : `SMS ALERT sent to ${student?.parentPhone}: Dear Parent, ${student?.fullName} was ABSENT today for ${cls?.name}.`
    };

    setAttendance(prev => [newRecord, ...prev]);
  };

  // Select Role Handler
  const handleSelectRole = (role: Role, userLabel?: string, studentId?: string, teacherId?: string) => {
    setCurrentRole(role);
    setCurrentUserLabel(userLabel || '');
    if (studentId) setActiveStudentId(studentId);
    if (teacherId) setActiveTeacherId(teacherId);

    if (role === 'guest') {
      setActiveTab('home');
    } else {
      setActiveTab(role);
    }
  };

  const activeNotice = notices.find(n => n.isHeaderBanner) || notices[0];
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];
  const activeTeacher = teachers.find(t => t.id === activeTeacherId) || teachers[0];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Header */}
      <Header
        settings={settings}
        activeNotice={activeNotice}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenGateSecurity={() => setShowGateSecurity(true)}
        onOpenQRScanner={() => setShowQRScanner(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
        currentUserLabel={currentUserLabel}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <PublicHome
            classes={classes}
            currentRole={currentRole}
            darkMode={darkMode}
            onOpenLeaflet={setSelectedLeafletClass}
            onUpdateClassBadges={handleUpdateClassBadges}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableView classes={classes} darkMode={darkMode} />
        )}

        {activeTab === 'wallOfFame' && (
          <WallOfFame
            items={wallOfFame}
            currentRole={currentRole}
            darkMode={darkMode}
            onAddItem={item => setWallOfFame(prev => [item, ...prev])}
          />
        )}

        {['admin', 'teacher', 'student', 'parent'].includes(activeTab) && currentRole !== activeTab && (
          <div className="max-w-md mx-auto my-16 text-center space-y-4 p-8 rounded-3xl border border-rose-500/30 bg-rose-500/5">
            <h2 className="text-xl font-black">Restricted Portal</h2>
            <p className="text-sm text-slate-400">
              This portal is private. Sign in with the correct passcode / PIN for the
              <span className="font-bold capitalize"> {activeTab} </span> portal to view it.
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-black px-5 py-2.5 rounded-xl text-sm"
            >
              Portal Login
            </button>
          </div>
        )}

        {activeTab === 'admin' && currentRole === 'admin' && (
          <AdminPortal
            classes={classes}
            teachers={teachers}
            students={students}
            payments={payments}
            attendance={attendance}
            notices={notices}
            settings={settings}
            wallOfFame={wallOfFame}
            halls={halls}
            darkMode={darkMode}
            onAddClass={handleAddClass}
            onUpdateClass={handleUpdateClass}
            onDeleteClass={handleDeleteClass}
            onAddTeacher={newT => setTeachers(prev => [newT, ...prev])}
            onUpdateTeacher={updatedT => setTeachers(prev => prev.map(t => t.id === updatedT.id ? updatedT : t))}
            onDeleteTeacher={tId => setTeachers(prev => prev.filter(t => t.id !== tId))}
            onAddStudent={newS => setStudents(prev => [newS, ...prev])}
            onUpdateStudent={updatedS => setStudents(prev => prev.map(s => s.id === updatedS.id ? updatedS : s))}
            onDeleteStudent={handleDeleteStudent}
            onAddWallOfFame={item => setWallOfFame(prev => [item, ...prev])}
            onUpdateWallOfFame={item => setWallOfFame(prev => prev.map(w => w.id === item.id ? item : w))}
            onDeleteWallOfFame={id => setWallOfFame(prev => prev.filter(w => w.id !== id))}
            onAddHall={newH => setHalls(prev => [newH, ...prev])}
            onUpdateHall={updatedH => setHalls(prev => prev.map(h => h.id === updatedH.id ? updatedH : h))}
            onDeleteHall={hallId => setHalls(prev => prev.filter(h => h.id !== hallId))}
            onStampPayment={handleStampPayment}
            onSaveSettings={setSettings}
            onPostNotice={n => setNotices(prev => [n, ...prev])}
            onOpenPaymentCard={stu => setSelectedPaymentCardStudent(stu)}
            onOpenIDCard={stu => setSelectedIDCardStudent(stu)}
            onUpdateClassBadges={handleUpdateClassBadges}
            exams={exams}
            freeCards={freeCards}
            onAddFreeCard={award => setFreeCards(prev => [award, ...prev])}
            onDeleteFreeCard={id => setFreeCards(prev => prev.filter(f => f.id !== id))}
          />
        )}

        {activeTab === 'teacher' && currentRole === 'teacher' && (
          <TeacherPortal
            activeTeacher={activeTeacher}
            classes={classes}
            students={students}
            attendance={attendance}
            exams={exams}
            tutes={tutes}
            darkMode={darkMode}
            onAddTute={t => setTutes(prev => [t, ...prev])}
            onDeleteTute={id => setTutes(prev => prev.filter(t => t.id !== id))}
            onMarkAttendance={handleMarkAttendance}
            onPostNotice={n => setNotices(prev => [n, ...prev])}
            onRecordMark={m => setExams(prev => [m, ...prev])}
          />
        )}

        {activeTab === 'student' && currentRole === 'student' && (
          <StudentPortal
            student={activeStudent}
            enrolledClasses={classes.filter(c => activeStudent.enrolledClassIds.includes(c.id))}
            payments={payments.filter(p => p.studentId === activeStudent.id)}
            exams={exams.filter(e => e.studentId === activeStudent.id)}
            tutes={tutes}
            attendance={attendance.filter(a => a.studentId === activeStudent.id)}
            darkMode={darkMode}
            onOpenPaymentCard={() => setSelectedPaymentCardStudent(activeStudent)}
            onOpenIDCard={() => setSelectedIDCardStudent(activeStudent)}
            onUpdateStudent={updated => setStudents(prev => prev.map(s => s.id === updated.id ? updated : s))}
          />
        )}

        {activeTab === 'parent' && currentRole === 'parent' && (
          <ParentPortal
            student={activeStudent}
            enrolledClasses={classes.filter(c => activeStudent.enrolledClassIds.includes(c.id))}
            payments={payments.filter(p => p.studentId === activeStudent.id)}
            attendance={attendance.filter(a => a.studentId === activeStudent.id)}
            exams={exams.filter(e => e.studentId === activeStudent.id)}
            darkMode={darkMode}
            onOpenPaymentCard={() => setSelectedPaymentCardStudent(activeStudent)}
            onOpenIDCard={() => setSelectedIDCardStudent(activeStudent)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} darkMode={darkMode} />

      {/* MODALS */}
      {selectedLeafletClass && (
        <ClassLeafletView
          cls={selectedLeafletClass}
          settings={settings}
          darkMode={darkMode}
          onClose={() => setSelectedLeafletClass(null)}
        />
      )}

      {selectedPaymentCardStudent && (
        <PaymentCardView
          student={selectedPaymentCardStudent}
          enrolledClasses={classes.filter(c => selectedPaymentCardStudent.enrolledClassIds.includes(c.id))}
          payments={payments}
          settings={settings}
          darkMode={darkMode}
          onClose={() => setSelectedPaymentCardStudent(null)}
          onStampPayment={handleStampPayment}
          isAdmin={currentRole === 'admin'}
        />
      )}

      {selectedIDCardStudent && (
        <StudentIDCardView
          student={selectedIDCardStudent}
          settings={settings}
          darkMode={darkMode}
          onClose={() => setSelectedIDCardStudent(null)}
        />
      )}

      {showGateSecurity && (
        <GateSecurityModal
          students={students}
          classes={classes}
          payments={payments}
          onMarkAttendance={handleMarkAttendance}
          darkMode={darkMode}
          onClose={() => setShowGateSecurity(false)}
        />
      )}

      {showQRScanner && (
        <QRScannerModal
          students={students}
          darkMode={darkMode}
          onClose={() => setShowQRScanner(false)}
          onSelectStudentCard={stu => setSelectedPaymentCardStudent(stu)}
        />
      )}

      <AIChatWidget darkMode={darkMode} />

      {showLoginModal && (
        <LoginModal
          darkMode={darkMode}
          students={students}
          teachers={teachers}
          onSelectRole={handleSelectRole}
          onClose={() => setShowLoginModal(false)}
          onOpenGateSecurity={() => setShowGateSecurity(true)}
        />
      )}

    </div>
  );
}