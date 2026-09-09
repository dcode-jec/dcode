import React, { useState } from 'react';
import { useApi, apiRequest } from '../hooks/useApi';

export default function TeamAdmin() {
  const { data, loading, error: apiError, refetch } = useApi('/team');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const categories = ['faculty', 'founder', 'leads', 'management', 'pr', 'technical', 'design'];

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData(item ? {
      ...item,
      instagram: item.socials?.instagram || '',
      linkedin: item.socials?.linkedin || '',
      email: item.socials?.email || ''
    } : {
      name: '', role: '', category: 'technical', session: '25-26', 
      description: '', image: '', instagram: '', linkedin: '', 
      email: '', order: 0, isCoreTeam: false
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const form = new FormData();
      form.append('image', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        body: form
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const resData = await res.json();
      setFormData(prev => ({ ...prev, image: resData.url }));
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const payload = {
      ...formData,
      socials: {
        instagram: formData.instagram || '',
        linkedin: formData.linkedin || '',
        email: formData.email || ''
      }
    };
    
    try {
      const id = editingItem?._id || editingItem?.id;
      if (id) {
        await apiRequest(`/team/${id}`, 'PUT', payload);
      } else {
        await apiRequest('/team', 'POST', payload);
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await apiRequest(`/team/${id}`, 'DELETE');
        refetch();
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center glass-panel p-4">
        <h1 className="font-code-display text-2xl font-bold flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-primary">groups</span>
          Team Management
        </h1>
        <button 
          onClick={() => openModal()}
          className="bg-primary text-surface font-code-display px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined">add</span> Add Member
        </button>
      </div>

      {apiError && (
        <div className="glass-panel p-4 border-l-4 border-error text-error font-code-display text-sm flex justify-between items-center">
          <span>Failed to load team: {apiError}</span>
          <button onClick={() => refetch()} className="underline text-primary hover:opacity-80">Retry</button>
        </div>
      )}

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-code-display text-sm text-primary">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Category</th>
                <th className="p-4">Session</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center font-code-display text-on-surface-variant">Loading...</td></tr>
              ) : !data || data.length === 0 ? (
                <tr><td colSpan="6" className="p-4 text-center font-code-display text-on-surface-variant">No team members found</td></tr>
              ) : (
                data.map(item => {
                  const id = item._id || item.id;
                  return (
                    <tr key={id} className="border-b border-white/5 hover:bg-white/5 transition-colors font-body-sm text-on-surface">
                      <td className="p-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant">person</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold">{item.name}</td>
                      <td className="p-4 text-on-surface-variant">{item.role}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-code-display">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 font-code-display">{item.session}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openModal(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleDelete(id)} className="p-2 text-error hover:bg-error/10 rounded transition-colors" title="Delete">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="font-code-display text-xl text-primary font-bold">
                {editingItem ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {error && (
                <div className="bg-error/10 border border-error/20 text-error p-3 rounded font-code-display text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Category</label>
                  <select
                    value={formData.category || 'technical'}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-surface">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Session (e.g. 25-26, permanent)</label>
                  <input
                    type="text"
                    required
                    value={formData.session || ''}
                    onChange={e => setFormData({ ...formData, session: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Order</label>
                  <input
                    type="number"
                    value={formData.order ?? 0}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1 flex items-center pt-6 gap-2">
                  <input
                    type="checkbox"
                    id="isCoreTeam"
                    checked={!!formData.isCoreTeam}
                    onChange={e => setFormData({ ...formData, isCoreTeam: e.target.checked })}
                    className="accent-primary w-4 h-4"
                  />
                  <label htmlFor="isCoreTeam" className="font-code-display text-xs text-on-surface cursor-pointer">
                    Show in Core Team on Homepage
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-code-display text-xs text-primary">Image</label>
                <div className="flex gap-4 items-center">
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs font-code-display text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-code-display file:bg-white/10 file:text-on-surface hover:file:bg-white/20"
                  />
                </div>
              </div>

              {(formData.category === 'faculty' || formData.category === 'founder') && (
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Description</label>
                  <textarea
                    rows="3"
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-on-surface-variant">Instagram URL</label>
                  <input
                    type="text"
                    value={formData.instagram || ''}
                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-on-surface-variant">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin || ''}
                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-on-surface-variant">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded font-code-display text-sm text-on-surface-variant hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-surface font-code-display font-bold px-6 py-2 rounded hover:bg-primary-container disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
