'use client';

import { useEffect, useRef, useState } from 'react';
import { useUIStore } from '@/lib/store';
import { motion } from 'framer-motion';

interface SectionMusicMap {
  [key: string]: string;
}

// Default music URLs
const sectionMusicMap: SectionMusicMap = {
  hero: 'https://assets.vercel.com/video/music/hero.mp3',
  loveLetter: 'https://assets.vercel.com/video/music/romantic.mp3',
  reasonsJar: 'https://assets.vercel.com/video/music/uplifting.mp3',
  timeline: 'https://assets.vercel.com/video/music/nostalgic.mp3',
  gallery: 'https://assets.vercel.com/video/music/dreamy.mp3',
  openWhen: 'https://assets.vercel.com/video/music/tender.mp3',
  music: 'https://assets.vercel.com/video/music/dance.mp3',
  questions: 'https://assets.vercel.com/video/music/thoughtful.mp3',
  replies: 'https://assets.vercel.com/video/music/passionate.mp3',
  surprises: 'https://assets.vercel.com/video/music/playful.mp3',
  timeCapsule: 'https://assets.vercel.com/video/music/hopeful.mp3',
  guestbook: 'https://assets.vercel.com/video/music/festive.mp3',
  secrets: 'https://assets.vercel.com/video/music/mysterious.mp3',
};

export function MusicManager() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledUI = useUIStore((state) => state.soundEnabled);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionMusicMap);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            const musicUrl = sectionMusicMap[section];
            if (musicUrl && audioRef.current && audioRef.current.src !== musicUrl) {
              audioRef.current.src = musicUrl;
              if (soundEnabled) {
                audioRef.current.play().catch(() => {
                  // Autoplay prevented
                });
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [soundEnabled]);

  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabledUI) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
    setSoundEnabled(soundEnabledUI);
  }, [soundEnabledUI]);

  const toggleSound = () => {
    useUIStore.setState({ soundEnabled: !soundEnabledUI });
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
        volume={0.3}
      />

      <motion.button
        onClick={toggleSound}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle music"
      >
        <span className="text-2xl">
          {soundEnabledUI ? '🔊' : '🔇'}
        </span>
      </motion.button>
    </>
  );
}
