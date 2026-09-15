'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContentStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';

const defaultEntries = [
  {
    id: '1',
    name: 'Best Friend',
    message: 'You two are the cutest couple! Wishing you endless happiness together!',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    approved: true,
  },
  {
    id: '2',
    name: 'Family Member',
    message: 'So happy to see you both shine like this. Love you both!',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    approved: true,
  },
];

export function Guestbook() {
  const entries = useContentStore((state) => state.guestbookEntries) || [];
  const addGuestbookEntry = useContentStore((state) => state.addGuestbookEntry);

  const displayEntries = entries.length > 0 ? entries : defaultEntries;
  const approvedEntries = displayEntries.filter((e) => e.approved);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleSubmit = () => {
    if (formData.name.trim() && formData.message.trim()) {
      addGuestbookEntry({
        id: generateId(),
        name: formData.name,
        message: formData.message,
        createdAt: new Date().toISOString(),
        approved: false,
      });
      setFormData({ name: '', message: '' });
      setIsOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="guestbook"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-cyan-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-cyan-600 font-semibold mb-2">Messages of Love</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Guest <span className="text-cyan-500">Book</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Messages from friends and family celebrating our love
            </p>
          </motion.div>

          {/* Add message button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-semibold hover:shadow-lg transition-shadow"
            >
              + Leave a Message
            </button>
          </motion.div>

          {/* Form Modal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-8 border-2 border-cyan-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <textarea
                    placeholder="Your message of love and support"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full h-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                  />
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setFormData({ name: '', message: '' });
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Entries */}
          <motion.div
            variants={containerVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Messages</h3>
            <AnimatePresence>
              {approvedEntries.length > 0 ? (
                approvedEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    variants={itemVariants}
                    layout
                    className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{entry.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-2xl">✨</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{entry.message}</p>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-12"
                >
                  <p className="text-gray-500">No messages yet. Be the first to leave one!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-2xl font-bold text-gray-900">
              <span className="text-cyan-500">{approvedEntries.length}</span> messages of love
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
