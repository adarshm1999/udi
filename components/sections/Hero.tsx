'use client';

import { motion } from 'framer-motion';
import { useSettingsStore } from '@/lib/store';

export function Hero() {
  const coupleNames = useSettingsStore((state) => state.coupleNames);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 pt-32"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-pink-200 blur-3xl"
      />
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-rose-200 blur-3xl"
      />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center"
      >
        {/* Sparkle emoji */}
        <motion.div
          variants={itemVariants}
          className="mb-6 text-6xl"
        >
          ✨
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-5xl font-bold text-gray-900 md:text-7xl"
        >
          Our{' '}
          <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Connection
          </span>
        </motion.h1>

        {/* Couple names and date */}
        <motion.p
          variants={itemVariants}
          className="mb-2 text-2xl text-gray-600 md:text-3xl"
        >
          <span className="font-semibold text-pink-600">{coupleNames.name1}</span>
          {' & '}
          <span className="font-semibold text-rose-600">{coupleNames.name2}</span>
        </motion.p>

        {/* Timeline info */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-lg text-gray-500"
        >
          Since <span className="font-semibold text-pink-500">Sept 02, 2026</span>
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 leading-relaxed"
        >
          A collection of conversations, moments, and memories. 
          From our first chat to all the things we share—this is our journey together.
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore Our Chats
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-pink-400 px-8 py-3 font-semibold text-pink-600 hover:bg-pink-50 transition-colors"
          >
            View Memories
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <p className="mb-2 text-sm text-gray-600">Scroll to explore</p>
          <p className="text-2xl text-pink-500">↓</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
