import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel relative overflow-hidden">
        {/* Terminal Header */}
        <div className="border-b border-white/10 bg-white/5 p-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-error" />
          <div className="w-3 h-3 rounded-full bg-primary-container" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="font-code-display text-xs text-on-surface-variant ml-2">admin_login.sh</span>
        </div>
        
        {/* Form Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="font-code-display text-2xl text-on-surface mb-2 font-bold flex items-center gap-2">
              <span className="text-primary">&gt;</span> DCODE Admin
            </h1>
            <p className="font-code-display text-sm text-on-surface-variant">Enter your credentials to access the system.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error/10 border border-error/20 text-error p-3 rounded font-code-display text-sm">
                Error: {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block font-code-display text-sm text-primary">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none transition-colors"
                placeholder="admin@dcode.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block font-code-display text-sm text-primary">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-high border border-white/10 rounded p-3 text-on-surface font-code-display focus:border-primary focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-surface font-code-display font-bold py-3 px-4 rounded hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'AUTHENTICATING...'
              ) : (
                <>
                  LOGIN <span className="material-symbols-outlined text-sm">login</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
