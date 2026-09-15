import { create } from 'zustand';
import type {
  ContentState,
  UIState,
  AdminState,
  SettingsState,
  Memory,
  Reason,
  OpenWhenLetter,
  TimeCapsuleItem,
  MusicTrack,
  GuestbookEntry,
  Secret,
  Question,
  Reply,
  SurpriseBox,
  SectionMusic,
} from './types';

export const useContentStore = create<ContentState>((set) => ({
  memories: [],
  addMemory: (memory) =>
    set((state) => ({
      memories: [...state.memories, memory],
    })),
  updateMemory: (id, updatedMemory) =>
    set((state) => ({
      memories: state.memories.map((m) =>
        m.id === id ? { ...m, ...updatedMemory } : m
      ),
    })),
  deleteMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== id),
    })),

  reasons: [],
  addReason: (reason) =>
    set((state) => ({
      reasons: [...state.reasons, reason],
    })),
  deleteReason: (id) =>
    set((state) => ({
      reasons: state.reasons.filter((r) => r.id !== id),
    })),

  letters: [],
  addLetter: (letter) =>
    set((state) => ({
      letters: [...state.letters, letter],
    })),
  openLetter: (id) =>
    set((state) => ({
      letters: state.letters.map((l) =>
        l.id === id
          ? { ...l, opened: true, openedDate: new Date().toISOString() }
          : l
      ),
    })),

  capsuleItems: [],
  addCapsuleItem: (item) =>
    set((state) => ({
      capsuleItems: [...state.capsuleItems, item],
    })),
  revealCapsuleItem: (id) =>
    set((state) => ({
      capsuleItems: state.capsuleItems.map((c) =>
        c.id === id ? { ...c, revealDate: new Date().toISOString() } : c
      ),
    })),

  tracks: [],
  addTrack: (track) =>
    set((state) => ({
      tracks: [...state.tracks, track],
    })),
  removeTrack: (id) =>
    set((state) => ({
      tracks: state.tracks.filter((t) => t.id !== id),
    })),

  guestbookEntries: [],
  addGuestbookEntry: (entry) =>
    set((state) => ({
      guestbookEntries: [...state.guestbookEntries, entry],
    })),
  approveEntry: (id) =>
    set((state) => ({
      guestbookEntries: state.guestbookEntries.map((e) =>
        e.id === id ? { ...e, approved: true } : e
      ),
    })),

  secrets: [],
  addSecret: (secret) =>
    set((state) => ({
      secrets: [...state.secrets, secret],
    })),
  revealSecret: (id) =>
    set((state) => ({
      secrets: state.secrets.map((s) =>
        s.id === id ? { ...s, isRevealed: true } : s
      ),
    })),

  questions: [],
  addQuestion: (question) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),
  updateQuestion: (id, answer) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, answer } : q
      ),
    })),

  replies: [],
  addReply: (reply) =>
    set((state) => ({
      replies: [...state.replies, reply],
    })),
  deleteReply: (id) =>
    set((state) => ({
      replies: state.replies.filter((r) => r.id !== id),
    })),

  surpriseBoxes: [],
  addSurpriseBox: (box) =>
    set((state) => ({
      surpriseBoxes: [...state.surpriseBoxes, box],
    })),
  revealSurpriseBox: (id) =>
    set((state) => ({
      surpriseBoxes: state.surpriseBoxes.map((b) =>
        b.id === id
          ? { ...b, isRevealed: true, revealedDate: new Date().toISOString() }
          : b
      ),
    })),

  sectionMusic: [],
  addSectionMusic: (music) =>
    set((state) => ({
      sectionMusic: [...state.sectionMusic, music],
    })),
}));

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
  currentSection: 'home',
  setCurrentSection: (section) => set({ currentSection: section }),
  soundEnabled: true,
  setSoundEnabled: (value) => set({ soundEnabled: value }),
  isPasswordProtected: true,
  setIsPasswordProtected: (value) => set({ isPasswordProtected: value }),
  currentMusic: null,
  setCurrentMusic: (url) => set({ currentMusic: url }),
}));

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  adminPassword: '',
  setAdminPassword: (password) => set({ adminPassword: password }),
}));

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: {
    primaryColor: '#ff69b4',
    secondaryColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Poppins',
    musicUrl: '',
  },
  updateTheme: (theme) =>
    set((state) => ({
      theme: { ...state.theme, ...theme },
    })),
  coupleNames: {
    name1: 'You',
    name2: 'Me',
  },
  setCoupleNames: (names) =>
    set({
      coupleNames: names,
    }),
}));
