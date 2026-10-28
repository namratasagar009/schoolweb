import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';

export default function DailyTimetable() {
  const { timetable, student, selectedDay, setSelectedDay } = usePortal();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-gutter pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="mb-8 md:mb-10 text-center md:text-left space-y-2">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface font-bold">
          {selectedDay}, Oct 23
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {student.classGrade} - Section A • Daily Schedule
        </p>

        {/* Day Switcher Tabs */}
        <div className="flex justify-center md:justify-start gap-2 pt-4 overflow-x-auto pb-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-1.5 rounded-full text-label-md font-label-md transition-all cursor-pointer ${
                selectedDay === day
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable List */}
      <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto md:mx-0">
        {timetable.map((item) => {
          if (item.isBreak) {
            return (
              <div
                key={item.id}
                className="bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 border border-dashed border-outline-variant shadow-inner my-2 text-center"
              >
                <span className="material-symbols-outlined text-secondary text-3xl">
                  {item.icon}
                </span>
                <h3 className="font-headline-md text-headline-md text-secondary text-lg font-bold">
                  {item.subject}
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {item.time} ({item.duration})
                </span>
              </div>
            );
          }

          if (item.active) {
            return (
              <div
                key={item.id}
                className="bg-primary-fixed dark:bg-primary-container rounded-xl p-4 flex items-center gap-4 shadow-md border border-tertiary-fixed-dim transform scale-[1.02] transition-transform"
              >
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary-fixed-dim dark:bg-surface-container-high rounded-full shrink-0">
                  <span className="font-label-md text-label-md font-bold text-on-primary-fixed dark:text-primary-fixed">
                    {item.period}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                    <h3 className={`font-headline-md text-headline-md text-on-primary-fixed dark:text-primary-fixed text-lg font-bold border-t-4 ${item.accent} pt-1`}>
                      {item.subject}
                    </h3>
                    <span className="font-body-sm text-body-sm text-on-primary-fixed dark:text-primary-fixed bg-tertiary-fixed dark:bg-tertiary-container py-1 px-3 rounded-full flex items-center gap-1.5 self-start">
                      <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                      Live Now • {item.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-on-primary-fixed-variant dark:text-surface-variant font-body-md text-body-md">
                    <p className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">person</span>
                      {item.teacher}
                    </p>
                    <span className="text-xs font-semibold">{item.room}</span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 border border-outline-variant/60 hover:shadow-md transition-shadow ${
                item.opacity ? 'opacity-70 hover:opacity-100' : ''
              }`}
            >
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-surface-container-low rounded-full shrink-0">
                <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  {item.period}
                </span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-headline-md text-headline-md text-on-surface text-lg font-bold border-t-4 ${item.accent} pt-1`}>
                    {item.subject}
                  </h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container py-1 px-3 rounded-full">
                    {item.time}
                  </span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant font-body-md text-body-md">
                  <p className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">person</span>
                    {item.teacher}
                  </p>
                  <span className="text-xs text-on-surface-variant/80">{item.room}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
