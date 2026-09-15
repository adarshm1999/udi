'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function StarAnimation() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate static stars
    const generatedStars: Star[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));

    setStars(generatedStars);

    // Generate shooting stars periodically
    const shootingInterval = setInterval(() => {
      const newShootingStar: Star = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 30,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 1 + 1,
        delay: 0,
      };
      setShootingStars((prev) => [...prev, newShootingStar].slice(-5));
    }, 3000);

    return () => clearInterval(shootingInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0))`,
            boxShadow: `0 0 20px rgba(255, 215, 0, 1)`,
          }}
          animate={{
            x: [0, -100],
            y: [0, 100],
            opacity: [1, 0],
          }}
          transition={{
            duration: star.duration,
            ease: 'easeIn',
          }}
        />
      ))}

      {/* Parallax Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-100/10 to-pink-100/10"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
