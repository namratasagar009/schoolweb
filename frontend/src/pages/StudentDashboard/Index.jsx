import React from 'react';
import { usePortal } from '../../context/PortalContext';

export default function StudentDashboard() {
  const { student, setActiveModal } = usePortal();

  return (
    <main className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-12 space-y-8 animate-in fade-in duration-300">
      {/* Top Section: Welcome & Attendance */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="space-y-2">
          <div className="inline-flex items-center px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md rounded-full shadow-xs">
            {student.classGrade}
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Good Morning, {student.firstName}!
          </h1>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Ready for a day of guided discovery?
          </p>
        </div>

        {/* Attendance Widget */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow w-full md:w-auto">
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="100, 100"
                strokeWidth="3.5"
              />
              <path
                className="text-tertiary-fixed-dim"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${student.attendance}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-label-md text-label-md font-bold text-on-surface">
              {student.attendance}%
            </div>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Attendance</h3>
            <p className="text-on-surface-variant font-body-sm text-body-sm">You're on track!</p>
          </div>
        </div>
      </section>

      {/* Middle Section: Up Next */}
      <section className="space-y-4">
        <h2 className="font-headline-md text-headline-md text-on-surface">Up Next</h2>
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm border-t-[4px] border-t-tertiary-fixed-dim flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow">
          <div className="bg-surface-container-low w-16 h-16 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[32px] text-on-tertiary-container">
              {student.upNextClass.icon}
            </span>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              {student.upNextClass.subject}
            </h3>
            <p className="text-on-surface-variant font-body-md text-body-md">
              with {student.upNextClass.teacher}
            </p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <div className="font-label-md text-label-md text-primary bg-primary-fixed-dim/20 dark:bg-primary-container px-3.5 py-1 rounded-full inline-block">
              {student.upNextClass.time}
            </div>
            <p className="text-on-surface-variant font-body-sm text-body-sm">
              {student.upNextClass.room}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section: Quick Actions Grid */}
      <section className="space-y-4">
        <h2 className="font-headline-md text-headline-md text-on-surface">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action 1: Homework */}
          <button
            onClick={() => setActiveModal({ type: 'homework' })}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-secondary transition-all flex items-center gap-4 text-left group cursor-pointer"
          >
            <div className="bg-secondary-fixed text-on-secondary-fixed p-3.5 rounded-xl group-hover:bg-secondary-fixed-dim transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined fill text-2xl">assignment</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface">Homework</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">2 assignments due</p>
            </div>
          </button>

          {/* Action 2: Results */}
          <button
            onClick={() => setActiveModal({ type: 'results' })}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-tertiary-fixed-dim transition-all flex items-center gap-4 text-left group cursor-pointer"
          >
            <div className="bg-tertiary-fixed text-on-tertiary-fixed p-3.5 rounded-xl group-hover:bg-tertiary-fixed-dim transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined fill text-2xl">military_tech</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface">Results</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">View term grades</p>
            </div>
          </button>

          {/* Action 3: Assembly */}
          <button
            onClick={() => setActiveModal({ type: 'assembly' })}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all flex items-center gap-4 text-left group cursor-pointer"
          >
            <div className="bg-primary-fixed text-on-primary-fixed p-3.5 rounded-xl group-hover:bg-primary-fixed-dim transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined fill text-2xl">campaign</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface">Assembly</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Weekly schedule</p>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
