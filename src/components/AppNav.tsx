import { Link, useLocation } from "@tanstack/react-router";
import {
  Upload,
  FolderOpen,
  PlayCircle,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/collect", label: "Collect", icon: Upload },
  { to: "/folder", label: "Arrange", icon: FolderOpen },
  { to: "/preview", label: "Share", icon: PlayCircle },
];

export function AppNav() {
  const loc = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
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

  return (
    <>
      <header className="glass-nav">
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rainbow-btn flex h-8 w-8 items-center justify-center rounded-xl">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div
                className={`text-sm font-semibold tracking-tight ${
                  isDark ? "rainbow-text" : ""
                }`}
              >
                MemoryWall
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider ${
                  isDark ? "text-white/70" : "text-muted-foreground"
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
                        : "rainbow-btn shadow-sm"
                      : isDark
                        ? "text-white/78 hover:text-white"
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
                isDark ? "text-white/78 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </nav>
        </div>
      </header>
      <div className="h-20" /> {/* Spacer for fixed header */}
    </>
  );
}
