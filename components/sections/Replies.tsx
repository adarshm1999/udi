'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '@/lib/store';

const defaultReplies = [
  {
    id: '1',
    message:
      'Haan, tum ek bahut acchi ladki ho. ❤️ Main apni life ka har moment tumhare saath bitana chahta hoon. Tumhare saath baat karke aur waqt spend karke ek alag hi sukoon milta hai.',
    createdDate: new Date().toISOString(),
  },
  {
    id: '2',
    message:
      'Yeh bhi sach hai ki Aaj tk maine kisi ladki se baat nhi ki,Aap pehli aisi ladki ho jo mujhe dil se acchi lagi aur mere jaise ladke ko bhi chance diya. Shayad isiliye tum mere liye itni special ho. 💕',
    createdDate: new Date().toISOString(),
  },
  {
    id: '3',
    message:
      'Main shayad yeh sab saamne se na bol paun i am very shay Lekin ek baat hamesha yaad rakhna... tumhare efforts mere liye bahut matter karte hain. Aur main unki hamesha respect karunga aur kbhi apko chhod ke nhi jaunga ❤️',
    createdDate: new Date().toISOString(),
  },
];

export function Replies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const replies = useContentStore((state) => state.replies);

  const displayReplies = replies.length > 0 ? replies : defaultReplies;
  const currentReply = displayReplies[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReplies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + displayReplies.length) % displayReplies.length
    );
  };

  return (
    <section
      id="replies"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-purple-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Messages for You
          </h2>
          <p className="text-lg text-gray-600">
            Things I want you to always remember 💝
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="mb-8"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl p-12 shadow-2xl border-2 border-pink-200 min-h-80 flex flex-col justify-center items-center relative overflow-hidden"
          >
            {/* Decorative background */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-pink-200" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                💌
              </motion.div>

              <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8">
                &ldquo;{currentReply.message}&rdquo;
              </p>

              <p className="text-sm text-gray-500">
                — I am always with You,For You
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-4 rounded-full bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="text-2xl">❮</span>
          </motion.button>

          {/* Indicator dots */}
          <div className="flex gap-2 flex-1 justify-center">
            {displayReplies.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-pink-200 w-3 hover:bg-pink-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-4 rounded-full bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="text-2xl">❯</span>
          </motion.button>
        </div>

        {/* Message count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-8 text-gray-500"
        >
          {currentIndex + 1} of {displayReplies.length} messages
        </motion.p>

        {/* Decorative hearts */}
        <motion.div
          className="absolute top-32 left-10 text-5xl opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-5xl opacity-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          💕
        </motion.div>
      </div>
    </section>
  );
}
