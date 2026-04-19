import { Link, useLocation } from "@tanstack/react-router";
import {
  Upload,
  FolderOpen,
  PlayCircle,
  Sparkles,
  Sun,
  Moon,
  Contrast,
} from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/collect", label: "Collect", icon: Upload },
  { to: "/folder", label: "Arrange", icon: FolderOpen },
  { to: "/preview", label: "Share", icon: PlayCircle },
];

const themes = ["light", "dark", "bw", "wb"] as const;

type ThemeMode = (typeof themes)[number];

export function AppNav() {
  const loc = useLocation();
  const [theme, setTheme] = useState<ThemeMode>(() => {
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

  useEffect(() => {
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

  const themeLabel =
    theme === "light"
      ? "Color"
      : theme === "dark"
        ? "Dark"
        : theme === "bw"
          ? "Light"
          : "Contrast";

  const themeTitle =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
        ? "Switch to light mode"
        : theme === "bw"
          ? "Switch to contrast mode"
          : "Switch to color mode";

  return (
    <>
      <header className="glass-nav">
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                isMono ? "bg-foreground text-background" : "rainbow-btn"
              }`}
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div
                className={`text-sm font-semibold tracking-tight ${
                  isMono ? "text-foreground" : "rainbow-text"
                }`}
              >
                MemoryWall
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider ${
                  isDark || isWb
                    ? "text-white/70"
                    : isBw
                      ? "text-black/70"
                      : "text-muted-foreground"
                }`}
              >
                Special Occasion Gifts
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-0.5 rounded-full p-0.5">
            {links.map(({ to, label, icon: Icon }) => {
              const active = loc.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-all ${
                    active
                      ? isDark
                        ? "bg-white text-black shadow-sm hover:bg-white"
                        : isBw
                          ? "bg-black text-white shadow-sm hover:bg-black"
                          : isWb
                            ? "bg-white/90 text-black shadow-sm hover:bg-white"
                            : "rainbow-btn shadow-sm"
                      : isDark || isWb
                        ? "text-white/78 hover:text-white"
                        : isBw
                          ? "text-black/70 hover:text-black"
                          : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className={`ml-2 flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-all ${
                isDark || isWb
                  ? "text-white/78 hover:text-white"
                  : isBw
                    ? "text-black/70 hover:text-black"
                    : "text-muted-foreground hover:text-foreground"
              }`}
              title={themeTitle}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Contrast className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{themeLabel}</span>
            </button>
          </nav>
        </div>
      </header>
      <div className="h-20" /> {/* Spacer for fixed header */}
    </>
  );
}
