'use client';

import { motion } from 'framer-motion';
import { useSettingsStore } from '@/lib/store';

export function Footer() {
  const coupleNames = useSettingsStore((state) => state.coupleNames);
  const currentYear = new Date().getFullYear();

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
    <footer className="relative w-full bg-gradient-to-b from-white to-pink-50 border-t border-pink-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 py-16 space-y-12"
      >
        {/* Main content */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-5xl mb-4">✨</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {coupleNames.name1} & {coupleNames.name2}
          </h3>
          <p className="text-gray-600 text-lg">
            A connection that keeps getting stronger
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { emoji: '💌', label: 'Love Letter', id: 'love-letter' },
            { emoji: '💝', label: 'Reasons', id: 'reasons-jar' },
            { emoji: '⏰', label: 'Timeline', id: 'timeline' },
            { emoji: '🎵', label: 'Playlist', id: 'music' },
          ].map((link) => (
            <motion.button
              key={link.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                const element = document.getElementById(link.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              <p className="text-3xl mb-2">{link.emoji}</p>
              <p className="text-sm font-semibold">{link.label}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Call to action */}
        {/* <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-center text-white"
        >
          <h4 className="text-2xl font-bold mb-2">Ready to customize?</h4>
          <p className="mb-4 opacity-90">
            Visit the admin section to personalize this page with your own memories and stories
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg bg-white text-pink-600 font-semibold hover:bg-pink-50 transition-colors"
          >
            Go to Admin
          </motion.button>
        </motion.div> */}

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="border-t border-pink-100 pt-8 text-center"
        >
          <p className="text-gray-600 text-sm mb-2">
            Made with love for {coupleNames.name1} & {coupleNames.name2}
          </p>
          <p className="text-gray-500 text-xs">
            © {currentYear} Our Forever • All memories preserved with love
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center gap-8 text-2xl opacity-30"
        >
          <span>💕</span>
          <span>✨</span>
          <span>💕</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
