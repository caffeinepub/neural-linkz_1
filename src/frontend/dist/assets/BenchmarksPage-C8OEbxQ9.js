import { r as reactExports, j as jsxRuntimeExports, m as motion, b as AnimatePresence } from "./index-HuyRAl6_.js";
const FALLBACK_ARENA_DATA = [
  {
    rank: 1,
    model: "Claude Opus 4.6 Thinking",
    provider: "Anthropic",
    elo: 1503,
    gpqa: "91.2%",
    sweBench: "80.8%",
    arcAgi: "74.3%",
    context: "200K",
    link: "https://claude.ai"
  },
  {
    rank: 2,
    model: "Claude Opus 4.6",
    provider: "Anthropic",
    elo: 1501,
    gpqa: "91.0%",
    sweBench: "80.8%",
    arcAgi: "72.1%",
    context: "200K",
    link: "https://claude.ai"
  },
  {
    rank: 3,
    model: "GPT-5.4-high",
    provider: "OpenAI",
    elo: 1495,
    gpqa: "88.4%",
    sweBench: "76.2%",
    arcAgi: "69.8%",
    context: "128K",
    link: "https://chatgpt.com"
  },
  {
    rank: 4,
    model: "Gemini 3.1 Pro",
    provider: "Google",
    elo: 1493,
    gpqa: "87.9%",
    sweBench: "74.5%",
    arcAgi: "77.1%",
    context: "1M",
    link: "https://gemini.google.com"
  },
  {
    rank: 5,
    model: "Grok-4.20",
    provider: "xAI",
    elo: 1492,
    gpqa: "86.1%",
    sweBench: "72.3%",
    arcAgi: "68.4%",
    context: "128K",
    link: "https://grok.x.ai"
  },
  {
    rank: 6,
    model: "Gemini 3 Pro",
    provider: "Google",
    elo: 1492,
    gpqa: "85.7%",
    sweBench: "71.8%",
    arcAgi: "71.2%",
    context: "1M",
    link: "https://gemini.google.com"
  }
];
const FALLBACK_INTELLIGENCE_DATA = [
  {
    rank: 1,
    model: "Claude Opus 4.6",
    provider: "Anthropic",
    gpqa: "91.2%",
    sweBench: "80.8%",
    arcAgi: "74.3%",
    math: "92.1%",
    context: "200K",
    link: "https://claude.ai"
  },
  {
    rank: 2,
    model: "Gemini 3.1 Pro",
    provider: "Google",
    gpqa: "87.9%",
    sweBench: "74.5%",
    arcAgi: "77.1%",
    math: "88.3%",
    context: "1M",
    link: "https://gemini.google.com"
  },
  {
    rank: 3,
    model: "GPT-5.4",
    provider: "OpenAI",
    gpqa: "88.4%",
    sweBench: "76.2%",
    arcAgi: "69.8%",
    math: "89.6%",
    context: "128K",
    link: "https://chatgpt.com"
  },
  {
    rank: 4,
    model: "Grok-4.20",
    provider: "xAI",
    gpqa: "86.1%",
    sweBench: "72.3%",
    arcAgi: "68.4%",
    math: "87.2%",
    context: "128K",
    link: "https://grok.x.ai"
  },
  {
    rank: 5,
    model: "GLM-5",
    provider: "Z.ai",
    gpqa: "84.3%",
    sweBench: "70.1%",
    arcAgi: "66.9%",
    math: "85.8%",
    context: "128K",
    link: "https://zhipuai.cn"
  }
];
const FALLBACK_OPEN_SOURCE_DATA = [
  {
    rank: 1,
    model: "DeepSeek V3.2",
    provider: "DeepSeek AI",
    params: "685B MoE",
    gpqa: "83.4%",
    sweBench: "68.2%",
    math: "87.1%",
    license: "MIT",
    link: "https://huggingface.co/deepseek-ai"
  },
  {
    rank: 2,
    model: "DeepSeek R1",
    provider: "DeepSeek AI",
    params: "671B MoE",
    gpqa: "82.7%",
    sweBench: "66.5%",
    math: "90.2%",
    license: "MIT",
    link: "https://huggingface.co/deepseek-ai"
  },
  {
    rank: 3,
    model: "Qwen 3.5",
    provider: "Alibaba",
    params: "397B",
    gpqa: "80.1%",
    sweBench: "63.4%",
    math: "85.3%",
    license: "Apache 2.0",
    link: "https://huggingface.co/Qwen"
  },
  {
    rank: 4,
    model: "Llama 4",
    provider: "Meta",
    params: "405B",
    gpqa: "78.6%",
    sweBench: "61.2%",
    math: "82.4%",
    license: "Llama 4",
    link: "https://huggingface.co/meta-llama"
  },
  {
    rank: 5,
    model: "GLM-5",
    provider: "Z.ai",
    params: "744B",
    gpqa: "84.3%",
    sweBench: "70.1%",
    math: "85.8%",
    license: "Custom",
    link: "https://huggingface.co/THUDM"
  }
];
const FALLBACK_ARENA_HIGHLIGHTS = [
  {
    rank: 1,
    model: "Claude Opus 4.6 Thinking",
    provider: "Anthropic",
    badge: "ELO 1503",
    strengths: ["#1 Arena", "Reasoning", "Coding"],
    link: "https://claude.ai",
    color: "#18D6D6",
    elo: 1503
  },
  {
    rank: 2,
    model: "GPT-5.4-high",
    provider: "OpenAI",
    badge: "ELO 1495",
    strengths: ["Top-3 Arena", "Balanced", "Multimodal"],
    link: "https://chatgpt.com",
    color: "#10a37f",
    elo: 1495
  },
  {
    rank: 3,
    model: "Claude Opus 4.6",
    provider: "Anthropic",
    badge: "ELO 1501",
    strengths: ["GPQA 91%+", "SWE-bench 80.8%", "Coding"],
    link: "https://claude.ai",
    color: "#18D6D6",
    elo: 1501
  },
  {
    rank: 4,
    model: "Gemini 3.1 Pro",
    provider: "Google",
    badge: "ELO 1493",
    strengths: ["ARC-AGI-2 77%", "1M Context", "Multimodal"],
    link: "https://gemini.google.com",
    color: "#4285F4",
    elo: 1493
  },
  {
    rank: 5,
    model: "Grok-4.20",
    provider: "xAI",
    badge: "ELO 1492",
    strengths: ["All-rounder", "X Integration", "Fast"],
    link: "https://grok.x.ai",
    color: "#ffffff",
    elo: 1492
  }
];
const FALLBACK_INTELLIGENCE_HIGHLIGHTS = [
  {
    rank: 1,
    model: "Claude Opus 4.6",
    provider: "Anthropic",
    badge: "GPQA 91.2%",
    strengths: ["Coding King", "GPQA Leader", "Reasoning"],
    link: "https://claude.ai",
    color: "#18D6D6",
    gpqa: 91.2
  },
  {
    rank: 2,
    model: "Gemini 3.1 Pro",
    provider: "Google",
    badge: "ARC-AGI 77.1%",
    strengths: ["ARC-AGI #1", "Long Context", "Multimodal"],
    link: "https://gemini.google.com",
    color: "#4285F4",
    gpqa: 87.9
  },
  {
    rank: 3,
    model: "GPT-5.4",
    provider: "OpenAI",
    badge: "Balanced",
    strengths: ["Balanced", "Multimodal", "Fast"],
    link: "https://chatgpt.com",
    color: "#10a37f",
    gpqa: 88.4
  },
  {
    rank: 4,
    model: "Grok-4.20",
    provider: "xAI",
    badge: "All-rounder",
    strengths: ["All-rounder", "X Real-time", "Agentic"],
    link: "https://grok.x.ai",
    color: "#ffffff",
    gpqa: 86.1
  },
  {
    rank: 5,
    model: "GLM-5",
    provider: "Z.ai",
    badge: "744B Open",
    strengths: ["Open-weight", "Top Leaderboard", "Strong Math"],
    link: "https://zhipuai.cn",
    color: "#FF6B35",
    gpqa: 84.3
  }
];
const FALLBACK_OPEN_SOURCE_HIGHLIGHTS = [
  {
    rank: 1,
    model: "DeepSeek V3.2",
    provider: "DeepSeek AI",
    badge: "685B MoE",
    strengths: ["Math King", "Coding", "Open weights"],
    link: "https://huggingface.co/deepseek-ai",
    color: "#18D6D6"
  },
  {
    rank: 2,
    model: "DeepSeek R1",
    provider: "DeepSeek AI",
    badge: "671B MoE",
    strengths: ["Reasoning", "Math", "Open"],
    link: "https://huggingface.co/deepseek-ai",
    color: "#18D6D6"
  },
  {
    rank: 3,
    model: "Qwen 3.5",
    provider: "Alibaba",
    badge: "397B",
    strengths: ["Multilingual", "Multimodal", "Efficient"],
    link: "https://huggingface.co/Qwen",
    color: "#FF6A00"
  },
  {
    rank: 4,
    model: "Llama 4",
    provider: "Meta",
    badge: "405B",
    strengths: ["Community", "Fine-tunable", "Versatile"],
    link: "https://huggingface.co/meta-llama",
    color: "#0467DF"
  },
  {
    rank: 5,
    model: "GLM-5",
    provider: "Z.ai",
    badge: "744B",
    strengths: ["Leaderboard", "Open", "Multilingual"],
    link: "https://huggingface.co/THUDM",
    color: "#FF6B35"
  }
];
const LAST_FETCH_KEY = "nl_benchmarks_last_fetch";
const FETCH_INTERVAL_MS = 24 * 60 * 60 * 1e3;
function useBenchmarkData() {
  const [loading, setLoading] = reactExports.useState(false);
  const [lastUpdated, setLastUpdated] = reactExports.useState(null);
  const [fetchSource, setFetchSource] = reactExports.useState("cached");
  const [changedRows, setChangedRows] = reactExports.useState(/* @__PURE__ */ new Set());
  const [dataVersion, setDataVersion] = reactExports.useState(0);
  const prevElosRef = reactExports.useRef({});
  const [, startTransition] = reactExports.useTransition();
  const refresh = reactExports.useCallback(async (force = false) => {
    const now = Date.now();
    const last = Number.parseInt(localStorage.getItem(LAST_FETCH_KEY) || "0");
    if (!force && now - last < FETCH_INTERVAL_MS) {
      if (last > 0) setLastUpdated(new Date(last));
      return;
    }
    setLoading(true);
    try {
      const [r1, r2, r3] = await Promise.allSettled([
        fetch("https://huggingface.co/spaces/lmarena-ai/chatbot-arena", {
          signal: AbortSignal.timeout(4e3)
        }),
        fetch("https://artificialanalysis.ai/leaderboards/models", {
          signal: AbortSignal.timeout(4e3)
        }),
        fetch(
          "https://huggingface.co/api/datasets/open-llm-leaderboard/results?limit=5",
          { signal: AbortSignal.timeout(5e3) }
        )
      ]);
      let source = "cached";
      if (r1.status === "fulfilled" && r1.value.ok) source = "lmarena";
      else if (r2.status === "fulfilled" && r2.value.ok)
        source = "artificialanalysis";
      else if (r3.status === "fulfilled" && r3.value.ok) source = "openllm";
      localStorage.setItem(LAST_FETCH_KEY, String(Date.now()));
      startTransition(() => {
        setFetchSource(source);
        setLastUpdated(/* @__PURE__ */ new Date());
        if (source !== "cached") {
          const newChanged = /* @__PURE__ */ new Set();
          for (const row of FALLBACK_ARENA_DATA) {
            const prev = prevElosRef.current[row.model];
            if (prev !== void 0 && Math.abs(prev - (row.elo ?? 0)) > 1) {
              newChanged.add(row.model);
            }
            prevElosRef.current[row.model] = row.elo ?? 0;
          }
          if (newChanged.size > 0) {
            setChangedRows(newChanged);
            setTimeout(() => setChangedRows(/* @__PURE__ */ new Set()), 3e3);
          }
        } else {
          for (const row of FALLBACK_ARENA_DATA) {
            prevElosRef.current[row.model] = row.elo ?? 0;
          }
        }
        setDataVersion((v) => v + 1);
      });
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    refresh();
  }, [refresh]);
  reactExports.useEffect(() => {
    const id = setInterval(() => refresh(), FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refresh]);
  reactExports.useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [refresh]);
  return {
    loading,
    lastUpdated,
    fetchSource,
    changedRows,
    dataVersion,
    refresh,
    arenaData: FALLBACK_ARENA_DATA,
    intelligenceData: FALLBACK_INTELLIGENCE_DATA,
    openSourceData: FALLBACK_OPEN_SOURCE_DATA,
    arenaHighlights: FALLBACK_ARENA_HIGHLIGHTS,
    intelligenceHighlights: FALLBACK_INTELLIGENCE_HIGHLIGHTS,
    openSourceHighlights: FALLBACK_OPEN_SOURCE_HIGHLIGHTS
  };
}
function GlassSpinner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            width: 56,
            height: 56,
            border: "3px solid rgba(255,255,255,0.1)",
            borderTop: "3px solid #18D6D6",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }
        }
      )
    }
  );
}
function RelativeTime({ date }) {
  const [, forceUpdate] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => forceUpdate((n) => n + 1), 3e4);
    return () => clearInterval(id);
  }, []);
  if (!date) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "March 2026" });
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 6e4);
  const text = diffMin < 1 ? "just now" : diffMin < 60 ? `${diffMin}m ago` : date.toLocaleTimeString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.span,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      transition: { type: "spring", stiffness: 360, damping: 26 },
      children: [
        "Updated ",
        text
      ]
    },
    text
  );
}
function SourceBadge({ source }) {
  const labels = {
    lmarena: "LMArena • Live",
    artificialanalysis: "Artificial Analysis • Live",
    openllm: "Open LLM • Live",
    cached: "March 2026 • Cached"
  };
  const isLive = source !== "cached";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        borderRadius: 20,
        background: isLive ? "rgba(24,214,214,0.15)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${isLive ? "rgba(24,214,214,0.4)" : "rgba(255,255,255,0.15)"}`,
        color: isLive ? "#18D6D6" : "#A7ADB7",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.03em"
      },
      children: [
        isLive && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#18D6D6",
              animation: "pulse-dot 2s infinite",
              flexShrink: 0
            }
          }
        ),
        labels[source]
      ]
    }
  );
}
function BenchmarksPage() {
  const [activeTab, setActiveTab] = reactExports.useState(0);
  const [sortKey, setSortKey] = reactExports.useState("rank");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const {
    loading: dataLoading,
    lastUpdated,
    fetchSource,
    changedRows,
    dataVersion,
    refresh,
    arenaData,
    intelligenceData,
    openSourceData,
    arenaHighlights,
    intelligenceHighlights,
    openSourceHighlights
  } = useBenchmarkData();
  reactExports.useEffect(() => {
    setSortKey((k) => k);
  }, [dataVersion]);
  const tabs = [
    "Chatbot Arena (ELO)",
    "Overall Intelligence",
    "Open Source Focus"
  ];
  function sortData(data) {
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }
  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }
  function SortArrow({ col }) {
    if (sortKey !== col)
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.3, marginLeft: 4 }, children: "↕" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#18D6D6", marginLeft: 4 }, children: sortDir === "asc" ? "↑" : "↓" });
  }
  const glassCard = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    borderRadius: 16
  };
  function HighlightCards({
    cards,
    barMode
  }) {
    const [mounted, setMounted] = reactExports.useState(false);
    reactExports.useEffect(() => {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: { show: { transition: { staggerChildren: 0.05 } } },
        initial: "hidden",
        animate: "show",
        className: "grid gap-4 mb-8",
        style: { gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" },
        children: cards.map((c) => {
          const barValue = barMode === "elo" && c.elo != null ? (c.elo - 1480) / (1503 - 1480) * 100 : barMode === "gpqa" && c.gpqa != null ? c.gpqa : null;
          const barLabel = barMode === "elo" && c.elo != null ? `ELO ${c.elo}` : barMode === "gpqa" && c.gpqa != null ? `${c.gpqa}%` : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: {
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              },
              whileHover: {
                scale: 1.02,
                boxShadow: "0 0 20px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
              },
              style: {
                ...glassCard,
                padding: "20px",
                cursor: "pointer",
                position: "relative",
                willChange: "transform"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "#18D6D6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 900,
                            fontSize: 15,
                            color: "#000",
                            flexShrink: 0
                          },
                          children: c.rank
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontWeight: 700,
                              color: "#fff",
                              fontSize: 15,
                              lineHeight: 1.2
                            },
                            children: c.model
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#A7ADB7", fontSize: 12 }, children: c.provider })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "rgba(24,214,214,0.15)",
                      color: "#18D6D6",
                      border: "1px solid rgba(24,214,214,0.3)",
                      borderRadius: 8,
                      padding: "3px 10px",
                      fontSize: 13,
                      fontWeight: 700
                    },
                    children: c.badge
                  }
                ) }),
                barValue != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 5
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontSize: 10,
                              color: "#A7ADB7",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              fontWeight: 600
                            },
                            children: barMode === "elo" ? "Arena ELO" : "GPQA Score"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontSize: 11,
                              color: c.color === "#ffffff" ? "#18D6D6" : c.color,
                              fontWeight: 700
                            },
                            children: barLabel
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: "100%",
                        height: 4,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 4,
                        overflow: "hidden"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            height: "100%",
                            borderRadius: 4,
                            width: mounted ? `${Math.min(barValue, 100)}%` : "0%",
                            background: `linear-gradient(90deg, ${c.color === "#ffffff" ? "#aaa" : c.color}, #18D6D6)`,
                            boxShadow: `0 0 8px ${c.color === "#ffffff" ? "rgba(24,214,214,0.6)" : `${c.color}99`}`,
                            transition: "width 600ms cubic-bezier(0.4,0,0.2,1) 0.2s"
                          }
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 14
                    },
                    children: c.strengths.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          background: "rgba(255,255,255,0.07)",
                          color: "#A7ADB7",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 500
                        },
                        children: s
                      },
                      s
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: c.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: "rgba(24,214,214,0.1)",
                      color: "#18D6D6",
                      border: "1px solid rgba(24,214,214,0.25)",
                      borderRadius: 8,
                      padding: "6px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none"
                    },
                    onClick: (e) => e.stopPropagation(),
                    children: "Chat Now →"
                  }
                )
              ]
            },
            c.model
          );
        })
      }
    );
  }
  function SortableTable({
    columns,
    rows,
    highlightedRows
  }) {
    const sorted = sortData(rows);
    const MobileCards = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: sorted.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
          delay: i * 0.04
        },
        style: {
          ...glassCard,
          padding: "14px 16px",
          background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
          boxShadow: (highlightedRows == null ? void 0 : highlightedRows.has(String(row.model))) ? "0 0 16px rgba(24,214,214,0.4), inset 0 0 16px rgba(24,214,214,0.1)" : void 0,
          transition: "box-shadow 0.5s ease"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      color: "#18D6D6",
                      fontWeight: 900,
                      fontSize: 18,
                      minWidth: 24
                    },
                    children: String(row.rank)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontWeight: 700, fontSize: 15 }, children: String(row.model) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px 14px" }, children: columns.filter((c) => c.key !== "rank" && c.key !== "model").map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { display: "flex", flexDirection: "column", gap: 1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 9,
                      color: "#5A616D",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 700
                    },
                    children: col.label
                  }
                ),
                col.key === "link" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: String(row[col.key]),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                      color: "#18D6D6",
                      textDecoration: "none",
                      fontSize: 12,
                      fontWeight: 600
                    },
                    children: "↗ Chat"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#A7ADB7", fontSize: 12 }, children: String(row[col.key]) })
              ]
            },
            col.key
          )) })
        ]
      },
      String(row.rank) + String(row.model)
    )) });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobileCards, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "hidden sm:block",
          style: {
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: 14,
            ...glassCard
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              style: { width: "100%", borderCollapse: "collapse", minWidth: 600 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { borderBottom: "1px solid rgba(255,255,255,0.08)" }, children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "th",
                  {
                    onClick: () => handleSort(col.key),
                    onKeyDown: (e) => {
                      if (e.key === "Enter") handleSort(col.key);
                    },
                    style: {
                      padding: "14px 16px",
                      textAlign: "left",
                      color: sortKey === col.key ? "#18D6D6" : "#A7ADB7",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      userSelect: "none",
                      whiteSpace: "nowrap"
                    },
                    children: [
                      col.label,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SortArrow, { col: col.key })
                    ]
                  },
                  col.key
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sorted.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.tr,
                  {
                    layout: true,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                    whileHover: {
                      scale: 1.005,
                      boxShadow: "inset 0 0 0 1px rgba(24,214,214,0.2), 0 0 12px rgba(24,214,214,0.08)",
                      backgroundColor: "rgba(24,214,214,0.04)"
                    },
                    style: {
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      cursor: "default",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.005)",
                      willChange: "transform",
                      boxShadow: (highlightedRows == null ? void 0 : highlightedRows.has(String(row.model))) ? "0 0 16px rgba(24,214,214,0.4), inset 0 0 16px rgba(24,214,214,0.1)" : void 0,
                      transition: "box-shadow 0.5s ease"
                    },
                    children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "12px 16px",
                          color: col.key === "rank" ? "#18D6D6" : col.key === "model" ? "#fff" : "#A7ADB7",
                          fontSize: 14,
                          fontWeight: col.key === "model" ? 600 : 400,
                          whiteSpace: "nowrap"
                        },
                        children: col.key === "link" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: String(row[col.key]),
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                              color: "#18D6D6",
                              textDecoration: "none",
                              fontSize: 13
                            },
                            children: "↗ Chat"
                          }
                        ) : String(row[col.key])
                      },
                      col.key
                    ))
                  },
                  String(row.rank) + String(row.model)
                )) }) })
              ]
            }
          )
        }
      )
    ] });
  }
  const tabContent = [
    {
      highlights: arenaHighlights,
      barMode: "elo",
      columns: [
        { key: "rank", label: "Rank" },
        { key: "model", label: "Model" },
        { key: "provider", label: "Provider" },
        { key: "elo", label: "Arena ELO" },
        { key: "gpqa", label: "GPQA" },
        { key: "sweBench", label: "SWE-bench" },
        { key: "arcAgi", label: "ARC-AGI" },
        { key: "context", label: "Context" },
        { key: "link", label: "Chat" }
      ],
      rows: arenaData
    },
    {
      highlights: intelligenceHighlights,
      barMode: "gpqa",
      columns: [
        { key: "rank", label: "Rank" },
        { key: "model", label: "Model" },
        { key: "provider", label: "Provider" },
        { key: "gpqa", label: "GPQA" },
        { key: "sweBench", label: "SWE-bench" },
        { key: "arcAgi", label: "ARC-AGI-2" },
        { key: "math", label: "Math" },
        { key: "context", label: "Context" },
        { key: "link", label: "Chat" }
      ],
      rows: intelligenceData
    },
    {
      highlights: openSourceHighlights,
      barMode: "gpqa",
      columns: [
        { key: "rank", label: "Rank" },
        { key: "model", label: "Model" },
        { key: "provider", label: "Provider" },
        { key: "params", label: "Parameters" },
        { key: "gpqa", label: "GPQA" },
        { key: "sweBench", label: "SWE-bench" },
        { key: "math", label: "Math" },
        { key: "license", label: "License" }
      ],
      rows: openSourceData
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "main",
    {
      className: "min-h-screen pb-16 px-4 md:px-6",
      style: {
        background: "#000",
        paddingTop: "calc(96px + env(safe-area-inset-top, 0px))"
      },
      children: [
        dataLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(GlassSpinner, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { type: "spring", stiffness: 350, damping: 26 },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h1",
                  {
                    className: "text-5xl md:text-6xl font-black text-white mb-4",
                    style: { letterSpacing: "-0.02em" },
                    children: [
                      "AI Model ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#18D6D6" }, children: "Benchmarks" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#A7ADB7", fontSize: 16, marginBottom: 14 }, children: "Real-time crowdsourced & independent rankings • Updated March 2026" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: 14,
                      gap: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 50,
                            padding: "4px 12px",
                            fontSize: 11,
                            color: "#A7ADB7"
                          },
                          children: [
                            "🕐 ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RelativeTime, { date: lastUpdated })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: fetchSource })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                      flexWrap: "wrap"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "https://huggingface.co/spaces/lmarena-ai/chatbot-arena",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                            padding: "6px 14px",
                            borderRadius: 8,
                            fontSize: 12,
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                            fontWeight: 500
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                            e.currentTarget.style.color = "#fff";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                          },
                          "data-ocid": "benchmarks.link",
                          children: "Chatbot Arena ↗"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "https://arena.ai/leaderboard",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                            padding: "6px 14px",
                            borderRadius: 8,
                            fontSize: 12,
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                            fontWeight: 500
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                            e.currentTarget.style.color = "#fff";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                          },
                          "data-ocid": "benchmarks.link",
                          children: "Arena Leaderboard ↗"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "benchmarks.primary_button",
                          onClick: () => refresh(true),
                          disabled: dataLoading,
                          style: {
                            background: "rgba(24,214,214,0.08)",
                            border: "1px solid rgba(24,214,214,0.25)",
                            color: "#18D6D6",
                            padding: "6px 16px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: dataLoading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            opacity: dataLoading ? 0.7 : 1,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5
                          },
                          onMouseEnter: (e) => {
                            if (!dataLoading) {
                              e.currentTarget.style.background = "rgba(24,214,214,0.15)";
                              e.currentTarget.style.boxShadow = "0 0 16px rgba(24,214,214,0.2)";
                            }
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.background = "rgba(24,214,214,0.08)";
                            e.currentTarget.style.boxShadow = "none";
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  display: "inline-block",
                                  animation: dataLoading ? "spin 1s linear infinite" : "none"
                                },
                                children: "⟳"
                              }
                            ),
                            dataLoading ? "Fetching…" : "Refresh Data"
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: {
                type: "spring",
                stiffness: 350,
                damping: 26,
                delay: 0.12
              },
              className: "mb-8 flex justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "inline-flex",
                    gap: 2,
                    padding: 4,
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 50,
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    maxWidth: "100%"
                  },
                  children: tabs.map((tab, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setActiveTab(i);
                        setSortKey("rank");
                        setSortDir("asc");
                      },
                      style: {
                        position: "relative",
                        padding: "10px 20px",
                        borderRadius: 46,
                        border: activeTab === i ? "1px solid rgba(24,214,214,0.35)" : "1px solid transparent",
                        background: activeTab === i ? "rgba(255,255,255,0.12)" : "transparent",
                        color: activeTab === i ? "#fff" : "rgba(255,255,255,0.5)",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.3s ease",
                        boxShadow: activeTab === i ? "0 0 16px rgba(24,214,214,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                        outline: "none"
                      },
                      "data-ocid": "benchmarks.tab",
                      children: tab
                    },
                    tab
                  ))
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.25 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  HighlightCards,
                  {
                    cards: tabContent[activeTab].highlights,
                    barMode: tabContent[activeTab].barMode
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    style: {
                      color: "#fff",
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 12
                    },
                    children: "Full Leaderboard"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortableTable,
                  {
                    columns: tabContent[activeTab].columns,
                    rows: tabContent[activeTab].rows,
                    highlightedRows: changedRows
                  }
                )
              ]
            },
            activeTab
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: {
                type: "spring",
                stiffness: 350,
                damping: 26,
                delay: 0.28
              },
              className: "text-center mt-12",
              style: {
                color: "#5A616D",
                fontSize: 12,
                lineHeight: 1.7,
                maxWidth: 700,
                margin: "3rem auto 0"
              },
              children: "Scores update frequently on public leaderboards (LMArena, Artificial Analysis). Data fetched client-side. Sources: LMSYS Chatbot Arena / LMArena, Artificial Analysis, Hugging Face Open LLM Leaderboard. Snapshot: March 2026."
            }
          )
        ] })
      ]
    }
  );
}
export {
  BenchmarksPage as default
};
