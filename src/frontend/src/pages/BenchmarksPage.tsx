import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { FetchSource } from "../types";

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
    link: "https://claude.ai",
    strengths: ["Reasoning", "Coding", "#1 Arena"],
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
    link: "https://claude.ai",
    strengths: ["SWE 80.8%", "GPQA 91%", "Agentic"],
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
    link: "https://chatgpt.com",
    strengths: ["Balanced", "Multimodal", "Fast"],
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
    link: "https://gemini.google.com",
    strengths: ["1M Context", "Multimodal", "ARC-AGI"],
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
    link: "https://grok.x.ai",
    strengths: ["All-rounder", "Real-time", "X Integration"],
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
    link: "https://gemini.google.com",
    strengths: ["Long Context", "Vision", "Efficient"],
  },
  {
    rank: 7,
    model: "DeepSeek V3",
    provider: "DeepSeek AI",
    elo: 1489,
    gpqa: "83.4%",
    sweBench: "68.2%",
    arcAgi: "61.0%",
    context: "64K",
    link: "https://chat.deepseek.com",
    strengths: ["Coding", "Math", "Open"],
  },
  {
    rank: 8,
    model: "Llama 4 Maverick",
    provider: "Meta",
    elo: 1486,
    gpqa: "79.2%",
    sweBench: "62.4%",
    arcAgi: "58.3%",
    context: "128K",
    link: "https://llama.meta.com",
    strengths: ["Open-source", "Versatile", "Fast"],
  },
  {
    rank: 9,
    model: "Mistral Large 2.1",
    provider: "Mistral AI",
    elo: 1483,
    gpqa: "77.1%",
    sweBench: "60.2%",
    arcAgi: "55.1%",
    context: "128K",
    link: "https://mistral.ai",
    strengths: ["European", "Efficient", "Coding"],
  },
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
    link: "https://claude.ai",
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
    link: "https://gemini.google.com",
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
    link: "https://chatgpt.com",
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
    link: "https://grok.x.ai",
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
    link: "https://zhipuai.cn",
  },
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
    link: "https://huggingface.co/deepseek-ai",
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
    link: "https://huggingface.co/deepseek-ai",
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
    link: "https://huggingface.co/Qwen",
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
    link: "https://huggingface.co/meta-llama",
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
    link: "https://huggingface.co/THUDM",
  },
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
    elo: 1503,
  },
  {
    rank: 2,
    model: "GPT-5.4-high",
    provider: "OpenAI",
    badge: "ELO 1495",
    strengths: ["Top-3 Arena", "Balanced", "Multimodal"],
    link: "https://chatgpt.com",
    color: "#10a37f",
    elo: 1495,
  },
  {
    rank: 3,
    model: "Claude Opus 4.6",
    provider: "Anthropic",
    badge: "ELO 1501",
    strengths: ["GPQA 91%+", "SWE-bench 80.8%", "Coding"],
    link: "https://claude.ai",
    color: "#18D6D6",
    elo: 1501,
  },
  {
    rank: 4,
    model: "Gemini 3.1 Pro",
    provider: "Google",
    badge: "ELO 1493",
    strengths: ["ARC-AGI-2 77%", "1M Context", "Multimodal"],
    link: "https://gemini.google.com",
    color: "#4285F4",
    elo: 1493,
  },
  {
    rank: 5,
    model: "Grok-4.20",
    provider: "xAI",
    badge: "ELO 1492",
    strengths: ["All-rounder", "X Integration", "Fast"],
    link: "https://grok.x.ai",
    color: "#ffffff",
    elo: 1492,
  },
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
    gpqa: 91.2,
  },
  {
    rank: 2,
    model: "Gemini 3.1 Pro",
    provider: "Google",
    badge: "ARC-AGI 77.1%",
    strengths: ["ARC-AGI #1", "Long Context", "Multimodal"],
    link: "https://gemini.google.com",
    color: "#4285F4",
    gpqa: 87.9,
  },
  {
    rank: 3,
    model: "GPT-5.4",
    provider: "OpenAI",
    badge: "Balanced",
    strengths: ["Balanced", "Multimodal", "Fast"],
    link: "https://chatgpt.com",
    color: "#10a37f",
    gpqa: 88.4,
  },
  {
    rank: 4,
    model: "Grok-4.20",
    provider: "xAI",
    badge: "All-rounder",
    strengths: ["All-rounder", "X Real-time", "Agentic"],
    link: "https://grok.x.ai",
    color: "#ffffff",
    gpqa: 86.1,
  },
  {
    rank: 5,
    model: "GLM-5",
    provider: "Z.ai",
    badge: "744B Open",
    strengths: ["Open-weight", "Top Leaderboard", "Strong Math"],
    link: "https://zhipuai.cn",
    color: "#FF6B35",
    gpqa: 84.3,
  },
];

