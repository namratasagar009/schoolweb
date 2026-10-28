import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const PortalContext = createContext();

export const initialStudentData = {
  name: "Aryan Sharma",
  firstName: "Aryan",
  classGrade: "Class 8-A",
  rollNo: "18",
  admissionNo: "SSM-2024-8042",
  attendance: 92,
  overallGrade: "94.5%",
  rank: "3rd in Class",
  house: "Newton House",
  upNextClass: {
    subject: "Mathematics",
    teacher: "Mrs. Sharma",
    time: "10:00 AM - 10:45 AM",
    room: "Room 302",
    icon: "calculate",
    accentColor: "border-t-[#008ebf]"
  }
};

export const initialTimetable = [
  { id: 1, period: "01", time: "09:15 - 10:00", subject: "English Literature", teacher: "Mrs. Sharma", room: "Room 302", active: false, accent: "border-blue-500", status: "Completed" },
  { id: 2, period: "02", time: "10:00 - 10:45", subject: "Mathematics", teacher: "Mr. Gupta", room: "Lab 2", active: false, accent: "border-blue-500", status: "Completed" },
  { id: 3, period: "03", time: "10:45 - 11:30", subject: "Physics", teacher: "Dr. Singh", room: "Physics Lab", active: true, accent: "border-green-500", status: "Live Now" },
  { id: 4, period: "04", time: "11:30 - 12:15", subject: "Chemistry", teacher: "Ms. Verma", room: "Chem Lab", active: false, opacity: true, accent: "border-green-500", status: "Upcoming" },
  { id: 5, isBreak: true, period: "LUNCH", time: "12:15 - 13:00", subject: "Lunch Break", duration: "45 mins", icon: "restaurant" },
  { id: 6, period: "05", time: "13:00 - 13:45", subject: "History", teacher: "Mr. Chatterjee", room: "Room 104", active: false, accent: "border-yellow-500", status: "Upcoming" },
  { id: 7, period: "06", time: "13:45 - 14:30", subject: "Computer Science", teacher: "Mrs. Iyer", room: "Computer Lab 1", active: false, accent: "border-purple-500", status: "Upcoming" },
  { id: 8, period: "07", time: "14:30 - 15:15", subject: "Physical Education", teacher: "Coach Kumar", room: "Sports Ground", active: false, accent: "border-orange-500", status: "Upcoming" },
  { id: 9, period: "08", time: "15:15 - 16:00", subject: "Hindi", teacher: "Mr. Pandey", room: "Room 302", active: false, accent: "border-red-500", status: "Upcoming" }
];

export const initialNotices = [
  {
    id: 1,
    title: "School closed on Friday",
    category: "Important",
    isHighPriority: true,
    date: "Oct 12",
    time: "09:30 AM",
    icon: "warning",
    content: "Due to unexpected maintenance work in the main academic block, the school will remain closed for all classes this coming Friday. Online materials will be provided for self-study.",
    read: false
  },
  {
    id: 2,
    title: "Annual Sports Day Registration",
    category: "Sports",
    isHighPriority: false,
    date: "Oct 10",
    time: "11:00 AM",
    icon: "sports_soccer",
    content: "Registrations are now open for the Annual Sports Day. Students can participate in a maximum of three track events. Please submit your forms to your respective class teachers by next Monday.",
    hasActionButton: true,
    actionText: "View Details",
    read: false
  },
  {
    id: 3,
    title: "Library Book Return Deadline",
    category: "Academic",
    isHighPriority: false,
    date: "Oct 08",
    time: "02:15 PM",
    icon: "library_books",
    content: "A gentle reminder that all library books issued before the mid-term break must be returned by this Wednesday to avoid late fees.",
    read: true
  },
  {
    id: 4,
    title: "Science Exhibition Entries Open",
    category: "Academic",
    isHighPriority: false,
    date: "Oct 05",
    time: "10:00 AM",
    icon: "science",
    content: "Submit your innovative science project models for the Inter-School Science Fair 2026. Top 3 projects get state-level nominations.",
    read: true
  }
];

