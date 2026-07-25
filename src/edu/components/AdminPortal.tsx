// @ts-nocheck
import React, { useState } from 'react';
import {
  SubjectClass, Teacher, Student, PaymentRecord,
  AttendanceRecord, Notice, InstituteSettings, ClassBadge, WallOfFameItem, Hall
} from '../types';
import {
  Shield, Users, BookOpen, CreditCard, Clock, Send,
  Settings, Plus, Trash2, Edit3, Tag, AlertTriangle,
  CheckCircle2, Filter, Zap, Sparkles, UserX, AlertOctagon,
  Search, Award, Trophy, UserPlus, GraduationCap, Building2, UserCheck
} from 'lucide-react';

interface AdminPortalProps {
  classes: SubjectClass[];
  teachers: Teacher[];
  students: Student[];
  payments: PaymentRecord[];
  attendance: AttendanceRecord[];
  notices: Notice[];
  settings: InstituteSettings;
  wallOfFame?: WallOfFameItem[];
  halls?: Hall[];
  darkMode: boolean;
  onAddClass: (newCls: SubjectClass) => void;
  onUpdateClass: (updatedCls: SubjectClass) => void;
  onDeleteClass: (classId: string) => void;
  onAddTeacher?: (teacher: Teacher) => void;
  onUpdateTeacher?: (teacher: Teacher) => void;
  onDeleteTeacher?: (teacherId: string) => void;
  onAddStudent?: (student: Student) => void;
  onUpdateStudent?: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onAddWallOfFame?: (item: WallOfFameItem) => void;
  onUpdateWallOfFame?: (item: WallOfFameItem) => void;
  onDeleteWallOfFame?: (itemId: string) => void;
  onAddHall?: (hall: Hall) => void;
  onUpdateHall?: (hall: Hall) => void;
  onDeleteHall?: (hallId: string) => void;
  onStampPayment: (studentId: string, classId: string, month: string) => void;
  onSaveSettings: (settings: InstituteSettings) => void;
  onPostNotice: (notice: Notice) => void;
  onOpenPaymentCard: (student: Student) => void;
  onOpenIDCard?: (student: Student) => void;
  onUpdateClassBadges: (classId: string, updatedBadges: ClassBadge[]) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  classes,
  teachers,
  students,
  payments,
  attendance,
  notices,
  settings,
  wallOfFame = [],
  halls = [],
  darkMode,
  onAddClass,
  onUpdateClass,
  onDeleteClass,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onAddWallOfFame,
  onUpdateWallOfFame,
  onDeleteWallOfFame,
  onAddHall,
  onUpdateHall,
  onDeleteHall,
  onStampPayment,
  onSaveSettings,
  onPostNotice,
  onOpenPaymentCard,
  onOpenIDCard,
  onUpdateClassBadges
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'classes' | 'teachers' | 'students' | 'halls' | 'timetableMaster' | 'sharedSchedule' | 'bestRanks' | 'payments' | 'notices' | 'settings'
  >('overview');

  // Search in students & classes
  const [studentSearch, setStudentSearch] = useState('');
  const [showOnlyInactive, setShowOnlyInactive] = useState(false);

  // New Class Form Modal State
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState<SubjectClass | null>(null);

  // Class Form Fields
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('Grade 6');
  const [stream, setStream] = useState<'Maths' | 'Science' | 'Commerce' | 'Arts' | 'Technology' | 'Common' | 'Junior' | 'OL'>('Junior');
  const [medium, setMedium] = useState<'Sinhala' | 'English' | 'Tamil'>('Sinhala');
  const [subjectName, setSubjectName] = useState('Mathematics');
  const [classType, setClassType] = useState<'Theory' | 'Revision' | 'Paper Class' | 'Paper & Revision' | 'Special Extra'>('Theory');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [dayOfWeek, setDayOfWeek] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Saturday');
  const [startTime, setStartTime] = useState('08:30 AM');
  const [endTime, setEndTime] = useState('10:30 AM');
  const [durationHours, setDurationHours] = useState(2);
  const [hallName, setHallName] = useState('Hall 01 (A/C Auditorium)');
  const [monthlyFee, setMonthlyFee] = useState(2500);
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [syllabusHighlightsText, setSyllabusHighlightsText] = useState('');
  const [selectedClassBadges, setSelectedClassBadges] = useState<ClassBadge[]>([]);