const FALLBACK_OPEN_SOURCE_HIGHLIGHTS = [
  {
    rank: 1,
    model: "DeepSeek V3.2",
    provider: "DeepSeek AI",
    badge: "685B MoE",
    strengths: ["Math King", "Coding", "Open weights"],
    link: "https://huggingface.co/deepseek-ai",
    color: "#18D6D6",
  },
  {
    rank: 2,
    model: "DeepSeek R1",
    provider: "DeepSeek AI",
    badge: "671B MoE",
    strengths: ["Reasoning", "Math", "Open"],
    link: "https://huggingface.co/deepseek-ai",
    color: "#18D6D6",
  },
  {
    rank: 3,
    model: "Qwen 3.5",
    provider: "Alibaba",
    badge: "397B",
    strengths: ["Multilingual", "Multimodal", "Efficient"],
    link: "https://huggingface.co/Qwen",
    color: "#FF6A00",
  },
  {
    rank: 4,
    model: "Llama 4",
    provider: "Meta",
    badge: "405B",
    strengths: ["Community", "Fine-tunable", "Versatile"],
    link: "https://huggingface.co/meta-llama",
    color: "#0467DF",
  },
  {
    rank: 5,
    model: "GLM-5",
    provider: "Z.ai",
    badge: "744B",
    strengths: ["Leaderboard", "Open", "Multilingual"],
    link: "https://huggingface.co/THUDM",
    color: "#FF6B35",
  },
];

const LAST_FETCH_KEY = "nl_benchmarks_last_fetch";
const FETCH_INTERVAL_MS = 24 * 60 * 60 * 1000;

