'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '@/lib/store';

const defaultBoxes = [
  {
    id: '1',
    title: 'First Kiss',
    emoji: '💋',
    content:
      'Mujhe nahi pata yeh kabhi hoga bhi ya nahi... lekin agar hua, toh woh moment meri life ke sabse khoobsurat moments mein se ek hoga. ❤️',
    imageUrl: '',
    isRevealed: false,
  },
  {
    id: '2',
    title: 'Special Date',
    emoji: '🗓️',
    content:
      'Haan... ek special date toh main deserve karta hoon. Bas ek aisa din jo sirf hum dono ke naam ho, jise hum kabhi na bhool paayein. 😊',
    imageUrl: '',
    isRevealed: false,
  },
  {
    id: '3',
    title: 'Promise',
    emoji: '🤝',
    content:
      'Mujhe tumse koi bada promise nahi chahiye. Bas itni si koshish hamesha karna ki humare is khoobsurat rishte ko hamesha dil se nibhana. ❤️',
    imageUrl: '',
    isRevealed: false,
  },
  {
    id: '4',
    title: 'Secret Wish',
    emoji: '⭐',
    content:
      'Isse filhaal secret hi rehne dete hain... waqt aane par tumhe zaroor bataunga. 😉',
    imageUrl: '',
    isRevealed: false,
  },
];

export function SurpriseBoxes() {
  const surpriseBoxes = useContentStore((state) => state.surpriseBoxes);
  const revealBox = useContentStore((state) => state.revealSurpriseBox);
  const [revealedBoxes, setRevealedBoxes] = useState<string[]>([]);

  const displayBoxes = surpriseBoxes.length > 0 ? surpriseBoxes : defaultBoxes;

  const handleBoxClick = (boxId: string) => {
    if (!revealedBoxes.includes(boxId)) {
      setRevealedBoxes([...revealedBoxes, boxId]);
      revealBox(boxId);
      // Trigger confetti
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    if (typeof window !== 'undefined' && 'JSConfetti' in window) {
      try {
        // @ts-ignore
        new window.JSConfetti().addConfetti({
          emojis: ['💝', '✨', '💕', '🎉', '💫'],
          emojiSize: 100,
          confettiNumber: 30,
        });
      } catch (e) {
        console.log('[v0] Confetti not available');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <section
      id="surprises"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-yellow-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Little Surprises for You
          </h2>
          <p className="text-lg text-gray-600">
            Click on the boxes to reveal special moments ✨
          </p>
        </motion.div>

        {/* Boxes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayBoxes.map((box) => {
            const isRevealed = revealedBoxes.includes(box.id);

            return (
              <motion.div
                key={box.id}
                variants={itemVariants}
                onClick={() => handleBoxClick(box.id)}
                className="cursor-pointer h-64 relative"
              >
                <motion.div
                  animate={{
                    rotateX: isRevealed ? 180 : 0,
                    rotateY: isRevealed ? 360 : 0,
                  }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of box - Unopened */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-primary via-pink-500 to-rose-500 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 cursor-pointer border-4 border-pink-300 ${
                      isRevealed ? 'pointer-events-none' : ''
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                    }}
                    whileHover={!isRevealed ? { scale: 1.05, rotate: 5 } : {}}
                    whileTap={!isRevealed ? { scale: 0.95 } : {}}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white to-transparent opacity-20"
                      animate={{
                        x: [0, 100, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />

                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-7xl mb-4 relative z-10"
                    >
                      {box.emoji}
                    </motion.div>

                    <p className="text-white text-center font-bold text-lg relative z-10">
                      {box.title}
                    </p>

                    <motion.p
                      className="text-white text-xs mt-4 text-center relative z-10"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      Click to reveal ✨
                    </motion.p>
                  </motion.div>

                  {/* Back of box - Revealed */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-yellow-300"
                    style={{
                      backfaceVisibility: 'hidden',
                      rotateY: 180,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="text-6xl mb-4"
                    >
                      ✨
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-center text-gray-800 text-sm leading-relaxed"
                    >
                      {box.content}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xs text-gray-500 mt-4"
                    >
                      💝 Revealed
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Revealed: {revealedBoxes.length} of {displayBoxes.length} surprises
          </p>

          <motion.div
            className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs mx-auto"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-pink-600"
              animate={{
                width: `${(revealedBoxes.length / displayBoxes.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-40 right-10 text-7xl opacity-20"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🎁
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-10 text-7xl opacity-20"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        >
          🎁
        </motion.div>
      </div>
    </section>
  );
}
