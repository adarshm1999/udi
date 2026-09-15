export const COLORS = {
  primary: '#ff1493',
  secondary: '#ffffff',
  accent: '#ffd700',
  dark: '#1a1a1a',
  light: '#f5f5f5',
  gray: '#9ca3af',
  lightGray: '#e5e7eb',
};

export const SECTIONS = {
  HOME: 'home',
  LOVE_LETTER: 'love-letter',
  MEMORYVERSE: 'memoryverse',
  SCRAPBOOK: 'scrapbook',
  REASONS_JAR: 'reasons-jar',
  LOVE_WRAPPED: 'love-wrapped',
  OPEN_WHEN: 'open-when',
  TIME_CAPSULE: 'time-capsule',
  GALLERY: 'gallery',
  TIMELINE: 'timeline',
  MUSIC: 'music',
  GUESTBOOK: 'guestbook',
  SECRET: 'secret',
  FINAL_SURPRISE: 'final-surprise',
  ADMIN: 'admin',
};

export const ANIMATIONS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  SLIDE_UP: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  SLIDE_DOWN: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  SCALE: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  },
};

export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'udiada';

export const SAMPLE_REASONS = [
  {
    id: '1',
    text: 'Aapki care karne ki aadat mujhe sabse zyada pasand hai.',
    emoji: '💖',
  },
  {
    id: '2',
    text: 'Aap jo dil mein hota hai, bina soche bol deti hain, wahi baat mujhe sabse acchi lagti hai.',
    emoji: '🤍',
  },
  {
    id: '3',
    text: 'Aap jitna mere saath comfortable feel karke apni personal baatein mujhse share karti hain, mujhe woh bahut accha lagta hai.',
    emoji: '🌸',
  },
  {
    id: '4',
    text: 'Aapke Good morning ka message mujhe sach main poore din good feel karata hai.',
    emoji: '😜',
  },
  {
    id: '5',
    text: 'Aapke saath jitni freely aur openly baat ho paati hai, woh mujhe bahut special feel karata hai.',
    emoji: '🥰',
  },
  {
    id: '6',
    text: 'Aapka dil itna saaf hai, bas wahi baat mujhe sabse zyada pasand hai.',
    emoji: '✨',
  },
  {
    id: '7',
    text: 'Aapki baatein sunte sunte waqt ka pata hi nahi chalta.',
    emoji: '🌙',
  },
  {
    id: '8',
    text: 'Aapse har topic par baat karna bahut easy aur special lagta hai.',
    emoji: '💬',
  },
  {
    id: '9',
    text: 'Aap jaisi hain, waise hi mujhe sabse zyada pasand hain.',
    emoji: '🌼',
  },
  {
    id: '10',
    text: 'Aapke saath har baat aur har pal yaadgar ban jaata hai.',
    emoji: '❤️',
  },
  {
    id: '11',
    text: 'Aapka har chhota sa effort mujhe bahut special feel karata hai.',
    emoji: '🌟',
  },
  {
    id: '12',
    text: 'Aapki smile bhi pasand hai aur aapka mujhe itna comfortable feel karana bhi.',
    emoji: '😊',
  },
];

export const SAMPLE_MEMORIES: typeof undefined = undefined;

export const LOADING_MESSAGES = [
  'Loading our conversations...',
  'Gathering our moments...',
  'Preparing something special...',
  'Setting things up...',
  'Almost ready...',
];
