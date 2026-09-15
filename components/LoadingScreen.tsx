'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '@/lib/constants';

export function LoadingScreen({ isVisible }: { isVisible: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50"
    >
      {/* Heart animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="mb-8 text-6xl"
      >
        ❤️
      </motion.div>

      {/* Loading bar */}
      <div className="mb-12 h-1 w-32 overflow-hidden rounded-full bg-pink-100">
        <motion.div
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="h-full w-1/3 bg-gradient-to-r from-pink-400 to-pink-600"
        />
      </div>

      {/* Loading message */}
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center text-lg font-medium text-gray-600"
      >
        {LOADING_MESSAGES[messageIndex]}
      </motion.p>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-2xl"
          style={{
            left: `${20 + i * 30}%`,
            top: '30%',
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
}
