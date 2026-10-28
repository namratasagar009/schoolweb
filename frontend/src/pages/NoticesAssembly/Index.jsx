import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';

export default function NoticesAssembly() {
  const { notices, setActiveModal } = usePortal();
  const [filterCategory, setFilterCategory] = useState('All');
  const [noticeSearch, setNoticeSearch] = useState('');

  const categories = ['All', 'Important', 'Academic', 'Sports'];

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = filterCategory === 'All' || notice.category === filterCategory;
    const matchesSearch = notice.title.toLowerCase().includes(noticeSearch.toLowerCase()) ||
                          notice.content.toLowerCase().includes(noticeSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 pb-24 md:pb-12 flex flex-col gap-10 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">
          Assembly &amp; Notices
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Stay updated with the latest school events and announcements.
        </p>
      </div>

      {/* Section: Weekly Assembly Schedule */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">event_note</span>
            Assembly Schedule
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Highlight Card */}
          <div className="lg:col-span-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-6 shadow-sm border border-tertiary-fixed-dim/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <span className="material-symbols-outlined text-[140px]">campaign</span>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <span className="font-label-md text-label-md uppercase tracking-wider opacity-80">Today</span>
              <h4 className="font-headline-xl text-headline-xl font-extrabold">Class 5-B</h4>
              <p className="font-body-md text-body-md mt-1">Morning Assembly Duty</p>
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium">
              <span className="material-symbols-outlined text-base">schedule</span>
              08:00 AM - Main Courtyard
            </div>
          </div>

          {/* Upcoming Week Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/50 hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center text-center gap-2 shadow-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Tue</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">5-C</span>
            </div>
            <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/50 hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center text-center gap-2 shadow-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Wed</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">6-A</span>
            </div>
            <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/50 hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center text-center gap-2 shadow-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Thu</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">6-B</span>
            </div>
            <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/50 hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center text-center gap-2 shadow-xs">
              <span className="font-label-md text-label-md text-on-surface-variant">Fri</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">6-C</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-outline-variant/30" />

      {/* Section: Recent Announcements */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">push_pin</span>
            Recent Announcements
          </h3>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notices..."
                value={noticeSearch}
                onChange={(e) => setNoticeSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl text-sm focus:outline-none focus:border-tertiary-fixed-dim w-48 sm:w-64"
              />
              <span className="material-symbols-outlined text-on-surface-variant absolute left-2.5 top-2 text-lg">
                search
              </span>
            </div>

            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="flex flex-col gap-4">
          {filteredNotices.length === 0 ? (
            <div className="p-8 text-center bg-surface-container-lowest rounded-xl text-on-surface-variant">
              No notices match your filter.
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveModal({ type: 'notice', data: notice })}
                className={`bg-surface-container-lowest rounded-xl p-5 border shadow-sm hover:shadow-md transition-all flex gap-4 items-start cursor-pointer ${
                  notice.isHighPriority
                    ? 'border-l-4 border-l-error border-y-outline-variant/30 border-r-outline-variant/30'
                    : 'border-outline-variant/50'
                }`}
              >
                <div
                  className={`rounded-full p-2.5 flex-shrink-0 mt-0.5 ${
                    notice.isHighPriority
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-tertiary-fixed text-on-tertiary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {notice.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed text-xl">
                      {notice.title}
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant flex-shrink-0 whitespace-nowrap">
                      {notice.date}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">
                    {notice.content}
                  </p>
                  {notice.hasActionButton && (
                    <div className="mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModal({ type: 'notice', data: notice });
                        }}
                        className="inline-flex items-center gap-2 bg-surface-container-low hover:bg-surface-container-high text-primary font-label-md text-label-md px-4 py-2 rounded-lg transition-colors border border-outline-variant/50 cursor-pointer"
                      >
                        {notice.actionText}
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
