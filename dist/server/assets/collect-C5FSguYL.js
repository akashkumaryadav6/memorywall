import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-D3RwNIBS.js";
import { a as useNavigate, u as useMediaStore, t as toast } from "./router-CYwdL5gl.js";
import { A as AppNav } from "./AppNav-BgSj9EQt.js";
import { c as createLucideIcon, B as Button } from "./button-BUu2kfTU.js";
import { U as Upload } from "./upload-C6-HwgK8.js";
import { X, F as FileImage } from "./x-BPhMf3M_.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
      key: "1tzo1f"
    }
  ]
];
const FilePlay = createLucideIcon("file-play", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
function SafetyPanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Safety Panel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Use only public / shareable media." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• No confidential or UPSI content." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Human review required before sharing." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• No PII, internal documents, or chat data." })
    ] })
  ] });
}
const uploadBackground = "/assets/uploadfiles-DpIZEm4j.png";
const rules = ["Use Event_Person_Type format", "Use underscores, no spaces", "Include year for recurring events", "Mark photos vs videos clearly"];
function IntakePage() {
  const navigate = useNavigate();
  const inputRef = reactExports.useRef(null);
  const audioInputRef = reactExports.useRef(null);
  const items = useMediaStore((s) => s.items);
  const addItems = useMediaStore((s) => s.addItems);
  const removeItem = useMediaStore((s) => s.removeItem);
  const bgAudioUrl = useMediaStore((s) => s.bgAudioUrl);
  const bgAudioName = useMediaStore((s) => s.bgAudioName);
  const setBgAudio = useMediaStore((s) => s.setBgAudio);
  const [drag, setDrag] = reactExports.useState(false);
  const handleAudioUpload = (e) => {
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
  const handleFiles = (files) => {
    if (!files) return;
    const newItems = Array.from(files).map((f, i) => {
      const isVideo = f.type.startsWith("video/");
      const id = `${isVideo ? "VID" : "IMG"}_${String(items.length + i + 1).padStart(3, "0")}`;
      return {
        id,
        originalName: f.name,
        fileName: `Event_${id}.${isVideo ? "mp4" : "jpg"}`,
        type: isVideo ? "video" : "photo",
        eventName: "",
        tag: "",
        url: URL.createObjectURL(f)
      };
    });
    addItems(newItems);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: "var(--gradient-soft)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground", children: "Step 1 of 3 · Collect Memories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "rainbow-text text-5xl font-bold tracking-tight", children: "Create a special memory gift." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-muted-foreground", children: "Upload photos and videos for birthdays, anniversaries, celebrations, or memorials. We'll create a beautiful slideshow that captures your cherished moments." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (e) => {
          e.preventDefault();
          setDrag(true);
        }, onDragLeave: () => setDrag(false), onDrop: (e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(e.dataTransfer.files);
        }, className: `relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed p-12 text-center transition-all ${drag ? "border-primary bg-primary/5" : "border-border bg-card"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-20", style: {
            backgroundImage: `url(${uploadBackground})`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white/72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rainbow-btn relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "relative z-10 text-lg font-semibold text-black", children: "Drag files here or click to browse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative z-10 mt-1 text-sm text-slate-500", children: "JPG, PNG, MP4 up to 50MB each" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", multiple: true, accept: "image/*,video/*", className: "hidden", onChange: (e) => handleFiles(e.target.files) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rainbow-btn relative z-10 mt-6 rounded-full px-8 shadow-[var(--shadow-elegant)] hover:opacity-90", onClick: () => inputRef.current?.click(), children: "Upload Media" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-sm font-semibold", children: "Main Audio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Optional background track that plays during the preview." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: audioInputRef, type: "file", accept: "audio/*", className: "hidden", onChange: handleAudioUpload }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full rounded-full", onClick: () => audioInputRef.current?.click(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "mr-2 h-4 w-4" }),
              bgAudioUrl ? "Change Audio" : "Upload Main Audio"
            ] }),
            bgAudioUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "h-4 w-4 shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-xs", children: bgAudioName ?? "Background audio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearBgAudio, className: "rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground", title: "Remove", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-sm font-semibold", children: "Naming Rules" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: rules.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: r })
            ] }, r)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 text-sm font-semibold", children: [
            "File List (",
            items.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6", children: [
            items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group overflow-hidden rounded-lg border border-border bg-background shadow-[var(--shadow-card)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
                item.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: item.url, className: "h-full w-full object-cover", muted: true, playsInline: true, preload: "metadata" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.fileName, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-background/90 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider backdrop-blur", children: [
                  item.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlay, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-2.5 w-2.5" }),
                  item.type
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(item.id), className: "absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground backdrop-blur hover:text-foreground", "aria-label": `Remove ${item.fileName}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] font-medium", children: item.fileName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[10px] text-muted-foreground", children: item.id })
              ] })
            ] }, item.id)),
            items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground col-span-full", children: "No files yet. Upload to get started." })
          ] }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4 w-full rounded-full", onClick: () => navigate({
            to: "/folder"
          }), children: "Go Arrange →" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyPanel, {}) })
      ] })
    ] })
  ] });
}
export {
  IntakePage as component
};
