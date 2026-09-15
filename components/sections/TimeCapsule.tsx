'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContentStore } from '@/lib/store';
import { calculateTimeUntil, isDatePassed } from '@/lib/helpers';

const defaultItems = [
  {
    id: '1',
    title: 'First Anniversary Letter',
    description: 'A letter I wrote about how much you mean to me',
    createdDate: new Date(Date.now() - 86400000).toISOString(),
    revealDate: new Date(Date.now() + 86400000 * 365).toISOString(),
  },
  {
    id: '2',
    title: 'Future Dreams',
    description: 'Our goals and dreams for the next 5 years',
    createdDate: new Date(Date.now() - 172800000).toISOString(),
    revealDate: new Date(Date.now() + 86400000 * 1825).toISOString(),
  },
];

export function TimeCapsule() {
  const items = useContentStore((state) => state.capsuleItems) || [];
  const displayItems = items.length > 0 ? items : defaultItems;

  const [showForm, setShowForm] = useState(false);

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
      id="time-capsule"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-orange-50 to-white py-20 px-6"
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
            <p className="text-orange-600 font-semibold mb-2">For Future Selves</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Time <span className="text-orange-500">Capsule</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Messages and memories sealed to be opened on special days
            </p>
          </motion.div>

          {/* Items */}
          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            <AnimatePresence>
              {displayItems.map((item) => {
                const isPassed = isDatePassed(item.revealDate);
                const timeUntil = calculateTimeUntil(item.revealDate);

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    layout
                    className={`rounded-xl p-6 border-2 transition-all ${
                      isPassed
                        ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400'
                        : 'bg-gradient-to-r from-gray-50 to-white border-orange-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-3xl">{isPassed ? '🔓' : '🔐'}</p>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            isPassed
                              ? 'text-orange-600'
                              : 'text-gray-600'
                          }`}
                        >
                          {isPassed ? 'Revealed' : 'Opens in'}
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            isPassed
                              ? 'text-orange-600'
                              : 'text-orange-500'
                          }`}
                        >
                          {isPassed ? 'Today! 🎉' : timeUntil}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Add item button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 rounded-full border-2 border-orange-400 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
            >
              + Create a Capsule
            </button>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          >
            {[
              {
                icon: '📝',
                title: 'Write Messages',
                description: 'Create special messages for the future',
              },
              {
                icon: '📅',
                title: 'Set Dates',
                description: 'Choose when they should be revealed',
              },
              {
                icon: '🎁',
                title: 'Surprise Reveal',
                description: 'Discover them on the perfect moment',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="bg-white rounded-lg p-4 border border-orange-100 text-center"
              >
                <p className="text-3xl mb-2">{feature.icon}</p>
                <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
