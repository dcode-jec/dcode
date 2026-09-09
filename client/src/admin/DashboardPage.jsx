import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

export default function DashboardPage() {
  const { data: teamData, loading: teamLoading } = useApi('/team');
  const { data: eventsData, loading: eventsLoading } = useApi('/events');
  const { data: galleryData, loading: galleryLoading } = useApi('/gallery');

  const stats = [
    {
      title: 'Total Team Members',
      count: teamData?.length || 0,
      icon: 'groups',
      path: '/admin/team',
      loading: teamLoading,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Total Events',
      count: eventsData?.length || 0,
      icon: 'event',
      path: '/admin/events',
      loading: eventsLoading,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      title: 'Gallery Items',
      count: galleryData?.length || 0,
      icon: 'photo_library',
      path: '/admin/gallery',
      loading: galleryLoading,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="glass-panel p-6 border-l-4 border-primary">
        <h1 className="font-code-display text-2xl text-on-surface mb-2 font-bold">
          System Dashboard
        </h1>
        <p className="font-code-display text-sm text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">info</span>
          Welcome back, admin. System status: operational.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.path} className="glass-panel p-6 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                arrow_forward
              </span>
            </div>
            
            <h3 className="font-code-display text-on-surface-variant text-sm mb-1">{stat.title}</h3>
            <div className="font-code-display text-3xl font-bold text-on-surface">
              {stat.loading ? (
                <span className="text-on-surface-variant/50">--</span>
              ) : (
                stat.count
              )}
            </div>
          </Link>
        ))}
      </div>
      
      <div className="glass-panel p-6 mt-8">
        <h2 className="font-code-display text-xl mb-4 text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined">terminal</span> Terminal Output
        </h2>
        <div className="bg-surface-container-high p-4 rounded font-code-display text-sm text-green-400 font-mono space-y-1">
          <p>$ root@dcode-admin ~ # systemctl status dcode-web</p>
          <p>● dcode-web.service - DCODE Web Application</p>
          <p>   Loaded: loaded (/etc/systemd/system/dcode-web.service; enabled)</p>
          <p>   Active: active (running) since {new Date().toLocaleDateString()}</p>
          <p className="mt-4 animate-pulse">_</p>
        </div>
      </div>
    </div>
  );
}
