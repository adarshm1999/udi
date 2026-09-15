import { useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView, opacity, y };
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (latest) => latest * speed);

  return { ref, y };
};
