import React from 'react';
import { usePortal } from '../context/PortalContext';

export default function NotificationModal() {
  const {
    notices,
    isNotificationsOpen,
    setIsNotificationsOpen,
    markNoticeRead,
    markAllNoticesRead,
    setActiveModal
  } = usePortal();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest dark:bg-on-background border border-outline-variant/50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 md:p-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <div className="bg-primary-fixed dark:bg-primary-container p-2 rounded-xl text-on-primary-fixed dark:text-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">notifications</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-surface-bright">
                Notifications
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Stay updated with your daily alerts
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-2 bg-surface-container-lowest border-b border-outline-variant/20 flex justify-between items-center text-xs">
          <span className="text-on-surface-variant font-medium">
            {notices.filter((n) => !n.read).length} unread messages
          </span>
          <button
            onClick={markAllNoticesRead}
            className="text-on-tertiary-container dark:text-tertiary-fixed font-semibold hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-grow">
          {notices.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
              <p>No notifications available right now.</p>
            </div>
          ) : (
            notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => {
                  markNoticeRead(notice.id);
                  setIsNotificationsOpen(false);
                  setActiveModal({ type: 'notice', data: notice });
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-start ${
                  notice.read
                    ? 'bg-surface-container-lowest border-outline-variant/30 opacity-75 hover:opacity-100'
                    : 'bg-secondary-fixed/20 border-secondary-fixed text-on-surface shadow-xs hover:border-secondary'
                }`}
              >
                <div
                  className={`p-2.5 rounded-full flex-shrink-0 mt-0.5 ${
                    notice.isHighPriority
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-tertiary-fixed text-on-tertiary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {notice.icon}
                  </span>
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">
                      {notice.title}
                    </h4>
                    <span className="text-[11px] text-on-surface-variant whitespace-nowrap">
                      {notice.date}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {notice.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low/30 text-center">
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
