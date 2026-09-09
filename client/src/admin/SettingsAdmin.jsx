import React, { useState, useEffect } from 'react';
import { useApi, apiRequest } from '../hooks/useApi';

export default function SettingsAdmin() {
  const { data, loading, error: apiError, refetch } = useApi('/settings');
  const [formData, setFormData] = useState({
    footerAttribution: '',
    contactEmail: '',
    heroTagline: '',
    heroDescription: '',
    instagram: '',
    linkedin: '',
    github: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (data) {
      setFormData({
        footerAttribution: data.footerAttribution || '',
        contactEmail: data.contactEmail || '',
        heroTagline: data.heroTagline || '',
        heroDescription: data.heroDescription || '',
        instagram: data.socialLinks?.instagram || '',
        linkedin: data.socialLinks?.linkedin || '',
        github: data.socialLinks?.github || ''
      });
    }
  }, [data]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const payload = {
      footerAttribution: formData.footerAttribution,
      contactEmail: formData.contactEmail,
      heroTagline: formData.heroTagline,
      heroDescription: formData.heroDescription,
      socialLinks: {
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        github: formData.github
      }
    };
    
    try {
      await apiRequest('/settings', 'PUT', payload);
      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      refetch();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update settings' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-4">
        <h1 className="font-code-display text-2xl font-bold flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-primary">settings</span>
          Global Settings
        </h1>
      </div>

      {apiError && (
        <div className="glass-panel p-4 border-l-4 border-error text-error font-code-display text-sm flex justify-between items-center">
          <span>Failed to load settings: {apiError}</span>
          <button onClick={() => refetch()} className="underline text-primary hover:opacity-80">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="text-center font-code-display text-on-surface-variant py-8">Loading settings...</div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-6">
          {message.text && (
            <div className={`p-4 rounded font-code-display text-sm ${message.type === 'error' ? 'bg-error/10 text-error border border-error/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            <h2 className="font-code-display text-xl text-primary border-b border-white/10 pb-2">Hero Section</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-on-surface-variant font-code-display text-sm">Hero Tagline</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                  value={formData.heroTagline} 
                  onChange={e => handleChange('heroTagline', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-on-surface-variant font-code-display text-sm">Hero Description</label>
                <textarea 
                  rows="3" 
                  className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                  value={formData.heroDescription} 
                  onChange={e => handleChange('heroDescription', e.target.value)}
                ></textarea>
              </div>
            </div>

            <h2 className="font-code-display text-xl text-primary border-b border-white/10 pb-2 pt-4">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-on-surface-variant font-code-display text-sm">Instagram URL</label>
                <input 
                  type="url" 
                  className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                  value={formData.instagram} 
                  onChange={e => handleChange('instagram', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-on-surface-variant font-code-display text-sm">LinkedIn URL</label>
                <input 
                  type="url" 
                  className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                  value={formData.linkedin} 
                  onChange={e => handleChange('linkedin', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-on-surface-variant font-code-display text-sm">GitHub URL</label>
                <input 
                  type="url" 
                  className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                  value={formData.github} 
                  onChange={e => handleChange('github', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-on-surface-variant font-code-display text-sm">Contact Email</label>
                <input 
                  type="email" 
                  className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                  value={formData.contactEmail} 
                  onChange={e => handleChange('contactEmail', e.target.value)} 
                />
              </div>
            </div>

            <h2 className="font-code-display text-xl text-primary border-b border-white/10 pb-2 pt-4">Footer</h2>
            <div className="space-y-2">
              <label className="text-on-surface-variant font-code-display text-sm">Footer Attribution</label>
              <input 
                type="text" 
                className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none" 
                value={formData.footerAttribution} 
                onChange={e => handleChange('footerAttribution', e.target.value)} 
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="px-6 py-3 font-code-display rounded bg-primary text-surface font-bold hover:bg-primary-container disabled:opacity-50 flex items-center gap-2 transition-colors cursor-pointer"
            >
              {isSubmitting ? 'SAVING...' : <><span className="material-symbols-outlined">save</span> SAVE SETTINGS</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
