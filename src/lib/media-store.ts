import { create } from "zustand";

export type MediaType = "photo" | "video";

export interface MediaItem {
  id: string;
  originalName: string;
  fileName: string;
  type: MediaType;
  eventName: string;
  tag: string;
  url: string;
}

interface MediaStore {
  items: MediaItem[];
  bgAudio: boolean;
  bgAudioUrl: string | null;
  bgAudioName: string | null;
  setItems: (items: MediaItem[]) => void;
  addItems: (items: MediaItem[]) => void;
  updateItem: (id: string, patch: Partial<MediaItem>) => void;
  removeItem: (id: string) => void;
  toggleAudio: () => void;
  setBgAudio: (url: string | null, name?: string | null) => void;
  setBgAudioEnabled: (enabled: boolean) => void;
}

const sample: MediaItem[] = [
  {
    id: "IMG_001",
    originalName: "IMG_001.jpg",
    fileName: "Birthday_Ajay_Photo1.jpg",
    type: "photo",
    eventName: "Birthday",
    tag: "Ajay",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  },
  {
    id: "VID_002",
    originalName: "VID_002.mp4",
    fileName: "AGM2026_Speech.mp4",
    type: "video",
    eventName: "AGM 2026",
    tag: "Speech",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "IMG_003",
    originalName: "IMG_003.jpg",
    fileName: "Team_Event_Group.jpg",
    type: "photo",
    eventName: "Team Event",
    tag: "Group",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
];

export const useMediaStore = create<MediaStore>((set) => ({
  items: sample,
  bgAudio: true,
  bgAudioUrl: null,
  bgAudioName: null,
  setItems: (items) => set({ items }),
  addItems: (items) => set((s) => ({ items: [...s.items, ...items] })),
  updateItem: (id, patch) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  toggleAudio: () => set((s) => ({ bgAudio: !s.bgAudio })),
  setBgAudio: (url, name = null) => set({ bgAudioUrl: url, bgAudioName: name, bgAudio: !!url }),
  setBgAudioEnabled: (enabled) => set({ bgAudio: enabled }),
}));
