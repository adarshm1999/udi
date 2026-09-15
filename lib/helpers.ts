export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateWithTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateDaysTogether = (startDate: string | Date): number => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isDatePassed = (date: string | Date): boolean => {
  return new Date(date) <= new Date();
};

export const calculateTimeUntil = (date: string | Date): string => {
  const targetDate = new Date(date);
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();

  if (diffMs <= 0) return 'Today!';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

export const playSound = (url: string) => {
  if (typeof window !== 'undefined') {
    const audio = new Audio(url);
    audio.play().catch((e) => console.log('Audio play failed:', e));
  }
};

export const triggerConfetti = () => {
  if (typeof window !== 'undefined') {
    const confetti = require('js-confetti');
    const jsConfetti = new confetti();
    jsConfetti.addConfetti();
  }
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
