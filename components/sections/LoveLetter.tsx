'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultLetter = `My Dearest,

Every moment with you feels like a beautiful dream I never want to wake from. 
From the first day we met to this very moment, you've filled my life with 
extraordinary joy and meaning.

Your smile brightens my darkest days. Your laughter is my favorite melody. 
Your presence is my greatest comfort. You are not just my love, but my 
best friend, my inspiration, and my home.

I fall in love with you more deeply with each passing day. Through every 
challenge and celebration, you remain my constant, my anchor, my reason.

Forever yours,
With all my love`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="love-letter"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-pink-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-pink-600 font-semibold mb-2">A Special Message</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Love <span className="text-pink-500">Letter</span>
            </h2>
            <p className="text-gray-600">Words from the heart</p>
          </motion.div>

          {/* Letter Card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <div
                className={`bg-white border-2 border-pink-200 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden relative ${
                  isOpen ? 'ring-2 ring-pink-400' : ''
                }`}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 text-6xl opacity-10">💌</div>
                <div className="absolute bottom-0 left-0 text-6xl opacity-10">💐</div>

                {/* Letter content */}
                <motion.div
                  animate={{ height: isOpen ? 'auto' : '200px' }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 overflow-hidden"
                >
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-left font-serif text-lg">
                    {defaultLetter}
                  </p>
                </motion.div>

                {/* Read more indicator */}
                {!isOpen && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-8 pb-4 text-center">
                    <p className="text-pink-600 font-semibold">Click to read full letter</p>
                  </div>
                )}
              </div>
            </motion.button>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                icon: '✍️',
                title: 'Write Your Letter',
                description: 'Compose a heartfelt message',
              },
              {
                icon: '📮',
                title: 'Save Your Words',
                description: 'Keep them safe forever',
              },
              {
                icon: '💝',
                title: 'Share Your Love',
                description: 'Express your deepest feelings',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100"
              >
                <p className="text-4xl mb-3">{feature.icon}</p>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
