'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContentStore } from '@/lib/store';
import { generateId } from '@/lib/helpers';

const defaultSecrets = [
  {
    id: '1',
    title: 'The Real Reason I Love You',
    content: 'It\'s not just one thing. It\'s the way you make me laugh, the way you hold my hand, the way you believe in me even when I don\'t believe in myself. It\'s everything about you.',
    isRevealed: false,
  },
  {
    id: '2',
    title: 'My Favorite Memory With You',
    content: 'That night under the stars when we talked until sunrise. You were so genuine, so present, so YOU. That\'s when I knew this was forever.',
    isRevealed: false,
  },
];

export function Secrets() {
  const secrets = useContentStore((state) => state.secrets) || [];
  const revealSecret = useContentStore((state) => state.revealSecret);
  const displaySecrets = secrets.length > 0 ? secrets : defaultSecrets;

  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleReveal = (id: string) => {
    revealSecret(id);
    setRevealedIds([...revealedIds, id]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="secret"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-red-50 to-white py-20 px-6"
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
            <p className="text-red-600 font-semibold mb-2">Whispers of the Heart</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              My <span className="text-red-500">Secrets</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Things I want you to know, things only you can understand
            </p>
          </motion.div>

          {/* Secrets Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence>
              {displaySecrets.map((secret) => {
                const isRevealed = revealedIds.includes(secret.id) || secret.isRevealed;

                return (
                  <motion.div
                    key={secret.id}
                    variants={itemVariants}
                    layout
                  >
                    <AnimatePresence mode="wait">
                      {!isRevealed ? (
                        <motion.button
                          key="locked"
                          initial={{ opacity: 0, rotateY: 180 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: -180 }}
                          onClick={() => handleReveal(secret.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full h-64 rounded-2xl bg-gradient-to-br from-red-400 to-pink-500 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-4"
                          >
                            🔒
                          </motion.div>
                          <p className="text-xl font-bold">Reveal Secret</p>
                          <p className="text-sm mt-2 opacity-90">Click to uncover</p>
                        </motion.button>
                      ) : (
                        <motion.div
                          key="unlocked"
                          initial={{ opacity: 0, rotateY: 180 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: -180 }}
                          className="h-64 rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 p-6 flex flex-col items-center justify-center text-center border-2 border-red-300 overflow-y-auto"
                        >
                          <p className="text-4xl mb-3">🔓</p>
                          <h3 className="font-bold text-gray-900 mb-3">
                            {secret.title}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {secret.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-8 text-center border-2 border-red-200"
          >
            <p className="text-4xl font-bold text-red-600 mb-2">
              {displaySecrets.length}
            </p>
            <p className="text-gray-700 font-semibold">Secrets shared from the heart</p>
          </motion.div>

          {/* Info box */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-50 rounded-xl p-6 border border-blue-200"
          >
            <p className="text-gray-700 leading-relaxed text-center">
              These secrets are meant only for the one I love most. They hold the truest 
              parts of my heart, waiting for you to discover them.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
