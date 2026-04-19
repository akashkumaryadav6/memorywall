import { useEffect } from "react";
import { useMediaStore } from "@/lib/media-store";
import { buildMobileDraftSnapshot, saveMobileDraftSnapshot } from "@/lib/mobile-draft-storage";

export function MobileDraftSync() {
  const items = useMediaStore((s) => s.items);
  const bgAudio = useMediaStore((s) => s.bgAudio);
  const bgAudioName = useMediaStore((s) => s.bgAudioName);

  useEffect(() => {
    saveMobileDraftSnapshot(
      buildMobileDraftSnapshot({
        items,
        bgAudio,
        bgAudioName,
      }),
    );
  }, [items, bgAudio, bgAudioName]);

  return null;
}
