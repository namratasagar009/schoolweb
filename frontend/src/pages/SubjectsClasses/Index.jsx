import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';

export default function SubjectsClasses() {
  const { subjects, setActiveModal, student } = usePortal();
  const [filterType, setFilterType] = useState('All');

  const filteredSubjects = subjects.filter((subject) => {
    if (filterType === 'All') return true;
    return subject.type === filterType;
  });

  return (
    <main className="flex-grow flex flex-col items-center py-8 pb-32 md:pb-16 px-margin-mobile md:px-margin-desktop animate-in fade-in duration-300">
      <div className="w-full max-w-[1280px] flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-3 items-start border-b border-surface-container-high pb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md shadow-xs">
            <span className="material-symbols-outlined text-lg">school</span>
            {student.classGrade}
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface">
            Subjects &amp; Syllabus
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Explore your enrolled subjects for the current academic year. Access syllabus, study materials, and teacher contact information all in one place.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 pt-2">
            {['All', 'Compulsory', 'Elective'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-primary text-on-primary shadow-xs font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subj) => (
            <div
              key={subj.id}
              className={`bg-surface-container-lowest rounded-2xl shadow-rest shadow-hover transition-all duration-300 flex flex-col overflow-hidden relative border-t-4 ${subj.accentColor}`}
            >
              <div className="p-6 flex flex-col h-full gap-4">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center ${subj.iconColor}`}>
                    <span className="material-symbols-outlined text-3xl">
                      {subj.icon}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-surface-container text-on-surface-variant font-label-md text-label-md text-[12px] rounded-md font-semibold">
                    {subj.type}
                  </span>
                </div>

                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-1">
                    {subj.name}
                  </h3>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    <span className="font-body-sm text-body-sm">{subj.teacher}</span>
                  </div>
                </div>

                {/* Topics Preview */}
                <div className="space-y-1 pt-2 border-t border-surface-container-high/60 text-xs text-on-surface-variant">
                  <span className="font-semibold text-on-surface">Key Modules:</span>
                  <ul className="list-disc list-inside space-y-0.5 opacity-90">
                    {subj.topics.slice(0, 2).map((t, idx) => (
                      <li key={idx} className="truncate">{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-4 flex gap-3 border-t border-surface-container-high">
                  <button
                    onClick={() => setActiveModal({ type: 'syllabus', data: subj })}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                    Syllabus
                  </button>
                  <button
                    onClick={() => setActiveModal({ type: 'syllabus', data: subj })}
                    aria-label="Materials"
                    title="View Materials"
                    className="flex items-center justify-center p-2.5 text-secondary bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">folder_open</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
