import type { MediaItem } from "@/lib/media-store";

const MOBILE_DRAFT_KEY = "memorywall.mobileDraft.v1";

type PersistedMediaItem = {
  id: string;
  originalName: string;
  fileName: string;
  type: MediaItem["type"];
  eventName: string;
  tag: string;
  url: string | null;
  fileAvailability: "remote" | "session-only";
};

export interface MobileDraftSnapshot {
  version: 1;
  savedAt: string;
  bgAudio: boolean;
  bgAudioName: string | null;
  bgAudioAvailability: "named-only" | "none";
  items: PersistedMediaItem[];
}

const isBrowser = typeof window !== "undefined";

const getAvailability = (url: string | null) => {
  if (!url) return "session-only" as const;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return "remote" as const;
  }
  return "session-only" as const;
};

export const buildMobileDraftSnapshot = ({
  items,
  bgAudio,
  bgAudioName,
}: {
  items: MediaItem[];
  bgAudio: boolean;
  bgAudioName: string | null;
}): MobileDraftSnapshot => ({
  version: 1,
  savedAt: new Date().toISOString(),
  bgAudio,
  bgAudioName,
  bgAudioAvailability: bgAudioName ? "named-only" : "none",
  items: items.map((item) => ({
    id: item.id,
    originalName: item.originalName,
    fileName: item.fileName,
    type: item.type,
    eventName: item.eventName,
    tag: item.tag,
    url: getAvailability(item.url) === "remote" ? item.url : null,
    fileAvailability: getAvailability(item.url),
  })),
});

export const saveMobileDraftSnapshot = (snapshot: MobileDraftSnapshot) => {
  if (!isBrowser) return;
  window.localStorage.setItem(MOBILE_DRAFT_KEY, JSON.stringify(snapshot));
};

export const loadMobileDraftSnapshot = (): MobileDraftSnapshot | null => {
  if (!isBrowser) return null;

  const raw = window.localStorage.getItem(MOBILE_DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as MobileDraftSnapshot;
  } catch {
    return null;
  }
};

export const clearMobileDraftSnapshot = () => {
  if (!isBrowser) return;
  window.localStorage.removeItem(MOBILE_DRAFT_KEY);
};
