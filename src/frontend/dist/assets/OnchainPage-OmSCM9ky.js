import { j as jsxRuntimeExports, m as motion } from "./index-CxROL3VP.js";
function StubPage({
  title,
  subtitle,
  emoji
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen flex flex-col items-center justify-center pt-16 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { type: "spring", stiffness: 350, damping: 26 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6", children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-black text-white mb-3", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg mb-6", style: { color: "#A7ADB7" }, children: subtitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
            style: {
              background: "rgba(24,214,214,0.08)",
              color: "#18D6D6",
              border: "1px solid rgba(24,214,214,0.2)"
            },
            children: "Coming Soon"
          }
        )
      ]
    }
  ) });
}
function OnchainPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StubPage,
    {
      emoji: "⛓️",
      title: "Onchain AI Models",
      subtitle: "Discover AI models running fully on-chain on the Internet Computer."
    }
  );
}
export {
  OnchainPage as default
};
