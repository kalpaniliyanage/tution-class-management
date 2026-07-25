// @ts-nocheck
import { SubjectClass, Teacher, Student, PaymentRecord, AttendanceRecord, ExamMark, Notice, WallOfFameItem, InstituteSettings, TutePaper, Hall } from '../types';

export const INITIAL_INSTITUTE_SETTINGS: InstituteSettings = {
  name: "EduMaster Institute",
  tagline: "Premier Higher Educational & Tuition Centre - Sri Lanka",
  logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150&auto=format&fit=crop&q=80",
  address: "No. 142, High Level Road, Maharagama, Sri Lanka",
  phonePrimary: "+94 11 283 9900",
  phoneSecondary: "+94 77 345 6789",
  email: "info@edumaster.lk",
  weekdayHours: "2:30 PM – 8:30 PM (Evening Sessions)",
  weekendHours: "7:00 AM – 7:30 PM (Full Day Batches)",
  poyaHolidayNotice: "Institute closed on all statutory Poya Days. Online recorded lectures available.",
  bannerNoticeText: "URGENT NOTICE: 2027 A/L Combined Mathematics Saturday Revision class relocated to Hall 01 A/C Auditorium.",
  showBannerNotice: true,
  bannerNoticeAuthor: "Academic Directorate & Principal",
  bannerNoticeRole: "EduMaster Maharagama Campus",
  bannerNoticeDate: "2026-07-24"
};

export const INITIAL_HALLS: Hall[] = [
  {
    id: "hall-01",
    name: "Hall 01 (Main A/C Auditorium)",
    capacity: 650,
    floor: "Ground Floor Main Wing",
    facilities: ["Air Conditioned", "HD LED Screen", "Digital Surround Sound", "Smart Podium"],
    isAvailable: true
  },
  {
    id: "hall-02",
    name: "Hall 02 (A/C Lecture Theatre)",
    capacity: 350,
    floor: "1st Floor - Wing A",
    facilities: ["Air Conditioned", "Dual Projectors", "Microphone System"],
    isAvailable: true
  },
  {
    id: "hall-03",
    name: "Hall 03 (Junior Batch Hall)",
    capacity: 220,
    floor: "1st Floor - Wing B",
    facilities: ["Ceiling Fans", "Audio Speaker System", "Whiteboard"],
    isAvailable: true
  },
  {
    id: "hall-04",
    name: "Hall 04 (Science & ICT Lab Hall)",
    capacity: 150,
    floor: "2nd Floor",
    facilities: ["Air Conditioned", "Desktop Workstations", "Demonstration Bench"],
    isAvailable: true
  },
  {
    id: "hall-05",
    name: "Hall 05 (Mega Seminar Complex)",
    capacity: 850,
    floor: "3rd Floor",
    facilities: ["Air Conditioned", "Multi-Screen Projection", "Live Stream Ready"],
    isAvailable: true
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: "tech-01",
    name: "Mr. Dinesh Liyanage",
    title: "Senior Lecturer in Combined Mathematics",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    subjects: ["Combined Mathematics", "Mathematics"],
    qualifications: "B.Sc. (Hons) Mathematics (University of Colombo), PGDE",
    phone: "+94 77 123 4567",
    email: "dinesh.maths@edumaster.lk",
    availableDays: ["Saturday", "Sunday", "Wednesday"],
    salaryScale: 180000
  },
  {
    id: "tech-02",
    name: "Mrs. Kasuni Fernando",
    title: "Master Instructor - Science & Biology",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    subjects: ["Biology", "Science"],
    qualifications: "B.Sc. (Hons) Biological Science (University of Peradeniya)",
    phone: "+94 71 987 6543",
    email: "kasuni.bio@edumaster.lk",
    availableDays: ["Saturday", "Monday", "Friday"],
    salaryScale: 165000
  },
  {
    id: "tech-03",
    name: "Mr. Amila Sampath",
    title: "Physics & SFT Specialist",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    subjects: ["Physics", "Science For Technology"],
    qualifications: "B.Sc. (Hons) Physics (University of Moratuwa)",
    phone: "+94 70 444 3322",
    email: "amila.physics@edumaster.lk",
    availableDays: ["Sunday", "Tuesday", "Thursday"],
    salaryScale: 175000
  },
  {
    id: "tech-04",
    name: "Mr. Nuwan Wickramasinghe",
    title: "Chief ICT & Computer Science Lecturer",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    subjects: ["ICT", "Information & Communication Technology"],
    qualifications: "B.Sc. (Hons) IT (SLIIT), M.Sc. Computer Science (UCSC)",
    phone: "+94 76 555 1234",
    email: "nuwan.ict@edumaster.lk",
    availableDays: ["Friday", "Saturday", "Sunday"],
    salaryScale: 160000
  },
  {
    id: "tech-05",
    name: "Mr. Sarath Edirisinghe",
    title: "Senior Sinhala & History Master",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    subjects: ["Sinhala", "History", "Sinhala Literature"],
    qualifications: "B.A. (Hons) Sinhala (University of Sri Jayewardenepura)",
    phone: "+94 72 888 9900",
    email: "sarath.sinhala@edumaster.lk",
    availableDays: ["Monday", "Wednesday", "Saturday"],
    salaryScale: 140000
  },
  {
    id: "tech-06",
    name: "Mrs. Priyangani Silva",
    title: "English Language Specialist",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    subjects: ["English", "English Literature"],
    qualifications: "B.A. English (University of Kelaniya), MA TESL",
    phone: "+94 78 333 2211",
    email: "priyangani.eng@edumaster.lk",
    availableDays: ["Tuesday", "Thursday", "Sunday"],
    salaryScale: 150000
  },
  {
    id: "tech-07",
    name: "Mr. Gamini Jayakody",
    title: "Technology Stream Expert (ET & BST)",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    subjects: ["Engineering Technology", "Bio System Technology"],
    qualifications: "B.Tech (Hons) Engineering (University of Sri Jayewardenepura)",
    phone: "+94 75 111 4455",
    email: "gamini.tech@edumaster.lk",
    availableDays: ["Monday", "Wednesday", "Friday"],
    salaryScale: 170000
  },
  {
    id: "tech-08",
    name: "Mr. Sunil Rajakaruna",
    title: "Commerce & Accounting Senior Instructor",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    subjects: ["Accounting", "Business Studies", "Economics"],
    qualifications: "B.Com (Hons) (University of Sri Jayewardenepura), ACA",
    phone: "+94 71 222 3344",
    email: "sunil.acc@edumaster.lk",
    availableDays: ["Saturday", "Sunday", "Thursday"],
    salaryScale: 175000
  }
];

