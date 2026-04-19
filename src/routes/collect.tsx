import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Upload,
  CheckCircle2,
  FileImage,
  FileVideo,
  X,
  Music,
} from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { SafetyPanel } from "@/components/SafetyPanel";
import { Button } from "@/components/ui/button";
import { useMediaStore, type MediaItem } from "@/lib/media-store";
import uploadBackground from "@/assets/uploadfiles.png";
import { toast } from "sonner";

export const Route = createFileRoute("/collect")({
  head: () => ({
    meta: [
      { title: "Collect Memories — MemoryWall" },
      {
        name: "description",
        content:
          "Create beautiful memory slideshows for birthdays, anniversaries, and special occasions.",
      },
    ],
  }),
  component: IntakePage,
});

const rules = [
  "Use Event_Person_Type format",
  "Use underscores, no spaces",
  "Include year for recurring events",
  "Mark photos vs videos clearly",
];

function IntakePage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const items = useMediaStore((s) => s.items);
  const addItems = useMediaStore((s) => s.addItems);
  const removeItem = useMediaStore((s) => s.removeItem);
  const bgAudioUrl = useMediaStore((s) => s.bgAudioUrl);
  const bgAudioName = useMediaStore((s) => s.bgAudioName);
  const setBgAudio = useMediaStore((s) => s.setBgAudio);
  const [drag, setDrag] = useState(false);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      toast.error("Please select an audio file");
      return;
    }
    const url = URL.createObjectURL(file);
    setBgAudio(url, file.name);
    toast.success(`Main audio set: ${file.name}`);
  };

  const clearBgAudio = () => {
    if (bgAudioUrl?.startsWith("blob:")) URL.revokeObjectURL(bgAudioUrl);
    setBgAudio(null, null);
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: MediaItem[] = Array.from(files).map((f, i) => {
      const isVideo = f.type.startsWith("video/");
      const id = `${isVideo ? "VID" : "IMG"}_${String(items.length + i + 1).padStart(3, "0")}`;
      return {
        id,
        originalName: f.name,
        fileName: `Event_${id}.${isVideo ? "mp4" : "jpg"}`,
        type: isVideo ? "video" : "photo",
        eventName: "Untitled",
        tag: "New",
        url: URL.createObjectURL(f),
      };
    });
    addItems(newItems);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-soft)" }}
    >
      <AppNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            Step 1 of 3 · Collect Memories
          </div>
          <h1 className="rainbow-text text-5xl font-bold tracking-tight">
            Create a special memory gift.
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Upload photos and videos for birthdays, anniversaries, celebrations,
            or memorials. We'll create a beautiful slideshow that captures your
            cherished moments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Row 1: Upload section (columns 1-2) */}
          <div className="lg:col-span-2">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
                drag ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${uploadBackground})` }}
              />
              <div className="absolute inset-0 bg-white/72" />
              <div className="rainbow-btn relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Upload className="h-7 w-7" />
              </div>
              <h2 className="relative z-10 text-lg font-semibold text-black">
                Drag files here or click to browse
              </h2>
              <p className="relative z-10 mt-1 text-sm text-slate-500">
                JPG, PNG, MP4 up to 50MB each
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <Button
                size="lg"
                className="rainbow-btn relative z-10 mt-6 rounded-full px-8 shadow-[var(--shadow-elegant)] hover:opacity-90"
                onClick={() => inputRef.current?.click()}
              >
                Upload Media
              </Button>
            </div>
          </div>

          {/* Row 1: Main Audio + Naming Rules (column 3) */}
          <div className="flex h-full flex-col gap-6">
            <div className="glass rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold">Main Audio</h3>
              <p className="mb-3 text-xs text-muted-foreground">
                Optional background track that plays during the preview.
              </p>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleAudioUpload}
              />
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => audioInputRef.current?.click()}
              >
                <Music className="mr-2 h-4 w-4" />
                {bgAudioUrl ? "Change Audio" : "Upload Main Audio"}
              </Button>
              {bgAudioUrl && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                  <Music className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1 truncate text-xs">
                    {bgAudioName ?? "Background audio"}
                  </span>
                  <button
                    onClick={clearBgAudio}
                    className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    title="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold">Naming Rules</h3>
              <ul className="space-y-2.5">
                {rules.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2: File List (columns 1-2) */}
          <div className="space-y-6 lg:col-span-2">
            <div className="glass rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold">
                File List ({items.length})
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-lg border border-border bg-background shadow-[var(--shadow-card)]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.fileName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-background/90 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider backdrop-blur">
                        {item.type === "video" ? (
                          <FileVideo className="h-2.5 w-2.5" />
                        ) : (
                          <FileImage className="h-2.5 w-2.5" />
                        )}
                        {item.type}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground backdrop-blur hover:text-foreground"
                        aria-label={`Remove ${item.fileName}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="space-y-1 p-2">
                      <div className="truncate text-[11px] font-medium">
                        {item.fileName}
                      </div>
                      <div className="truncate text-[10px] text-muted-foreground">
                        {item.id}
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground col-span-full">
                    No files yet. Upload to get started.
                  </div>
                )}
              </div>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  className="mt-4 w-full rounded-full"
                  onClick={() => navigate({ to: "/folder" })}
                >
                  Go Arrange →
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <SafetyPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
