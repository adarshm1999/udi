'use client';

import { motion } from 'framer-motion';

export function MusicSection() {
  return (
    <section
      id="music"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-purple-50 to-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* <div className="text-8xl mb-6">🎶</div> */}

        {/* <h2 className="text-5xl font-bold mb-4">
          Our Background Music
        </h2>

        <p className="text-xl text-gray-600">
          This song plays throughout the entire website ❤️
        </p> */}

        {/* <p className="mt-6 text-pink-500 text-lg">
          Volume: 40% • Playing on Loop
        </p> */}
      </motion.div>
    </section>
  );
}