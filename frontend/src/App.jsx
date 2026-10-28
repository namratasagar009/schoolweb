import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import NotificationModal from './components/NotificationModal';
import DetailModal from './components/DetailModal';

import StudentDashboard from './pages/StudentDashboard/Index';
import DailyTimetable from './pages/DailyTimetable/Index';
import NoticesAssembly from './pages/NoticesAssembly/Index';
import SubjectsClasses from './pages/SubjectsClasses/Index';
import Profile from './pages/Profile/Index';

export default function App() {
  return (
    <PortalProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md transition-colors duration-200">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<StudentDashboard />} />
              <Route path="/timetable" element={<DailyTimetable />} />
              <Route path="/notices" element={<NoticesAssembly />} />
              <Route path="/subjects" element={<SubjectsClasses />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <BottomNavBar />
          <NotificationModal />
          <DetailModal />
        </div>
      </Router>
    </PortalProvider>
  );
}
