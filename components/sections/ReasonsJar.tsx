'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContentStore } from '@/lib/store';
import { SAMPLE_REASONS } from '@/lib/constants';
import { generateId } from '@/lib/helpers';

export function ReasonsJar() {
  const reasons = useContentStore((state) => state.reasons) || [];
  const addReason = useContentStore((state) => state.addReason);
  const deleteReason = useContentStore((state) => state.deleteReason);

  const [newReason, setNewReason] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💕');
  const [showForm, setShowForm] = useState(false);

  const emojis = ['😊', '😄', '🌟', '💬', '🎵', '💭', '🤔', '✨', '🎯', '🔥'];

  const displayReasons = [
    ...SAMPLE_REASONS,
    ...reasons.filter(
      (reason) =>
        !SAMPLE_REASONS.some((sample) => sample.id === reason.id)
    ),
  ];

  const handleAddReason = () => {
    if (newReason.trim()) {
      addReason({
        id: generateId(),
        text: newReason,
        emoji: selectedEmoji,
      });
      setNewReason('');
      setSelectedEmoji('😊');
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
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="reasons-jar"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-amber-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-amber-600 font-semibold mb-2">Why I Enjoy Talking to You</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Things I <span className="text-amber-500">Appreciate</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A collection of little and big reasons why our conversations mean so much
            </p>
          </motion.div>

          {/* Add reason form */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold hover:shadow-lg transition-shadow"
            >
              + Add a Reason
            </button>
          </motion.div>

          {/* Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl p-8 border-2 border-amber-200 max-w-2xl mx-auto"
              >
                <div className="space-y-4">
                  <textarea
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    placeholder="Write something I appreciate about you..."
                    className="w-full h-24 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Choose emoji:</p>
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            selectedEmoji === emoji
                              ? 'bg-amber-200 scale-110'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddReason}
                      className="flex-1 px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
                    >
                      Add to Jar
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setNewReason('');
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

          {/* Reasons Grid - Jar style */}
          <motion.div
            variants={containerVariants}
            className="relative py-12 px-6 md:px-12 rounded-3xl bg-gradient-to-b from-amber-100 to-amber-50 border-4 border-amber-200 shadow-xl"
          >
            {/* Jar decoration */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-4 w-20 bg-amber-700 rounded-t-full opacity-60" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-3 w-12 bg-amber-800 rounded-t-full opacity-40" />

            {/* Reasons grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {displayReasons.map((reason, index) => (
                  <motion.div
                    key={reason.id}
                    variants={itemVariants}
                    layout
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ y: -5, rotate: 3 }}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-400 h-full"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-4xl">{reason.emoji}</p>
                        {reasons.length > 0 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => deleteReason(reason.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                          >
                            ✕
                          </motion.button>
                        )}
                      </div>
                      <p className="text-gray-700 mt-4 leading-relaxed">{reason.text}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Counter */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              <span className="text-amber-500">{displayReasons.length}</span> things
              {' '}I appreciate about you...
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
