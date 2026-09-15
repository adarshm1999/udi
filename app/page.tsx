'use client';

import { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PasswordGate } from '@/components/PasswordGate';
import { StarAnimation } from '@/components/StarAnimation';
import { MusicManager } from '@/components/MusicManager';
import { Hero } from '@/components/sections/Hero';
import { FavoriteChats } from '@/components/sections/FavoriteChats';
import { ReasonsJar } from '@/components/sections/ReasonsJar';
import { MusicSection } from '@/components/sections/VoiceNotes';
import { Timeline } from '@/components/sections/Timeline';
import { Questions } from '@/components/sections/Questions';
import { Replies } from '@/components/sections/Replies';
import { SurpriseBoxes } from '@/components/sections/SurpriseBoxes';
import { Gallery } from '@/components/sections/Gallery';
import { useUIStore } from '@/lib/store';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isLoading, setIsLoading } = useUIStore();

  useEffect(() => {
    setMounted(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!mounted) return null;

  return (
    <>
      <PasswordGate />
      <StarAnimation />
      <LoadingScreen isVisible={isLoading} />
      <Navigation />
      <MusicManager />
      <main className="w-full">
        <Hero />
        <FavoriteChats />
        <ReasonsJar />
        <MusicSection />
        <Timeline />
        <Questions />
        <Replies />
        <SurpriseBoxes />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
