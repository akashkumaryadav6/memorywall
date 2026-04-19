import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  FileImage,
} from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Slideshow } from "@/components/Slideshow";
import { useMediaStore, type MediaItem } from "@/lib/media-store";
import previewBackground from "@/assets/preview_a4.png";
import { toast } from "sonner";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Share Memory Gift — MemoryWall" },
      {
        name: "description",
        content: "Beautiful memory slideshow with playback and audio controls.",
      },
    ],
  }),
  component: PreviewPage,
});

type ExportFormat = "pdf" | "png";
type PreparedExportItem = MediaItem & {
  exportSrc: string | null;
};

const EXPORT_WIDTH = 1200;
const A4_HEIGHT_RATIO = Math.SQRT2;
const EXPORT_PAGE_HEIGHT = Math.round(EXPORT_WIDTH * A4_HEIGHT_RATIO);
const EXPORT_MAX_MEDIA_DIMENSION = 1800;
const EXPORT_MEDIA_LOAD_TIMEOUT_MS = 8000;
const EXPORT_PAGE_BACKGROUND = "#ffffff";

const waitForImage = (image: HTMLImageElement) =>
  new Promise<void>((resolve, reject) => {
    if (image.complete && image.naturalWidth > 0) {
      resolve();
      return;
    }

    let timeoutId: number | null = null;
    const cleanup = () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
    const handleLoad = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error("Image failed to load"));
    };

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Image timed out"));
    }, EXPORT_MEDIA_LOAD_TIMEOUT_MS);
  });

const drawMediaToDataUrl = (
  source: CanvasImageSource,
  naturalWidth: number,
  naturalHeight: number,
) => {
  const largestSide = Math.max(naturalWidth, naturalHeight);
  const scale =
    largestSide > EXPORT_MAX_MEDIA_DIMENSION
      ? EXPORT_MAX_MEDIA_DIMENSION / largestSide
      : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(naturalHeight * scale));
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is unavailable");
  }

  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.92);
};

const imageToExportSrc = async (src: string) => {
  try {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.src = src;
    await waitForImage(image);

    if (!image.naturalWidth || !image.naturalHeight) {
      return null;
    }

    return drawMediaToDataUrl(image, image.naturalWidth, image.naturalHeight);
  } catch {
    return null;
  }
};

const captureVideoFrame = (video: HTMLVideoElement | null) => {
  try {
    if (
      !video ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      !video.videoWidth ||
      !video.videoHeight
    ) {
      return null;
    }

    return drawMediaToDataUrl(video, video.videoWidth, video.videoHeight);
  } catch {
    return null;
  }
};

const loadVideoFrameFromSrc = (src: string) =>
  new Promise<string | null>((resolve) => {
    const video = document.createElement("video");
    let settled = false;
    let timeoutId: number | null = null;

    const cleanup = () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const settle = (value: string | null) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(value);
    };

    const handleLoadedData = () => {
      window.requestAnimationFrame(() => settle(captureVideoFrame(video)));
    };

    const handleError = () => settle(null);

    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    timeoutId = window.setTimeout(() => settle(null), 3500);
    video.src = src;
    video.load();
  });

const prepareExportItems = async (
  items: MediaItem[],
  videoRefs: MutableRefObject<Record<string, HTMLVideoElement | null>>,
): Promise<PreparedExportItem[]> =>
  Promise.all(
    items.map(async (item) => {
      const exportSrc =
        item.type === "video"
          ? (captureVideoFrame(videoRefs.current[item.id]) ??
            (await loadVideoFrameFromSrc(item.url)))
          : await imageToExportSrc(item.url);

      return { ...item, exportSrc };
    }),
  );

const applyStyles = (
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>,
) => {
  Object.assign(element.style, styles);
};

