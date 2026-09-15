'use client';

import { useEffect, useRef, useState } from 'react';

export default function GlobalMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const alreadyStarted = sessionStorage.getItem('music-started');

    if (alreadyStarted === 'true') {
      const audio = audioRef.current;

      if (audio) {
        audio.volume = 0.4;
        audio.loop = true;

        audio.play().catch(() => {
          // If browser blocks playback after refresh,
          // the overlay will be shown again.
          sessionStorage.removeItem('music-started');
          setStarted(false);
        });

        setStarted(true);
      }
    }
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.4;
    audio.loop = true;

    try {
      await audio.play();

      sessionStorage.setItem('music-started', 'true');
      setStarted(true);

      console.log('🎵 Music Started');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!started && (
        <div
          onClick={startMusic}
          onTouchStart={startMusic}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 cursor-pointer select-none"
        >
          <div className="text-center text-white px-8">
            <div className="text-7xl mb-6 animate-bounce">
              🎵
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Welcome ❤️
            </h1>

            <p className="text-xl opacity-90">
              Tap anywhere to enter
            </p>

            {/* <p className="mt-6 text-sm opacity-70">
              Background music will start automatically
            </p> */}
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src="/music/our-song.mp3"
        preload="auto"
        playsInline
        loop
      />
    </>
  );
}