'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContentStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';

const defaultLetters = [
  {
    id: '1',
    condition: 'When you need motivation',
    message: 'You are stronger than you believe. Every challenge is an opportunity to shine. I believe in you more than you believe in yourself.',
    opened: false,
    emoji: '💪',
  },
  {
    id: '2',
    condition: 'When you are sad',
    message: 'Your smile is my favorite view. Remember all the beautiful moments we shared. Better days are coming, and I\'ll be right here with you.',
    opened: false,
    emoji: '🌈',
  },
  {
    id: '3',
    condition: 'When you miss me',
    message: 'Distance means nothing when two hearts are connected. Every moment apart makes our reunion sweeter. I miss you too, always.',
    opened: false,
    emoji: '🫂',
  },
  {
    id: '4',
    condition: 'On your birthday',
    message: 'Happy birthday to the love of my life! Thank you for being you. Here\'s to another year of adventures, laughter, and endless love.',
    opened: false,
    emoji: '🎂',
  },
];

export function OpenWhen() {
  const letters = useContentStore((state) => state.letters) || [];
  const openLetter = useContentStore((state) => state.openLetter);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const displayLetters = letters.length > 0 ? letters : defaultLetters;

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
      id="open-when"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-rose-50 to-white py-20 px-6"
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
            <p className="text-rose-600 font-semibold mb-2">Letters for the Heart</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Open <span className="text-rose-500">When...</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Special letters to open in moments when you need them most
            </p>
          </motion.div>

          {/* Letters Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence>
              {displayLetters.map((letter) => (
                <motion.div
                  key={letter.id}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.button
                    onClick={() => {
                      setSelectedLetter(letter.id);
                      if (!letter.opened) {
                        openLetter(letter.id);
                      }
                    }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left"
                  >
                    <div
                      className={`relative h-48 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all overflow-hidden ${
                        letter.opened
                          ? 'bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-300'
                          : 'bg-white border-2 border-rose-200 hover:shadow-lg hover:border-rose-400'
                      }`}
                    >
                      {/* Closed envelope animation */}
                      {!letter.opened && (
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-4"
                        >
                          💌
                        </motion.div>
                      )}

                      {/* Open letter indicator */}
                      {letter.opened && (
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 1 }}
                          className="text-5xl mb-4"
                        >
                          💕
                        </motion.div>
                      )}

                      <p className="font-semibold text-gray-900 text-lg">{letter.condition}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {letter.opened ? 'Opened' : 'Sealed'}
                      </p>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Letter Detail Modal */}
          <AnimatePresence>
            {selectedLetter && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLetter(null)}
                className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 border-2 border-rose-200"
                >
                  {(() => {
                    const letter = displayLetters.find((l) => l.id === selectedLetter);
                    return letter ? (
                      <div className="text-center">
                        <p className="text-6xl mb-4">{letter.emoji}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                          {letter.condition}
                        </h3>
                        <div className="bg-rose-50 rounded-xl p-8 mb-8 border border-rose-200">
                          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                            {letter.message}
                          </p>
                        </div>
                        <motion.button
                          onClick={() => setSelectedLetter(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors"
                        >
                          Close Letter
                        </motion.button>
                      </div>
                    ) : null;
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add letter button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
          >
            <button className="px-6 py-3 rounded-full border-2 border-rose-400 text-rose-600 font-semibold hover:bg-rose-50 transition-colors">
              + Create a Letter
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
