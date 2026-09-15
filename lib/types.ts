export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  tags?: string[];
}

export interface Reason {
  id: string;
  text: string;
  emoji: string;
}

export interface OpenWhenLetter {
  id: string;
  condition: string;
  message: string;
  opened: boolean;
  openedDate?: string;
}

export interface TimeCapsuleItem {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  revealDate: string;
  images?: string[];
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

export interface Secret {
  id: string;
  title: string;
  content: string;
  isRevealed: boolean;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  askedDate: string;
}

export interface Reply {
  id: string;
  message: string;
  createdDate: string;
}

export interface SurpriseBox {
  id: string;
  title: string;
  emoji: string;
  content: string;
  imageUrl?: string;
  isRevealed: boolean;
  revealedDate?: string;
}

export interface SectionMusic {
  sectionId: string;
  musicUrl: string;
  title: string;
}

export interface ContentState {
  // Memories
  memories: Memory[];
  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, memory: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;

  // Reasons
  reasons: Reason[];
  addReason: (reason: Reason) => void;
  deleteReason: (id: string) => void;

  // Letters
  letters: OpenWhenLetter[];
  addLetter: (letter: OpenWhenLetter) => void;
  openLetter: (id: string) => void;

  // Time Capsule
  capsuleItems: TimeCapsuleItem[];
  addCapsuleItem: (item: TimeCapsuleItem) => void;
  revealCapsuleItem: (id: string) => void;

  // Music
  tracks: MusicTrack[];
  addTrack: (track: MusicTrack) => void;
  removeTrack: (id: string) => void;

  // Guestbook
  guestbookEntries: GuestbookEntry[];
  addGuestbookEntry: (entry: GuestbookEntry) => void;
  approveEntry: (id: string) => void;

  // Secrets
  secrets: Secret[];
  addSecret: (secret: Secret) => void;
  revealSecret: (id: string) => void;

  // Questions & Answers
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, answer: string) => void;

  // Replies/Messages
  replies: Reply[];
  addReply: (reply: Reply) => void;
  deleteReply: (id: string) => void;

  // Surprise Boxes
  surpriseBoxes: SurpriseBox[];
  addSurpriseBox: (box: SurpriseBox) => void;
  revealSurpriseBox: (id: string) => void;

  // Section Music
  sectionMusic: SectionMusic[];
  addSectionMusic: (music: SectionMusic) => void;
}

export interface UIState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  isPasswordProtected: boolean;
  setIsPasswordProtected: (value: boolean) => void;
  currentMusic: string | null;
  setCurrentMusic: (url: string | null) => void;
}

export interface AdminState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  musicUrl?: string;
}

export interface SettingsState {
  theme: ThemeSettings;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  coupleNames: {
    name1: string;
    name2: string;
  };
  setCoupleNames: (names: { name1: string; name2: string }) => void;
}