export const initialSubjects = [
  {
    id: "eng",
    name: "English",
    type: "Compulsory",
    teacher: "Mr. Sharma",
    icon: "menu_book",
    accentColor: "border-t-[#008ebf]",
    iconColor: "text-[#008ebf]",
    topics: ["Poetry & Drama", "Grammar & Syntax", "Creative Writing", "Shakespearean Prose"],
    materialsCount: 14,
    syllabusProgress: 85
  },
  {
    id: "math",
    name: "Mathematics",
    type: "Compulsory",
    teacher: "Ms. Gupta",
    icon: "calculate",
    accentColor: "border-t-[#ba1a1a]",
    iconColor: "text-[#ba1a1a]",
    topics: ["Linear Equations", "Algebraic Expressions", "Geometry & Triangles", "Statistics & Probability"],
    materialsCount: 22,
    syllabusProgress: 78
  },
  {
    id: "sci",
    name: "Science",
    type: "Compulsory",
    teacher: "Dr. Verma",
    icon: "science",
    accentColor: "border-t-[#3f465c]",
    iconColor: "text-[#3f465c]",
    topics: ["Cell Biology", "Chemical Reactions", "Force & Laws of Motion", "Light & Reflection"],
    materialsCount: 18,
    syllabusProgress: 90
  },
  {
    id: "sst",
    name: "Social Studies",
    type: "Compulsory",
    teacher: "Mr. Singh",
    icon: "public",
    accentColor: "border-t-[#566771]",
    iconColor: "text-[#566771]",
    topics: ["The Indian Constitution", "Resources & Development", "The Nationalist Movement", "Map Work"],
    materialsCount: 12,
    syllabusProgress: 70
  },
  {
    id: "hin",
    name: "Hindi",
    type: "Compulsory",
    teacher: "Ms. Patel",
    icon: "language",
    accentColor: "border-t-[#001e2c]",
    iconColor: "text-[#001e2c]",
    topics: ["Vyakaran & Rachna", "Kavya Khand", "Gadya Khand", "Anucched Lekhan"],
    materialsCount: 10,
    syllabusProgress: 92
  },
  {
    id: "cs",
    name: "Computer Science",
    type: "Elective",
    teacher: "Mr. Rao",
    icon: "computer",
    accentColor: "border-t-[#131b2e]",
    iconColor: "text-[#131b2e]",
    topics: ["Python Fundamentals", "Database & SQL", "HTML & CSS Web Design", "Cyber Safety"],
    materialsCount: 28,
    syllabusProgress: 96
  },
  {
    id: "pe",
    name: "Physical Education",
    type: "Elective",
    teacher: "Coach D'Souza",
    icon: "sports_basketball",
    accentColor: "border-t-[#0c1e26]",
    iconColor: "text-[#0c1e26]",
    topics: ["Athletics & Track", "Basketball Rules", "Yoga & Wellness", "First Aid Basics"],
    materialsCount: 8,
    syllabusProgress: 100
  }
];

export const initialHomework = [
  {
    id: 1,
    subject: "Mathematics",
    badgeColor: "bg-tertiary-fixed text-on-tertiary-fixed",
    dueText: "Due Tomorrow, 5 PM",
    isUrgent: true,
    title: "Linear Equations Exercise 4.2",
    description: "Complete questions 1 through 15 from Chapter 4 in your practice notebook.",
    status: "Pending"
  },
  {
    id: 2,
    subject: "Science",
    badgeColor: "bg-secondary-fixed text-on-secondary-fixed",
    dueText: "Due Oct 15",
    isUrgent: false,
    title: "Cell Biology Lab Diagram",
    description: "Draw and label plant vs animal cell structures in your practical manual.",
    status: "Pending"
  }
];

export const initialAssemblies = {
  today: {
    hostClass: "Class 5-B",
    theme: "Environmental Conservation & Water Saving",
    time: "08:00 AM",
    location: "Main Assembly Grounds"
  },
  upcoming: [
    { day: "Tue", classRoom: "5-C", label: "Tomorrow" },
    { day: "Wed", classRoom: "6-A", label: "Oct 14" },
    { day: "Thu", classRoom: "6-B", label: "Oct 15" },
    { day: "Fri", classRoom: "6-C", label: "Oct 16" }
  ]
};

