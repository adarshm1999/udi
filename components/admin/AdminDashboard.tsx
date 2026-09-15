'use client';

import { motion } from 'framer-motion';
import { useContentStore, useSettingsStore } from '@/lib/store';
import Link from 'next/link';

export function AdminDashboard() {
  const memories = useContentStore((state) => state.memories);
  const reasons = useContentStore((state) => state.reasons);
  const letters = useContentStore((state) => state.letters);
  const tracks = useContentStore((state) => state.tracks);
  const guestbookEntries = useContentStore((state) => state.guestbookEntries);
  const coupleNames = useSettingsStore((state) => state.coupleNames);

  const stats = [
    { icon: '📸', label: 'Memories', value: memories.length || 0 },
    { icon: '💝', label: 'Reasons', value: reasons.length || 0 },
    { icon: '💌', label: 'Letters', value: letters.length || 0 },
    { icon: '🎵', label: 'Songs', value: tracks.length || 0 },
    { icon: '💬', label: 'Messages', value: guestbookEntries.length || 0 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Panel</h1>
        <p className="text-lg opacity-90">
          Managing content for {coupleNames.name1} & {coupleNames.name2}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-4xl mb-3">{stat.icon}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { emoji: '📝', title: 'Edit Content', desc: 'Manage memories and stories', tab: 'content' },
            { emoji: '🎨', title: 'Customize Theme', desc: 'Change colors and appearance', tab: 'theme' },
            { emoji: '🏠', title: 'View Website', desc: 'See your live page', link: '/' },
            { emoji: '⚙️', title: 'Settings', desc: 'Manage preferences', tab: 'theme' },
          ].map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              {action.link ? (
                <Link href={action.link}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{action.emoji}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.desc}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{action.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.desc}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Help & Documentation</h2>
        <div className="space-y-3 text-gray-700">
          <p>✨ Use the Content tab to add and manage memories, reasons, and messages.</p>
          <p>🎨 Customize the look and feel with the Theme tab to match your style.</p>
          <p>📊 All your content is saved automatically in the state store.</p>
          <p>🔒 This admin panel is protected by a password to keep your content safe.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
