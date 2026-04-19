import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { MediaItem } from "@/lib/media-store";
import previewBackground from "@/assets/preview_a4.png";

interface SlideshowProps {
  items: MediaItem[];
  startIndex?: number;
  onClose: () => void;
  intervalMs?: number;
}

export function Slideshow({
  items,
  startIndex = 0,
  onClose,
  intervalMs = 4000,
}: SlideshowProps) {
  const [index, setIndex] = useState(startIndex);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const current = items[index];
  const next = items[(index + 1) % items.length];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

  // Auto advance — wait for video to end if it's a video, else use interval
  useEffect(() => {
    if (!playing || items.length <= 1) return;
    if (current?.type === "video") return; // video drives advance via onEnded
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearTimeout(t);
  }, [index, playing, items.length, intervalMs, current]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.88)), url(${previewBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Crossfade stack */}
      {items.map((item, i) => {
        const active = i === index;
        return (
          <div
            key={item.id}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none" }}
          >
            {item.type === "video" ? (
              active ? (
                <video
                  ref={videoRef}
                  src={item.url}
                  className="h-full w-full object-contain"
                  autoPlay
                  playsInline
                  muted={false}
                  onEnded={() => {
                    if (playing) setIndex((idx) => (idx + 1) % items.length);
                  }}
                />
              ) : null
            ) : (
              <img
                src={item.url}
                alt={item.fileName}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        );
      })}

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
        <div className="mx-auto max-w-4xl">
          {(current.eventName.trim() || current.tag.trim()) && (
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">
              {[current.eventName.trim(), current.tag.trim()]
                .filter(Boolean)
                .join(" · ")}
            </div>
          )}
          <div className="mt-1 text-2xl font-semibold text-white">{current.fileName}</div>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {items.length}
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          aria-label="Close slideshow"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-6">
        <div className="flex items-center gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur">
          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-white/90"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Next preview hint */}
      {next && next.id !== current.id && (
        <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="text-[10px] uppercase tracking-wider text-white/40">Up next</div>
        </div>
      )}
    </div>
  );
}
