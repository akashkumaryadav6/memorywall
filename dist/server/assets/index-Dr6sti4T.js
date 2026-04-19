import { U as jsxRuntimeExports } from "./worker-entry-D3RwNIBS.js";
import { a as useNavigate } from "./router-CYwdL5gl.js";
import { S as Sparkles, B as Button } from "./button-BUu2kfTU.js";
import { H as Heart, G as Gift, A as ArrowRight } from "./heart-Bgz8SIQU.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function LandingPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full flex items-center justify-center text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-8 w-8 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "rainbow-text mb-4 text-4xl font-bold tracking-tight sm:text-6xl", children: "MemoryWall" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-lg text-muted-foreground sm:text-xl", children: "Special Occasion Gifts for" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-foreground sm:text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Birthdays" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Anniversaries" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Celebrations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground sm:text-lg", children: "Create beautiful, personalized memory slideshows that capture life's most precious moments. The perfect gift to cherish and relive special memories forever." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rainbow-btn group relative overflow-hidden rounded-full px-6 py-3 text-base font-semibold shadow-2xl transition-all hover:shadow-3xl hover:scale-105", onClick: () => navigate({
          to: "/collect"
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
          "Cherish Now",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Free to create • No account required • Instant download" })
      ] })
    ] })
  ] }) });
}
export {
  LandingPage as component
};
