'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const samplePhotos = [
  {
    id: 1,
    title: 'Photo 1 ❤️',
    image: '/gallary/photo1.jpeg',
  },
  {
    id: 2,
    title: 'Photo 2 ❤️',
    image: '/gallary/photo2.jpeg',
  },
  {
    id: 3,
    title: 'Photo 3 ❤️',
    image: '/gallary/photo3.jpeg',
  },
  {
    id: 4,
    title: 'Photo 4 ❤️',
    image: '/gallary/photo4.jpeg',
  },
  {
    id: 5,
    title: 'Photo 5 ❤️',
    image: '/gallary/photo5.jpeg',
  },
  {
    id: 6,
    title: 'Photo 6 ❤️',
    image: '/gallary/photo6.jpeg',
  },
  {
    id: 7,
    title: 'Photo 7 ❤️',
    image: '/gallary/photo7.jpeg',
  },
  {
    id: 8,
    title: 'Photo 8 ❤️',
    image: '/gallary/photo8.jpeg',
  },
  {
    id: 9,
    title: 'Photo 9 ❤️',
    image: '/gallary/photo9.jpeg',
  },
];

export function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof samplePhotos[0] | null>(null);

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
      id="gallery"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-purple-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-purple-600 font-semibold mb-2">Visual Memories</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Photo <span className="text-purple-500">Gallery</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A visual journey of our most precious moments together
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {['All', 'Adventures', 'Moments', 'Together'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter.toLowerCase())}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedFilter === filter.toLowerCase()
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {samplePhotos.map((photo) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer"
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={photo.id <= 3}
                />

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-opacity"
                >
                  <p className="text-2xl font-bold">{photo.title}</p>
                  <p className="text-sm mt-2">Click to view</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Memory note (replaces upload section) */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-4xl mb-3">📸</p>
            <h3 className="text-2xl font-bold text-purple-600">
              Every picture has a beautiful memory ❤️
            </h3>
          </motion.div>

          {/* Statistics */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-3 gap-6 mt-8"
          >
            {[
              { number: '∞', label: 'Memories' },
              { number: '💕', label: 'Love' },
              { number: '⭐', label: 'Magic' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <p className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <div className="relative aspect-square sm:aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <p className="mt-4 text-center text-lg font-semibold text-white">
                {selectedPhoto.title}
              </p>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-purple-600 shadow-lg hover:bg-purple-50"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}