const createExportNode = (items: PreparedExportItem[]) => {
  const root = document.createElement("div");
  root.setAttribute("data-memorywall-export", "true");
  applyStyles(root, {
    background: EXPORT_PAGE_BACKGROUND,
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.82)), url("${previewBackground}")`,
    backgroundPosition: "center top",
    backgroundRepeat: "repeat-y",
    backgroundSize: "100% auto",
    borderColor: "transparent",
    boxSizing: "border-box",
    color: "#111827",
    colorScheme: "light",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    left: "-10000px",
    lineHeight: "1.4",
    minHeight: `${EXPORT_PAGE_HEIGHT}px`,
    position: "fixed",
    top: "0",
    width: `${EXPORT_WIDTH}px`,
    zIndex: "-1",
  });

  const exportStyle = document.createElement("style");
  exportStyle.textContent = `
    [data-memorywall-export],
    [data-memorywall-export] * {
      border-color: transparent !important;
      box-shadow: none !important;
      color-scheme: light !important;
    }
  `;
  root.appendChild(exportStyle);

  const grid = document.createElement("div");
  applyStyles(grid, {
    background: "transparent",
    borderColor: "transparent",
    columnCount: items.length > 2 ? "3" : String(Math.max(items.length, 1)),
    columnGap: "24px",
    padding: "24px",
    width: "100%",
  });

  items.forEach((item) => {
    const card = document.createElement("article");
    applyStyles(card, {
      background: "rgba(255, 255, 255, 0.9)",
      borderColor: "transparent",
      borderRadius: "24px",
      display: "block",
      marginBottom: "24px",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    });
    card.style.setProperty("break-inside", "avoid");
    card.style.setProperty("-webkit-column-break-inside", "avoid");

    if (item.exportSrc) {
      const image = document.createElement("img");
      image.alt = item.fileName;
      image.crossOrigin = "anonymous";
      image.src = item.exportSrc;
      applyStyles(image, {
        borderColor: "transparent",
        display: "block",
        height: "auto",
        objectFit: "cover",
        width: "100%",
      });
      card.appendChild(image);
    } else {
      const placeholder = document.createElement("div");
      applyStyles(placeholder, {
        alignItems: "center",
        aspectRatio: "4 / 3",
        background: "linear-gradient(135deg, #f8fafc, #e5e7eb)",
        borderColor: "transparent",
        color: "#374151",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      });
      card.appendChild(placeholder);
    }

    if (item.type === "video") {
      const playBadge = document.createElement("div");
      applyStyles(playBadge, {
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.62)",
        borderColor: "transparent",
        borderRadius: "999px",
        display: "flex",
        height: "44px",
        justifyContent: "center",
        left: "16px",
        position: "absolute",
        top: "16px",
        width: "44px",
      });

      const triangle = document.createElement("div");
      triangle.style.borderBottom = "9px solid transparent";
      triangle.style.borderLeft = "15px solid #ffffff";
      triangle.style.borderTop = "9px solid transparent";
      triangle.style.height = "0";
      triangle.style.marginLeft = "3px";
      triangle.style.width = "0";
      playBadge.appendChild(triangle);
      card.appendChild(playBadge);
    }

    grid.appendChild(card);
  });

  root.appendChild(grid);
  return root;
};

const waitForExportImages = (root: HTMLElement) =>
  Promise.all(Array.from(root.querySelectorAll("img")).map(waitForImage));

const nextPaint = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });

const getA4PageCount = (height: number, width: number) => {
  const pageHeight = width * A4_HEIGHT_RATIO;
  return Math.max(1, Math.ceil(Math.max(0, height - 1) / pageHeight));
};

const canvasToPngBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("PNG export failed"));
      }
    }, "image/png");
  });

const canvasToA4PdfBlob = async (canvas: HTMLCanvasElement) => {
  const { jsPDF } = await import("jspdf");
  const pageHeight = Math.round(canvas.width * A4_HEIGHT_RATIO);
  const pageCount = getA4PageCount(canvas.height, canvas.width);
  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = canvas.width;
  pageCanvas.height = pageHeight;
  const pageContext = pageCanvas.getContext("2d");

  if (!pageContext) {
    throw new Error("Canvas is unavailable");
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, pageHeight],
  });

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    if (pageIndex > 0) {
      pdf.addPage([canvas.width, pageHeight], "portrait");
    }

    const sourceY = pageIndex * pageHeight;
    const sourceHeight = Math.min(pageHeight, canvas.height - sourceY);
    pageContext.fillStyle = EXPORT_PAGE_BACKGROUND;
    pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    pageContext.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      sourceHeight,
      0,
      0,
      canvas.width,
      sourceHeight,
    );
    pdf.addImage(
      pageCanvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      canvas.width,
      pageHeight,
    );
  }

  return pdf.output("blob");
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

function PreviewPage() {
  const items = useMediaStore((s) => s.items);
  const bgAudio = useMediaStore((s) => s.bgAudio);
  const bgAudioUrl = useMediaStore((s) => s.bgAudioUrl);
  const bgAudioName = useMediaStore((s) => s.bgAudioName);
  const setBgAudioEnabled = useMediaStore((s) => s.setBgAudioEnabled);
  const [playing, setPlaying] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [slideshowAt, setSlideshowAt] = useState<number | null>(null);
  // Per-item mute state — default muted (true) for every media item
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const bgAudioRef = useRef<HTMLAudioElement>(null);
  const [a4PageCount, setA4PageCount] = useState(1);
  const isSingleA4Preview = a4PageCount <= 1;

  const isMuted = (id: string) => mutedMap[id] ?? true;

  const toggleItemMute = (id: string) => {
    setMutedMap((m) => {
      // If this video is muted, unmute only it and mute all others + bg audio
      if ((m[id] ?? true) === true) {
        const newMap: Record<string, boolean> = {};
        items.forEach((item) => {
          if (item.type === "video") {
            newMap[item.id] = item.id === id ? false : true; // Unmute clicked, mute others
          }
        });
        // Mute background audio when any video is unmuted
        setBgAudioEnabled(false);
        // Update video refs
        Object.entries(newMap).forEach(([vidId, muted]) => {
          const v = videoRefs.current[vidId];
          if (v) v.muted = muted;
        });
        return newMap;
      } else {
        // If video is unmuted, mute it
        const next = { ...m, [id]: true };
        const v = videoRefs.current[id];
        if (v) v.muted = true;
        return next;
      }
    });
  };

  const handlePlayToggle = () => {
    const next = !playing;
    setPlaying(next);
    Object.entries(videoRefs.current).forEach(([id, v]) => {
      if (!v) return;
      v.muted = isMuted(id);
      if (next) v.play().catch(() => {});
      else v.pause();
    });
    if (bgAudioRef.current && bgAudioUrl) {
      bgAudioRef.current.muted = !bgAudio;
      if (next) bgAudioRef.current.play().catch(() => {});
      else bgAudioRef.current.pause();
    }
  };

  const handleBgAudioToggle = () => {
    const newBgAudioState = !bgAudio;
    setBgAudioEnabled(newBgAudioState);
    // If turning on background audio, mute all videos
    if (newBgAudioState) {
      setMutedMap((m) => {
        const newMap: Record<string, boolean> = {};
        items.forEach((item) => {
          if (item.type === "video") {
            newMap[item.id] = true; // Mute all videos
          }
        });
        Object.entries(newMap).forEach(([vidId, muted]) => {
          const v = videoRefs.current[vidId];
          if (v) v.muted = muted;
        });
        return newMap;
      });
    }
    if (bgAudioRef.current) bgAudioRef.current.muted = !newBgAudioState;
  };

  useEffect(() => {
    if (bgAudioRef.current) bgAudioRef.current.muted = !bgAudio;
  }, [bgAudio]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || items.length === 0) {
      setA4PageCount(1);
      return;
    }

    const measure = () => {
      const previewWidth =
        grid.clientWidth || grid.getBoundingClientRect().width;
      if (previewWidth <= 0) return;

      const pageCount = getA4PageCount(grid.scrollHeight, previewWidth);
      setA4PageCount(pageCount);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);

    const media = Array.from(grid.querySelectorAll("img, video"));
    media.forEach((element) => {
      element.addEventListener("load", measure);
      element.addEventListener("loadedmetadata", measure);
      element.addEventListener("error", measure);
    });
    window.addEventListener("resize", measure);
    const timeoutId = window.setTimeout(measure, 0);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", measure);
      media.forEach((element) => {
        element.removeEventListener("load", measure);
        element.removeEventListener("loadedmetadata", measure);
        element.removeEventListener("error", measure);
      });
    };
  }, [items]);

  const exportAs = async (format: ExportFormat) => {
    if (!gridRef.current || items.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    setExporting(true);
    let exportNode: HTMLElement | null = null;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const preparedItems = await prepareExportItems(items, videoRefs);
      exportNode = createExportNode(preparedItems);
      document.body.appendChild(exportNode);
      await waitForExportImages(exportNode);
      await nextPaint();

      const exportPageCount = getA4PageCount(
        exportNode.offsetHeight,
        EXPORT_WIDTH,
      );
      if (format === "png" && exportPageCount > 1) {
        toast.error(
          "PNG is available only when the preview fits on one A4 page",
        );
        return;
      }

      const canvas = await html2canvas(exportNode, {
        backgroundColor: EXPORT_PAGE_BACKGROUND,
        scale: Math.min(2, Math.max(1, window.devicePixelRatio || 1)),
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        width: exportNode.offsetWidth,
        height: Math.max(exportNode.offsetHeight, EXPORT_PAGE_HEIGHT),
        windowWidth: EXPORT_WIDTH,
        onclone: (clonedDoc) => {
          applyStyles(clonedDoc.documentElement, {
            background: EXPORT_PAGE_BACKGROUND,
            backgroundColor: EXPORT_PAGE_BACKGROUND,
            backgroundImage: "none",
            color: "#111827",
          });
          applyStyles(clonedDoc.body, {
            background: EXPORT_PAGE_BACKGROUND,
            backgroundColor: EXPORT_PAGE_BACKGROUND,
            backgroundImage: "none",
            color: "#111827",
          });
        },
      });

      if (format === "png") {
        const pngBlob = await canvasToPngBlob(canvas);
        downloadBlob(pngBlob, `memorywall-${Date.now()}.png`);
        toast.success("PNG exported successfully!");
      } else {
        const pdfBlob = await canvasToA4PdfBlob(canvas);
        downloadBlob(pdfBlob, `memorywall-${Date.now()}.pdf`);
        toast.success("PDF exported successfully!");
      }
    } catch (e) {
      console.error("Export error:", e);
      const message = e instanceof Error ? e.message : String(e);
      toast.error(`Export failed: ${message}`);
    } finally {
      exportNode?.remove();
      setExporting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-soft)" }}
    >
      <AppNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            Step 3 of 3 · Share Gift
          </div>
          <h1 className="rainbow-text text-5xl font-bold tracking-tight">
            Your memory gift is ready.
          </h1>
          <p className="mt-2 text-muted-foreground">
            {items.length} memories arranged in a beautiful slideshow. Perfect
            for sharing on special occasions.
          </p>
        </div>

        <div className="glass mb-6 flex flex-wrap items-center gap-3 rounded-2xl p-3">
          <Button
            size="lg"
            className="rainbow-btn rounded-full shadow-[var(--shadow-elegant)] hover:opacity-90"
            onClick={handlePlayToggle}
          >
            {playing ? (
              <>
                <Pause className="mr-2 h-4 w-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4 fill-current" /> Generate Preview
              </>
            )}
          </Button>

          {bgAudioUrl && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleBgAudioToggle}
              title={
                bgAudio ? "Mute background audio" : "Unmute background audio"
              }
            >
              {bgAudio ? (
                <Volume2 className="mr-2 h-4 w-4" />
              ) : (
                <VolumeX className="mr-2 h-4 w-4" />
              )}
              <span className="max-w-[140px] truncate text-xs">
                {bgAudioName ?? "Background"}
              </span>
            </Button>
          )}

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              disabled={exporting}
              onClick={() => exportAs("pdf")}
            >
              <Download className="mr-2 h-4 w-4" />
              {exporting ? "Exporting…" : "Export PDF"}
            </Button>
            {isSingleA4Preview && (
              <Button
                variant="outline"
                className="rounded-full"
                disabled={exporting}
                onClick={() => exportAs("png")}
              >
                <FileImage className="mr-2 h-4 w-4" />
                {exporting ? "Exporting…" : "Export PNG"}
              </Button>
            )}
          </div>
        </div>

        <div className="mb-4 text-right text-xs text-muted-foreground">
          Printable
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elegant)]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.82)), url(${previewBackground})`,
            backgroundPosition: "center top",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
          }}
        >
          <div
            ref={gridRef}
            className="relative p-3 sm:p-5 sm:columns-2 lg:columns-3 [column-fill:_balance] [column-gap:12px] lg:[column-gap:18px]"
          >
            {items.map((item, i) => {
              const muted = isMuted(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setSlideshowAt(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSlideshowAt(i);
                    }
                  }}
                  className="group relative mb-3 block w-full cursor-pointer overflow-hidden rounded-2xl bg-background/90 text-left shadow-[var(--shadow-card)] break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:mb-4"
                  style={{
                    animation: playing
                      ? `fadeIn 0.6s ease ${i * 0.15}s both`
                      : undefined,
                  }}
                >
                  {item.type === "video" ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      src={item.url}
                      className="pointer-events-none block h-auto w-full"
                      loop
                      playsInline
                      muted={muted}
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.fileName}
                      crossOrigin="anonymous"
                      className="block h-auto w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Per-item mute toggle — videos only */}
                  {item.type === "video" && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItemMute(item.id);
                      }}
                      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-white/15"
                      aria-label={muted ? "Unmute" : "Mute"}
                      title={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <div className="text-xs font-semibold text-white">
                      {item.eventName}
                    </div>
                    <div className="text-[10px] text-white/70">{item.tag}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {items.length === 0 && (
            <div className="relative py-20 text-center text-sm text-slate-600">
              Upload media to generate a preview.
            </div>
          )}
        </div>

        {bgAudioUrl && (
          <audio
            ref={bgAudioRef}
            src={bgAudioUrl}
            loop
            muted={!bgAudio}
            preload="auto"
          />
        )}

        {bgAudio && bgAudioUrl && playing && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-primary"
                  style={{
                    height: `${8 + Math.random() * 12}px`,
                    animation: `pulse 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            Background audio playing
          </div>
        )}

        {slideshowAt !== null && (
          <Slideshow
            items={items}
            startIndex={slideshowAt}
            audio={bgAudio}
            onClose={() => setSlideshowAt(null)}
          />
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          to { transform: scaleY(1.8); }
        }
      `}</style>
    </div>
  );
}
