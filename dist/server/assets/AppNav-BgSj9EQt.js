import { M as useRouter, r as reactExports, U as jsxRuntimeExports } from "./worker-entry-D3RwNIBS.js";
import { L as Link } from "./router-CYwdL5gl.js";
import { c as createLucideIcon, S as Sparkles } from "./button-BUu2kfTU.js";
import { U as Upload, F as FolderOpen, C as CirclePlay } from "./upload-C6-HwgK8.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 18a6 6 0 0 0 0-12v12z", key: "j4l70d" }]
];
const Contrast = createLucideIcon("contrast", __iconNode$2);
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
const themes = ["light", "dark", "bw", "wb"];
function AppNav() {
  const loc = useLocation();
  const [theme, setTheme] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark" || saved === "bw" || saved === "wb") {
        return saved;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  const isDark = theme === "dark";
  const isBw = theme === "bw";
  const isWb = theme === "wb";
  const isMono = isBw || isWb;
  reactExports.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "bw", "wb");
    if (theme !== "light") {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
  };
  const themeLabel = theme === "light" ? "Color" : theme === "dark" ? "Dark" : theme === "bw" ? "Light" : "Contrast";
  const themeTitle = theme === "light" ? "Switch to dark mode" : theme === "dark" ? "Switch to light mode" : theme === "bw" ? "Switch to contrast mode" : "Switch to color mode";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex h-8 w-8 items-center justify-center rounded-xl ${isMono ? "bg-foreground text-background" : "rainbow-btn"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `text-sm font-semibold tracking-tight ${isMono ? "text-foreground" : "rainbow-text"}`,
              children: "MemoryWall"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `text-[10px] uppercase tracking-wider ${isDark || isWb ? "text-white/70" : isBw ? "text-black/70" : "text-muted-foreground"}`,
              children: "Special Occasion Gifts"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-0.5 rounded-full p-0.5", children: [
        links.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: `flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-all ${active ? isDark ? "bg-white text-black shadow-sm hover:bg-white" : isBw ? "bg-black text-white shadow-sm hover:bg-black" : isWb ? "bg-white/90 text-black shadow-sm hover:bg-white" : "rainbow-btn shadow-sm" : isDark || isWb ? "text-white/78 hover:text-white" : isBw ? "text-black/70 hover:text-black" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
              ]
            },
            to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: toggleTheme,
            className: `ml-2 flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-all ${isDark || isWb ? "text-white/78 hover:text-white" : isBw ? "text-black/70 hover:text-black" : "text-muted-foreground hover:text-foreground"}`,
            title: themeTitle,
            children: [
              theme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) : theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Contrast, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: themeLabel })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20" }),
    " "
  ] });
}
export {
  AppNav as A
};
