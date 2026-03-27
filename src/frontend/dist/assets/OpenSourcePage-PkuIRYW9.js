import { r as reactExports, j as jsxRuntimeExports, m as motion, O as OS_CATEGORIES, b as AnimatePresence, c as OS_MODELS, R as React } from "./index-UjrHmgnZ.js";
function OSModelInitial({ model }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: model.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: `0 0 16px ${model.color}40`,
        fontSize: 18,
        fontWeight: 800,
        color: "#fff",
        letterSpacing: "-0.02em",
        userSelect: "none"
      },
      children: model.initials
    }
  );
}
const OSModelCard = React.memo(function OSModelCard2({
  model,
  index
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `os.item.${index + 1}`,
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring",
        stiffness: 360,
        damping: 26,
        delay: index * 0.04
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: hovered ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hovered ? "0 0 20px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        cursor: "pointer",
        transform: hovered ? "translateZ(0) scale(1.025)" : "translateZ(0)",
        backfaceVisibility: "hidden",
        transition: "transform 0.2s ease",
        willChange: hovered ? "transform" : "auto"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OSModelInitial, { model }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              style: {
                fontWeight: 700,
                fontSize: 15,
                color: "#fff",
                margin: 0,
                lineHeight: 1.3
              },
              children: model.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 12, color: "#A7ADB7", margin: "2px 0 0" }, children: model.developer })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontSize: 13,
              color: "#A7ADB7",
              margin: 0,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textAlign: "center"
            },
            children: model.desc
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              display: "inline-block",
              background: "rgba(24,214,214,0.08)",
              color: "#18D6D6",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 20,
              border: "1px solid rgba(24,214,214,0.2)",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap"
            },
            children: model.specs
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 2 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              "data-ocid": `os.primary_button.${index + 1}`,
              href: model.hfUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "btn-cyan-outline",
              style: {
                flex: 1,
                padding: "7px 0",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center",
                display: "block",
                textDecoration: "none"
              },
              onClick: (e) => e.stopPropagation(),
              children: "Try on HF 🤗"
            }
          ),
          model.githubUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              "data-ocid": `os.secondary_button.${index + 1}`,
              href: model.githubUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "GitHub repository",
              style: {
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "#A7ADB7",
                flexShrink: 0,
                transition: "background 0.2s, color 0.2s",
                textDecoration: "none"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#fff";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#A7ADB7";
              },
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "GitHub repository" })
              ]
            }
          )
        ] })
      ]
    }
  );
});
function OpenSourcePage() {
  const [activeTab, setActiveTab] = reactExports.useState("text");
  const models = OS_MODELS[activeTab];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "main",
    {
      "data-ocid": "os.page",
      style: { minHeight: "100vh", background: "#000" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "relative pb-10 px-4 text-center overflow-hidden",
            style: {
              background: "#000",
              paddingTop: "calc(112px + env(safe-area-inset-top, 0px))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse, rgba(24,214,214,0.06) 0%, transparent 65%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { type: "spring", stiffness: 340, damping: 26 },
                  className: "relative z-10 max-w-2xl mx-auto",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        style: {
                          fontSize: "clamp(2rem, 6vw, 3.5rem)",
                          fontWeight: 900,
                          color: "#fff",
                          margin: "0 0 14px",
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em"
                        },
                        children: "Open Source Models"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontSize: 15,
                          color: "#A7ADB7",
                          maxWidth: 520,
                          margin: "0 auto",
                          lineHeight: 1.6
                        },
                        children: "Cutting-edge community models — fully open weights, Hugging Face ready"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "os.tab",
            style: {
              position: "sticky",
              top: 64,
              zIndex: 30,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.04)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 8,
                  padding: "12px 16px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  maxWidth: 1280,
                  margin: "0 auto"
                },
                className: "os-tabs-row",
                children: OS_CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "os.tab",
                      onClick: () => setActiveTab(cat.id),
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        padding: "8px 18px",
                        borderRadius: 24,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: isActive ? "1px solid rgba(24,214,214,0.4)" : "1px solid rgba(255,255,255,0.10)",
                        background: isActive ? "rgba(24,214,214,0.15)" : "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(12px)",
                        color: isActive ? "#18D6D6" : "rgba(255,255,255,0.65)",
                        boxShadow: isActive ? "0 0 16px rgba(24,214,214,0.2), inset 0 1px 0 rgba(24,214,214,0.15)" : "none",
                        transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
                        flexShrink: 0
                      },
                      children: cat.label
                    },
                    cat.id
                  );
                })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-4 md:px-6 py-8",
            style: { background: "#000", minHeight: 400 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { type: "spring", stiffness: 380, damping: 26 },
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
                children: models.map((model, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OSModelCard, { model, index: i }, model.id))
              },
              activeTab
            ) }) })
          }
        )
      ]
    }
  );
}
export {
  OpenSourcePage as default
};
