'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContentStore, useSettingsStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';

export function ContentEditor() {
  const [activeTab, setActiveTab] = useState<'reasons' | 'memories'>('reasons');
  const [formData, setFormData] = useState({ title: '', description: '' });

  const reasons = useContentStore((state) => state.reasons);
  const addReason = useContentStore((state) => state.addReason);
  const deleteReason = useContentStore((state) => state.deleteReason);

  const coupleNames = useSettingsStore((state) => state.coupleNames);
  const setCoupleNames = useSettingsStore((state) => state.setCoupleNames);

  const [coupleNamesForm, setCoupleNamesForm] = useState(coupleNames);

  const handleAddReason = () => {
    if (formData.title.trim()) {
      addReason({
        id: generateId(),
        text: formData.title,
        emoji: '💕',
      });
      setFormData({ title: '', description: '' });
    }
  };

  const handleCoupleNames = () => {
    setCoupleNames(coupleNamesForm);
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Couple Names */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Couple Names</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            value={coupleNamesForm.name1}
            onChange={(e) =>
              setCoupleNamesForm({ ...coupleNamesForm, name1: e.target.value })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            placeholder="Second name"
            value={coupleNamesForm.name2}
            onChange={(e) =>
              setCoupleNamesForm({ ...coupleNamesForm, name2: e.target.value })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <motion.button
          onClick={handleCoupleNames}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
        >
          Save Names
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['reasons', 'memories'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab as 'reasons' | 'memories')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab === 'reasons' ? '💝 Reasons' : '📸 Memories'}
          </motion.button>
        ))}
      </div>

      {/* Content Editor */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        {activeTab === 'reasons' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add a Reason</h3>
              <div className="space-y-4">
                <textarea
                  placeholder="Why do you love them?"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
                <motion.button
                  onClick={handleAddReason}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
                >
                  Add Reason
                </motion.button>
              </div>
            </div>

            {/* Reasons List */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Reasons ({reasons.length})
              </h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {reasons.map((reason) => (
                    <motion.div
                      key={reason.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-pink-50 rounded-lg p-4 flex items-start justify-between border border-pink-200"
                    >
                      <div className="flex-1">
                        <p className="text-gray-700">{reason.text}</p>
                      </div>
                      <motion.button
                        onClick={() => deleteReason(reason.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                      >
                        ✕
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {reasons.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No reasons added yet. Start by adding your first one!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memories' && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">🖼️</p>
            <p className="text-gray-600 mb-4">
              Memory and photo management coming soon!
            </p>
            <p className="text-sm text-gray-500">
              This feature will allow you to upload and manage photos from your memories.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
