import React, { useState } from 'react';
import { useApi, apiRequest } from '../hooks/useApi';

export default function StatsAdmin() {
  const { data, loading, error: apiError, refetch } = useApi('/stats');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (stat) => {
    setEditingId(stat._id || stat.id);
    setEditForm(stat);
  };

  const handleSave = async (id) => {
    try {
      if (id === 'new') {
        await apiRequest('/stats', 'POST', editForm);
        setIsAdding(false);
      } else {
        await apiRequest(`/stats/${id}`, 'PUT', editForm);
      }
      setEditingId(null);
      refetch();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await apiRequest(`/stats/${id}`, 'DELETE');
        refetch();
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center glass-panel p-4">
        <h1 className="font-code-display text-2xl font-bold flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-primary">analytics</span>
          Stats Management
        </h1>
        <button 
          onClick={() => { setIsAdding(true); setEditingId('new'); setEditForm({ value: '', label: '', order: 0 }); }} 
          disabled={isAdding}
          className="bg-primary text-surface font-code-display px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-primary-container disabled:opacity-50"
        >
          <span className="material-symbols-outlined">add</span> Add Stat
        </button>
      </div>

      {apiError && (
        <div className="glass-panel p-4 border-l-4 border-error text-error font-code-display text-sm flex justify-between items-center">
          <span>Failed to load stats: {apiError}</span>
          <button onClick={() => refetch()} className="underline text-primary hover:opacity-80">Retry</button>
        </div>
      )}

      <div className="space-y-4">
        {loading && <div className="text-center font-code-display text-on-surface-variant py-4">Loading...</div>}
        
        {isAdding && (
          <div className="glass-panel p-4 border border-primary/50 flex gap-4 items-center">
            <input 
              type="text" 
              placeholder="Value (e.g. 50+)"
              className="w-1/3 bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-code-display text-2xl font-bold" 
              value={editForm.value || ''} 
              onChange={e => setEditForm({...editForm, value: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Label (e.g. Events)"
              className="flex-1 bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-code-display" 
              value={editForm.label || ''} 
              onChange={e => setEditForm({...editForm, label: e.target.value})} 
            />
            <div className="flex gap-2">
              <button onClick={() => handleSave('new')} className="p-2 bg-primary/20 text-primary hover:bg-primary hover:text-surface rounded transition-colors"><span className="material-symbols-outlined">save</span></button>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 text-on-surface-variant hover:bg-white/10 rounded transition-colors"><span className="material-symbols-outlined">close</span></button>
            </div>
          </div>
        )}

        {data?.map(stat => {
          const id = stat._id || stat.id;
          return (
            <div key={id} className="glass-panel p-4 flex gap-4 items-center">
              {editingId === id ? (
                <>
                  <input type="text" className="w-1/3 bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-code-display text-2xl font-bold" value={editForm.value} onChange={e => setEditForm({...editForm, value: e.target.value})} />
                  <input type="text" className="flex-1 bg-surface-container-high border border-white/10 rounded p-2 text-on-surface font-code-display" value={editForm.label} onChange={e => setEditForm({...editForm, label: e.target.value})} />
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(id)} className="p-2 bg-primary/20 text-primary hover:bg-primary hover:text-surface rounded"><span className="material-symbols-outlined">save</span></button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-on-surface-variant hover:bg-white/10 rounded"><span className="material-symbols-outlined">close</span></button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-1/3 font-code-display text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="flex-1 font-code-display text-lg text-on-surface">{stat.label}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(stat)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"><span className="material-symbols-outlined">edit</span></button>
                    <button onClick={() => handleDelete(id)} className="p-2 text-error hover:bg-error/10 rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
