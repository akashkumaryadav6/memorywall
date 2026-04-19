import { M as useRouter, r as reactExports, U as jsxRuntimeExports, T as React } from "./worker-entry-Le94OTHx.js";
import { L as Link } from "./router-DqYv53_E.js";
import { c as createLucideIcon, S as Sparkles } from "./button-DedvRDMF.js";
import { U as Upload, F as FolderOpen, C as CirclePlay } from "./upload-BOXKnkCd.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
];
const Moon = createLucideIcon("moon", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
const links = [
  { to: "/collect", label: "Collect", icon: Upload },
  { to: "/folder", label: "Arrange", icon: FolderOpen },
  { to: "/preview", label: "Share", icon: CirclePlay }
];
function AppNav() {
  const loc = useLocation();
  const [isDark, setIsDark] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  reactExports.useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rainbow-btn flex h-8 w-8 items-center justify-center rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold tracking-tight", children: "MemoryWall" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Special Occasion Gifts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-0.5 rounded-full p-0.5", children: [
        links.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: `flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-all ${active ? "glass-strong text-foreground shadow-sm" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
              ]
            },
            to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleTheme,
            className: "ml-2 flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-muted-foreground transition-all",
            title: isDark ? "Switch to light mode" : "Switch to dark mode",
            children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20" }),
    " "
  ] });
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
const sample = [
  {
    id: "IMG_001",
    originalName: "IMG_001.jpg",
    fileName: "Birthday_Ajay_Photo1.jpg",
    type: "photo",
    eventName: "Birthday",
    tag: "Ajay",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
  },
  {
    id: "VID_002",
    originalName: "VID_002.mp4",
    fileName: "AGM2026_Speech.mp4",
    type: "video",
    eventName: "AGM 2026",
    tag: "Speech",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "IMG_003",
    originalName: "IMG_003.jpg",
    fileName: "Team_Event_Group.jpg",
    type: "photo",
    eventName: "Team Event",
    tag: "Group",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  }
];
const useMediaStore = create((set) => ({
  items: sample,
  bgAudio: true,
  bgAudioUrl: null,
  bgAudioName: null,
  setItems: (items) => set({ items }),
  addItems: (items) => set((s) => ({ items: [...s.items, ...items] })),
  updateItem: (id, patch) => set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, ...patch } : i) })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  toggleAudio: () => set((s) => ({ bgAudio: !s.bgAudio })),
  setBgAudio: (url, name = null) => set({ bgAudioUrl: url, bgAudioName: name, bgAudio: !!url }),
  setBgAudioEnabled: (enabled) => set({ bgAudio: enabled })
}));
export {
  AppNav as A,
  useMediaStore as u
};
