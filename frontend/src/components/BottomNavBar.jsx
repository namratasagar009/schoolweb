import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function BottomNavBar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Timetable', path: '/timetable', icon: 'calendar_month' },
    { label: 'Subjects', path: '/subjects', icon: 'book' },
    { label: 'Notices', path: '/notices', icon: 'campaign' },
    { label: 'Profile', path: '/profile', icon: 'person' },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface dark:bg-on-background border-t border-outline-variant/30 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex justify-around items-center h-20 px-2 pb-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
          (item.path !== '/' && location.pathname.startsWith(item.path));

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
              isActive
                ? 'bg-secondary-container dark:bg-secondary-fixed-dim text-on-secondary-container dark:text-on-secondary-fixed-variant rounded-full px-4 py-1 font-bold'
                : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-dim rounded-2xl px-3 py-1'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] mb-0.5 ${
                isActive ? 'fill' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-label-md tracking-wide">
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
