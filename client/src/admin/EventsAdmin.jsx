import React, { useState } from 'react';
import { useApi, apiRequest } from '../hooks/useApi';

export default function EventsAdmin() {
  const { data, loading, error: apiError, refetch } = useApi('/events');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const types = ['FLAGSHIP', 'COMPETITION', 'HACKATHON', 'WORKSHOP', 'ORIENTATION', 'SOCIAL'];
  const categories = ['Contests', 'Workshops', 'Culture'];

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData(item || {
      title: '', type: 'FLAGSHIP', category: 'Contests',
      date: '', location: '', description: '', image: '',
      isMain: false, isHomepage: false, order: 0
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
    try {
      const id = editingItem?._id || editingItem?.id;
      if (id) {
        await apiRequest(`/events/${id}`, 'PUT', formData);
      } else {
        await apiRequest('/events', 'POST', formData);
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
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await apiRequest(`/events/${id}`, 'DELETE');
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
          <span className="material-symbols-outlined text-primary">event</span>
          Events Management
        </h1>
        <button 
          onClick={() => openModal()}
          className="bg-primary text-surface font-code-display px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-primary-container"
        >
          <span className="material-symbols-outlined">add</span> Add Event
        </button>
      </div>

      {apiError && (
        <div className="glass-panel p-4 border-l-4 border-error text-error font-code-display text-sm flex justify-between items-center">
          <span>Failed to load events: {apiError}</span>
          <button onClick={() => refetch()} className="underline text-primary hover:opacity-80">Retry</button>
        </div>
      )}

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-code-display text-sm text-primary">
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center font-code-display text-on-surface-variant">Loading...</td></tr>
              ) : !data || data.length === 0 ? (
                <tr><td colSpan="6" className="p-4 text-center font-code-display text-on-surface-variant">No events found</td></tr>
              ) : (
                data.map(item => {
                  const id = item._id || item.id;
                  return (
                    <tr key={id} className="border-b border-white/5 hover:bg-white/5 transition-colors font-body-sm text-on-surface">
                      <td className="p-4 font-bold flex items-center gap-3">
                        {item.image && <img src={item.image} className="w-8 h-8 rounded object-cover" alt="" />}
                        {item.title}
                      </td>
                      <td className="p-4"><span className="text-xs font-code-display text-primary bg-primary/10 px-2 py-1 rounded">{item.type}</span></td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4 font-code-display">{item.date}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {item.isMain && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Main</span>}
                          {item.isHomepage && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Home</span>}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => openModal(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded mr-1"><span className="material-symbols-outlined text-sm">edit</span></button>
                        <button onClick={() => handleDelete(id)} className="p-2 text-error hover:bg-error/10 rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
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
                {editingItem ? 'Edit Event' : 'Add New Event'}
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
                  <label className="block font-code-display text-xs text-primary">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Type</label>
                  <select
                    value={formData.type || 'FLAGSHIP'}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  >
                    {types.map(t => (
                      <option key={t} value={t} className="bg-surface">{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Category</label>
                  <select
                    value={formData.category || 'Contests'}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-surface">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Date / Month</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oct 2024"
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Location</label>
                  <input
                    type="text"
                    placeholder="Main Campus Hub"
                    value={formData.location || ''}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
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
              </div>

              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 font-code-display text-xs text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isMain}
                    onChange={e => setFormData({ ...formData, isMain: e.target.checked })}
                    className="accent-primary w-4 h-4"
                  />
                  Featured Main Event
                </label>

                <label className="flex items-center gap-2 font-code-display text-xs text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isHomepage}
                    onChange={e => setFormData({ ...formData, isHomepage: e.target.checked })}
                    className="accent-primary w-4 h-4"
                  />
                  Show on Homepage
                </label>
              </div>

              <div className="space-y-1">
                <label className="block font-code-display text-xs text-primary">Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-code-display text-xs text-primary">Image</label>
                <div className="flex gap-4 items-center">
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-16 h-10 rounded object-cover border border-white/10" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs font-code-display text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-code-display file:bg-white/10 file:text-on-surface hover:file:bg-white/20"
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