export const initialResults = {
  overallGrade: "94.5% (A+)",
  classRank: "3rd Position",
  subjects: [
    { subject: "Mathematics", marksObtained: 98, maxMarks: 100 },
    { subject: "Computer Science", marksObtained: 96, maxMarks: 100 },
    { subject: "Science", marksObtained: 94, maxMarks: 100 },
    { subject: "English Literature", marksObtained: 91, maxMarks: 100 }
  ]
};

export function PortalProvider({ children }) {
  const [student, setStudent] = useState(initialStudentData);
  const [notices, setNotices] = useState(initialNotices);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [timetable, setTimetable] = useState(initialTimetable);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [homework, setHomework] = useState(initialHomework);
  const [assemblies, setAssemblies] = useState(initialAssemblies);
  const [results, setResults] = useState(initialResults);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [backendConnected, setBackendConnected] = useState(false);

  // Initial data load from backend API
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [studentData, noticesData, subjectsData, homeworkData, assembliesData, resultsData] =
          await Promise.allSettled([
            api.getStudent(),
            api.getNotices(),
            api.getSubjects(),
            api.getHomework(),
            api.getAssemblies(),
            api.getResults(),
          ]);

        if (studentData.status === 'fulfilled') setStudent(studentData.value);
        if (noticesData.status === 'fulfilled') setNotices(noticesData.value);
        if (subjectsData.status === 'fulfilled') setSubjects(subjectsData.value);
        if (homeworkData.status === 'fulfilled') setHomework(homeworkData.value);
        if (assembliesData.status === 'fulfilled') setAssemblies(assembliesData.value);
        if (resultsData.status === 'fulfilled') setResults(resultsData.value);

        setBackendConnected(true);
      } catch (err) {
        console.warn('Backend API connection check failed, using local defaults', err);
      }
    }

    loadInitialData();
  }, []);

  // Fetch timetable whenever selectedDay changes
  const fetchTimetableForDay = useCallback(async (day) => {
    try {
      const data = await api.getTimetable(day);
      if (Array.isArray(data)) {
        setTimetable(data);
      }
    } catch (err) {
      console.warn(`Could not load timetable for ${day} from backend:`, err.message);
    }
  }, []);

  useEffect(() => {
    fetchTimetableForDay(selectedDay);
  }, [selectedDay, fetchTimetableForDay]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const markNoticeRead = async (noticeId) => {
    // Optimistic local update
    setNotices((prev) =>
      prev.map((n) => (n.id === noticeId ? { ...n, read: true } : n))
    );

    try {
      await api.markNoticeRead(noticeId);
    } catch (err) {
      console.warn('Failed to sync notice read status to backend:', err);
    }
  };

  const markAllNoticesRead = async () => {
    // Optimistic local update
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      await api.markAllNoticesRead();
    } catch (err) {
      console.warn('Failed to sync mark all notices read to backend:', err);
    }
  };

  const submitHomework = async (id) => {
    setHomework((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: 'Completed' } : h))
    );

    try {
      await api.submitHomework(id);
    } catch (err) {
      console.warn('Failed to sync homework submit to backend:', err);
    }
  };

  const updateStudent = async (updates) => {
    setStudent((prev) => ({ ...prev, ...updates }));
    try {
      await api.updateStudent(updates);
    } catch (err) {
      console.warn('Failed to sync student update to backend:', err);
    }
  };

  const unreadCount = notices.filter((n) => !n.read).length;

  return (
    <PortalContext.Provider
      value={{
        student,
        setStudent,
        updateStudent,
        notices,
        subjects,
        timetable,
        selectedDay,
        setSelectedDay,
        homework,
        submitHomework,
        assemblies,
        results,
        isDarkMode,
        toggleDarkMode,
        isNotificationsOpen,
        setIsNotificationsOpen,
        unreadCount,
        markNoticeRead,
        markAllNoticesRead,
        activeModal,
        setActiveModal,
        searchQuery,
        setSearchQuery,
        backendConnected,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
}
