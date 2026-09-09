import React, { useState } from 'react';
import { useApi, apiRequest } from '../hooks/useApi';

export default function GalleryAdmin() {
  const { data, loading, error: apiError, refetch } = useApi('/gallery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = ['contest', 'workshop', 'culture'];

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData(item || {
      title: '', type: '', category: 'contest',
      image: '', span: '', isHomepage: false, order: 0
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
        await apiRequest(`/gallery/${id}`, 'PUT', formData);
      } else {
        await apiRequest('/gallery', 'POST', formData);
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
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await apiRequest(`/gallery/${id}`, 'DELETE');
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
          <span className="material-symbols-outlined text-primary">photo_library</span>
          Gallery Management
        </h1>
        <button onClick={() => openModal()} className="bg-primary text-surface font-code-display px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-primary-container">
          <span className="material-symbols-outlined">add</span> Add Photo
        </button>
      </div>

      {apiError && (
        <div className="glass-panel p-4 border-l-4 border-error text-error font-code-display text-sm flex justify-between items-center">
          <span>Failed to load gallery: {apiError}</span>
          <button onClick={() => refetch()} className="underline text-primary hover:opacity-80">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center font-code-display text-on-surface-variant py-8">Loading...</div>
        ) : !data || data.length === 0 ? (
          <div className="col-span-full text-center font-code-display text-on-surface-variant py-8 glass-panel">No photos found</div>
        ) : (
          data.map(item => {
            const id = item._id || item.id;
            return (
              <div key={id} className="glass-panel overflow-hidden group relative aspect-video flex flex-col">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(item)} className="p-2 bg-surface text-blue-400 rounded-full hover:bg-white/10"><span className="material-symbols-outlined text-sm">edit</span></button>
                    <button onClick={() => handleDelete(id)} className="p-2 bg-surface text-error rounded-full hover:bg-white/10"><span className="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">{item.category}</span>
                      {item.isHomepage && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Home</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="font-code-display text-xl text-primary font-bold">
                {editingItem ? 'Edit Photo' : 'Add Photo'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-error/10 border border-error/20 text-error p-3 rounded font-code-display text-sm">
                  {error}
                </div>
              )}

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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Badge/Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flagship Contest"
                    value={formData.type || ''}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Category</label>
                  <select
                    value={formData.category || 'contest'}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-surface">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-code-display text-xs text-primary">Grid Span</label>
                  <select
                    value={formData.span || ''}
                    onChange={e => setFormData({ ...formData, span: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="" className="bg-surface">Normal (1x1)</option>
                    <option value="row-span-2" className="bg-surface">Tall (row-span-2)</option>
                  </select>
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

              <div className="py-2">
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