export const INITIAL_CLASSES: SubjectClass[] = [
  // Grade 6
  {
    id: "cls-g6-maths",
    name: "Grade 6 - Mathematics",
    grade: "Grade 6",
    stream: "Junior",
    medium: "Sinhala",
    subjectName: "Mathematics",
    type: "Theory",
    teacherId: "tech-01",
    teacherName: "Mr. Dinesh Liyanage",
    teacherTitle: "Senior Lecturer in Combined Mathematics",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Mathematics",
    dayOfWeek: "Monday",
    startTime: "03:00 PM",
    endTime: "05:00 PM",
    durationHours: 2,
    hallName: "Hall 03 (Junior Wing)",
    monthlyFee: 2000,
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    description: "Interactive Grade 6 Mathematics covering numbers, basic algebra, geometry, and fun logical problem solving.",
    syllabusHighlights: ["Number Systems & Operations", "Basic Geometry & Angles", "Fractions & Decimals", "Weekly Activity Worksheets"],
    badges: [
      { id: "bg-g6", label: "GRADE 6", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" },
      { id: "bg-ac", label: "A/C ROOM", color: "amber", category: "custom" }
    ]
  },
  {
    id: "cls-g6-sci",
    name: "Grade 6 - Science",
    grade: "Grade 6",
    stream: "Junior",
    medium: "Sinhala",
    subjectName: "Science",
    type: "Theory",
    teacherId: "tech-02",
    teacherName: "Mrs. Kasuni Fernando",
    teacherTitle: "Master Instructor - Science & Biology",
    teacherPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Bio Science",
    dayOfWeek: "Friday",
    startTime: "02:30 PM",
    endTime: "04:30 PM",
    durationHours: 2,
    hallName: "Hall 02 (Science Wing)",
    monthlyFee: 2000,
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
    description: "Hands-on Junior Science with practical laboratory experiments, animal/plant kingdom exploration, and environmental science.",
    syllabusHighlights: ["Plant & Living Things Diversity", "Matter & States", "Basic Electricity & Circuits", "Lab Experiments"],
    badges: [
      { id: "bg-g6", label: "GRADE 6", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" }
    ]
  },
  {
    id: "cls-g6-eng",
    name: "Grade 6 - English Language",
    grade: "Grade 6",
    stream: "Junior",
    medium: "English",
    subjectName: "English",
    type: "Theory",
    teacherId: "tech-06",
    teacherName: "Mrs. Priyangani Silva",
    teacherTitle: "English Language Specialist",
    teacherPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.A. English, MA TESL",
    dayOfWeek: "Tuesday",
    startTime: "03:30 PM",
    endTime: "05:30 PM",
    durationHours: 2,
    hallName: "Hall 04",
    monthlyFee: 2000,
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    description: "Comprehensive English language skills, grammar mastery, vocabulary building, and conversational speaking practice.",
    syllabusHighlights: ["Grammar Fundamentals", "Reading Comprehension", "Creative Writing & Essays", "Listening & Speaking Exercises"],
    badges: [
      { id: "bg-g6", label: "GRADE 6", color: "blue", category: "grade" },
      { id: "bg-med-eng", label: "ENGLISH MEDIUM", color: "indigo", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" }
    ]
  },

  // Grade 7
  {
    id: "cls-g7-maths",
    name: "Grade 7 - Mathematics",
    grade: "Grade 7",
    stream: "Junior",
    medium: "Sinhala",
    subjectName: "Mathematics",
    type: "Theory",
    teacherId: "tech-01",
    teacherName: "Mr. Dinesh Liyanage",
    teacherTitle: "Senior Lecturer in Combined Mathematics",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Mathematics",
    dayOfWeek: "Wednesday",
    startTime: "03:00 PM",
    endTime: "05:00 PM",
    durationHours: 2,
    hallName: "Hall 01 (A/C Auditorium)",
    monthlyFee: 2200,
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    description: "Grade 7 Mathematics covering algebraic expressions, ratios, percentages, coordinates, and geometric constructions.",
    syllabusHighlights: ["Algebraic Simplification", "Ratios & Proportions", "Triangles & Circles", "Weekly Quiz Practice"],
    badges: [
      { id: "bg-g7", label: "GRADE 7", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" }
    ]
  },
  {
    id: "cls-g7-ict",
    name: "Grade 7 - ICT",
    grade: "Grade 7",
    stream: "Junior",
    medium: "English",
    subjectName: "ICT",
    type: "Theory",
    teacherId: "tech-04",
    teacherName: "Mr. Nuwan Wickramasinghe",
    teacherTitle: "Chief ICT Lecturer",
    teacherPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. IT (SLIIT)",
    dayOfWeek: "Friday",
    startTime: "04:30 PM",
    endTime: "06:30 PM",
    durationHours: 2,
    hallName: "ICT Computer Lab 01",
    monthlyFee: 2500,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    description: "Practical ICT class covering computer hardware components, word processing, presentation software, and introduction to coding.",
    syllabusHighlights: ["Computer Hardware & Operating Systems", "Word Processing & Documents", "Scratch Visual Programming", "Internet & Cyber Safety"],
    badges: [
      { id: "bg-g7", label: "GRADE 7", color: "blue", category: "grade" },
      { id: "bg-med-eng", label: "ENGLISH MEDIUM", color: "indigo", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" },
      { id: "bg-lab", label: "PRACTICAL LAB", color: "cyan", category: "custom" }
    ]
  },

  // Grade 11 (O/L)
  {
    id: "cls-g11-maths",
    name: "Grade 11 (O/L) - Mathematics Masterclass",
    grade: "Grade 11 (O/L)",
    stream: "OL",
    medium: "Sinhala",
    subjectName: "Mathematics",
    type: "Paper & Revision",
    teacherId: "tech-01",
    teacherName: "Mr. Dinesh Liyanage",
    teacherTitle: "Senior Lecturer in Combined Mathematics",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Mathematics",
    dayOfWeek: "Saturday",
    startTime: "08:30 AM",
    endTime: "11:30 AM",
    durationHours: 3,
    hallName: "Hall 01 (A/C Auditorium)",
    monthlyFee: 2800,
    coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80",
    description: "G.C.E. O/L Mathematics intensive paper class and revision program covering all 32 syllabus units and past paper shortcuts.",
    syllabusHighlights: ["Quadratic Equations & Functions", "Trigonometry & Loci", "Matrices & Probability", "Model Paper Discussion"],
    badges: [
      { id: "bg-g11", label: "GRADE 11 (O/L)", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-rev", label: "REVISION & PAPER", color: "rose", category: "type" },
      { id: "bg-hot", label: "POPULAR BATCH", color: "rose", category: "custom" }
    ]
  },
  {
    id: "cls-g11-sci",
    name: "Grade 11 (O/L) - Science Theory & Practicals",
    grade: "Grade 11 (O/L)",
    stream: "OL",
    medium: "Sinhala",
    subjectName: "Science",
    type: "Theory",
    teacherId: "tech-02",
    teacherName: "Mrs. Kasuni Fernando",
    teacherTitle: "Master Instructor - Science",
    teacherPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Bio Science",
    dayOfWeek: "Saturday",
    startTime: "12:00 PM",
    endTime: "02:30 PM",
    durationHours: 2.5,
    hallName: "Hall 02 (Science Wing)",
    monthlyFee: 2800,
    coverImage: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&auto=format&fit=crop&q=80",
    description: "G.C.E. O/L Science covering Physics, Chemistry, and Biology sections with live video demonstrations of lab experiments.",
    syllabusHighlights: ["Chemical Calculations & Reactions", "Newtonian Mechanics & Waves", "Human Organ Systems", "Past Paper Structured Questions"],
    badges: [
      { id: "bg-g11", label: "GRADE 11 (O/L)", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" }
    ]
  },
  {
    id: "cls-g11-ict",
    name: "Grade 11 (O/L) - ICT Theory & Practical",
    grade: "Grade 11 (O/L)",
    stream: "OL",
    medium: "English",
    subjectName: "ICT",
    type: "Theory",
    teacherId: "tech-04",
    teacherName: "Mr. Nuwan Wickramasinghe",
    teacherTitle: "Chief ICT Lecturer",
    teacherPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. IT (SLIIT)",
    dayOfWeek: "Sunday",
    startTime: "02:00 PM",
    endTime: "04:30 PM",
    durationHours: 2.5,
    hallName: "ICT Lab 01",
    monthlyFee: 3000,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    description: "O/L ICT complete theory and practical masterclass covering logic gates, Pascal/Python programming, databases, and web technologies.",
    syllabusHighlights: ["Logic Gates & Binary Systems", "Algorithms & Flowcharts", "Pascal / Python Coding", "Database Systems (SQL)"],
    badges: [
      { id: "bg-g11", label: "GRADE 11 (O/L)", color: "blue", category: "grade" },
      { id: "bg-med-eng", label: "ENGLISH MEDIUM", color: "indigo", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" }
    ]
  },

  // 2028 A/L (Junior A/L Batch - Theory Only)
  {
    id: "cls-2028-maths",
    name: "2028 A/L Combined Mathematics Theory",
    grade: "2028 A/L",
    stream: "Maths",
    medium: "Sinhala",
    subjectName: "Combined Mathematics",
    type: "Theory",
    teacherId: "tech-01",
    teacherName: "Mr. Dinesh Liyanage",
    teacherTitle: "Senior Lecturer in Combined Mathematics",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Mathematics",
    dayOfWeek: "Sunday",
    startTime: "08:00 AM",
    endTime: "11:00 AM",
    durationHours: 3,
    hallName: "Hall 01 (A/C Auditorium)",
    monthlyFee: 3500,
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    description: "Brand new 2028 A/L Combined Mathematics theory batch covering Pure Maths foundations, Polynomials, Trigonometry, and Applied Mechanics.",
    syllabusHighlights: ["Real Number Systems & Inequalities", "Quadratic Functions & Polynomials", "Trigonometric Identities", "Statics & Vector Analysis"],
    badges: [
      { id: "bg-al2028", label: "2028 A/L", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY ONLY", color: "emerald", category: "type" },
      { id: "bg-new", label: "NEW BATCH", color: "amber", category: "custom" }
    ]
  },
  {
    id: "cls-2028-physics",
    name: "2028 A/L Physics Theory",
    grade: "2028 A/L",
    stream: "Maths",
    medium: "Sinhala",
    subjectName: "Physics",
    type: "Theory",
    teacherId: "tech-03",
    teacherName: "Mr. Amila Sampath",
    teacherTitle: "Physics Specialist",
    teacherPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Physics (Moratuwa)",
    dayOfWeek: "Sunday",
    startTime: "11:30 AM",
    endTime: "02:30 PM",
    durationHours: 3,
    hallName: "Hall 01 (A/C Auditorium)",
    monthlyFee: 3500,
    coverImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80",
    description: "2028 A/L Physics fundamental theory covering measurements, kinematics, forces, work-energy, and optical instruments.",
    syllabusHighlights: ["Units, Dimensions & Vernier Instruments", "Kinematics & Motion Graphs", "Forces & Circular Motion", "Practical Physics Experiments"],
    badges: [
      { id: "bg-al2028", label: "2028 A/L", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY ONLY", color: "emerald", category: "type" }
    ]
  },
  {
    id: "cls-2028-et",
    name: "2028 A/L Engineering Technology Theory",
    grade: "2028 A/L",
    stream: "Technology",
    medium: "Sinhala",
    subjectName: "Engineering Technology",
    type: "Theory",
    teacherId: "tech-07",
    teacherName: "Mr. Gamini Jayakody",
    teacherTitle: "Technology Stream Expert",
    teacherPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Tech (Hons) Eng",
    dayOfWeek: "Monday",
    startTime: "05:00 PM",
    endTime: "07:30 PM",
    durationHours: 2.5,
    hallName: "Hall 05 (Tech Lab)",
    monthlyFee: 3500,
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    description: "2028 A/L Engineering Technology theory covering mechanical fundamentals, electrical principles, civil basics, and technical drawing.",
    syllabusHighlights: ["Workshop Safety & Measuring Tools", "Basic Electrical Circuits & Ohm's Law", "Civil Construction Fundamentals", "Technical Orthographic Projection"],
    badges: [
      { id: "bg-al2028", label: "2028 A/L", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY ONLY", color: "emerald", category: "type" }
    ]
  },

  // 2027 A/L (Senior A/L Batch - Theory, Revision & Paper)
  {
    id: "cls-2027-maths-rev",
    name: "2027 A/L Combined Maths Master Revision",
    grade: "2027 A/L",
    stream: "Maths",
    medium: "Sinhala",
    subjectName: "Combined Mathematics",
    type: "Revision",
    teacherId: "tech-01",
    teacherName: "Mr. Dinesh Liyanage",
    teacherTitle: "Senior Lecturer in Combined Mathematics",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. (Hons) Mathematics",
    dayOfWeek: "Saturday",
    startTime: "07:30 AM",
    endTime: "03:30 PM",
    durationHours: 8,
    hallName: "Hall 01 (A/C Auditorium)",
    monthlyFee: 4000,
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    description: "Intensive 8-Hour Island Ranker Revision covering Calculus (Integration & Differentiation), Complex Numbers, Probability, and Relative Velocity.",
    syllabusHighlights: ["Calculus Integration Techniques", "Complex Numbers & Argand Diagrams", "Probability & Permutations", "Dynamics & Projectile Motion"],
    badges: [
      { id: "bg-al2027", label: "2027 A/L", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-rev", label: "REVISION", color: "rose", category: "type" },
      { id: "bg-dur-8", label: "8 HOURS REVISION", color: "amber", category: "custom" },
      { id: "bg-hot", label: "ISLAND RANKER BATCH", color: "cyan", category: "custom" }
    ]
  },
  {
    id: "cls-2027-bio-th",
    name: "2027 A/L Biology Theory & Practicals",
    grade: "2027 A/L",
    stream: "Science",
    medium: "Sinhala",
    subjectName: "Biology",
    type: "Theory",
    teacherId: "tech-02",
    teacherName: "Mrs. Kasuni Fernando",
    teacherTitle: "Master Instructor - Biology",
    teacherPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. Bio Science",
    dayOfWeek: "Monday",
    startTime: "03:30 PM",
    endTime: "06:30 PM",
    durationHours: 3,
    hallName: "Hall 02 (Science Wing)",
    monthlyFee: 3800,
    coverImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80",
    description: "2027 A/L Biology complete theory with microscope practical slides, genetics, plant physiology, and structured essay paper writing techniques.",
    syllabusHighlights: ["Cell Biology & Biochemistry", "Genetics & Recombinant DNA", "Human Physiology & Diseases", "Microscope Practical Examination"],
    badges: [
      { id: "bg-al2027", label: "2027 A/L", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" }
    ]
  },
  {
    id: "cls-2027-acc",
    name: "2027 A/L Accounting Theory & Paper",
    grade: "2027 A/L",
    stream: "Commerce",
    medium: "Sinhala",
    subjectName: "Accounting",
    type: "Paper Class",
    teacherId: "tech-08",
    teacherName: "Mr. Sunil Rajakaruna",
    teacherTitle: "Commerce & Accounting Senior Instructor",
    teacherPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Com (Hons), ACA",
    dayOfWeek: "Thursday",
    startTime: "03:30 PM",
    endTime: "06:30 PM",
    durationHours: 3,
    hallName: "Hall 03",
    monthlyFee: 3800,
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    description: "2027 A/L Accounting paper class covering company financial statements, cash flow statements, cost accounting, and speed calculations.",
    syllabusHighlights: ["Financial Statement Preparation", "Cash Flow Analysis (LKAS)", "Manufacturing & Cost Accounting", "Timed Speed Test Papers"],
    badges: [
      { id: "bg-al2027", label: "2027 A/L", color: "blue", category: "grade" },
      { id: "bg-med-sin", label: "SINHALA MEDIUM", color: "purple", category: "medium" },
      { id: "bg-type-paper", label: "PAPER CLASS", color: "indigo", category: "type" }
    ]
  },
  {
    id: "cls-2027-ict-comm",
    name: "2027 A/L Common ICT Theory & Practicals",
    grade: "2027 A/L",
    stream: "Common",
    medium: "English",
    subjectName: "ICT",
    type: "Theory",
    teacherId: "tech-04",
    teacherName: "Mr. Nuwan Wickramasinghe",
    teacherTitle: "Chief ICT Lecturer",
    teacherPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    teacherQualifications: "B.Sc. IT (SLIIT)",
    dayOfWeek: "Friday",
    startTime: "03:00 PM",
    endTime: "06:00 PM",
    durationHours: 3,
    hallName: "ICT Lab 01",
    monthlyFee: 4000,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    description: "2027 A/L Common ICT Theory & Hands-on Lab covering Python programming, networking protocols, relational database management, and web development.",
    syllabusHighlights: ["Python Data Structures & OOP", "IP Addressing & Computer Networks", "Database Normalization & SQL Queries", "HTML5 & Web Architecture"],
    badges: [
      { id: "bg-al2027", label: "2027 A/L", color: "blue", category: "grade" },
      { id: "bg-med-eng", label: "ENGLISH MEDIUM", color: "indigo", category: "medium" },
      { id: "bg-type-th", label: "THEORY", color: "emerald", category: "type" },
      { id: "bg-common", label: "ALL STREAMS ELIGIBLE", color: "cyan", category: "custom" }
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "stu-001",
    studentNumber: "EDU-2026-G11-00125",
    fullName: "Madubhashini Kalpani Liyanage",
    nameWithInitials: "M. K. Liyanage",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    school: "Sirimavo Bandaranaike Vidyalaya, Colombo",
    grade: "Grade 11 (O/L)",
    medium: "Sinhala",
    dob: "2010-04-12",
    gender: "Female",
    address: "No. 45/A, Station Road, Maharagama",
    mobile: "+94 77 111 2233",
    parentName: "Mr. Gamini Liyanage",
    parentPhone: "+94 71 888 4433",
    emergencyPhone: "+94 11 285 4422",
    joinedDate: "2026-01-05",
    enrolledClassIds: ["cls-g11-maths", "cls-g11-sci", "cls-g11-ict"],
    pin: "1234",
    lastAttendanceDate: "2026-07-18",
    daysAbsentCount: 0
  },
  {
    id: "stu-002",
    studentNumber: "EDU-2026-GAL-88492",
    fullName: "Kasun Malith Wickramaratne",
    nameWithInitials: "K. M. Wickramaratne",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    school: "Royal College, Colombo 07",
    grade: "2027 A/L",
    stream: "Maths",
    medium: "Sinhala",
    dob: "2008-09-20",
    gender: "Male",
    address: "No. 88, High Level Road, Nugegoda",
    mobile: "+94 76 999 1122",
    parentName: "Mrs. Nimali Wickramaratne",
    parentPhone: "+94 77 555 8899",
    emergencyPhone: "+94 11 282 3344",
    joinedDate: "2026-01-10",
    enrolledClassIds: ["cls-2027-maths-rev", "cls-2027-ict-comm"],
    pin: "4321",
    lastAttendanceDate: "2026-07-20",
    daysAbsentCount: 0
  },
  {
    id: "stu-003",
    studentNumber: "EDU-2026-G06-00441",
    fullName: "Dulain Shanuka Silva",
    nameWithInitials: "D. S. Silva",
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80",
    school: "Ananda College, Colombo 10",
    grade: "Grade 6",
    medium: "Sinhala",
    dob: "2015-02-14",
    gender: "Male",
    address: "No. 12, Lake Road, Boralesgamuwa",
    mobile: "+94 72 444 5566",
    parentName: "Mr. Sarath Silva",
    parentPhone: "+94 70 333 9988",
    emergencyPhone: "+94 11 251 2211",
    joinedDate: "2026-01-15",
    enrolledClassIds: ["cls-g6-maths", "cls-g6-sci"],
    pin: "1122",
    lastAttendanceDate: "2026-06-01",
    daysAbsentCount: 35 // Overdue / Inactive candidate for admin review
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-101",
    studentId: "stu-001",
    studentName: "Madubhashini Kalpani Liyanage",
    classId: "cls-g11-maths",
    className: "Grade 11 (O/L) - Mathematics",
    month: "July 2026",
    year: 2026,
    amount: 2800,
    paidDate: "2026-07-04",
    receiptNumber: "REC-2026-07412",
    paymentMethod: "Cash",
    status: "Paid"
  },
  {
    id: "pay-102",
    studentId: "stu-001",
    studentName: "Madubhashini Kalpani Liyanage",
    classId: "cls-g11-sci",
    className: "Grade 11 (O/L) - Science",
    month: "July 2026",
    year: 2026,
    amount: 2800,
    paidDate: "2026-07-04",
    receiptNumber: "REC-2026-07413",
    paymentMethod: "Bank Transfer",
    status: "Paid"
  },
  {
    id: "pay-103",
    studentId: "stu-002",
    studentName: "Kasun Malith Wickramaratne",
    classId: "cls-2027-maths-rev",
    className: "2027 A/L Combined Maths Revision",
    month: "June 2026",
    year: 2026,
    amount: 4000,
    paidDate: "2026-06-08",
    receiptNumber: "REC-2026-06109",
    paymentMethod: "Online",
    status: "Paid"
  },
  {
    id: "pay-104",
    studentId: "stu-002",
    studentName: "Kasun Malith Wickramaratne",
    classId: "cls-2027-maths-rev",
    className: "2027 A/L Combined Maths Revision",
    month: "July 2026",
    year: 2026,
    amount: 4000,
    paidDate: "",
    receiptNumber: "",
    paymentMethod: "Cash",
    status: "Overdue"
  },
  {
    id: "pay-105",
    studentId: "stu-003",
    studentName: "Dulain Shanuka Silva",
    classId: "cls-g6-maths",
    className: "Grade 6 - Mathematics",
    month: "June 2026",
    year: 2026,
    amount: 2000,
    paidDate: "",
    receiptNumber: "",
    paymentMethod: "Cash",
    status: "Overdue"
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "att-001",
    studentId: "stu-001",
    studentName: "Madubhashini Kalpani Liyanage",
    studentNumber: "EDU-2026-G11-00125",
    classId: "cls-g11-maths",
    className: "Grade 11 Mathematics",
    date: "2026-07-18",
    time: "08:25 AM",
    status: "Present",
    smsSent: true,
    smsLogMessage: "SMS Dispatched to +94 71 888 4433: Student Kalpani checked in at EduMaster Gate at 08:25 AM."
  },
  {
    id: "att-002",
    studentId: "stu-002",
    studentName: "Kasun Malith Wickramaratne",
    studentNumber: "EDU-2026-GAL-88492",
    classId: "cls-2027-maths-rev",
    className: "2027 A/L Combined Maths",
    date: "2026-07-18",
    time: "07:42 AM",
    status: "Present",
    smsSent: true,
    smsLogMessage: "SMS Dispatched to +94 77 555 8899: Student Kasun checked in at EduMaster Gate at 07:42 AM."
  },
  {
    id: "att-003",
    studentId: "stu-003",
    studentName: "Dulain Shanuka Silva",
    studentNumber: "EDU-2026-G06-00441",
    classId: "cls-g6-maths",
    className: "Grade 6 Mathematics",
    date: "2026-07-20",
    time: "03:15 PM",
    status: "Absent",
    smsSent: true,
    smsLogMessage: "SMS ALERT sent to +94 70 333 9988: Dear Parent, Dulain Shanuka was ABSENT today for Grade 6 Mathematics."
  }
];

export const INITIAL_EXAMS: ExamMark[] = [
  {
    id: "ex-01",
    studentId: "stu-001",
    studentName: "Madubhashini Kalpani Liyanage",
    classId: "cls-g11-maths",
    className: "Grade 11 Mathematics",
    examTitle: "Term Test Model Paper 04",
    marks: 92,
    maxMarks: 100,
    gradeScore: "A+",
    rank: 2,
    totalStudents: 140,
    date: "2026-07-02"
  },
  {
    id: "ex-02",
    studentId: "stu-002",
    studentName: "Kasun Malith Wickramaratne",
    classId: "cls-2027-maths-rev",
    className: "2027 A/L Combined Maths",
    examTitle: "Pure Maths Integration Speed Paper",
    marks: 88,
    maxMarks: 100,
    gradeScore: "A",
    rank: 5,
    totalStudents: 320,
    date: "2026-07-10"
  }
];

export const INITIAL_WALL_OF_FAME: WallOfFameItem[] = [
  {
    id: "wof-1",
    studentName: "Nipuna Yashodha Jayasinghe",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    examType: "A/L",
    year: "2025 A/L",
    streamOrGrade: "Physical Science Stream",
    school: "Royal College, Colombo",
    resultsSummary: "Island Rank 01 • District Rank 01 (Colombo)",
    islandRank: "01",
    districtRank: "01",
    zScore: "2.9812",
    subjectGrades: [
      { subject: "Combined Mathematics", grade: "A" },
      { subject: "Physics", grade: "A" },
      { subject: "Chemistry", grade: "A" }
    ]
  },
  {
    id: "wof-2",
    studentName: "Rashmi Devanga Gunasekara",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    examType: "A/L",
    year: "2025 A/L",
    streamOrGrade: "Biological Science Stream",
    school: "Visakha Vidyalaya, Colombo",
    resultsSummary: "Island Rank 03 • Z-Score 2.8940",
    islandRank: "03",
    districtRank: "02",
    zScore: "2.8940",
    subjectGrades: [
      { subject: "Biology", grade: "A" },
      { subject: "Chemistry", grade: "A" },
      { subject: "Physics", grade: "A" }
    ]
  },
  {
    id: "wof-3",
    studentName: "Kavisha Malinda Perera",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    examType: "O/L",
    year: "2025 O/L",
    streamOrGrade: "G.C.E. Ordinary Level",
    school: "Ananda College, Colombo",
    resultsSummary: "9 A's (All High Distinction)",
    subjectGrades: [
      { subject: "Mathematics", grade: "A" },
      { subject: "Science", grade: "A" },
      { subject: "Sinhala", grade: "A" },
      { subject: "English", grade: "A" },
      { subject: "History", grade: "A" },
      { subject: "Buddhism", grade: "A" },
      { subject: "ICT", grade: "A" },
      { subject: "Commerce", grade: "A" },
      { subject: "Music", grade: "A" }
    ]
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: "not-01",
    title: "Class Location Relocation - 2027 A/L Combined Maths",
    content: "Saturday Combined Mathematics Revision class by Mr. Dinesh Liyanage has been relocated to Hall 01 A/C Auditorium to accommodate extra capacity.",
    date: "2026-07-22",
    category: "Urgent Alert",
    teacherName: "Mr. Dinesh Liyanage",
    isHeaderBanner: true
  },
  {
    id: "not-02",
    title: "Model Paper 05 Issue for O/L Grade 11 Mathematics",
    content: "Grade 11 Mathematics Paper 05 is now issued to enrolled students. Download PDF from your student dashboard or collect physical copy at counter.",
    date: "2026-07-20",
    category: "Exam"
  }
];

export const INITIAL_TUTES: TutePaper[] = [
  {
    id: "tut-01",
    title: "Grade 11 O/L Mathematics Model Paper 05 (G.C.E. Standard)",
    classId: "cls-g11-maths",
    type: "Paper",
    issuedDate: "2026-07-15",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    issuedToAll: false,
    statusMap: {
      "stu-001": "Issued",
      "stu-003": "Not Issued"
    }
  },
  {
    id: "tut-02",
    title: "2027 A/L Combined Maths Integration Complete Theory Tute Part I",
    classId: "cls-2027-maths-rev",
    type: "Tute",
    issuedDate: "2026-07-10",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    issuedToAll: false,
    statusMap: {
      "stu-002": "Issued"
    }
  }
];