'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminNav } from '@/components/admin/AdminNav';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { ThemeSettings } from '@/components/admin/ThemeSettings';
import { useAdminStore } from '@/lib/store';
import { ADMIN_PASSWORD } from '@/lib/constants';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'theme'>('dashboard');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAdminStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLoginForm(false);
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  if (showLoginForm && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-2 border-pink-200"
        >
          <div className="text-center mb-8">
            <p className="text-6xl mb-4">❤️</p>
            <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {loginError && (
                <p className="text-red-500 text-sm mt-2">{loginError}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Demo password: {ADMIN_PASSWORD}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pt-20 pb-12 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'content' && <ContentEditor />}
            {activeTab === 'theme' && <ThemeSettings />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