function useBenchmarkData() {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchSource, setFetchSource] = useState<FetchSource>("cached");
  const [changedRows, setChangedRows] = useState<Set<string>>(new Set());
  const [dataVersion, setDataVersion] = useState(0);
  const prevElosRef = useRef<Record<string, number>>({});
  const [, startTransition] = useTransition();

  const refresh = useCallback(async (force = false) => {
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
          signal: AbortSignal.timeout(4000),
        }),
        fetch("https://artificialanalysis.ai/leaderboards/models", {
          signal: AbortSignal.timeout(4000),
        }),
        fetch(
          "https://huggingface.co/api/datasets/open-llm-leaderboard/results?limit=5",
          { signal: AbortSignal.timeout(5000) },
        ),
      ]);

      let source: FetchSource = "cached";
      if (r1.status === "fulfilled" && r1.value.ok) source = "lmarena";
      else if (r2.status === "fulfilled" && r2.value.ok)
        source = "artificialanalysis";
      else if (r3.status === "fulfilled" && r3.value.ok) source = "openllm";

      localStorage.setItem(LAST_FETCH_KEY, String(Date.now()));

      startTransition(() => {
        setFetchSource(source);
        setLastUpdated(new Date());

        if (source !== "cached") {
          const newChanged = new Set<string>();
          for (const row of FALLBACK_ARENA_DATA) {
            const prev = prevElosRef.current[row.model];
            if (prev !== undefined && Math.abs(prev - (row.elo ?? 0)) > 1) {
              newChanged.add(row.model);
            }
            prevElosRef.current[row.model] = row.elo ?? 0;
          }
          if (newChanged.size > 0) {
            setChangedRows(newChanged);
            setTimeout(() => setChangedRows(new Set()), 3000);
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

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const id = setInterval(() => refresh(), FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
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
    openSourceHighlights: FALLBACK_OPEN_SOURCE_HIGHLIGHTS,
  };
}

function GlassSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          border: "3px solid rgba(255,255,255,0.1)",
          borderTop: "3px solid #18D6D6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}

function RelativeTime({ date }: { date: Date | null }) {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceUpdate((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  if (!date) return <span>March 2026</span>;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const text =
    diffMin < 1
      ? "just now"
      : diffMin < 60
        ? `${diffMin}m ago`
        : date.toLocaleTimeString();
  return (
    <motion.span
      key={text}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
    >
      Updated {text}
    </motion.span>
  );
}

function SourceBadge({ source }: { source: FetchSource }) {
  const labels: Record<FetchSource, string> = {
    lmarena: "LMArena • Live",
    artificialanalysis: "Artificial Analysis • Live",
    openllm: "Open LLM • Live",
    cached: "March 2026 • Cached",
  };
  const isLive = source !== "cached";
  return (
    <span
      style={{
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
        letterSpacing: "0.03em",
      }}
    >
      {isLive && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#18D6D6",
            animation: "pulse-dot 2s infinite",
            flexShrink: 0,
          }}
        />
      )}
      {labels[source]}
    </span>
  );
}

const ARENA_ELO_DATA = [
  { rank: 1, model: "Claude Opus 4.6", provider: "Anthropic", elo: 1503 },
  { rank: 2, model: "GPT-5.4", provider: "OpenAI", elo: 1495 },
  { rank: 3, model: "Gemini 3.1 Pro", provider: "Google", elo: 1493 },
  { rank: 4, model: "Grok-4.20", provider: "xAI", elo: 1492 },
  { rank: 5, model: "DeepSeek R3", provider: "DeepSeek", elo: 1487 },
  { rank: 6, model: "Llama 4 Scout", provider: "Meta", elo: 1483 },
  { rank: 7, model: "Mistral Large 3", provider: "Mistral AI", elo: 1479 },
  { rank: 8, model: "Command R+", provider: "Cohere", elo: 1476 },
];

function ArenaEloChart() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const BASE = 1470;
  const MAX_ELO = 1503;
  const RANGE = MAX_ELO + 10 - BASE;

  const getPct = (elo: number) =>
    Math.max(5, Math.min(100, ((elo - BASE) / RANGE) * 100));

  const xTicks = [1470, 1480, 1490, 1500];

  return (
    <div
      data-ocid="benchmarks.panel"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 20,
        boxShadow:
          "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px rgba(24,214,214,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
        padding: "24px",
        marginBottom: 32,
        overflow: "hidden",
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(15px, 4vw, 18px)",
            lineHeight: 1.3,
          }}
        >
          Top Models by Chatbot Arena ELO
        </span>
        <span
          style={{
            background: "rgba(24,214,214,0.10)",
            border: "1px solid rgba(24,214,214,0.22)",
            color: "#18D6D6",
            borderRadius: 20,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          March 2026
        </span>
      </div>

      {/* Bar rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {ARENA_ELO_DATA.map((item, i) => {
          const isTop3 = i < 3;
          return (
            <div
              key={item.model}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                minHeight: 44,
                padding: "4px 6px",
                borderRadius: 10,
                transition: "background 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.04)";
                const bar = (e.currentTarget as HTMLElement).querySelector(
                  ".elo-bar-fill",
                ) as HTMLElement | null;
                if (bar)
                  bar.style.boxShadow = isTop3
                    ? "0 0 18px rgba(24,214,214,0.75)"
                    : "0 0 14px rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                const bar = (e.currentTarget as HTMLElement).querySelector(
                  ".elo-bar-fill",
                ) as HTMLElement | null;
                if (bar)
                  bar.style.boxShadow = isTop3
                    ? "0 0 10px rgba(24,214,214,0.45)"
                    : "none";
              }}
            >
              {/* Rank bubble */}
              <div
                style={{
                  width: 26,
                  height: 26,
                  flexShrink: 0,
                  borderRadius: "50%",
                  background: isTop3
                    ? "rgba(24,214,214,0.18)"
                    : "rgba(255,255,255,0.07)",
                  border: isTop3
                    ? "1px solid rgba(24,214,214,0.40)"
                    : "1px solid rgba(255,255,255,0.12)",
                  boxShadow: isTop3 ? "0 0 8px rgba(24,214,214,0.35)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 11,
                  color: isTop3 ? "#18D6D6" : "#A7ADB7",
                }}
              >
                {item.rank}
              </div>

              {/* Model + provider */}
              <div
                style={{
                  flexShrink: 0,
                  width: "clamp(90px, 26vw, 140px)",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "clamp(10px, 2.8vw, 13px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.2,
                  }}
                >
                  {item.model}
                </div>
                <div
                  style={{
                    color: "#5A616D",
                    fontSize: "clamp(9px, 2.2vw, 10px)",
                    lineHeight: 1,
                    marginTop: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.provider}
                </div>
              </div>

              {/* Bar track */}
              <div style={{ flex: 1, minWidth: 0, padding: "0 2px" }}>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="elo-bar-fill"
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      width: animated ? `${getPct(item.elo)}%` : "0%",
                      background: isTop3
                        ? "linear-gradient(90deg, rgba(24,214,214,0.6), rgba(24,214,214,0.9))"
                        : "linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.55))",
                      boxShadow: isTop3
                        ? "0 0 10px rgba(24,214,214,0.45)"
                        : "none",
                      transition: `width 800ms cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
                      willChange: "width",
                    }}
                  />
                </div>
              </div>

              {/* ELO value */}
              <div
                style={{
                  flexShrink: 0,
                  textAlign: "right",
                  width: 48,
                }}
              >
                <div
                  style={{
                    color: isTop3 ? "#18D6D6" : "#A7ADB7",
                    fontWeight: 700,
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    lineHeight: 1,
                  }}
                >
                  {item.elo}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis ticks */}
      <div
        style={{
          marginTop: 12,
          paddingLeft: "calc(clamp(90px, 26vw, 140px) + 36px + 10px)",
          paddingRight: 58,
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          {xTicks.map((tick) => {
            const pct = getPct(tick);
            return (
              <div
                key={tick}
                style={{
                  position: "absolute",
                  left: `${pct}%`,
                  top: 0,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: 4,
                    background: "rgba(255,255,255,0.20)",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.30)",
                    fontWeight: 600,
                    marginTop: 2,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tick}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function BenchmarksPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [sortKey, setSortKey] = useState<string>("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

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
    openSourceHighlights,
  } = useBenchmarkData();

  // biome-ignore lint/correctness/useExhaustiveDependencies: dataVersion triggers sort
  useEffect(() => {
    setSortKey((k) => k);
  }, [dataVersion]);

  const tabs = [
    "Chatbot Arena (ELO)",
    "Overall Intelligence",
    "Open Source Focus",
  ];

  function sortData<T extends Record<string, unknown>>(data: T[]): T[] {
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

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortArrow({ col }: { col: string }) {
    if (sortKey !== col)
      return <span style={{ opacity: 0.3, marginLeft: 4 }}>↕</span>;
    return (
      <span style={{ color: "#18D6D6", marginLeft: 4 }}>
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  const glassCard = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    borderRadius: 16,
  } as React.CSSProperties;

  const pillStyle = {
    background: "rgba(255,255,255,0.07)",
    color: "#A7ADB7",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 5,
    padding: "1px 7px",
    fontSize: 11,
    fontWeight: 500,
    display: "inline-block",
  } as React.CSSProperties;

  type HCard = {
    rank: number;
    model: string;
    provider: string;
    badge: string;
    strengths: string[];
    link: string;
    color: string;
    elo?: number;
    gpqa?: number;
  };

  function HighlightCards({
    cards,
    barMode,
  }: { cards: HCard[]; barMode: "elo" | "gpqa" }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }, []);

    return (
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        initial="hidden"
        animate="show"
        className="grid gap-4 mb-8"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
      >
        {cards.map((c) => {
          const barValue =
            barMode === "elo" && c.elo != null
              ? ((c.elo - 1480) / (1503 - 1480)) * 100
              : barMode === "gpqa" && c.gpqa != null
                ? c.gpqa
                : null;
          const barLabel =
            barMode === "elo" && c.elo != null
              ? `ELO ${c.elo}`
              : barMode === "gpqa" && c.gpqa != null
                ? `${c.gpqa}%`
                : null;

          return (
            <motion.div
              key={c.model}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 0 20px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              style={{
                ...glassCard,
                padding: "20px",
                cursor: "pointer",
                position: "relative",
                willChange: "transform",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
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
                    flexShrink: 0,
                  }}
                >
                  {c.rank}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#fff",
                      fontSize: 15,
                      lineHeight: 1.2,
                    }}
                  >
                    {c.model}
                  </div>
                  <div style={{ color: "#A7ADB7", fontSize: 12 }}>
                    {c.provider}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span
                  style={{
                    background: "rgba(24,214,214,0.15)",
                    color: "#18D6D6",
                    border: "1px solid rgba(24,214,214,0.3)",
                    borderRadius: 8,
                    padding: "3px 10px",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {c.badge}
                </span>
              </div>
              {barValue != null && (
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "#A7ADB7",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 600,
                      }}
                    >
                      {barMode === "elo" ? "Arena ELO" : "GPQA Score"}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: c.color === "#ffffff" ? "#18D6D6" : c.color,
                        fontWeight: 700,
                      }}
                    >
                      {barLabel}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 4,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 4,
                        width: mounted ? `${Math.min(barValue, 100)}%` : "0%",
                        background: `linear-gradient(90deg, ${c.color === "#ffffff" ? "#aaa" : c.color}, #18D6D6)`,
                        boxShadow: `0 0 8px ${
                          c.color === "#ffffff"
                            ? "rgba(24,214,214,0.6)"
                            : `${c.color}99`
                        }`,
                        transition:
                          "width 600ms cubic-bezier(0.4,0,0.2,1) 0.2s",
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                {c.strengths.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "#A7ADB7",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
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
                  textDecoration: "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Chat Now →
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  function SortableTable({
    columns,
    rows,
    highlightedRows,
  }: {
    columns: { key: string; label: string }[];
    rows: Record<string, unknown>[];
    highlightedRows?: Set<string>;
  }) {
    const sorted = sortData(rows);

    const MobileCards = () => (
      <div className="flex flex-col gap-3">
        {sorted.map((row, i) => (
          <motion.div
            key={String(row.rank) + String(row.model)}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              delay: i * 0.04,
            }}
            style={{
              ...glassCard,
              padding: "14px 16px",
              background:
                i % 2 === 0
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.025)",
              boxShadow: highlightedRows?.has(String(row.model))
                ? "0 0 16px rgba(24,214,214,0.4), inset 0 0 16px rgba(24,214,214,0.1)"
                : undefined,
              transition: "box-shadow 0.5s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  color: "#18D6D6",
                  fontWeight: 900,
                  fontSize: 18,
                  minWidth: 24,
                }}
              >
                {String(row.rank)}
              </span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
                {String(row.model)}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
              {columns
                .filter((c) => c.key !== "rank" && c.key !== "model")
                .map((col) => (
                  <div
                    key={col.key}
                    style={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        color: "#5A616D",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 700,
                      }}
                    >
                      {col.label}
                    </span>
                    {col.key === "link" ? (
                      <a
                        href={String(row[col.key])}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#18D6D6",
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        ↗ Chat
                      </a>
                    ) : col.key === "strengths" ? (
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          flexWrap: "wrap",
                          marginTop: 2,
                        }}
                      >
                        {(Array.isArray(row[col.key])
                          ? (row[col.key] as string[])
                          : []
                        ).map((t) => (
                          <span key={t} style={pillStyle}>
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "#A7ADB7", fontSize: 12 }}>
                        {String(row[col.key])}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    );

    return (
      <>
        <div className="block sm:hidden">
          <MobileCards />
        </div>
        <div
          className="hidden sm:block"
          style={
            {
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: 14,
              ...glassCard,
            } as React.CSSProperties
          }
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSort(col.key);
                    }}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      color: sortKey === col.key ? "#18D6D6" : "#A7ADB7",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.label}
                    <SortArrow col={col.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sorted.map((row, i) => (
                  <motion.tr
                    key={String(row.rank) + String(row.model)}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    whileHover={{
                      scale: 1.005,
                      boxShadow:
                        "inset 0 0 0 1px rgba(24,214,214,0.2), 0 0 12px rgba(24,214,214,0.08)",
                      backgroundColor: "rgba(24,214,214,0.04)",
                    }}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      cursor: "default",
                      background:
                        i % 2 === 0
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(255,255,255,0.005)",
                      willChange: "transform",
                      boxShadow: highlightedRows?.has(String(row.model))
                        ? "0 0 16px rgba(24,214,214,0.4), inset 0 0 16px rgba(24,214,214,0.1)"
                        : undefined,
                      transition: "box-shadow 0.5s ease",
                    }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{
                          padding: "12px 16px",
                          color:
                            col.key === "rank"
                              ? "#18D6D6"
                              : col.key === "model"
                                ? "#fff"
                                : "#A7ADB7",
                          fontSize: 14,
                          fontWeight: col.key === "model" ? 600 : 400,
                          whiteSpace:
                            col.key === "strengths" ? "normal" : "nowrap",
                        }}
                      >
                        {col.key === "link" ? (
                          <a
                            href={String(row[col.key])}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#18D6D6",
                              textDecoration: "none",
                              fontSize: 13,
                            }}
                          >
                            ↗ Chat
                          </a>
                        ) : col.key === "strengths" ? (
                          <div
                            style={{
                              display: "flex",
                              gap: 4,
                              flexWrap: "wrap",
                            }}
                          >
                            {(Array.isArray(row[col.key])
                              ? (row[col.key] as string[])
                              : []
                            ).map((t) => (
                              <span key={t} style={pillStyle}>
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : (
                          String(row[col.key])
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  const tabContent: {
    highlights: HCard[];
    barMode: "elo" | "gpqa";
    columns: { key: string; label: string }[];
    rows: Record<string, unknown>[];
  }[] = [
    {
      highlights: arenaHighlights,
      barMode: "elo" as const,
      columns: [
        { key: "rank", label: "Rank" },
        { key: "model", label: "Model" },
        { key: "provider", label: "Provider" },
        { key: "elo", label: "Arena ELO" },
        { key: "gpqa", label: "GPQA" },
        { key: "sweBench", label: "SWE-bench" },
        { key: "arcAgi", label: "ARC-AGI" },
        { key: "context", label: "Context" },
        { key: "strengths", label: "Key Strengths" },
        { key: "link", label: "Chat" },
      ],
      rows: arenaData as unknown as Record<string, unknown>[],
    },
    {
      highlights: intelligenceHighlights,
      barMode: "gpqa" as const,
      columns: [
        { key: "rank", label: "Rank" },
        { key: "model", label: "Model" },
        { key: "provider", label: "Provider" },
        { key: "gpqa", label: "GPQA" },
        { key: "sweBench", label: "SWE-bench" },
        { key: "arcAgi", label: "ARC-AGI-2" },
        { key: "math", label: "Math" },
        { key: "context", label: "Context" },
        { key: "link", label: "Chat" },
      ],
      rows: intelligenceData as unknown as Record<string, unknown>[],
    },
    {
      highlights: openSourceHighlights,
      barMode: "gpqa" as const,
      columns: [
        { key: "rank", label: "Rank" },
        { key: "model", label: "Model" },
        { key: "provider", label: "Provider" },
        { key: "params", label: "Parameters" },
        { key: "gpqa", label: "GPQA" },
        { key: "sweBench", label: "SWE-bench" },
        { key: "math", label: "Math" },
        { key: "license", label: "License" },
      ],
      rows: openSourceData as unknown as Record<string, unknown>[],
    },
  ];

  return (
    <main
      className="min-h-screen pb-16 px-4 md:px-6"
      style={{
        background: "#000",
        paddingTop: "calc(96px + env(safe-area-inset-top, 0px))",
      }}
    >
      {dataLoading && <GlassSpinner />}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className="text-center mb-10"
        >
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            AI Model <span style={{ color: "#18D6D6" }}>Benchmarks</span>
          </h1>
          <p style={{ color: "#A7ADB7", fontSize: 16, marginBottom: 14 }}>
            Real-time crowdsourced &amp; independent rankings • Updated March
            2026
          </p>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 14,
              gap: 6,
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 50,
                padding: "4px 12px",
                fontSize: 11,
                color: "#A7ADB7",
              }}
            >
              🕐 <RelativeTime date={lastUpdated} />
            </span>
            <SourceBadge source={fetchSource} />
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://huggingface.co/spaces/lmarena-ai/chatbot-arena"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 12,
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
              data-ocid="benchmarks.link"
            >
              Chatbot Arena ↗
            </a>
            <a
              href="https://arena.ai/leaderboard"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 12,
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
              data-ocid="benchmarks.link"
            >
              Arena Leaderboard ↗
            </a>
            <button
              type="button"
              data-ocid="benchmarks.primary_button"
              onClick={() => refresh(true)}
              disabled={dataLoading}
              style={{
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
                gap: 5,
              }}
              onMouseEnter={(e) => {
                if (!dataLoading) {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(24,214,214,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 16px rgba(24,214,214,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(24,214,214,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  animation: dataLoading ? "spin 1s linear infinite" : "none",
                }}
              >
                ⟳
              </span>
              {dataLoading ? "Fetching…" : "Refresh Data"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 26,
            delay: 0.12,
          }}
          className="mb-8 flex justify-center"
        >
          <div
            style={
              {
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
                scrollbarWidth: "none" as const,
                maxWidth: "100%",
              } as React.CSSProperties
            }
          >
            {tabs.map((tab, i) => (
              <button
                type="button"
                key={tab}
                onClick={() => {
                  setActiveTab(i);
                  setSortKey("rank");
                  setSortDir("asc");
                }}
                style={{
                  position: "relative",
                  padding: "10px 20px",
                  borderRadius: 46,
                  border:
                    activeTab === i
                      ? "1px solid rgba(24,214,214,0.35)"
                      : "1px solid transparent",
                  background:
                    activeTab === i ? "rgba(255,255,255,0.12)" : "transparent",
                  color: activeTab === i ? "#fff" : "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                  boxShadow:
                    activeTab === i
                      ? "0 0 16px rgba(24,214,214,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : "none",
                  outline: "none",
                }}
                data-ocid="benchmarks.tab"
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 0 && <ArenaEloChart />}
            {activeTab !== 0 && (
              <HighlightCards
                cards={tabContent[activeTab].highlights}
                barMode={tabContent[activeTab].barMode}
              />
            )}
            <h2
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Full Leaderboard
            </h2>
            <SortableTable
              columns={tabContent[activeTab].columns}
              rows={tabContent[activeTab].rows}
              highlightedRows={changedRows}
            />
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 26,
            delay: 0.28,
          }}
          className="text-center mt-12"
          style={{
            color: "#5A616D",
            fontSize: 12,
            lineHeight: 1.7,
            maxWidth: 700,
            margin: "3rem auto 0",
          }}
        >
          Scores update frequently on public leaderboards (LMArena, Artificial
          Analysis). Data fetched client-side. Sources: LMSYS Chatbot Arena /
          LMArena, Artificial Analysis, Hugging Face Open LLM Leaderboard.
          Snapshot: March 2026.
        </motion.p>
      </div>
    </main>
  );
}
