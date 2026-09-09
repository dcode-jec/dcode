import React, { useState } from 'react';
import { Outlet, Navigate, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { path: '/admin/team', label: 'Team', icon: 'groups' },
  { path: '/admin/events', label: 'Events', icon: 'event' },
  { path: '/admin/gallery', label: 'Gallery', icon: 'photo_library' },
  { path: '/admin/stats', label: 'Stats', icon: 'analytics' },
  { path: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export default function AdminLayout() {
  const { isAuthenticated, loading, logout, admin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-surface text-primary flex items-center justify-center font-code-display">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-body-sm text-on-surface">
      {/* Mobile Header */}
      <div className="md:hidden glass-panel border-b border-white/10 p-4 flex justify-between items-center z-20">
        <div className="font-code-display font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">terminal</span>
          DCODE Admin
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-on-surface hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-10 w-64 glass-panel border-r border-white/10 flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:w-64
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:block">
          <div className="font-code-display font-bold text-xl text-primary flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-2xl">terminal</span>
            DCODE Admin
          </div>
          <div className="font-code-display text-xs text-on-surface-variant flex items-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Online
          </div>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg font-code-display transition-colors
                ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'}
              `}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <div className="font-code-display text-xs text-on-surface-variant mb-2 truncate">
            {admin?.email}
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-code-display text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Back to Site
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-code-display text-error hover:bg-error/10 transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
