import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Le94OTHx.js";
import { u as useMediaStore, A as AppNav } from "./media-store-Cw2u2Zpg.js";
import { c as createLucideIcon, B as Button } from "./button-DedvRDMF.js";
import { X, F as FileImage } from "./x-BjhWtc5N.js";
import { P as Play } from "./play-BErrzjwO.js";
import { t as toast } from "./router-DqYv53_E.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./upload-BOXKnkCd.js";
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$3);
const __iconNode$2 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
];
const Pause = createLucideIcon("pause", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
function Slideshow({
  items,
  startIndex = 0,
  onClose,
  audio,
  intervalMs = 4e3
}) {
  const [index, setIndex] = reactExports.useState(startIndex);
  const [playing, setPlaying] = reactExports.useState(true);
  const videoRef = reactExports.useRef(null);
  const current = items[index];
  const next = items[(index + 1) % items.length];
  reactExports.useEffect(() => {
    const onKey = (e) => {
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
  reactExports.useEffect(() => {
    if (!playing || items.length <= 1) return;
    if (current?.type === "video") return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearTimeout(t);
  }, [index, playing, items.length, intervalMs, current]);
  if (!current) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black", children: [
    items.map((item, i) => {
      const active = i === index;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 transition-opacity duration-1000 ease-in-out",
          style: { opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none" },
          children: item.type === "video" ? active ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              src: item.url,
              className: "h-full w-full object-contain",
              autoPlay: true,
              playsInline: true,
              muted: !audio,
              onEnded: () => {
                if (playing) setIndex((idx) => (idx + 1) % items.length);
              }
            }
          ) : null : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.url,
              alt: item.fileName,
              className: "h-full w-full object-contain"
            }
          )
        },
        item.id
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.2em] text-white/60", children: [
        current.eventName,
        " · ",
        current.tag
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-semibold text-white", children: current.fileName })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 top-0 flex items-center justify-between p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur", children: [
        index + 1,
        " / ",
        items.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20",
          "aria-label": "Close slideshow",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 flex items-center justify-center pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIndex((i) => (i - 1 + items.length) % items.length),
          className: "flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15",
          "aria-label": "Previous",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setPlaying((p) => !p),
          className: "flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-white/90",
          "aria-label": playing ? "Pause" : "Play",
          children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 fill-current" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIndex((i) => (i + 1) % items.length),
          className: "flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15",
          "aria-label": "Next",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
        }
      )
    ] }) }),
    next && next.id !== current.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-white/40", children: "Up next" }) })
  ] });
}
const EXPORT_WIDTH = 1200;
const A4_HEIGHT_RATIO = Math.SQRT2;
const EXPORT_PAGE_HEIGHT = Math.round(EXPORT_WIDTH * A4_HEIGHT_RATIO);
const EXPORT_MAX_MEDIA_DIMENSION = 1800;
const EXPORT_MEDIA_LOAD_TIMEOUT_MS = 8e3;
const EXPORT_PAGE_BACKGROUND = "#ffffff";
const waitForImage = (image) => new Promise((resolve, reject) => {
  if (image.complete && image.naturalWidth > 0) {
    resolve();
    return;
  }
  let timeoutId = null;
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
const drawMediaToDataUrl = (source, naturalWidth, naturalHeight) => {
  const largestSide = Math.max(naturalWidth, naturalHeight);
  const scale = largestSide > EXPORT_MAX_MEDIA_DIMENSION ? EXPORT_MAX_MEDIA_DIMENSION / largestSide : 1;
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
const imageToExportSrc = async (src) => {
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
const captureVideoFrame = (video) => {
  try {
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) {
      return null;
    }
    return drawMediaToDataUrl(video, video.videoWidth, video.videoHeight);
  } catch {
    return null;
  }
};
const loadVideoFrameFromSrc = (src) => new Promise((resolve) => {
  const video = document.createElement("video");
  let settled = false;
  let timeoutId = null;
  const cleanup = () => {
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    video.removeEventListener("loadeddata", handleLoadedData);
    video.removeEventListener("error", handleError);
    video.pause();
    video.removeAttribute("src");
    video.load();
  };
  const settle = (value) => {
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
const prepareExportItems = async (items, videoRefs) => Promise.all(items.map(async (item) => {
  const exportSrc = item.type === "video" ? captureVideoFrame(videoRefs.current[item.id]) ?? await loadVideoFrameFromSrc(item.url) : await imageToExportSrc(item.url);
  return {
    ...item,
    exportSrc
  };
}));
const applyStyles = (element, styles) => {
  Object.assign(element.style, styles);
};
const createExportNode = (items) => {
  const root = document.createElement("div");
  root.setAttribute("data-memorywall-export", "true");
  applyStyles(root, {
    background: EXPORT_PAGE_BACKGROUND,
    borderColor: "transparent",
    boxSizing: "border-box",
    color: "#111827",
    colorScheme: "light",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    left: "-10000px",
    lineHeight: "1.4",
    minHeight: `${EXPORT_PAGE_HEIGHT}px`,
    position: "fixed",
    top: "0",
    width: `${EXPORT_WIDTH}px`,
    zIndex: "-1"
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
    background: EXPORT_PAGE_BACKGROUND,
    borderColor: "transparent",
    columnCount: items.length > 2 ? "3" : String(Math.max(items.length, 1)),
    columnGap: "0",
    width: "100%"
  });
  items.forEach((item) => {
    const card = document.createElement("article");
    applyStyles(card, {
      background: EXPORT_PAGE_BACKGROUND,
      borderColor: "transparent",
      display: "block",
      overflow: "hidden",
      position: "relative",
      width: "100%"
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
        width: "100%"
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
        width: "100%"
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
        width: "44px"
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
const waitForExportImages = (root) => Promise.all(Array.from(root.querySelectorAll("img")).map(waitForImage));
const nextPaint = () => new Promise((resolve) => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => resolve());
  });
});
const getA4PageCount = (height, width) => {
  const pageHeight = width * A4_HEIGHT_RATIO;
  return Math.max(1, Math.ceil(Math.max(0, height - 1) / pageHeight));
};
const canvasToPngBlob = (canvas) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (blob) {
      resolve(blob);
    } else {
      reject(new Error("PNG export failed"));
    }
  }, "image/png");
});
const canvasToA4PdfBlob = async (canvas) => {
  const {
    jsPDF
  } = await import("./jspdf.es.min-DZ7b8yBw.js").then((n) => n.j);
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
    format: [canvas.width, pageHeight]
  });
  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    if (pageIndex > 0) {
      pdf.addPage([canvas.width, pageHeight], "portrait");
    }
    const sourceY = pageIndex * pageHeight;
    const sourceHeight = Math.min(pageHeight, canvas.height - sourceY);
    pageContext.fillStyle = EXPORT_PAGE_BACKGROUND;
    pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    pageContext.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
    pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, pageHeight);
  }
  return pdf.output("blob");
};
const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
};
function PreviewPage() {
  const items = useMediaStore((s) => s.items);
  const bgAudio = useMediaStore((s) => s.bgAudio);
  const bgAudioUrl = useMediaStore((s) => s.bgAudioUrl);
  const bgAudioName = useMediaStore((s) => s.bgAudioName);
  const setBgAudioEnabled = useMediaStore((s) => s.setBgAudioEnabled);
  const [playing, setPlaying] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  const [slideshowAt, setSlideshowAt] = reactExports.useState(null);
  const [mutedMap, setMutedMap] = reactExports.useState({});
  const gridRef = reactExports.useRef(null);
  const videoRefs = reactExports.useRef({});
  const bgAudioRef = reactExports.useRef(null);
  const [a4PageCount, setA4PageCount] = reactExports.useState(1);
  const isSingleA4Preview = a4PageCount <= 1;
  const isMuted = (id) => mutedMap[id] ?? true;
  const toggleItemMute = (id) => {
    setMutedMap((m) => {
      if ((m[id] ?? true) === true) {
        const newMap = {};
        items.forEach((item) => {
          if (item.type === "video") {
            newMap[item.id] = item.id === id ? false : true;
          }
        });
        setBgAudioEnabled(false);
        Object.entries(newMap).forEach(([vidId, muted]) => {
          const v = videoRefs.current[vidId];
          if (v) v.muted = muted;
        });
        return newMap;
      } else {
        const next = {
          ...m,
          [id]: true
        };
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
      if (next) v.play().catch(() => {
      });
      else v.pause();
    });
    if (bgAudioRef.current && bgAudioUrl) {
      bgAudioRef.current.muted = !bgAudio;
      if (next) bgAudioRef.current.play().catch(() => {
      });
      else bgAudioRef.current.pause();
    }
  };
  const handleBgAudioToggle = () => {
    const newBgAudioState = !bgAudio;
    setBgAudioEnabled(newBgAudioState);
    if (newBgAudioState) {
      setMutedMap((m) => {
        const newMap = {};
        items.forEach((item) => {
          if (item.type === "video") {
            newMap[item.id] = true;
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
  reactExports.useEffect(() => {
    if (bgAudioRef.current) bgAudioRef.current.muted = !bgAudio;
  }, [bgAudio]);
  reactExports.useEffect(() => {
    const grid = gridRef.current;
    if (!grid || items.length === 0) {
      setA4PageCount(1);
      return;
    }
    const measure = () => {
      const previewWidth = grid.clientWidth || grid.getBoundingClientRect().width;
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
  const exportAs = async (format) => {
    if (!gridRef.current || items.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    setExporting(true);
    let exportNode = null;
    try {
      const html2canvas = (await import("./html2canvas.esm-C17pzFXx.js")).default;
      const preparedItems = await prepareExportItems(items, videoRefs);
      exportNode = createExportNode(preparedItems);
      document.body.appendChild(exportNode);
      await waitForExportImages(exportNode);
      await nextPaint();
      const exportPageCount = getA4PageCount(exportNode.offsetHeight, EXPORT_WIDTH);
      if (format === "png" && exportPageCount > 1) {
        toast.error("PNG is available only when the preview fits on one A4 page");
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
            color: "#111827"
          });
          applyStyles(clonedDoc.body, {
            background: EXPORT_PAGE_BACKGROUND,
            backgroundColor: EXPORT_PAGE_BACKGROUND,
            backgroundImage: "none",
            color: "#111827"
          });
        }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: "var(--gradient-soft)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground", children: "Step 3 of 3 · Share Gift" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "rainbow-text text-5xl font-bold tracking-tight", children: "Your memory gift is ready." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
          items.length,
          " memories arranged in a beautiful slideshow. Perfect for sharing on special occasions."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass mb-6 flex flex-wrap items-center gap-3 rounded-2xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rainbow-btn rounded-full shadow-[var(--shadow-elegant)] hover:opacity-90", onClick: handlePlayToggle, children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "mr-2 h-4 w-4 fill-current" }),
          " Pause"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-4 w-4 fill-current" }),
          " Generate Preview"
        ] }) }),
        bgAudioUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full", onClick: handleBgAudioToggle, title: bgAudio ? "Mute background audio" : "Unmute background audio", children: [
          bgAudio ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "mr-2 h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[140px] truncate text-xs", children: bgAudioName ?? "Background" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full", disabled: exporting, onClick: () => exportAs("pdf"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
            exporting ? "Exporting…" : "Export PDF"
          ] }),
          isSingleA4Preview && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full", disabled: exporting, onClick: () => exportAs("png"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "mr-2 h-4 w-4" }),
            exporting ? "Exporting…" : "Export PNG"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-right text-xs text-muted-foreground", children: "Printable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: gridRef, className: "overflow-hidden rounded-3xl border border-border bg-black shadow-[var(--shadow-elegant)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:columns-2 lg:columns-3 [column-fill:_balance] [column-gap:0]", children: items.map((item, i) => {
          const muted = isMuted(item.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setSlideshowAt(i), role: "button", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSlideshowAt(i);
            }
          }, className: "group relative block w-full cursor-pointer overflow-hidden bg-background text-left break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", style: {
            animation: playing ? `fadeIn 0.6s ease ${i * 0.15}s both` : void 0
          }, children: [
            item.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: (el) => {
              videoRefs.current[item.id] = el;
            }, src: item.url, className: "pointer-events-none block h-auto w-full", loop: true, playsInline: true, muted, preload: "metadata" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.fileName, crossOrigin: "anonymous", className: "block h-auto w-full transition-transform duration-700 group-hover:scale-105" }),
            item.type === "video" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
              e.stopPropagation();
              toggleItemMute(item.id);
            }, className: "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-white/15", "aria-label": muted ? "Unmute" : "Mute", title: muted ? "Unmute" : "Mute", children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-white", children: item.eventName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/70", children: item.tag })
            ] })
          ] }, item.id);
        }) }),
        items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-sm text-white/60", children: "Upload media to generate a preview." })
      ] }),
      bgAudioUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: bgAudioRef, src: bgAudioUrl, loop: true, muted: !bgAudio, preload: "auto" }),
      bgAudio && bgAudioUrl && playing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 rounded-full bg-primary", style: {
          height: `${8 + Math.random() * 12}px`,
          animation: `pulse 0.8s ease-in-out ${i * 0.1}s infinite alternate`
        } }, i)) }),
        "Background audio playing"
      ] }),
      slideshowAt !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(Slideshow, { items, startIndex: slideshowAt, audio: bgAudio, onClose: () => setSlideshowAt(null) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          to { transform: scaleY(1.8); }
        }
      ` })
  ] });
}
export {
  PreviewPage as component
};
