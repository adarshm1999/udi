'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useContentStore } from '@/lib/store';

const defaultTracks = [
  {
    id: '1',
    title: 'Our Song',
    artist: 'The Band',
    duration: 240,
    emoji: '🎵',
  },
  {
    id: '2',
    title: 'Thinking of You',
    artist: 'Love Songs',
    duration: 200,
    emoji: '🎶',
  },
  {
    id: '3',
    title: 'Forever with You',
    artist: 'Romantic Melodies',
    duration: 220,
    emoji: '🎸',
  },
];

export function Music() {
  const tracks = useContentStore((state) => state.tracks) || [];
  const displayTracks = tracks.length > 0 ? tracks : defaultTracks;

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="music"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-indigo-50 to-white py-20 px-6"
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
            <p className="text-indigo-600 font-semibold mb-2">The Soundtrack of Our Love</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Our <span className="text-indigo-500">Playlist</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Songs that remind us of each other
            </p>
          </motion.div>

          {/* Player Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-xl"
          >
            {/* Album art */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <p className="text-6xl">{displayTracks[currentTrack]?.emoji}</p>
            </motion.div>

            {/* Track info */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {displayTracks[currentTrack]?.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {displayTracks[currentTrack]?.artist}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-700 mt-2">
                <span>{formatTime(progress * 2.4)}</span>
                <span>{formatTime(displayTracks[currentTrack]?.duration || 0)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setCurrentTrack(
                    currentTrack === 0 ? displayTracks.length - 1 : currentTrack - 1
                  )
                }
                className="p-3 rounded-full bg-white hover:bg-gray-100 transition-colors"
              >
                ⏮️
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors text-2xl"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setCurrentTrack((currentTrack + 1) % displayTracks.length)
                }
                className="p-3 rounded-full bg-white hover:bg-gray-100 transition-colors"
              >
                ⏭️
              </motion.button>
            </div>

            {/* Volume control */}
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="w-32 h-2 bg-white rounded-full"
              />
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div
            variants={itemVariants}
            className="space-y-3"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Playlist</h3>
            <div className="space-y-2">
              {displayTracks.map((track, index) => (
                <motion.button
                  key={track.id}
                  onClick={() => setCurrentTrack(index)}
                  whileHover={{ x: 5 }}
                  className={`w-full p-4 rounded-xl transition-all ${
                    index === currentTrack
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-semibold flex items-center gap-2">
                        {track.emoji} {track.title}
                      </p>
                      <p className="text-xs opacity-75">{track.artist}</p>
                    </div>
                    <span className="text-sm opacity-75">{formatTime(track.duration)}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Add track button */}
          <motion.div variants={itemVariants} className="flex justify-center pt-4">
            <button className="px-6 py-3 rounded-full border-2 border-indigo-400 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">
              + Add a Track
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
