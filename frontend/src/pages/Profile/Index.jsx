import React from 'react';
import { usePortal } from '../../context/PortalContext';

export default function Profile() {
  const { student, isDarkMode, toggleDarkMode } = usePortal();

  return (
    <main className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-8 pb-24 md:pb-12 space-y-8 animate-in fade-in duration-300">
      {/* Header Profile Hero */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <div className="w-24 h-24 rounded-full bg-secondary-container text-on-secondary-container text-3xl font-extrabold flex items-center justify-center ring-4 ring-secondary-fixed/50 shrink-0">
          {student.firstName[0]}
        </div>
        <div className="space-y-2 flex-grow">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
            <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-semibold rounded-full text-xs">
              {student.classGrade}
            </span>
            <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-semibold rounded-full text-xs">
              {student.house}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {student.name}
          </h1>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Admission ID: <span className="font-semibold text-on-surface">{student.admissionNo}</span> • Roll No: <span className="font-semibold text-on-surface">{student.rollNo}</span>
          </p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-outline-variant/50 text-sm font-semibold flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Academic Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-secondary-fixed rounded-xl text-on-secondary-fixed">
            <span className="material-symbols-outlined text-2xl">event_available</span>
          </div>
          <div>
            <span className="text-xs text-on-surface-variant uppercase font-semibold">Attendance</span>
            <p className="text-2xl font-bold text-on-surface">{student.attendance}%</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-tertiary-fixed rounded-xl text-on-tertiary-fixed">
            <span className="material-symbols-outlined text-2xl">grade</span>
          </div>
          <div>
            <span className="text-xs text-on-surface-variant uppercase font-semibold">Overall Grade</span>
            <p className="text-2xl font-bold text-on-surface">{student.overallGrade}</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-primary-fixed rounded-xl text-on-primary-fixed">
            <span className="material-symbols-outlined text-2xl">trophy</span>
          </div>
          <div>
            <span className="text-xs text-on-surface-variant uppercase font-semibold">Class Position</span>
            <p className="text-2xl font-bold text-on-surface">{student.rank}</p>
          </div>
        </div>
      </div>

      {/* Profile Details & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">badge</span>
            Student Identification
          </h3>
          <div className="space-y-3 text-sm divide-y divide-outline-variant/20">
            <div className="flex justify-between py-2">
              <span className="text-on-surface-variant">Full Name</span>
              <span className="font-bold text-on-surface">{student.name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-on-surface-variant">Class &amp; Section</span>
              <span className="font-bold text-on-surface">{student.classGrade}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-on-surface-variant">Guardian Contact</span>
              <span className="font-bold text-on-surface">+91 98765 43210</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-on-surface-variant">School Email</span>
              <span className="font-bold text-on-surface">aryan.s@ssmemorial.edu.in</span>
            </div>
          </div>
        </div>

        {/* System Settings & Links */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">settings</span>
            Portal Preferences
          </h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-on-surface">Live Class Reminders</h4>
                <p className="text-xs text-on-surface-variant">Get alert 5 mins before period starts</p>
              </div>
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-2xl">toggle_on</span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-on-surface">Daily Attendance Summary</h4>
                <p className="text-xs text-on-surface-variant">Send daily email to parent guardian</p>
              </div>
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-2xl">toggle_on</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
