'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/lib/store';

export function PasswordGate() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isPasswordProtected, setIsPasswordProtected } = useUIStore();

  const correctPassword = 'udiada';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === correctPassword) {
      setIsPasswordProtected(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password. Try again!');
      setPassword('');
    }
  };

  if (!isPasswordProtected) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            Our Connection
          </h1>
          <p className="text-gray-500">
            Enter the password to unlock our memories
          </p>
        </motion.div>

        {/* Sparkle */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-6xl text-center mb-6"
        >
          ✨
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter password"
              autoFocus
              autoComplete="current-password"
              spellCheck={false}
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none text-center text-lg tracking-widest bg-white text-black placeholder:text-gray-400"
              style={{
                color: '#000000',
                backgroundColor: '#ffffff',
                WebkitTextFillColor: '#000000',
                WebkitTextSecurity: 'disc',
                caretColor: '#000000',
                opacity: 1,
              }}
            />
          </motion.div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-shadow"
          >
            Unlock the Magic
          </motion.button>
        </form>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-400 mt-6"
        >
          Think about something meaningful we share...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}