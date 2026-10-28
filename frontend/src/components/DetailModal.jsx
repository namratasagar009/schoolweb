import React from 'react';
import { usePortal } from '../context/PortalContext';

export default function DetailModal() {
  const { 
    activeModal, 
    setActiveModal, 
    homework = [], 
    submitHomework, 
    assemblies, 
    results 
  } = usePortal();

  if (!activeModal) return null;

  const closeModal = () => setActiveModal(null);

  const renderContent = () => {
    switch (activeModal.type) {
      case 'homework':
        const pendingCount = homework.filter((h) => h.status === 'Pending').length;
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-secondary">
              <span className="material-symbols-outlined text-3xl">assignment</span>
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Homework Assignments</h3>
                <p className="text-on-surface-variant font-body-sm">{pendingCount} Pending Submission{pendingCount === 1 ? '' : 's'} for Class 8-A</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-2">
              {homework.map((item) => (
                <div key={item.id} className="p-4 bg-surface-container rounded-xl border border-outline-variant/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.badgeColor || 'bg-secondary-fixed text-on-secondary-fixed'}`}>
                      {item.subject}
                    </span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${item.status === 'Completed' ? 'text-secondary' : item.isUrgent ? 'text-error' : 'text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined text-sm">
                        {item.status === 'Completed' ? 'check_circle' : 'schedule'}
                      </span>
                      {item.status === 'Completed' ? 'Completed' : item.dueText}
                    </span>
                  </div>
                  <h4 className="font-label-md font-bold text-on-surface">{item.title}</h4>
                  <p className="text-body-sm text-on-surface-variant">{item.description}</p>
                  {item.status !== 'Completed' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => submitHomework && submitHomework(item.id)}
                        className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold rounded-lg hover:bg-secondary-container/80 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">done</span>
                        Mark Submitted
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'results':
        const resData = results || {};
        const subjectsList = resData.subjects || [];
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-tertiary-fixed-dim">
              <span className="material-symbols-outlined text-3xl">military_tech</span>
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Mid-Term Grade Summary</h3>
                <p className="text-on-surface-variant font-body-sm">{resData.academicYear || 'Academic Year 2025-2026'} • {resData.classGrade || 'Class 8-A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-surface-container-low rounded-xl text-center border border-outline-variant/40">
                <span className="text-xs text-on-surface-variant uppercase font-semibold">Overall Grade</span>
                <p className="text-2xl font-bold text-on-surface mt-1">{resData.overallGrade || '94.5%'}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl text-center border border-outline-variant/40">
                <span className="text-xs text-on-surface-variant uppercase font-semibold">Class Rank</span>
                <p className="text-2xl font-bold text-on-tertiary-container mt-1">{resData.classRank || '3rd Position'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-md font-bold text-on-surface">Subject Breakdowns</h4>
              <div className="space-y-1 text-sm">
                {subjectsList.map((sub, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-outline-variant/30">
                    <span>{sub.subject}</span>
                    <span className="font-bold">{sub.marksObtained} / {sub.maxMarks}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'assembly':
        const assem = assemblies || {};
        const today = assem.today || { hostClass: 'Class 5-B', theme: 'Environmental Conservation', time: '08:00 AM', location: 'Main Grounds' };
        const upcoming = assem.upcoming || [];
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl">campaign</span>
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Assembly Schedule</h3>
                <p className="text-on-surface-variant font-body-sm">Weekly Morning Assembly Roster</p>
              </div>
            </div>

            <div className="bg-tertiary-fixed text-on-tertiary-fixed p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Today's Host</span>
              <h4 className="text-3xl font-extrabold">{today.hostClass}</h4>
              <p className="text-sm">Theme: "{today.theme}"</p>
              <div className="pt-2 text-xs flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-base">schedule</span> {today.time} - {today.location}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-md font-bold text-on-surface">Upcoming Assemblies</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {upcoming.map((u, i) => (
                  <div key={i} className="p-3 bg-surface-container rounded-xl flex justify-between items-center">
                    <span>{u.day}: Class {u.classRoom}</span>
                    <span className="font-semibold text-on-surface-variant">{u.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'syllabus':
        const subject = activeModal.data;
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center ${subject.iconColor}`}>
                <span className="material-symbols-outlined text-3xl">{subject.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{subject.name} Syllabus</h3>
                <p className="text-on-surface-variant font-body-sm">Teacher: {subject.teacher} • {subject.type}</p>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Course Completion</span>
                <span>{subject.syllabusProgress}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-on-tertiary-container h-full rounded-full transition-all duration-500" 
                  style={{ width: `${subject.syllabusProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-md font-bold text-on-surface">Curriculum Topics</h4>
              <div className="space-y-2">
                {subject.topics.map((topic, i) => (
                  <div key={i} className="p-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface">{topic}</span>
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notice':
        const notice = activeModal.data;
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${notice.isHighPriority ? 'bg-error-container text-on-error-container' : 'bg-tertiary-fixed text-on-tertiary-fixed'}`}>
                <span className="material-symbols-outlined text-2xl">{notice.icon}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{notice.category}</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface leading-snug">{notice.title}</h3>
              </div>
            </div>

            <div className="text-xs text-on-surface-variant flex items-center gap-2 pb-2 border-b border-outline-variant/30">
              <span className="material-symbols-outlined text-base">calendar_today</span> Published on {notice.date} at {notice.time}
            </div>

            <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-line">
              {notice.content}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity">
      <div 
        className="bg-surface-container-lowest dark:bg-on-background border border-outline-variant/50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col p-6 space-y-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}

        <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
          <button
            onClick={closeModal}
            className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