  // Teacher Form Modal State
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherName, setTeacherName] = useState('');
  const [teacherTitle, setTeacherTitle] = useState('');
  const [teacherPhoto, setTeacherPhoto] = useState('');
  const [teacherQualifications, setTeacherQualifications] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherSalary, setTeacherSalary] = useState(150000);
  const [teacherSubjectsText, setTeacherSubjectsText] = useState('');
  const [teacherParticipatingClassesText, setTeacherParticipatingClassesText] = useState('');

  // Student Form Modal State
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [stuFullName, setStuFullName] = useState('');
  const [stuNumber, setStuNumber] = useState('');
  const [stuPhoto, setStuPhoto] = useState('');
  const [stuSchool, setStuSchool] = useState('');
  const [stuGrade, setStuGrade] = useState('2028 A/L');
  const [stuMedium, setStuMedium] = useState<'Sinhala' | 'English' | 'Tamil'>('Sinhala');
  const [stuMobile, setStuMobile] = useState('');
  const [stuParentName, setStuParentName] = useState('');
  const [stuParentPhone, setStuParentPhone] = useState('');
  const [stuAddress, setStuAddress] = useState('');
  const [stuEnrolledClassIds, setStuEnrolledClassIds] = useState<string[]>([]);

  // Wall of Fame / Best Ranks Modal State
  const [showRankerModal, setShowRankerModal] = useState(false);
  const [editingRanker, setEditingRanker] = useState<WallOfFameItem | null>(null);
  const [rankerName, setRankerName] = useState('');
  const [rankerPhoto, setRankerPhoto] = useState('');
  const [rankerExamType, setRankerExamType] = useState<'A/L' | 'O/L'>('A/L');
  const [rankerYear, setRankerYear] = useState('2025 A/L');
  const [rankerStream, setRankerStream] = useState('Physical Science Stream');
  const [rankerSchool, setRankerSchool] = useState('Ananda College, Colombo');
  const [rankerSummary, setRankerSummary] = useState('Island Rank 01 • Z-Score 2.9812');
  const [rankerIslandRank, setRankerIslandRank] = useState('01');
  const [rankerDistrictRank, setRankerDistrictRank] = useState('01');
  const [rankerZScore, setRankerZScore] = useState('2.9812');
  const [rankerGradesText, setRankerGradesText] = useState('Combined Maths: A, Physics: A, Chemistry: A');

  // Custom Badge & A/L Tag State
  const [badgeText, setBadgeText] = useState('');
  const [badgeColor, setBadgeColor] = useState('rose');
  const [alPresetBadges, setAlPresetBadges] = useState<string[]>([
    '2028 A/L', '2027 A/L', '2026 A/L', '2029 A/L',
    'COMBINED MATHS', 'PHYSICS', 'REVISION', 'PAPER CLASS',
    'THEORY BATCH', 'ISLAND BATCH'
  ]);
  const [newPresetTag, setNewPresetTag] = useState('');

  // Shared Teacher Schedule Generator State
  const [sharedTeacherId, setSharedTeacherId] = useState(teachers[0]?.id || '');
  const [sharedGradeFilter, setSharedGradeFilter] = useState('All');
  const [sharedDay, setSharedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Saturday');
  const [sharedStart, setSharedStart] = useState('08:30 AM');
  const [sharedEnd, setSharedEnd] = useState('10:30 AM');
  const [sharedHall, setSharedHall] = useState('Hall 01 (A/C Auditorium)');
  const [sharedFee, setSharedFee] = useState(2500);
  const [selectedTargetClassIds, setSelectedTargetClassIds] = useState<string[]>([]);
  const [scheduleApplyMode, setScheduleApplyMode] = useState<'checkboxes' | 'writtenFormat'>('checkboxes');
  const [writtenClassesFormat, setWrittenClassesFormat] = useState(
    "Grade 6 - Mathematics (SINHALA MEDIUM)\nGrade 6 - Science (SINHALA MEDIUM)\nGrade 6 - English Language (ENGLISH MEDIUM)"
  );

  // Settings State
  const [tempSettings, setTempSettings] = useState<InstituteSettings>(settings);

  // Hall Management State
  const [showHallModal, setShowHallModal] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);
  const [hallNameInput, setHallNameInput] = useState('');
  const [hallCapacityInput, setHallCapacityInput] = useState(500);
  const [hallFloorInput, setHallFloorInput] = useState('Ground Floor Main Wing');
  const [hallFacilitiesInput, setHallFacilitiesInput] = useState('Air Conditioned, HD LED Screen, Sound System');
  const [hallAvailableInput, setHallAvailableInput] = useState(true);

  // Notice Banner & Broadcast Author State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Urgent Alert' | 'Class Rescheduled' | 'General' | 'Exam' | 'Poya Holiday'>('Urgent Alert');
  const [noticeIsBanner, setNoticeIsBanner] = useState(true);
  const [noticeAuthorInput, setNoticeAuthorInput] = useState('Principal - Mr. Dinesh Liyanage');
  const [noticeAuthorRoleInput, setNoticeAuthorRoleInput] = useState('Academic Directorate');

  const [bannerText, setBannerText] = useState(settings.bannerNoticeText);
  const [showBanner, setShowBanner] = useState(settings.showBannerNotice);
  const [bannerAuthor, setBannerAuthor] = useState(settings.bannerNoticeAuthor || 'Academic Directorate & Principal');
  const [bannerRole, setBannerRole] = useState(settings.bannerNoticeRole || 'EduMaster Maharagama Campus');
  const [bannerDate, setBannerDate] = useState(settings.bannerNoticeDate || new Date().toISOString().split('T')[0]);

  // Filtered Students
  const filteredStudents = students.filter(s => {
    if (studentSearch.trim()) {
      const q = studentSearch.toLowerCase();
      if (!(s.fullName || '').toLowerCase().includes(q) && !(s.studentNumber || '').toLowerCase().includes(q) && !(s.parentPhone || '').includes(q)) {
        return false;
      }
    }
    if (showOnlyInactive) {
      if ((s.daysAbsentCount || 0) < 30) return false;
    }
    return true;
  });

  // Overdue Payments
  const overduePayments = payments.filter(p => p.status === 'Overdue');

  // Quick Toggle AL Badge in Modal Form
  const quickToggleALBadge = (label: string, color: string) => {
    const exists = selectedClassBadges.some(b => b.label.toUpperCase() === label.toUpperCase());
    if (exists) {
      setSelectedClassBadges(prev => prev.filter(b => b.label.toUpperCase() !== label.toUpperCase()));
    } else {
      const newB: ClassBadge = {
        id: `bg-al-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        label: label.toUpperCase(),
        color,
        category: 'grade'
      };
      setSelectedClassBadges(prev => [...prev, newB]);
    }
  };

  // Move Badge Position (Left/Right)
  const moveBadgePosition = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === selectedClassBadges.length - 1) return;
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    const updated = [...selectedClassBadges];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSelectedClassBadges(updated);
  };

  // Remove Attached Badge
  const removeAttachedBadge = (id: string) => {
    setSelectedClassBadges(prev => prev.filter(b => b.id !== id));
  };

  // Add Custom Badge
  const handleAddCustomBadge = () => {
    if (!badgeText.trim()) return;
    const newB: ClassBadge = {
      id: `bg-cst-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      label: badgeText.trim().toUpperCase(),
      color: badgeColor || 'rose',
      category: 'grade'
    };
    setSelectedClassBadges(prev => [...prev, newB]);
    setBadgeText('');
  };

  // Add New Preset Tag
  const handleAddPresetTag = () => {
    if (!newPresetTag.trim()) return;
    const upper = newPresetTag.trim().toUpperCase();
    if (!alPresetBadges.includes(upper)) {
      setAlPresetBadges(prev => [...prev, upper]);
    }
    setNewPresetTag('');
  };

  // Remove Preset Tag
  const handleRemovePresetTag = (tag: string) => {
    setAlPresetBadges(prev => prev.filter(t => t !== tag));
  };

  // Class Save Handler
  const handleSaveClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedTeacher = teachers.find(t => t.id === teacherId);

    const highlights = syllabusHighlightsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const baseBadges: ClassBadge[] = selectedClassBadges.length > 0
      ? selectedClassBadges
      : [
          { id: `bg-gr-${Date.now()}`, label: grade.toUpperCase(), color: 'blue', category: 'grade' },
          { id: `bg-med-${Date.now()}`, label: `${medium.toUpperCase()} MEDIUM`, color: 'purple', category: 'medium' },
          { id: `bg-tp-${Date.now()}`, label: classType.toUpperCase(), color: 'emerald', category: 'type' }
        ];

    if (editingClass) {
      const updated: SubjectClass = {
        ...editingClass,
        name: className,
        grade,
        stream,
        medium,
        subjectName,
        type: classType,
        teacherId: assignedTeacher?.id || 'tech-01',
        teacherName: assignedTeacher?.name || 'Mr. Lecturer',
        teacherTitle: assignedTeacher?.title || 'Senior Lecturer',
        teacherPhoto: assignedTeacher?.photo || '',
        teacherQualifications: assignedTeacher?.qualifications || '',
        dayOfWeek,
        startTime,
        endTime,
        durationHours,
        hallName,
        monthlyFee,
        badges: baseBadges,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
        description: description || `${className} comprehensive weekly theory & revision sessions.`,
        syllabusHighlights: highlights.length > 0 ? highlights : ['Syllabus Theory', 'Past Paper Practice', 'Model Exam Paper Discussion']
      };
      onUpdateClass(updated);
      setEditingClass(null);
    } else {
      const created: SubjectClass = {
        id: `cls-${Date.now()}`,
        name: className,
        grade,
        stream,
        medium,
        subjectName,
        type: classType,
        teacherId: assignedTeacher?.id || 'tech-01',
        teacherName: assignedTeacher?.name || 'Mr. Lecturer',
        teacherTitle: assignedTeacher?.title || 'Senior Lecturer',
        teacherPhoto: assignedTeacher?.photo || '',
        teacherQualifications: assignedTeacher?.qualifications || '',
        dayOfWeek,
        startTime,
        endTime,
        durationHours,
        hallName,
        monthlyFee,
        badges: baseBadges,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
        description: description || `${className} comprehensive weekly theory & revision sessions.`,
        syllabusHighlights: highlights.length > 0 ? highlights : ['Syllabus Theory', 'Past Paper Practice', 'Model Exam Paper Discussion']
      };
      onAddClass(created);
    }

    setShowAddClassModal(false);
  };

  // Open Edit Class Modal
  const openEditClassModal = (cls: SubjectClass) => {
    setEditingClass(cls);
    setClassName(cls.name);
    setGrade(cls.grade);
    setStream(cls.stream || 'Junior');
    setMedium(cls.medium);
    setSubjectName(cls.subjectName);
    setClassType(cls.type);
    setTeacherId(cls.teacherId);
    setDayOfWeek(cls.dayOfWeek);
    setStartTime(cls.startTime);
    setEndTime(cls.endTime);
    setDurationHours(cls.durationHours);
    setHallName(cls.hallName);
    setMonthlyFee(cls.monthlyFee);
    setCoverImage(cls.coverImage || '');
    setDescription(cls.description || '');
    setSyllabusHighlightsText((cls.syllabusHighlights || []).join(', '));
    setSelectedClassBadges(cls.badges || []);
    setShowAddClassModal(true);
  };

  // Apply Shared Schedule
  const handleApplySharedSchedule = () => {
    const assignedTeacher = teachers.find(t => t.id === sharedTeacherId);

    if (scheduleApplyMode === 'writtenFormat') {
      const lines = writtenClassesFormat
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

      if (lines.length === 0) {
        alert('Please write at least one class name entry in the format box.');
        return;
      }

      let updatedCount = 0;
      let createdCount = 0;

      lines.forEach(lineName => {
        // Find existing class by name (case insensitive)
        const existing = classes.find(c => c.name.toLowerCase() === lineName.toLowerCase() || `${c.name} (${c.medium.toUpperCase()} MEDIUM)`.toLowerCase() === lineName.toLowerCase());
        
        if (existing) {
          const updated: SubjectClass = {
            ...existing,
            teacherId: assignedTeacher?.id || existing.teacherId,
            teacherName: assignedTeacher?.name || existing.teacherName,
            teacherTitle: assignedTeacher?.title || existing.teacherTitle,
            teacherPhoto: assignedTeacher?.photo || existing.teacherPhoto,
            teacherQualifications: assignedTeacher?.qualifications || existing.teacherQualifications,
            dayOfWeek: sharedDay,
            startTime: sharedStart,
            endTime: sharedEnd,
            hallName: sharedHall,
            monthlyFee: sharedFee
          };
          onUpdateClass(updated);
          updatedCount++;
        } else {
          // Create new class for the typed format line
          const mediumMatched: 'Sinhala' | 'English' | 'Tamil' = lineName.toLowerCase().includes('english') ? 'English' : lineName.toLowerCase().includes('tamil') ? 'Tamil' : 'Sinhala';
          const created: SubjectClass = {
            id: `cls-sch-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
            name: lineName,
            grade: lineName.includes('Grade') ? lineName.split('-')[0].trim() : '2028 A/L',
            stream: 'Junior',
            medium: mediumMatched,
            subjectName: lineName.includes('-') ? lineName.split('-')[1].split('(')[0].trim() : lineName,
            type: 'Theory',
            teacherId: assignedTeacher?.id || 'tech-01',
            teacherName: assignedTeacher?.name || 'Mr. Lecturer',
            teacherTitle: assignedTeacher?.title || 'Senior Lecturer',
            teacherPhoto: assignedTeacher?.photo || '',
            teacherQualifications: assignedTeacher?.qualifications || '',
            dayOfWeek: sharedDay,
            startTime: sharedStart,
            endTime: sharedEnd,
            durationHours: 2,
            hallName: sharedHall,
            monthlyFee: sharedFee,
            badges: [
              { id: `bg-gr-${Date.now()}`, label: 'SHARED SCHEDULE', color: 'amber', category: 'grade' },
              { id: `bg-med-${Date.now()}`, label: `${mediumMatched.toUpperCase()} MEDIUM`, color: 'purple', category: 'medium' }
            ],
            coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
            description: `${lineName} scheduled on ${sharedDay} ${sharedStart}-${sharedEnd} at ${sharedHall}.`,
            syllabusHighlights: ['Weekly Theory Session', 'Model Exam Paper Discussion']
          };
          onAddClass(created);
          createdCount++;
        }
      });

      alert(`Schedule Applied Successfully!\n• Updated: ${updatedCount} classes\n• Created: ${createdCount} new scheduled classes`);
      return;
    }

    // Checkboxes Mode
    if (selectedTargetClassIds.length === 0) {
      alert('Please check at least one target class to apply the shared schedule.');
      return;
    }

    selectedTargetClassIds.forEach(cId => {
      const targetCls = classes.find(c => c.id === cId);
      if (targetCls) {
        const updated: SubjectClass = {
          ...targetCls,
          teacherId: assignedTeacher?.id || targetCls.teacherId,
          teacherName: assignedTeacher?.name || targetCls.teacherName,
          teacherTitle: assignedTeacher?.title || targetCls.teacherTitle,
          teacherPhoto: assignedTeacher?.photo || targetCls.teacherPhoto,
          teacherQualifications: assignedTeacher?.qualifications || targetCls.teacherQualifications,
          dayOfWeek: sharedDay,
          startTime: sharedStart,
          endTime: sharedEnd,
          hallName: sharedHall,
          monthlyFee: sharedFee
        };
        onUpdateClass(updated);
      }
    });

    alert(`Successfully applied shared schedule to ${selectedTargetClassIds.length} classes!`);
    setSelectedTargetClassIds([]);
  };

  // Teacher Save Handler
  const handleSaveTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim()) return;

    const subjectsArr = teacherSubjectsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const availableDaysArr = teacherParticipatingClassesText
      .split('|')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingTeacher) {
      const updated: Teacher = {
        ...editingTeacher,
        name: teacherName,
        title: teacherTitle || 'Senior Faculty Lecturer',
        photo: teacherPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        qualifications: teacherQualifications || 'B.Sc. (Hons), M.Sc.',
        phone: teacherPhone || '077 123 4567',
        email: teacherEmail || 'lecturer@edumaster.lk',
        salaryScale: teacherSalary || 150000,
        subjects: subjectsArr.length > 0 ? subjectsArr : ['Combined Mathematics'],
        availableDays: availableDaysArr.length > 0 ? availableDaysArr : [teacherParticipatingClassesText || 'Saturday, Sunday']
      };
      if (onUpdateTeacher) onUpdateTeacher(updated);
    } else {
      const created: Teacher = {
        id: `tech-${Date.now()}`,
        name: teacherName,
        title: teacherTitle || 'Senior Faculty Lecturer',
        photo: teacherPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        qualifications: teacherQualifications || 'B.Sc. (Hons), M.Sc.',
        phone: teacherPhone || '077 123 4567',
        email: teacherEmail || 'lecturer@edumaster.lk',
        salaryScale: teacherSalary || 150000,
        subjects: subjectsArr.length > 0 ? subjectsArr : ['Combined Mathematics'],
        availableDays: availableDaysArr.length > 0 ? availableDaysArr : [teacherParticipatingClassesText || 'Saturday, Sunday']
      };
      if (onAddTeacher) onAddTeacher(created);
    }
    setShowTeacherModal(false);
  };

  const openAddTeacherModal = () => {
    setEditingTeacher(null);
    setTeacherName('');
    setTeacherTitle('Senior Faculty Lecturer');
    setTeacherPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
    setTeacherQualifications('B.Sc. (Hons), M.Sc. Physics');
    setTeacherPhone('077 123 4567');
    setTeacherEmail('teacher@edumaster.lk');
    setTeacherSalary(150000);
    setTeacherSubjectsText('Combined Mathematics, Physics');
    setTeacherParticipatingClassesText('2028 A/L Combined Maths (Sat 8:00 AM - 12:30 PM) | 2027 A/L Revision (Sun 1:00 PM - 5:00 PM) | Grade 11 Paper Class (Wed 3:30 PM)');
    setShowTeacherModal(true);
  };

  const openEditTeacherModal = (t: Teacher) => {
    setEditingTeacher(t);
    setTeacherName(t.name);
    setTeacherTitle(t.title);
    setTeacherPhoto(t.photo);
    setTeacherQualifications(t.qualifications);
    setTeacherPhone(t.phone);
    setTeacherEmail(t.email);
    setTeacherSalary(t.salaryScale);
    setTeacherSubjectsText(t.subjects.join(', '));
    setTeacherParticipatingClassesText((t.availableDays || []).join(' | '));
    setShowTeacherModal(true);
  };

  // Student Save Handler
  const handleSaveStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuFullName.trim()) return;

    if (editingStudent) {
      const updated: Student = {
        ...editingStudent,
        fullName: stuFullName,
        nameWithInitials: stuFullName.split(' ').map(n => n[0]).join('. ') + ' ' + (stuFullName.split(' ').slice(-1)[0] || ''),
        studentNumber: stuNumber || editingStudent.studentNumber,
        photo: stuPhoto || editingStudent.photo,
        school: stuSchool || 'Royal College',
        grade: stuGrade,
        medium: stuMedium,
        mobile: stuMobile,
        parentName: stuParentName || 'Parent',
        parentPhone: stuParentPhone || '0770000000',
        address: stuAddress || 'Colombo',
        enrolledClassIds: stuEnrolledClassIds
      };
      if (onUpdateStudent) onUpdateStudent(updated);
    } else {
      const created: Student = {
        id: `stu-${Date.now()}`,
        studentNumber: stuNumber || `EDU-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: stuFullName,
        nameWithInitials: stuFullName.split(' ').map(n => n[0]).join('. ') + ' ' + (stuFullName.split(' ').slice(-1)[0] || ''),
        photo: stuPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        school: stuSchool || 'Royal College',
        grade: stuGrade,
        medium: stuMedium,
        dob: '2008-05-12',
        gender: 'Male',
        address: stuAddress || 'Colombo',
        mobile: stuMobile || '077 111 2222',
        parentName: stuParentName || 'Parent Name',
        parentPhone: stuParentPhone || '077 333 4444',
        emergencyPhone: stuParentPhone || '077 333 4444',
        joinedDate: new Date().toISOString().split('T')[0],
        enrolledClassIds: stuEnrolledClassIds.length > 0 ? stuEnrolledClassIds : [classes[0]?.id || 'cls-01'],
        pin: '1234',
        daysAbsentCount: 0
      };
      if (onAddStudent) onAddStudent(created);
    }
    setShowStudentModal(false);
  };

  const openAddStudentModal = () => {
    setEditingStudent(null);
    setStuFullName('');
    setStuNumber(`EDU-2026-${Math.floor(10000 + Math.random() * 90000)}`);
    setStuPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
    setStuSchool('Royal College, Colombo');
    setStuGrade('2028 A/L');
    setStuMedium('Sinhala');
    setStuMobile('077 888 9999');
    setStuParentName('Parent Name');
    setStuParentPhone('071 222 3333');
    setStuAddress('Colombo, Sri Lanka');
    setStuEnrolledClassIds(classes.slice(0, 2).map(c => c.id));
    setShowStudentModal(true);
  };

  const openEditStudentModal = (s: Student) => {
    setEditingStudent(s);
    setStuFullName(s.fullName);
    setStuNumber(s.studentNumber);
    setStuPhoto(s.photo);
    setStuSchool(s.school);
    setStuGrade(s.grade);
    setStuMedium(s.medium);
    setStuMobile(s.mobile);
    setStuParentName(s.parentName);
    setStuParentPhone(s.parentPhone);
    setStuAddress(s.address);
    setStuEnrolledClassIds(s.enrolledClassIds || []);
    setShowStudentModal(true);
  };

  // Ranker / Best Results Save Handler
  const handleSaveRankerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rankerName.trim()) return;

    const gradesArr = rankerGradesText
      .split(',')
      .map(item => {
        const parts = item.split(':');
        return {
          subject: (parts[0] || 'Subject').trim(),
          grade: (parts[1] || 'A').trim()
        };
      });

    if (editingRanker) {
      const updated: WallOfFameItem = {
        ...editingRanker,
        studentName: rankerName,
        photo: rankerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        examType: rankerExamType,
        year: rankerYear,
        streamOrGrade: rankerStream,
        school: rankerSchool,
        resultsSummary: rankerSummary,
        islandRank: rankerIslandRank,
        districtRank: rankerDistrictRank,
        zScore: rankerZScore,
        subjectGrades: gradesArr.length > 0 ? gradesArr : [{ subject: 'Combined Maths', grade: 'A' }]
      };
      if (onUpdateWallOfFame) onUpdateWallOfFame(updated);
    } else {
      const created: WallOfFameItem = {
        id: `wof-${Date.now()}`,
        studentName: rankerName,
        photo: rankerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        examType: rankerExamType,
        year: rankerYear,
        streamOrGrade: rankerStream,
        school: rankerSchool,
        resultsSummary: rankerSummary,
        islandRank: rankerIslandRank,
        districtRank: rankerDistrictRank,
        zScore: rankerZScore,
        subjectGrades: gradesArr.length > 0 ? gradesArr : [{ subject: 'Combined Maths', grade: 'A' }]
      };
      if (onAddWallOfFame) onAddWallOfFame(created);
    }
    setShowRankerModal(false);
  };

  const openAddRankerModal = () => {
    setEditingRanker(null);
    setRankerName('');
    setRankerPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
    setRankerExamType('A/L');
    setRankerYear('2025 A/L');
    setRankerStream('Physical Science Stream');
    setRankerSchool('Ananda College, Colombo');
    setRankerSummary('Island Rank 01 • Z-Score 2.9812');
    setRankerIslandRank('01');
    setRankerDistrictRank('01');
    setRankerZScore('2.9812');
    setRankerGradesText('Combined Maths: A, Physics: A, Chemistry: A');
    setShowRankerModal(true);
  };

  const openEditRankerModal = (item: WallOfFameItem) => {
    setEditingRanker(item);
    setRankerName(item.studentName);
    setRankerPhoto(item.photo);
    setRankerExamType(item.examType);
    setRankerYear(item.year);
    setRankerStream(item.streamOrGrade);
    setRankerSchool(item.school);
    setRankerSummary(item.resultsSummary);
    setRankerIslandRank(item.islandRank || '');
    setRankerDistrictRank(item.districtRank || '');
    setRankerZScore(item.zScore || '');
    setRankerGradesText((item.subjectGrades || []).map(sg => `${sg.subject}: ${sg.grade}`).join(', '));
    setShowRankerModal(true);
  };

  // Hall Management Handlers
  const openAddHallModal = () => {
    setEditingHall(null);
    setHallNameInput('');
    setHallCapacityInput(400);
    setHallFloorInput('1st Floor Main Wing');
    setHallFacilitiesInput('Air Conditioned, HD Projector, Surround Sound');
    setHallAvailableInput(true);
    setShowHallModal(true);
  };

  const openEditHallModal = (h: Hall) => {
    setEditingHall(h);
    setHallNameInput(h.name);
    setHallCapacityInput(h.capacity);
    setHallFloorInput(h.floor);
    setHallFacilitiesInput((h.facilities || []).join(', '));
    setHallAvailableInput(h.isAvailable ?? true);
    setShowHallModal(true);
  };

  const handleSaveHallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hallNameInput.trim()) return;

    const facArr = hallFacilitiesInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingHall) {
      const updated: Hall = {
        ...editingHall,
        name: hallNameInput,
        capacity: hallCapacityInput,
        floor: hallFloorInput || '1st Floor',
        facilities: facArr.length > 0 ? facArr : ['Air Conditioned', 'Sound System'],
        isAvailable: hallAvailableInput
      };
      if (onUpdateHall) onUpdateHall(updated);
    } else {
      const created: Hall = {
        id: `hall-${Date.now()}`,
        name: hallNameInput,
        capacity: hallCapacityInput,
        floor: hallFloorInput || '1st Floor',
        facilities: facArr.length > 0 ? facArr : ['Air Conditioned', 'Sound System'],
        isAvailable: hallAvailableInput
      };
      if (onAddHall) onAddHall(created);
    }
    setShowHallModal(false);
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
    <div className="space-y-6 pb-12">
      {/* Admin Suite Header */}
      <div className={`p-6 rounded-3xl border flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 shadow-md ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                ADMIN CONTROL SUITE
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                LIVE GOVERNANCE
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">System Master Administrator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Full administrative control over classes, badges, teachers, students, fees, and banner notices.</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setEditingClass(null);
              setShowAddClassModal(true);
            }}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Class</span>
          </button>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'classes' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Class & Catalog ({classes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'teachers' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
          <span>Faculty Teachers ({teachers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'students' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span>Student Registry ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('halls')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'halls' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Halls & Facilities ({halls.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('timetableMaster')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'timetableMaster' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Master Timetable Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('sharedSchedule')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'sharedSchedule' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Shared Schedule Tool</span>
        </button>

        <button
          onClick={() => setActiveTab('bestRanks')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'bestRanks' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Institute Best Ranks ({wallOfFame.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'payments' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-rose-400" />
          <span>Overdue Payments ({overduePayments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'notices' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Banner Notices</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'settings' ? 'bg-rose-600 text-white' : darkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-slate-400" />
          <span>Institute Details</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border space-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Scheduled Classes</span>
              <p className="text-3xl font-black text-blue-600">{classes.length}</p>
            </div>
            <div className={`p-5 rounded-2xl border space-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Students</span>
              <p className="text-3xl font-black text-emerald-600">{students.length}</p>
            </div>
            <div className={`p-5 rounded-2xl border space-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faculty Lecturers</span>
              <p className="text-3xl font-black text-purple-600">{teachers.length}</p>
            </div>
            <div className={`p-5 rounded-2xl border space-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overdue Fee Accounts</span>
              <p className="text-3xl font-black text-rose-600">{overduePayments.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2.5: FACULTY TEACHERS MANAGEMENT */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-500" />
                Faculty Members & Lecturer Management
              </h3>
              <p className="text-xs text-slate-500">
                Add, edit qualifications, update salary scales, and set participating classes format for all institute teachers.
              </p>
            </div>
            <button
              onClick={openAddTeacherModal}
              className="bg-purple-600 hover:bg-purple-500 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow transition flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Teacher</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map(tech => (
              <div key={tech.id} className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tech.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                      alt={tech.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/30 shadow-sm shrink-0"
                    />
                    <div>
                      <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                        FACULTY LECTURER
                      </span>
                      <h4 className="font-black text-base text-slate-900 dark:text-white leading-snug">{tech.name}</h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">{tech.title}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p><strong className="text-slate-900 dark:text-slate-100">🎓 Degree/Qualifications:</strong> {tech.qualifications}</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">📞 Phone:</strong> {tech.phone}</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">✉️ Email:</strong> {tech.email}</p>
                    <p><strong className="text-slate-900 dark:text-slate-100">💵 Salary Scale:</strong> Rs. {(tech.salaryScale || 150000).toLocaleString()} / Month</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Subjects Taught:</span>
                    <div className="flex flex-wrap gap-1">
                      {tech.subjects.map((sub, i) => (
                        <span key={i} className="text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Participating Classes Schedule Format:</span>
                    <div className="space-y-1">
                      {(tech.availableDays || []).map((slot, idx) => (
                        <div key={idx} className="text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 px-2.5 py-1 rounded border border-amber-200 dark:border-amber-900/50">
                          📌 {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => openEditTeacherModal(tech)}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Teacher</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove teacher "${tech.name}" from the faculty?`)) {
                        if (onDeleteTeacher) onDeleteTeacher(tech.id);
                      }
                    }}
                    className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs transition"
                    title="Remove Teacher"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black">All Subject Classes & Badge Customizer</h3>
            <button
              onClick={() => {
                setEditingClass(null);
                setShowAddClassModal(true);
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow transition"
            >
              + Create Class
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map(cls => (
              <div key={cls.id} className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase mr-1">
                        {cls.grade}
                      </span>
                      <h4 className="font-black text-base text-slate-900 dark:text-white mt-1">{cls.name}</h4>
                    </div>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded">
                      Rs. {cls.monthlyFee.toLocaleString()}
                    </span>
                  </div>

                  {/* Badges List on Card */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {(cls.badges || []).map(b => (
                      <span key={b.id} className={`text-[10px] font-black px-2 py-0.5 rounded border inline-flex items-center gap-1 ${getBadgeColorClass(b.color)}`}>
                        <span>{b.label}</span>
                        <button
                          onClick={() => {
                            const updated = (cls.badges || []).filter(x => x.id !== b.id);
                            onUpdateClassBadges(cls.id, updated);
                          }}
                          className="text-slate-300 hover:text-white px-1 text-[10px]"
                          title="Remove badge"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500">👨‍🏫 {cls.teacherName} ({cls.teacherQualifications})</p>
                  <p className="text-xs text-slate-500">🗓️ {cls.dayOfWeek} {cls.startTime} - {cls.endTime} | {cls.hallName}</p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => openEditClassModal(cls)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Class</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete class "${cls.name}" permanently?`)) {
                        onDeleteClass(cls.id);
                      }
                    }}
                    className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs transition"
                    title="Delete class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SHARED TEACHER SCHEDULE GENERATOR */}
      {activeTab === 'sharedSchedule' && (
        <div className={`p-6 rounded-3xl border space-y-6 max-w-3xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="space-y-1">
            <h3 className="text-lg font-black flex items-center gap-2 text-amber-500">
              <Zap className="w-5 h-5" />
              Shared Teacher Schedule & Bulk Timetable Tool
            </h3>
            <p className="text-xs text-slate-500">
              Select a lecturer and apply a unified schedule to multiple target classes using class checkboxes or direct written format!
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-black mb-1.5 text-slate-300 uppercase text-[10px] tracking-wider">Select Lecturer / Teacher:</label>
                <select
                  value={sharedTeacherId}
                  onChange={e => setSharedTeacherId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-xs shadow-sm"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.qualifications})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-black mb-1.5 text-slate-300 uppercase text-[10px] tracking-wider">Schedule Apply Method:</label>
                <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setScheduleApplyMode('checkboxes')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition ${
                      scheduleApplyMode === 'checkboxes'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ☑️ Checkboxes
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleApplyMode('writtenFormat')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition ${
                      scheduleApplyMode === 'writtenFormat'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✍️ Write Format
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule Time & Location Parameters */}
            <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <span className="font-black text-rose-500 uppercase text-[10px] tracking-wider">Schedule Time & Location Slot</span>
                <div className="flex gap-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => { setSharedDay('Saturday'); setSharedStart('08:00 AM'); setSharedEnd('12:30 PM'); }}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-amber-400 font-bold"
                  >
                    Sat Morning
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSharedDay('Sunday'); setSharedStart('01:00 PM'); setSharedEnd('05:00 PM'); }}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-amber-400 font-bold"
                  >
                    Sun Afternoon
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div>
                  <label className="block font-bold mb-1 text-slate-400 text-[10px]">Day:</label>
                  <select
                    value={sharedDay}
                    onChange={e => setSharedDay(e.target.value as any)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-xs"
                  >
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-400 text-[10px]">Start Time:</label>
                  <input
                    type="text"
                    value={sharedStart}
                    onChange={e => setSharedStart(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-400 text-[10px]">End Time:</label>
                  <input
                    type="text"
                    value={sharedEnd}
                    onChange={e => setSharedEnd(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-400 text-[10px]">Hall / Location:</label>
                  <select
                    value={sharedHall}
                    onChange={e => setSharedHall(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-xs"
                  >
                    {halls.map(h => (
                      <option key={h.id} value={h.name}>{h.name}</option>
                    ))}
                    {!halls.some(h => h.name === sharedHall) && (
                      <option value={sharedHall}>{sharedHall}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-400 text-[10px]">Monthly Fee (Rs.):</label>
                  <input
                    type="number"
                    value={sharedFee}
                    onChange={e => setSharedFee(Number(e.target.value))}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-amber-500 border-slate-300 dark:border-slate-700 font-black text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox Target Selection Mode (Screenshot Styled Container) */}
            {scheduleApplyMode === 'checkboxes' ? (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-black text-slate-300 uppercase text-[10px] tracking-wider">
                    Select Target Classes:
                  </label>
                  <div className="flex flex-wrap items-center gap-1">
                    {['All', 'Grade 6', 'Grade 7', 'Grade 11', '2028 A/L', '2027 A/L'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSharedGradeFilter(g)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold border transition ${
                          sharedGradeFilter === g
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = classes
                          .filter(c => sharedGradeFilter === 'All' || c.grade.includes(sharedGradeFilter))
                          .map(c => c.id);
                        setSelectedTargetClassIds(filtered);
                      }}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-emerald-600 text-white ml-2"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTargetClassIds([])}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-slate-700 text-slate-300"
                    >
                      Deselect
                    </button>
                  </div>
                </div>

                {/* Styled Box matching user screenshot */}
                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-xl max-h-64 overflow-y-auto space-y-2.5 font-sans">
                  {classes
                    .filter(c => sharedGradeFilter === 'All' || c.grade.includes(sharedGradeFilter))
                    .map(c => {
                      const isChecked = selectedTargetClassIds.includes(c.id);
                      return (
                        <label
                          key={c.id}
                          className="flex items-center gap-3 cursor-pointer select-none group font-bold text-sm text-white"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedTargetClassIds([...selectedTargetClassIds, c.id]);
                              } else {
                                setSelectedTargetClassIds(selectedTargetClassIds.filter(id => id !== c.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-rose-500 focus:ring-rose-500"
                          />
                          <span className="group-hover:text-amber-400 transition">
                            {c.name} ({c.medium.toUpperCase()} MEDIUM)
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* Written Schedule Format Mode */
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-black text-amber-400 uppercase text-[10px] tracking-wider">
                    Write / Paste Classes Schedule Format Lines:
                  </label>
                  <span className="text-[10px] text-slate-400">One class line per format entry</span>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3 shadow-xl font-sans space-y-2">
                  <textarea
                    rows={6}
                    value={writtenClassesFormat}
                    onChange={e => setWrittenClassesFormat(e.target.value)}
                    placeholder="Grade 6 - Mathematics (SINHALA MEDIUM)&#10;Grade 6 - Science (SINHALA MEDIUM)&#10;Grade 6 - English Language (ENGLISH MEDIUM)"
                    className="w-full bg-transparent text-white font-black text-sm p-2 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl border border-slate-800 font-mono"
                  />
                  <p className="text-[10px] text-slate-400">
                    💡 <strong className="text-amber-400">Format note:</strong> Write class names separated by line breaks. Any existing class matching these names will be updated with the timetable slot, and any new class name will automatically be created.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleApplySharedSchedule}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-2xl text-sm shadow-xl transition hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>
                {scheduleApplyMode === 'checkboxes'
                  ? `Apply Shared Schedule to ${selectedTargetClassIds.length} Checked Classes`
                  : 'Apply Shared Schedule to Written Format Classes'}
              </span>
            </button>

          </div>
        </div>
      )}

      {/* TAB 4: STUDENT REGISTRY & INACTIVE DELETION */}
      {activeTab === 'students' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                Registered Student Database
              </h3>
              <p className="text-xs text-slate-500">Register new students, update records, or remove inactive student profiles (&gt;30 days no-show).</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openAddStudentModal}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow transition flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Register Student</span>
              </button>

              <label className="flex items-center gap-2 text-xs font-bold text-rose-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyInactive}
                  onChange={e => setShowOnlyInactive(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded"
                />
                <span>Show Inactive (&gt;30 days)</span>
              </label>

              <div className="relative w-56">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or phone..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs font-medium bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b font-extrabold uppercase text-slate-500">
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Student Number</th>
                  <th className="p-3">Grade & Medium</th>
                  <th className="p-3">Parent Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredStudents.map(stu => (
                  <tr key={stu.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <img src={stu.photo} alt={stu.fullName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p>{stu.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{stu.school}</p>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-600">{stu.studentNumber}</td>
                    <td className="p-3 font-bold">{stu.grade} ({stu.medium})</td>
                    <td className="p-3 font-bold">{stu.parentPhone}</td>
                    <td className="p-3">
                      {(stu.daysAbsentCount || 0) > 30 ? (
                        <span className="bg-rose-100 text-rose-700 font-extrabold px-2 py-0.5 rounded text-[10px]">
                          INACTIVE ({stu.daysAbsentCount} Days)
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => openEditStudentModal(stu)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2 py-1 rounded text-[11px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onOpenPaymentCard(stu)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded text-[11px]"
                      >
                        💳 Monthly Card & Stamp
                      </button>
                      {onOpenIDCard && (
                        <button
                          onClick={() => onOpenIDCard(stu)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2 py-1 rounded text-[11px]"
                        >
                          🪪 Digital ID
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm(`Permanently remove student "${stu.fullName}" from institute database?`)) {
                            onDeleteStudent(stu.id);
                          }
                        }}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-2 py-1 rounded text-[11px]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: HALL MANAGEMENT (ADDING & REMOVING HALLS) */}
      {activeTab === 'halls' && (
        <div className={`p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500/10 text-indigo-500 font-extrabold text-[10px] px-2.5 py-0.5 rounded border border-indigo-500/20 uppercase">
                  FACILITIES & AUDITORIUMS
                </span>
                <span className="text-slate-400 text-xs">{halls.length} Campus Halls Configured</span>
              </div>
              <h3 className="text-xl font-black mt-1 text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-500" />
                Lecture Halls & Auditorium Management
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage seating capacities, floor locations, audio-visual facilities, and availability statuses across all campus halls.
              </p>
            </div>

            <button
              onClick={openAddHallModal}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Hall / Auditorium</span>
            </button>
          </div>

          {/* Halls Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {halls.map(hall => {
              const assignedClassesCount = classes.filter(c => (c.hallName || '').toLowerCase().includes((hall.name || '').toLowerCase())).length;
              return (
                <div
                  key={hall.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    darkMode ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700' : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">
                          {hall.floor || 'Ground Floor'}
                        </span>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                          {hall.name}
                        </h4>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        hall.isAvailable !== false
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      }`}>
                        {hall.isAvailable !== false ? 'Active' : 'Maintenance'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="bg-slate-800 text-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        👥 Capacity: <span className="text-white font-black">{hall.capacity} Seats</span>
                      </span>
                      <span className="bg-slate-800 text-blue-400 px-2.5 py-1 rounded-lg">
                        📚 {assignedClassesCount} Scheduled Classes
                      </span>
                    </div>

                    {/* Facilities List */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Hall Amenities & Specs:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(hall.facilities || ['A/C Auditorium', 'Sound System']).map((fac, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            ✨ {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">ID: {hall.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditHallModal(hall)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove hall "${hall.name}"?`)) {
                            if (onDeleteHall) onDeleteHall(hall.id);
                          }
                        }}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4.5: INSTITUTE BEST RANKS & RESULTS (WALL OF FAME) */}
      {activeTab === 'bestRanks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Institute Best Ranks & Results (Wall of Fame)
              </h3>
              <p className="text-xs text-slate-500">
                Manage top island rankers, district rankers, and 3A distinction students showcased on the public landing page.
              </p>
            </div>
            <button
              onClick={openAddRankerModal}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow transition flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4" />
              <span>+ Add Achiever / Ranker</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallOfFame.map(item => (
              <div key={item.id} className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                      alt={item.studentName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md shrink-0"
                    />
                    <div>
                      <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                        {item.examType} Achiever ({item.year})
                      </span>
                      <h4 className="font-black text-base text-slate-900 dark:text-white leading-snug">{item.studentName}</h4>
                      <p className="text-xs text-slate-500 font-bold">{item.school}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1">
                    <p className="text-xs font-black text-amber-800 dark:text-amber-200">🏆 {item.resultsSummary}</p>
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Stream: {item.streamOrGrade}</p>
                    {item.islandRank && <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Island Rank: {item.islandRank} | District Rank: {item.districtRank}</p>}
                    {item.zScore && <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Z-Score: {item.zScore}</p>}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Subject Grades:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(item.subjectGrades || []).map((sg, i) => (
                        <span key={i} className="text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                          {sg.subject}: <strong className="text-emerald-600 dark:text-emerald-400">{sg.grade}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => openEditRankerModal(item)}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Ranker</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ranker "${item.studentName}" from Wall of Fame?`)) {
                        if (onDeleteWallOfFame) onDeleteWallOfFame(item.id);
                      }
                    }}
                    className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs transition"
                    title="Remove Ranker"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: OVERDUE PAYMENTS DIRECTORY */}
      {activeTab === 'payments' && (() => {
        const paidPayments = payments.filter(p => p.status === 'Paid');
        const totalCollected = paidPayments.reduce((s, p) => s + (p.amount || 0), 0);
        const totalOverdue = overduePayments.reduce((s, p) => s + (p.amount || 0), 0);
        const pendingPayments = payments.filter(p => p.status === 'Pending');
        const totalPending = pendingPayments.reduce((s, p) => s + (p.amount || 0), 0);

        // Per-class income breakdown
        const perClass: Record<string, { className: string; paidCount: number; amount: number }> = {};
        paidPayments.forEach(p => {
          if (!perClass[p.classId]) perClass[p.classId] = { className: p.className, paidCount: 0, amount: 0 };
          perClass[p.classId].paidCount += 1;
          perClass[p.classId].amount += p.amount || 0;
        });
        const perClassRows = Object.values(perClass).sort((a, b) => b.amount - a.amount);

        // Per-month income breakdown
        const perMonth: Record<string, number> = {};
        paidPayments.forEach(p => {
          const key = p.month || 'Unknown';
          perMonth[key] = (perMonth[key] || 0) + (p.amount || 0);
        });
        const perMonthRows = Object.entries(perMonth).sort((a, b) => b[1] - a[1]);

        const exportCsv = () => {
          const header = ['Receipt', 'Date', 'Student', 'Class', 'Month', 'Amount', 'Method', 'Status'];
          const rows = payments.map(p => [
            p.receiptNumber, p.paidDate, p.studentName, p.className,
            p.month, p.amount, p.paymentMethod, p.status,
          ]);
          const csv = [header, ...rows]
            .map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
            .join('\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `income-report-${new Date().toISOString().split('T')[0]}.csv`;
          a.click();
          URL.revokeObjectURL(url);
        };

        return (
          <div className="space-y-6">
            {/* INCOME REPORT SUMMARY */}
            <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-black text-emerald-600 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Income Report & Full Payment Ledger
                  </h3>
                  <p className="text-xs text-slate-500">Live totals from all recorded payments across every class and month.</p>
                </div>
                <button
                  onClick={exportCsv}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl text-xs shadow"
                >
                  ⬇ Export Full CSV
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Total Collected</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Rs. {totalCollected.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">{paidPayments.length} paid receipts</p>
                </div>
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Pending</p>
                  <p className="text-2xl font-black text-amber-600 dark:text-amber-400">Rs. {totalPending.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">{pendingPayments.length} pending items</p>
                </div>
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Overdue</p>
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400">Rs. {totalOverdue.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">{overduePayments.length} overdue items</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className={`rounded-2xl border p-4 ${darkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Income by Class</p>
                  <div className="max-h-56 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] uppercase font-black text-slate-500 border-b border-slate-300 dark:border-slate-700">
                          <th className="py-1">Class</th>
                          <th className="py-1 text-right">Receipts</th>
                          <th className="py-1 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {perClassRows.map(r => (
                          <tr key={r.className}>
                            <td className="py-1.5 font-bold text-slate-900 dark:text-white truncate">{r.className}</td>
                            <td className="py-1.5 text-right font-mono">{r.paidCount}</td>
                            <td className="py-1.5 text-right font-black text-emerald-600 dark:text-emerald-400">Rs. {r.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                        {perClassRows.length === 0 && (
                          <tr><td colSpan={3} className="py-3 text-center text-slate-500 font-bold">No payments recorded yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 ${darkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Income by Month</p>
                  <div className="max-h-56 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] uppercase font-black text-slate-500 border-b border-slate-300 dark:border-slate-700">
                          <th className="py-1">Month</th>
                          <th className="py-1 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {perMonthRows.map(([m, amt]) => (
                          <tr key={m}>
                            <td className="py-1.5 font-bold text-slate-900 dark:text-white">{m}</td>
                            <td className="py-1.5 text-right font-black text-emerald-600 dark:text-emerald-400">Rs. {amt.toLocaleString()}</td>
                          </tr>
                        ))}
                        {perMonthRows.length === 0 && (
                          <tr><td colSpan={2} className="py-3 text-center text-slate-500 font-bold">No monthly income yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Full ledger */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Full Payment Ledger ({payments.length})</p>
                <div className="overflow-x-auto max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
                      <tr className="text-left font-black uppercase text-[10px] text-slate-600 dark:text-slate-300">
                        <th className="p-2">Receipt</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Student</th>
                        <th className="p-2">Class</th>
                        <th className="p-2">Month</th>
                        <th className="p-2 text-right">Amount</th>
                        <th className="p-2">Method</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {payments.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-2 font-mono">{p.receiptNumber}</td>
                          <td className="p-2">{p.paidDate}</td>
                          <td className="p-2 font-bold text-slate-900 dark:text-white">{p.studentName}</td>
                          <td className="p-2">{p.className}</td>
                          <td className="p-2">{p.month}</td>
                          <td className="p-2 text-right font-black">Rs. {p.amount.toLocaleString()}</td>
                          <td className="p-2">{p.paymentMethod}</td>
                          <td className={`p-2 font-black ${p.status === 'Paid' ? 'text-emerald-600' : p.status === 'Overdue' ? 'text-rose-600' : 'text-amber-600'}`}>{p.status}</td>
                        </tr>
                      ))}
                      {payments.length === 0 && (
                        <tr><td colSpan={8} className="p-4 text-center text-slate-500 font-bold">No payments in the system yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* OVERDUE DIRECTORY */}
            <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-rose-600 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5" />
                  Overdue & Pending Payments Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Students with unpaid monthly tuition fees. Click "Stamp Fee" to process payments directly onto their 12-month card.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b font-extrabold uppercase text-slate-500">
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Class Title</th>
                      <th className="p-3">Overdue Month</th>
                      <th className="p-3">Fee Amount</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {overduePayments.map(p => {
                      const targetStu = students.find(s => s.id === p.studentId);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">{p.studentName}</td>
                          <td className="p-3 font-semibold">{p.className}</td>
                          <td className="p-3 font-extrabold text-rose-600">{p.month}</td>
                          <td className="p-3 font-black text-slate-900 dark:text-white">Rs. {p.amount.toLocaleString()}</td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => onStampPayment(p.studentId, p.classId, p.month)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3 py-1 rounded text-xs"
                            >
                              Stamp Fee
                            </button>
                            {targetStu && (
                              <button
                                onClick={() => onOpenPaymentCard(targetStu)}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 py-1 rounded text-xs"
                              >
                                Card View
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {overduePayments.length === 0 && (
                      <tr><td colSpan={5} className="p-4 text-center text-slate-500 font-bold">No overdue payments. All caught up!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })()}

      {/* TAB 6: BANNER NOTICES & BROADCASTS */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Urgent Top Header Banner */}
          <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
              <span className="bg-amber-500/10 text-amber-500 font-extrabold text-[10px] px-2.5 py-0.5 rounded border border-amber-500/20 uppercase">
                HEADER URGENT BROADCAST
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Top Header Banner Alert</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edit the sticky top alert message displayed live across all pages of the platform with author credentials.
              </p>
            </div>

            <div className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Banner Alert Message:</label>
                <textarea
                  rows={3}
                  value={bannerText}
                  onChange={e => setBannerText(e.target.value)}
                  placeholder="e.g. URGENT: All Friday A/L revision sessions rescheduled due to Poya holiday."
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Notice Author / Creator:</label>
                  <input
                    type="text"
                    value={bannerAuthor}
                    onChange={e => setBannerAuthor(e.target.value)}
                    placeholder="e.g. Principal Mr. Dinesh Liyanage"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Author Role / Office:</label>
                  <input
                    type="text"
                    value={bannerRole}
                    onChange={e => setBannerRole(e.target.value)}
                    placeholder="e.g. Academic Directorate"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Notice Stamped Date:</label>
                <input
                  type="text"
                  value={bannerDate}
                  onChange={e => setBannerDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-medium"
                />
              </div>

              <label className="flex items-center gap-2 font-bold cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={showBanner}
                  onChange={e => setShowBanner(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span className="text-slate-900 dark:text-white">Enable Live Urgent Banner Header</span>
              </label>

              <button
                onClick={() => {
                  onSaveSettings({
                    ...settings,
                    bannerNoticeText: bannerText,
                    showBannerNotice: showBanner,
                    bannerNoticeAuthor: bannerAuthor,
                    bannerNoticeRole: bannerRole,
                    bannerNoticeDate: bannerDate
                  });
                  alert('Urgent banner notice and author details updated live across header!');
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl transition shadow text-xs mt-2"
              >
                Publish Live Header Banner Notice
              </button>
            </div>
          </div>

          {/* Section 2: Post Formal Urgent Notice Board Item */}
          <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
              <span className="bg-rose-500/10 text-rose-500 font-extrabold text-[10px] px-2.5 py-0.5 rounded border border-rose-500/20 uppercase">
                INSTITUTE NOTICE BOARD
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Post Student Notice Item</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Create a stamped official notice card for students with full creator details.
              </p>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!noticeTitle.trim() || !noticeContent.trim()) return;

                const newNotice: Notice = {
                  id: `ntc-${Date.now()}`,
                  title: noticeTitle.trim(),
                  content: noticeContent.trim(),
                  date: new Date().toISOString().split('T')[0],
                  category: noticeCategory,
                  isUrgent: noticeCategory === 'Urgent Alert',
                  authorName: noticeAuthorInput.trim() || 'Principal - Mr. Dinesh Liyanage',
                  authorRole: noticeAuthorRoleInput.trim() || 'Academic Directorate',
                  authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                  targetGrades: ['All Batches', '2028 A/L', '2027 A/L', '2026 A/L', 'O/L']
                };

                onPostNotice(newNotice);
                setNoticeTitle('');
                setNoticeContent('');
                alert(`Notice "${newNotice.title}" posted successfully with author stamp!`);
              }}
              className="space-y-3 text-xs font-bold"
            >
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Notice Headline Title:</label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={e => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Model Paper Class Hall Shift to Auditorium 01"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Notice Full Body Text:</label>
                <textarea
                  rows={3}
                  required
                  value={noticeContent}
                  onChange={e => setNoticeContent(e.target.value)}
                  placeholder="Detailed instructions for students, hall numbers, and timing notes..."
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Category Type:</label>
                  <select
                    value={noticeCategory}
                    onChange={e => setNoticeCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Urgent Alert">🚨 Urgent Alert</option>
                    <option value="Class Rescheduled">⏰ Class Rescheduled</option>
                    <option value="General">📢 General Announcement</option>
                    <option value="Exam">📝 Exam Schedule</option>
                    <option value="Poya Holiday">🌕 Poya Holiday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Author Full Name:</label>
                  <input
                    type="text"
                    value={noticeAuthorInput}
                    onChange={e => setNoticeAuthorInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-2.5 rounded-xl transition shadow text-xs mt-2 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Notice to All Students</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB: MASTER TIMETABLE EDITOR */}
      {activeTab === 'timetableMaster' && (
        <div className={`p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-500 font-extrabold text-[10px] px-2.5 py-0.5 rounded border border-emerald-500/20 uppercase">
                  GLOBAL TIMETABLE CONTROL
                </span>
                <span className="text-slate-400 text-xs">Manage days, times, halls & cancel status</span>
              </div>
              <h3 className="text-xl font-black mt-1">Master Class Schedule & Timetable Matrix</h3>
            </div>

            <button
              onClick={() => {
                setEditingClass(null);
                setShowAddClassModal(true);
              }}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black px-4 py-2 rounded-xl text-xs transition shadow shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Timetable Slot</span>
            </button>
          </div>

          {/* Timetable Table Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b text-slate-400 uppercase font-black tracking-wider text-[10px] ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <th className="p-3">Class Title & Lecturer</th>
                  <th className="p-3">Grade & Stream</th>
                  <th className="p-3">Day & Time Slot</th>
                  <th className="p-3">Hall & Fee</th>
                  <th className="p-3">Status / Alert</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {classes.map(cls => (
                  <tr key={cls.id} className={darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                    <td className="p-3">
                      <div className="font-black text-sm text-slate-900 dark:text-white">{cls.name}</div>
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">{cls.teacherName}</div>
                      <div className="text-[10px] text-slate-400">{cls.subjectName} ({cls.type})</div>
                    </td>

                    <td className="p-3">
                      <span className="bg-blue-600 text-white font-black text-[10px] px-2 py-0.5 rounded-md uppercase mr-1">
                        {cls.grade}
                      </span>
                      <span className="bg-purple-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md uppercase">
                        {cls.medium}
                      </span>
                      <div className="text-[10px] text-slate-400 font-bold mt-1">{cls.stream || 'General'} Stream</div>
                    </td>

                    <td className="p-3 font-bold">
                      <div className="text-amber-500 font-black">{cls.dayOfWeek}</div>
                      <div className="text-slate-600 dark:text-slate-300 text-[11px]">{cls.startTime} – {cls.endTime}</div>
                      <div className="text-[10px] text-slate-400">{cls.durationHours} Hours Duration</div>
                    </td>

                    <td className="p-3">
                      <div className="font-bold">{cls.hallName}</div>
                      <div className="text-emerald-500 font-extrabold text-[11px]">Rs. {cls.monthlyFee.toLocaleString()} / mo</div>
                    </td>

                    <td className="p-3">
                      {cls.isCancelledToday ? (
                        <div className="space-y-1">
                          <span className="bg-rose-500/20 text-rose-500 border border-rose-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase inline-block">
                            CANCELLED TODAY
                          </span>
                          {cls.cancelReason && (
                            <p className="text-[10px] text-rose-400 italic leading-tight">{cls.cancelReason}</p>
                          )}
                        </div>
                      ) : (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                          ACTIVE & SCHEDULED
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            const isCurrentlyCancelled = cls.isCancelledToday;
                            const reason = !isCurrentlyCancelled ? prompt('Reason for cancelling or rescheduling class today:', 'Poya Day Holiday / Teacher Special Request') : '';
                            const updated: SubjectClass = {
                              ...cls,
                              isCancelledToday: !isCurrentlyCancelled,
                              cancelReason: reason || undefined
                            };
                            onUpdateClass(updated);
                          }}
                          className={`p-1.5 rounded-lg text-[10px] font-black transition border ${
                            cls.isCancelledToday
                              ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-600/30'
                              : 'bg-rose-600/20 text-rose-400 border-rose-500/40 hover:bg-rose-600/30'
                          }`}
                          title={cls.isCancelledToday ? 'Re-activate Class' : 'Mark as Cancelled Today'}
                        >
                          {cls.isCancelledToday ? 'Reactivate Slot' : 'Cancel Slot'}
                        </button>

                        <button
                          onClick={() => openEditClassModal(cls)}
                          className="p-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition shadow-2xs"
                          title="Edit Timetable & Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete class timetable slot "${cls.name}"?`)) {
                              onDeleteClass(cls.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 transition shadow-2xs"
                          title="Delete Class Slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: INSTITUTE SETTINGS & SCHEDULE DATA */}
      {activeTab === 'settings' && (
        <div className={`p-6 rounded-3xl border space-y-6 max-w-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
            <span className="bg-rose-500/10 text-rose-500 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase border border-rose-500/20">
              GLOBAL CONFIGURATION
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
              Institute Info, Helplines & Operating Schedule
            </h3>
            <p className="text-xs text-slate-400">Updates will reflect live across Header, Footer, Print Leaflets, and Contact badges.</p>
          </div>

          <div className="space-y-4 text-xs font-bold">
            
            <div>
              <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Institute Name & Brand Header:</label>
              <input
                type="text"
                value={tempSettings.name}
                onChange={e => setTempSettings({ ...tempSettings, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Tagline / Motto:</label>
              <input
                type="text"
                value={tempSettings.tagline}
                onChange={e => setTempSettings({ ...tempSettings, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Campus Address:</label>
              <input
                type="text"
                value={tempSettings.address}
                onChange={e => setTempSettings({ ...tempSettings, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Primary Hotline:</label>
                <input
                  type="text"
                  value={tempSettings.phonePrimary}
                  onChange={e => setTempSettings({ ...tempSettings, phonePrimary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Secondary Helpline / WhatsApp:</label>
                <input
                  type="text"
                  value={tempSettings.phoneSecondary}
                  onChange={e => setTempSettings({ ...tempSettings, phoneSecondary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Official Email:</label>
                <input
                  type="email"
                  value={tempSettings.email}
                  onChange={e => setTempSettings({ ...tempSettings, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Poya / Public Holiday Notice:</label>
                <input
                  type="text"
                  value={tempSettings.poyaHolidayNotice}
                  onChange={e => setTempSettings({ ...tempSettings, poyaHolidayNotice: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-rose-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Weekday Operating Hours:</label>
                <input
                  type="text"
                  value={tempSettings.weekdayHours}
                  onChange={e => setTempSettings({ ...tempSettings, weekdayHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">Weekend Batches Hours:</label>
                <input
                  type="text"
                  value={tempSettings.weekendHours}
                  onChange={e => setTempSettings({ ...tempSettings, weekendHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
            </div>

            <button
              onClick={() => {
                onSaveSettings(tempSettings);
                alert('Whole institute details & schedule data saved globally!');
              }}
              className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black py-3 rounded-xl transition shadow-lg text-sm mt-2"
            >
              Save Live Institute Schedule & Contact Details
            </button>

            {/* Remote Access & Database Architecture Card */}
            <div className="p-5 rounded-2xl border bg-slate-950/80 border-emerald-800/60 text-white space-y-3 mt-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
                  <Shield className="w-4 h-4" />
                  <span>DATABASE & REMOTE MULTI-DEVICE SYNCHRONIZATION</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  FIREBASE CLOUD FIRESTORE LIVE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your application is connected to <strong>Google Firebase Cloud Firestore</strong> with real-time multi-device cloud synchronization.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-[11px]">
                <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Firebase Cloud Firestore Database Connected</span>
                </p>
                <p className="text-slate-300">
                  Teachers, students, parents, and barcode gate scanners logging in remotely from different phones and computers over the internet sync live data in real-time across all portals!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule / Edit Class & Catalog Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-2xl rounded-3xl border p-6 shadow-2xl my-8 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-500" />
              <span>{editingClass ? 'Edit Class Catalog & Schedule' : 'Schedule & Add New Class Catalog'}</span>
            </h3>

            <form onSubmit={handleSaveClassSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Class Display Title:</label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                  placeholder="e.g. 2028 A/L Combined Mathematics Theory Class"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Target Grade / Batch:</label>
                  <select
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="2028 A/L">2028 A/L</option>
                    <option value="2027 A/L">2027 A/L</option>
                    <option value="2026 A/L">2026 A/L</option>
                    <option value="2029 A/L">2029 A/L</option>
                    <option value="Grade 11 (O/L)">Grade 11 (O/L)</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 6">Grade 6</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Stream:</label>
                  <select
                    value={stream}
                    onChange={e => setStream(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Maths">Combined Maths</option>
                    <option value="Science">Physical / Bio Science</option>
                    <option value="Commerce">Commerce & Accounting</option>
                    <option value="Arts">Arts & Humanities</option>
                    <option value="Technology">Engineering / Bio Tech</option>
                    <option value="OL">O/L Core Subjects</option>
                    <option value="Junior">Junior Secondary</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Medium:</label>
                  <select
                    value={medium}
                    onChange={e => setMedium(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Sinhala">Sinhala Medium</option>
                    <option value="English">English Medium</option>
                    <option value="Tamil">Tamil Medium</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC CLASS BADGES & A/L TAGS MANAGER */}
              <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] uppercase font-black tracking-wider text-rose-500">
                    🏷️ Attached Badges (Move / Reorder & Remove):
                  </label>
                  <span className="text-[10px] text-slate-400 font-extrabold">{selectedClassBadges.length} attached</span>
                </div>

                {/* Attached Badges Chips with Move & Delete */}
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl border border-slate-700/60 bg-slate-900/60 min-h-[44px]">
                  {selectedClassBadges.length === 0 ? (
                    <span className="text-[11px] text-slate-500 italic">No custom badges attached. Click a preset tag below or add a custom badge.</span>
                  ) : (
                    selectedClassBadges.map((b, idx) => (
                      <div
                        key={b.id || idx}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black border shadow-sm ${getBadgeColorClass(b.color)}`}
                      >
                        <span>{b.label}</span>
                        <div className="flex items-center gap-0.5 ml-1 border-l border-white/30 pl-1">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => moveBadgePosition(idx, 'left')}
                              className="p-0.5 hover:bg-black/20 rounded text-[9px] font-bold"
                              title="Move Left"
                            >
                              ←
                            </button>
                          )}
                          {idx < selectedClassBadges.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveBadgePosition(idx, 'right')}
                              className="p-0.5 hover:bg-black/20 rounded text-[9px] font-bold"
                              title="Move Right"
                            >
                              →
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeAttachedBadge(b.id)}
                            className="p-0.5 hover:bg-rose-900/80 rounded text-[10px] font-black text-rose-200 ml-0.5"
                            title="Remove Badge"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Preset Tag Quick Toggles & Manager */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Quick Preset A/L & Stream Tags:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="New Preset Tag..."
                        value={newPresetTag}
                        onChange={e => setNewPresetTag(e.target.value)}
                        className="px-2 py-0.5 rounded-lg border bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 w-28"
                      />
                      <button
                        type="button"
                        onClick={handleAddPresetTag}
                        className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] rounded-lg"
                      >
                        + Add Tag
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {alPresetBadges.map(bLabel => {
                      const active = selectedClassBadges.some(b => b.label.toUpperCase() === bLabel.toUpperCase());
                      return (
                        <div key={bLabel} className="inline-flex items-center">
                          <button
                            type="button"
                            onClick={() => quickToggleALBadge(bLabel, 'rose')}
                            className={`px-2.5 py-1 rounded-l-lg text-[10px] font-black transition border ${
                              active
                                ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                                : 'bg-slate-800/40 text-slate-300 border-slate-700 hover:text-white'
                            }`}
                          >
                            {active ? `✓ ${bLabel}` : `+ ${bLabel}`}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePresetTag(bLabel)}
                            className="px-1 py-1 rounded-r-lg text-[10px] font-black bg-slate-800/80 text-slate-400 hover:text-rose-400 border border-l-0 border-slate-700"
                            title="Delete Preset Tag"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add Custom Badge Creator */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    placeholder="Custom Badge Label (e.g. 2028 THEORY)..."
                    value={badgeText}
                    onChange={e => setBadgeText(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-xs"
                  />
                  <select
                    value={badgeColor}
                    onChange={e => setBadgeColor(e.target.value)}
                    className="px-2 py-1.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-xs"
                  >
                    <option value="rose">Rose</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="emerald">Emerald</option>
                    <option value="amber">Amber</option>
                    <option value="cyan">Cyan</option>
                    <option value="indigo">Indigo</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddCustomBadge}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-sm shrink-0"
                  >
                    + Add Badge
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Assigned Teacher:</label>
                  <select
                    value={teacherId}
                    onChange={e => setTeacherId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Class Type:</label>
                  <select
                    value={classType}
                    onChange={e => setClassType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Theory">Theory Class</option>
                    <option value="Revision">Revision Class</option>
                    <option value="Paper Class">Paper Class</option>
                    <option value="Paper & Revision">Paper & Revision</option>
                    <option value="Special Extra">Special Extra Seminar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Schedule Day:</label>
                  <select
                    value={dayOfWeek}
                    onChange={e => setDayOfWeek(e.target.value as any)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Start Time:</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">End Time:</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Hall Number / Location:</label>
                  <select
                    value={hallName}
                    onChange={e => setHallName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    {halls.map(h => (
                      <option key={h.id} value={h.name}>{h.name} (Capacity: {h.capacity})</option>
                    ))}
                    {!halls.some(h => h.name === hallName) && (
                      <option value={hallName}>{hallName}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Monthly Fee (Rs.):</label>
                  <input
                    type="number"
                    value={monthlyFee}
                    onChange={e => setMonthlyFee(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Catalog Cover Banner URL:</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-xs"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Syllabus Topics Covered (Comma-separated):</label>
                <input
                  type="text"
                  placeholder="e.g. Real Numbers, Trigonometry, Calculus, Mechanics"
                  value={syllabusHighlightsText}
                  onChange={e => setSyllabusHighlightsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-xs"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Course Overview & Catalog Description:</label>
                <textarea
                  rows={2}
                  placeholder="Provide syllabus highlights and course description..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-black px-6 py-2 rounded-xl shadow-md"
                >
                  Save Class & Catalog Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Form Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-xl rounded-3xl border p-6 shadow-2xl my-8 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-purple-500">
              <GraduationCap className="w-6 h-6" />
              <span>{editingTeacher ? 'Edit Faculty Teacher Profile' : 'Add New Faculty Lecturer'}</span>
            </h3>

            <form onSubmit={handleSaveTeacherSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Teacher Full Name:</label>
                <input
                  type="text"
                  required
                  value={teacherName}
                  onChange={e => setTeacherName(e.target.value)}
                  placeholder="e.g. Mr. Dinesh Liyanage"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Designation / Title:</label>
                  <input
                    type="text"
                    required
                    value={teacherTitle}
                    onChange={e => setTeacherTitle(e.target.value)}
                    placeholder="Senior Lecturer"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Monthly Salary Scale (Rs.):</label>
                  <input
                    type="number"
                    required
                    value={teacherSalary}
                    onChange={e => setTeacherSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Degrees & Academic Qualifications:</label>
                <input
                  type="text"
                  required
                  value={teacherQualifications}
                  onChange={e => setTeacherQualifications(e.target.value)}
                  placeholder="e.g. B.Sc. (Hons) Special in Mathematics (University of Colombo)"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Contact Mobile Number:</label>
                  <input
                    type="text"
                    required
                    value={teacherPhone}
                    onChange={e => setTeacherPhone(e.target.value)}
                    placeholder="077 123 4567"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Email Address:</label>
                  <input
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={e => setTeacherEmail(e.target.value)}
                    placeholder="dinesh@edumaster.lk"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Photo URL:</label>
                <input
                  type="url"
                  value={teacherPhoto}
                  onChange={e => setTeacherPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Subjects Taught (Comma-separated):</label>
                <input
                  type="text"
                  required
                  value={teacherSubjectsText}
                  onChange={e => setTeacherSubjectsText(e.target.value)}
                  placeholder="Combined Mathematics, Higher Mathematics"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-purple-400 uppercase text-[10px] tracking-wider font-black">
                  Participating Classes Schedule Format (Pipe '|' Separated):
                </label>
                <textarea
                  rows={2}
                  required
                  value={teacherParticipatingClassesText}
                  onChange={e => setTeacherParticipatingClassesText(e.target.value)}
                  placeholder="2028 A/L Combined Maths (Sat 8:00 AM - 12:30 PM) | 2027 A/L Revision (Sun 1:00 PM - 5:00 PM) | Grade 11 Paper Class (Wed 3:30 PM)"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold text-xs"
                />
                <span className="text-[10px] text-slate-400">Format allows unlimited custom class schedules separated by '|'.</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowTeacherModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-black px-6 py-2 rounded-xl shadow-md"
                >
                  Save Teacher Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Form Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-xl rounded-3xl border p-6 shadow-2xl my-8 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-emerald-500">
              <UserPlus className="w-6 h-6" />
              <span>{editingStudent ? 'Edit Student Record' : 'Register New Student'}</span>
            </h3>

            <form onSubmit={handleSaveStudentSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Full Name:</label>
                <input
                  type="text"
                  required
                  value={stuFullName}
                  onChange={e => setStuFullName(e.target.value)}
                  placeholder="e.g. K.A. Charith Senaratne"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Student ID Index Number:</label>
                  <input
                    type="text"
                    required
                    value={stuNumber}
                    onChange={e => setStuNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold font-mono text-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">School Name:</label>
                  <input
                    type="text"
                    required
                    value={stuSchool}
                    onChange={e => setStuSchool(e.target.value)}
                    placeholder="Royal College, Colombo"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Grade / Batch:</label>
                  <select
                    value={stuGrade}
                    onChange={e => setStuGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="2028 A/L">2028 A/L</option>
                    <option value="2027 A/L">2027 A/L</option>
                    <option value="2026 A/L">2026 A/L</option>
                    <option value="Grade 11 (O/L)">Grade 11 (O/L)</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Medium:</label>
                  <select
                    value={stuMedium}
                    onChange={e => setStuMedium(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Sinhala">Sinhala Medium</option>
                    <option value="English">English Medium</option>
                    <option value="Tamil">Tamil Medium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Student Mobile:</label>
                  <input
                    type="text"
                    value={stuMobile}
                    onChange={e => setStuMobile(e.target.value)}
                    placeholder="077 888 9999"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Parent Phone:</label>
                  <input
                    type="text"
                    required
                    value={stuParentPhone}
                    onChange={e => setStuParentPhone(e.target.value)}
                    placeholder="071 222 3333"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Parent Name:</label>
                <input
                  type="text"
                  value={stuParentName}
                  onChange={e => setStuParentName(e.target.value)}
                  placeholder="Mr. N. Senaratne"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Photo URL:</label>
                <input
                  type="url"
                  value={stuPhoto}
                  onChange={e => setStuPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Select Enrolled Classes:</label>
                <div className="max-h-36 overflow-y-auto space-y-1.5 border rounded-xl p-3 bg-slate-50 dark:bg-slate-950">
                  {classes.map(c => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={stuEnrolledClassIds.includes(c.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setStuEnrolledClassIds([...stuEnrolledClassIds, c.id]);
                          } else {
                            setStuEnrolledClassIds(stuEnrolledClassIds.filter(id => id !== c.id));
                          }
                        }}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span>{c.name} ({c.grade})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2 rounded-xl shadow-md"
                >
                  Save Student Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Wall of Fame Ranker Modal */}
      {showRankerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-xl rounded-3xl border p-6 shadow-2xl my-8 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-amber-500">
              <Trophy className="w-6 h-6" />
              <span>{editingRanker ? 'Edit Wall of Fame Achiever' : 'Add Top Achiever / Ranker'}</span>
            </h3>

            <form onSubmit={handleSaveRankerSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Student Full Name:</label>
                <input
                  type="text"
                  required
                  value={rankerName}
                  onChange={e => setRankerName(e.target.value)}
                  placeholder="e.g. Kasun Kalhara"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Exam Type:</label>
                  <select
                    value={rankerExamType}
                    onChange={e => setRankerExamType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="A/L">G.C.E. A/L</option>
                    <option value="O/L">G.C.E. O/L</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Exam Year:</label>
                  <input
                    type="text"
                    required
                    value={rankerYear}
                    onChange={e => setRankerYear(e.target.value)}
                    placeholder="2025 A/L"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Stream / Grade:</label>
                  <input
                    type="text"
                    required
                    value={rankerStream}
                    onChange={e => setRankerStream(e.target.value)}
                    placeholder="Physical Science Stream"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">School Name:</label>
                  <input
                    type="text"
                    required
                    value={rankerSchool}
                    onChange={e => setRankerSchool(e.target.value)}
                    placeholder="Ananda College, Colombo"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-amber-500 uppercase text-[10px] tracking-wider font-black">Main Highlight Headline Summary:</label>
                <input
                  type="text"
                  required
                  value={rankerSummary}
                  onChange={e => setRankerSummary(e.target.value)}
                  placeholder="Island Rank 01 • Z-Score 2.9812"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm text-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Island Rank:</label>
                  <input
                    type="text"
                    value={rankerIslandRank}
                    onChange={e => setRankerIslandRank(e.target.value)}
                    placeholder="01"
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">District Rank:</label>
                  <input
                    type="text"
                    value={rankerDistrictRank}
                    onChange={e => setRankerDistrictRank(e.target.value)}
                    placeholder="01"
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Z-Score:</label>
                  <input
                    type="text"
                    value={rankerZScore}
                    onChange={e => setRankerZScore(e.target.value)}
                    placeholder="2.9812"
                    className="w-full px-2 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Photo URL:</label>
                <input
                  type="url"
                  value={rankerPhoto}
                  onChange={e => setRankerPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Subject Grades Format (Comma-separated Subject: Grade):</label>
                <input
                  type="text"
                  required
                  value={rankerGradesText}
                  onChange={e => setRankerGradesText(e.target.value)}
                  placeholder="Combined Maths: A, Physics: A, Chemistry: A"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRankerModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2 rounded-xl shadow-md"
                >
                  Save Achiever Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hall & Auditorium Modal */}
      {showHallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-lg rounded-3xl border p-6 shadow-2xl my-8 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-indigo-500">
              <Building2 className="w-6 h-6" />
              <span>{editingHall ? 'Edit Lecture Hall / Auditorium' : 'Add New Lecture Hall'}</span>
            </h3>

            <form onSubmit={handleSaveHallSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Hall Name / Title:</label>
                <input
                  type="text"
                  required
                  value={hallNameInput}
                  onChange={e => setHallNameInput(e.target.value)}
                  placeholder="e.g. Hall 05 - West Wing Auditorium"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-black text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Seating Capacity:</label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={3000}
                    value={hallCapacityInput}
                    onChange={e => setHallCapacityInput(parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-extrabold text-amber-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Floor / Wing Location:</label>
                  <input
                    type="text"
                    required
                    value={hallFloorInput}
                    onChange={e => setHallFloorInput(e.target.value)}
                    placeholder="e.g. 2nd Floor Main Building"
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-400 uppercase text-[10px] tracking-wider">Facilities & Specs (Comma-separated):</label>
                <input
                  type="text"
                  value={hallFacilitiesInput}
                  onChange={e => setHallFacilitiesInput(e.target.value)}
                  placeholder="Air Conditioned, HD LED Screen, Surround Sound, Tiered Seating"
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold pt-1">
                <input
                  type="checkbox"
                  checked={hallAvailableInput}
                  onChange={e => setHallAvailableInput(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span>Active & Available for Class Scheduling</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowHallModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-2 rounded-xl shadow-md"
                >
                  Save Hall Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};