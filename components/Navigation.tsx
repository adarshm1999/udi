'use client';

import { motion } from 'framer-motion';
import { SECTIONS } from '@/lib/constants';
import { useState } from 'react';

const navItems = [
  { label: 'Home', id: SECTIONS.HOME, icon: '🏠' },
  { label: 'Chats', id: 'chats', icon: '💬' },
  { label: 'Appreciate', id: SECTIONS.REASONS_JAR, icon: '✨' },
  { label: 'Voice Notes', id: 'voice', icon: '🎵' },
  { label: 'Timeline', id: SECTIONS.TIMELINE, icon: '📅' },
  { label: 'Gallery', id: SECTIONS.GALLERY, icon: '📸' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-3xl">✨</span>
          <span className="font-bold text-xl text-gray-900">Our Connection</span>
        </motion.div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleScroll(item.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              {item.icon} {item.label}
            </motion.button>
          ))}
        </div>

        {/* Admin button */}
        {/* <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-4 py-2 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
        >
          Admin
        </motion.button> */}

        {/* Mobile menu button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-pink-100 bg-white"
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button className="block w-full text-left px-4 py-2 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors">
              Admin
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
