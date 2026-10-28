import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';

export default function Header() {
  const { 
    unreadCount, 
    setIsNotificationsOpen, 
    isDarkMode, 
    toggleDarkMode, 
    student 
  } = usePortal();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Timetable', path: '/timetable', icon: 'calendar_month' },
    { label: 'Subjects', path: '/subjects', icon: 'book' },
    { label: 'Notices', path: '/notices', icon: 'campaign' },
    { label: 'Profile', path: '/profile', icon: 'person' },
  ];

  return (
    <header className="bg-surface dark:bg-on-background text-primary dark:text-primary-fixed-dim font-headline-md text-headline-md w-full sticky top-0 z-40 shadow-sm flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 transition-colors border-b border-outline-variant/30">
      {/* Brand / Logo */}
      <NavLink to="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-primary/5 dark:bg-white/10 p-2 rounded-xl group-hover:scale-105 transition-transform flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px] text-primary dark:text-primary-fixed-dim">
            school
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim leading-none">
            S.S. Memorial
          </span>
          <span className="text-[10px] text-on-surface-variant font-medium tracking-wider uppercase">
            Public School Portal
          </span>
        </div>
      </NavLink>

      {/* Desktop Nav Items */}
      <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/50 dark:bg-surface-container-high/40 p-1.5 rounded-full border border-outline-variant/30">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-label-md font-label-md transition-all duration-200 ${
                isActive
                  ? 'bg-surface-container-lowest dark:bg-primary-container text-primary dark:text-primary-fixed shadow-sm font-semibold'
                  : 'text-on-surface-variant dark:text-surface-variant hover:text-primary hover:bg-surface-container-high/50'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isActive ? 'fill' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Action Cluster */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-full text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          aria-label="Notifications"
          className="relative p-2.5 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">
            notifications
          </span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Avatar Quick View */}
        <NavLink
          to="/profile"
          className="hidden sm:flex items-center gap-2 pl-2 border-l border-outline-variant/40 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-secondary-container dark:bg-secondary-fixed-dim text-on-secondary-container font-bold text-xs flex items-center justify-center ring-2 ring-surface">
            {student.firstName[0]}
          </div>
        </NavLink>
      </div>
    </header>
  );
}
