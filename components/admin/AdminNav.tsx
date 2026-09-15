'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAdminStore } from '@/lib/store';

type Tab = 'dashboard' | 'content' | 'theme';

interface AdminNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function AdminNav({ activeTab, setActiveTab }: AdminNavProps) {
  const { setIsAuthenticated } = useAdminStore();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'theme', label: 'Customize', icon: '🎨' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl">❤️</span>
            <span className="font-bold text-xl text-gray-900">Admin Panel</span>
          </motion.div>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon} {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Logout button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Logout
        </motion.button>
      </div>
    </nav>
  );
}
