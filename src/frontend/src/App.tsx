import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Page = "home" | "open-source" | "onchain" | "benchmarks" | "about";

interface AIModel {
  id: string;
  name: string;
  company: string;
  desc: string;
  url: string;
  color: string;
  initials: string;
  logo: string;
}

const WM = "https://upload.wikimedia.org/wikipedia/commons";

const AI_MODELS: AIModel[] = [
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    desc: "Anthropic's thoughtful AI — safe, helpful, and remarkably capable.",
    url: "https://claude.ai",
    color: "#CC785C",
    initials: "Cl",
    logo: `${WM}/8/8a/Claude_AI_logo.svg`,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    desc: "OpenAI's flagship model — the AI that started the revolution.",
    url: "https://chat.openai.com",
    color: "#10A37F",
    initials: "GP",
    logo: `${WM}/0/04/ChatGPT_logo.svg`,
  },
  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    desc: "Google's multimodal AI — see, hear, and reason across modalities.",
    url: "https://gemini.google.com",
    color: "#4285F4",
    initials: "Gm",
    logo: `${WM}/8/8a/Google_Gemini_logo_2025.svg`,
  },
  {
    id: "llama",
    name: "Llama",
    company: "Meta",
    desc: "Meta's open-weight model — powerful AI for everyone.",
    url: "https://llama.meta.com",
    color: "#0081FB",
    initials: "Ll",
    logo: "https://lobehub.com/icons/llama.svg",
  },
  {
    id: "mistral",
    name: "Mistral",
    company: "Mistral AI",
    desc: "French AI excellence — fast, efficient, and open-source pioneer.",
    url: "https://chat.mistral.ai",
    color: "#FF7000",
    initials: "Mi",
    logo: `${WM}/e/e6/Mistral_AI_logo_%282025%E2%80%93%29.svg`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    company: "Perplexity AI",
    desc: "AI-powered search — real-time answers with cited sources.",
    url: "https://www.perplexity.ai",
    color: "#20808D",
    initials: "Px",
    logo: `${WM}/1/1d/Perplexity_AI_logo.svg`,
  },
  {
    id: "copilot",
    name: "Copilot",
    company: "Microsoft",
    desc: "Microsoft's AI assistant — integrated intelligence for productivity.",
    url: "https://copilot.microsoft.com",
    color: "#0078D4",
    initials: "Co",
    logo: "https://lobehub.com/icons/copilot.svg",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    company: "DeepSeek",
    desc: "DeepSeek's frontier model — cutting-edge reasoning and coding.",
    url: "https://chat.deepseek.com",
    color: "#4D6AF0",
    initials: "Ds",
    logo: `${WM}/e/ec/DeepSeek_logo.svg`,
  },
];

const GROK_LOGO = `${WM}/9/96/Grok-feb-2025-logo.svg`;
const GROK_FALLBACK = "https://lobehub.com/icons/grok.svg";

// ─── Open Source Models Data ────────────────────────────────────────────────

type OSCategory = "text" | "image" | "video" | "voice" | "small";

interface OSModel {
  id: string;
  name: string;
  developer: string;
  desc: string;
  specs: string;
  hfUrl: string;
  githubUrl?: string;
  color: string;
  initials: string;
}

const OS_CATEGORIES: { id: OSCategory; label: string }[] = [
  { id: "text", label: "Text-to-Text" },
  { id: "image", label: "Image Generation" },
  { id: "video", label: "Video Generation" },
  { id: "voice", label: "Voice Generation" },
  { id: "small", label: "Small & Micro" },
];

const OS_MODELS: Record<OSCategory, OSModel[]> = {
  text: [
    {
      id: "deepseek-v3",
      name: "DeepSeek V3.2",
      developer: "DeepSeek AI",
      desc: "Math and reasoning king with MoE architecture.",
      specs: "685B MoE • Reasoning leader",
      hfUrl: "https://huggingface.co/deepseek-ai/DeepSeek-V3",
      githubUrl: "https://github.com/deepseek-ai/DeepSeek-V3",
      color: "#4D6AF0",
      initials: "DS",
    },
    {
      id: "qwen35",
      name: "Qwen 3.5",
      developer: "Alibaba",
      desc: "Multilingual and multimodal powerhouse with massive scale.",
      specs: "397B • Multimodal powerhouse",
      hfUrl: "https://huggingface.co/Qwen",
      githubUrl: "https://github.com/QwenLM/Qwen3",
      color: "#7B61FF",
      initials: "Q3",
    },
    {
      id: "llama4",
      name: "Llama 4",
      developer: "Meta",
      desc: "Community favorite with strong general-purpose performance.",
      specs: "Open weights • General performance",
      hfUrl: "https://huggingface.co/meta-llama",
      githubUrl: "https://github.com/meta-llama/llama4",
      color: "#0081FB",
      initials: "L4",
    },
    {
      id: "kimik25",
      name: "Kimi K2.5",
      developer: "Moonshot AI",
      desc: "Agentic and multimodal beast for complex tasks.",
      specs: "Agentic • Multimodal",
      hfUrl: "https://huggingface.co/moonshotai",
      githubUrl: "https://github.com/MoonshotAI",
      color: "#00BCD4",
      initials: "K2",
    },
    {
      id: "glm5",
      name: "GLM-5",
      developer: "Z AI",
      desc: "Top leaderboard overall performer across all benchmarks.",
      specs: "Top leaderboard • Overall SOTA",
      hfUrl: "https://huggingface.co/THUDM",
      githubUrl: "https://github.com/THUDM/GLM-4",
      color: "#FF6B6B",
      initials: "G5",
    },
  ],
  image: [
    {
      id: "flux1dev",
      name: "FLUX.1 [dev]",
      developer: "Black Forest Labs",
      desc: "Best prompt adherence and text rendering in open source.",
      specs: "12B • Prompt adherence leader",
      hfUrl: "https://huggingface.co/black-forest-labs/FLUX.1-dev",
      githubUrl: "https://github.com/black-forest-labs/flux",
      color: "#FF7043",
      initials: "FL",
    },
    {
      id: "sd35large",
      name: "SD 3.5 Large",
      developer: "Stability AI",
      desc: "Professional 8B flagship for production-grade image generation.",
      specs: "8B • Professional flagship",
      hfUrl: "https://huggingface.co/stabilityai/stable-diffusion-3.5-large",
      githubUrl: "https://github.com/Stability-AI/generative-models",
      color: "#9C27B0",
      initials: "SD",
    },
    {
      id: "flux1kontext",
      name: "FLUX.1 Kontext",
      developer: "Black Forest Labs",
      desc: "Advanced in-context editing with deep contextual understanding.",
      specs: "Context editing • Advanced",
      hfUrl: "https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev",
      githubUrl: "https://github.com/black-forest-labs/flux",
      color: "#FF5722",
      initials: "FK",
    },
    {
      id: "qwenimg",
      name: "Qwen-Image",
      developer: "Alibaba",
      desc: "Versatile image editing and generation in one unified model.",
      specs: "Editing + Generation • Versatile",
      hfUrl: "https://huggingface.co/Qwen",
      githubUrl: "https://github.com/QwenLM",
      color: "#7B61FF",
      initials: "QI",
    },
  ],
  video: [
    {
      id: "wan22",
      name: "Wan 2.2",
      developer: "Alibaba",
      desc: "MoE cinematic text-to-video leader with stunning quality.",
      specs: "MoE • Cinematic text-to-video",
      hfUrl: "https://huggingface.co/Wan-AI",
      githubUrl: "https://github.com/Wan-Video/Wan2.1",
      color: "#FF6B35",
      initials: "W2",
    },
    {
      id: "hunyuan15",
      name: "HunyuanVideo 1.5",
      developer: "Tencent",
      desc: "High-quality open video model with exceptional detail.",
      specs: "8.3B • High-quality open model",
      hfUrl: "https://huggingface.co/tencent/HunyuanVideo",
      githubUrl: "https://github.com/Tencent/HunyuanVideo",
      color: "#00B4D8",
      initials: "HV",
    },
    {
      id: "mochi",
      name: "Mochi",
      developer: "Genmo",
      desc: "Fast and creative open video diffusion model.",
      specs: "10B • Fast creative diffusion",
      hfUrl: "https://huggingface.co/genmo/mochi-1-preview",
      githubUrl: "https://github.com/genmoai/mochi",
      color: "#4CAF50",
      initials: "Mo",
    },
  ],
  voice: [
    {
      id: "fishspeech",
      name: "Fish Speech V1.5",
      developer: "Fish Audio",
      desc: "Multilingual top-tier voice synthesis quality.",
      specs: "Multilingual • Top-tier quality",
      hfUrl: "https://huggingface.co/fishaudio/fish-speech-1.5",
      githubUrl: "https://github.com/fishaudio/fish-speech",
      color: "#26C6DA",
      initials: "FS",
    },
    {
      id: "cosyvoice2",
      name: "CosyVoice 2",
      developer: "Alibaba",
      desc: "Ultra-low latency real-time voice synthesis.",
      specs: "Ultra-low latency • Real-time",
      hfUrl: "https://huggingface.co/FunAudioLLM/CosyVoice2-0.5B",
      githubUrl: "https://github.com/FunAudioLLM/CosyVoice",
      color: "#7B61FF",
      initials: "CV",
    },
    {
      id: "kokoro",
      name: "Kokoro 82M",
      developer: "Hexgrad",
      desc: "Tiny but powerful on-device TTS model.",
      specs: "82M params • On-device TTS",
      hfUrl: "https://huggingface.co/hexgrad/Kokoro-82M",
      githubUrl: "https://github.com/hexgrad/kokoro",
      color: "#FF8A65",
      initials: "Ko",
    },
    {
      id: "mosstts",
      name: "MOSS-TTS Family",
      developer: "MOSS AI",
      desc: "Expressive long-form synthesis with voice cloning support.",
      specs: "Expressive • Long-form + Cloning",
      hfUrl: "https://huggingface.co/fnlp",
      githubUrl: "https://github.com/OpenMOSS",
      color: "#66BB6A",
      initials: "MT",
    },
  ],
  small: [
    {
      id: "phi4mini",
      name: "Phi-4 Mini",
      developer: "Microsoft",
      desc: "3.8B model that runs efficiently on phones and edge devices.",
      specs: "3.8B • Runs on phones",
      hfUrl: "https://huggingface.co/microsoft/Phi-4-mini-instruct",
      githubUrl: "https://github.com/microsoft/Phi-4-mini",
      color: "#0078D4",
      initials: "P4",
    },
    {
      id: "gemma3",
      name: "Gemma 3",
      developer: "Google",
      desc: "Multimodal edge AI champion for on-device deployment.",
      specs: "9B/27B • Multimodal edge king",
      hfUrl: "https://huggingface.co/google/gemma-3-27b-it",
      githubUrl: "https://github.com/google-deepmind/gemma",
      color: "#4285F4",
      initials: "G3",
    },
    {
      id: "qwen35small",
      name: "Qwen 3.5 Small",
      developer: "Alibaba",
      desc: "Efficient multilingual small variants for resource-constrained environments.",
      specs: "Efficient • Multilingual variants",
      hfUrl: "https://huggingface.co/Qwen",
      githubUrl: "https://github.com/QwenLM/Qwen3",
      color: "#7B61FF",
      initials: "QS",
    },
  ],
};

// ─── Shared Components ───────────────────────────────────────────────────────

function AnimatedHamburger({
  isOpen,
  onClick,
}: { isOpen: boolean; onClick: () => void }) {
  const [isPulsing, setIsPulsing] = useState(false);
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (pulseTimerRef.current) {
      clearTimeout(pulseTimerRef.current);
    }
    setIsPulsing(true);
    pulseTimerRef.current = setTimeout(() => {
      setIsPulsing(false);
      pulseTimerRef.current = null;
    }, 300);
    onClick();
  };

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    };
  }, []);

  return (
    <motion.button
      type="button"
      data-ocid="nav.open_modal_button"
      onClick={handleClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        padding: 8,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 12px rgba(255,255,255,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className={isPulsing ? "spiral-pulsing" : ""}
        style={{
          transition: "transform 0.4s ease-in-out",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <line
          x1="4"
          y1="8"
          x2="24"
          y2="8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: "14px 8px",
            transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
            transform: isOpen ? "translateY(6px) rotate(45deg)" : "none",
          }}
        />
        <line
          x1="4"
          y1="14"
          x2="24"
          y2="14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: "14px 14px",
            transition: "opacity 0.4s ease-in-out",
            opacity: isOpen ? 0 : 1,
          }}
        />
        <line
          x1="4"
          y1="20"
          x2="24"
          y2="20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: "14px 20px",
            transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
            transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none",
          }}
        />
        <circle
          className="spiral-ring"
          cx="14"
          cy="14"
          r="8"
          stroke="rgba(24,214,214,0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6 4"
          style={{
            transformOrigin: "14px 14px",
            transition: "opacity 0.3s ease-in-out 0.15s",
            opacity: isOpen ? 1 : 0,
          }}
        />
      </svg>
    </motion.button>
  );
}

function Nav({
  onMenuOpen,
  onNavigate,
  isMenuOpen,
}: {
  onMenuOpen: () => void;
  onNavigate: (page: Page) => void;
  isMenuOpen: boolean;
}) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 md:px-6"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <button
        type="button"
        data-ocid="nav.link"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2.5 group"
      >
        <img
          src="/assets/uploads/nano-banana-2_futuristic_minimalist_logo_for_neural_linkz_an_ai_directory_app_deep_space_vanta-0-019d1c67-800b-710d-a1c5-eb045ada3bc9-1.jpg"
          alt="Neural Linkz"
          className="w-8 h-8 rounded-lg object-cover"
        />
        <span className="text-lg font-bold tracking-tight text-white">
          Neural <span style={{ color: "#18D6D6" }}>Linkz</span>
        </span>
      </button>
      <AnimatedHamburger isOpen={isMenuOpen} onClick={onMenuOpen} />
    </header>
  );
}

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Open Source Models", page: "open-source" },
  { label: "Onchain AI Models", page: "onchain" },
  { label: "Benchmarks", page: "benchmarks" },
  { label: "About", page: "about" },
];

function BottomSheetMenu({
  open,
  onClose,
  onNavigate,
  currentPage,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-ocid="nav.modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.02, bottom: 0.25 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 80 || info.velocity.y > 400) {
                onClose();
              }
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 51,
              maxHeight: "85vh",
              borderRadius: "24px 24px 0 0",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderBottom: "none",
              boxShadow:
                "0 -8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 40px rgba(24,214,214,0.06)",
              display: "flex",
              flexDirection: "column",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 14,
                paddingBottom: 6,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 5,
                  background: "rgba(255,255,255,0.18)",
                  borderRadius: 3,
                  cursor: "grab",
                  backdropFilter: "blur(4px)",
                  boxShadow:
                    "0 1px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: "16px 20px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Menu
              </span>
              <button
                type="button"
                data-ocid="nav.close_button"
                onClick={onClose}
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow:
                    "0 0 12px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
                  transition:
                    "background 200ms ease, box-shadow 200ms ease, transform 200ms ease",
                  flexShrink: 0,
                  position: "absolute",
                  right: 20,
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "rgba(255,255,255,0.13)";
                  btn.style.boxShadow =
                    "0 0 20px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.15)";
                  btn.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "rgba(255,255,255,0.07)";
                  btn.style.boxShadow =
                    "0 0 12px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)";
                  btn.style.transform = "scale(1)";
                }}
                aria-label="Close menu"
              >
                <div
                  style={{
                    position: "relative",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/assets/uploads/nano-banana-2_futuristic_minimalist_logo_for_neural_linkz_an_ai_directory_app_deep_space_vanta-0-019d1c67-800b-710d-a1c5-eb045ada3bc9-1.jpg"
                    alt="Neural Linkz"
                    style={{
                      width: 32,
                      height: 32,
                      objectFit: "contain",
                      borderRadius: 4,
                      display: "block",
                    }}
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      margin: "auto",
                      opacity: 0.75,
                      pointerEvents: "none",
                    }}
                  >
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
            </div>

            <nav
              style={{
                padding: "16px 20px 28px",
                overflowY: "auto",
                flex: 1,
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    type="button"
                    data-ocid="nav.tab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                      delay: i * 0.07,
                    }}
                    onClick={() => {
                      onNavigate(item.page);
                      onClose();
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      maxWidth: 360,
                      textAlign: "center",
                      padding: "18px 24px",
                      background: isActive
                        ? "rgba(24,214,214,0.08)"
                        : "transparent",
                      border: "none",
                      borderRadius: isActive ? 12 : 0,
                      cursor: "pointer",
                      transition: "background 150ms ease, transform 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "transparent";
                    }}
                  >
                    <span
                      style={{
                        fontSize: 19,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: isActive ? "#18D6D6" : "rgba(255,255,255,0.85)",
                        textShadow: isActive
                          ? "0 0 20px rgba(24,214,214,0.5)"
                          : "none",
                        transition: "color 150ms ease, text-shadow 150ms ease",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div
              className="bottom-sheet-footer"
              style={{
                padding: "12px 24px 20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Onchain on the Internet Computer
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AILogoImg({
  src,
  alt,
  fallbackText,
  className,
  style,
}: {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!errored) {
      const lobeMap: Record<string, string> = {
        claude: "https://lobehub.com/icons/claude.svg",
        chatgpt: "https://lobehub.com/icons/openai.svg",
        gemini: "https://lobehub.com/icons/gemini.svg",
        mistral: "https://lobehub.com/icons/mistral.svg",
        perplexity: "https://lobehub.com/icons/perplexity.svg",
        deepseek: "https://lobehub.com/icons/deepseek.svg",
        grok: GROK_FALLBACK,
      };
      const key = fallbackText.toLowerCase();
      if (lobeMap[key]) {
        setImgSrc(lobeMap[key]);
        setErrored(true);
      } else {
        setImgSrc(
          `https://placehold.co/80x80/111111/eeeeee?text=${fallbackText}`,
        );
        setErrored(true);
      }
    } else {
      setImgSrc(
        `https://placehold.co/80x80/111111/eeeeee?text=${fallbackText}`,
      );
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={handleError}
    />
  );
}

function AICard({ model, index }: { model: AIModel; index: number }) {
  return (
    <motion.div
      data-ocid={`ai.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="card-hover group flex flex-col rounded-2xl p-4 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <AILogoImg
          src={model.logo}
          alt={`${model.name} logo`}
          fallbackText={model.id}
          className="ai-logo w-16 h-16 flex-shrink-0 rounded-xl object-contain bg-black/30 p-1.5"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 0 0 0 transparent",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base leading-tight">
            {model.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#A7ADB7" }}>
            {model.company}
          </p>
        </div>
      </div>
      <p
        className="text-sm flex-1 leading-relaxed mb-4"
        style={{ color: "#A7ADB7" }}
      >
        {model.desc}
      </p>
      <a
        data-ocid={`ai.primary_button.${index + 1}`}
        href={model.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyan-outline w-full py-2 px-4 rounded-xl text-sm text-center font-semibold block"
      >
        Chat Now →
      </a>
    </motion.div>
  );
}

function FeaturedCard() {
  return (
    <div className="mb-10">
      <div className="flex justify-center md:justify-start mb-3">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(24,214,214,0.12)",
            color: "#18D6D6",
            border: "1px solid rgba(24,214,214,0.3)",
          }}
        >
          ★ Featured AI
        </span>
      </div>
      <motion.div
        data-ocid="featured.card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1.5px solid rgba(24,214,214,0.5)",
          boxShadow:
            "0 0 40px rgba(24,214,214,0.25), 0 0 80px rgba(24,214,214,0.1), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <AILogoImg
          src={GROK_LOGO}
          alt="Grok logo"
          fallbackText="grok"
          className="ai-logo w-16 h-16 md:w-20 md:h-20 object-contain rounded-2xl bg-black/30 p-2 flex-shrink-0"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Grok</h2>
            <span className="text-sm font-medium" style={{ color: "#A7ADB7" }}>
              by xAI
            </span>
          </div>
          <p className="text-sm md:text-base mb-3" style={{ color: "#A7ADB7" }}>
            Built by xAI — helpful, truthful, maximum truth-seeking. Elon
            Musk&apos;s AI that cuts through the noise.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Real-time data", "X integration", "Truth-first"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md"
                style={{
                  background: "rgba(24,214,214,0.08)",
                  color: "#18D6D6",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto flex-shrink-0">
          <a
            data-ocid="featured.primary_button"
            href="https://grok.x.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold"
          >
            Chat with Grok →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative pt-32 pb-16 px-4 text-center overflow-hidden"
      style={{ background: "#000" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(24,214,214,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(162,59,255,0.05) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <img
          src="/assets/uploads/nano-banana-2_futuristic_minimalist_logo_for_neural_linkz_an_ai_directory_app_deep_space_vanta-0-019d1c67-800b-710d-a1c5-eb045ada3bc9-1.jpg"
          alt="Neural Linkz"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
            margin: "0 auto 16px",
            display: "block",
          }}
        />
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: "#18D6D6" }}
        >
          Onchain AI Directory
        </p>
        <p
          className="text-base md:text-lg max-w-xl mx-auto"
          style={{ color: "#A7ADB7" }}
        >
          The premier onchain AI directory — discover, compare, and connect with
          the world&apos;s best AI models.
        </p>
      </motion.div>
    </section>
  );
}

function HomePage() {
  return (
    <main data-ocid="home.page">
      <Hero />
      <section
        className="px-4 md:px-6 pb-16"
        style={{
          background: "#000",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <FeaturedCard />
          <div className="flex items-center gap-4 mb-6">
            <h2
              className="text-sm font-black tracking-[0.2em] uppercase"
              style={{ color: "#18D6D6" }}
            >
              AI Directory
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <span className="text-xs" style={{ color: "#A7ADB7" }}>
              {AI_MODELS.length} models
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AI_MODELS.map((model, i) => (
              <AICard key={model.id} model={model} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Open Source Models Page ─────────────────────────────────────────────────

function OSModelInitial({ model }: { model: OSModel }) {
  return (
    <div
      style={{
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
        userSelect: "none",
      }}
    >
      {model.initials}
    </div>
  );
}

function OSModelCard({ model, index }: { model: OSModel; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      data-ocid={`os.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: hovered
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hovered
          ? "0 0 20px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        cursor: "pointer",
        transform: hovered ? "scale(1.025)" : "scale(1)",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <OSModelInitial model={model} />
      </div>

      {/* Name + Developer */}
      <div style={{ textAlign: "center" }}>
        <h3
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {model.name}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: "#A7ADB7",
            margin: "2px 0 0",
          }}
        >
          {model.developer}
        </p>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: "#A7ADB7",
          margin: 0,
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {model.desc}
      </p>

      {/* Specs badge */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(24,214,214,0.08)",
            color: "#18D6D6",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 20,
            border: "1px solid rgba(24,214,214,0.2)",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {model.specs}
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
        <a
          data-ocid={`os.primary_button.${index + 1}`}
          href={model.hfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cyan-outline"
          style={{
            flex: 1,
            padding: "7px 0",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 600,
            textAlign: "center",
            display: "block",
            textDecoration: "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Try on HF 🤗
        </a>
        {model.githubUrl && (
          <a
            data-ocid={`os.secondary_button.${index + 1}`}
            href={model.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            style={{
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
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#A7ADB7";
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="sr-only">GitHub repository</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

function OpenSourcePage() {
  const [activeTab, setActiveTab] = useState<OSCategory>("text");

  const models = OS_MODELS[activeTab];

  return (
    <main
      data-ocid="os.page"
      style={{ minHeight: "100vh", background: "#000" }}
    >
      {/* Hero */}
      <section
        className="relative pt-28 pb-10 px-4 text-center overflow-hidden"
        style={{ background: "#000" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(24,214,214,0.06) 0%, transparent 65%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#18D6D6",
              marginBottom: 14,
            }}
          >
            Open Source Models
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 14px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Open Source Models
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#A7ADB7",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Cutting-edge community models — fully open weights, Hugging Face
            ready
          </p>
        </motion.div>
      </section>

      {/* Sticky category tabs */}
      <div
        data-ocid="os.tab"
        style={{
          position: "sticky",
          top: 64,
          zIndex: 30,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 16px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maxWidth: 1280,
            margin: "0 auto",
          }}
          className="os-tabs-row"
        >
          {OS_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                data-ocid="os.tab"
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  padding: "8px 18px",
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid rgba(24,214,214,0.4)"
                    : "1px solid rgba(255,255,255,0.10)",
                  background: isActive
                    ? "rgba(24,214,214,0.15)"
                    : "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  color: isActive ? "#18D6D6" : "rgba(255,255,255,0.65)",
                  boxShadow: isActive
                    ? "0 0 16px rgba(24,214,214,0.2), inset 0 1px 0 rgba(24,214,214,0.15)"
                    : "none",
                  transition:
                    "background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
                  flexShrink: 0,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Model grid with AnimatePresence */}
      <section
        className="px-4 md:px-6 py-8"
        style={{
          background: "#000",
          minHeight: 400,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {models.map((model, i) => (
                <OSModelCard key={model.id} model={model} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

// ─── Stub pages ───────────────────────────────────────────────────────────────

function StubPage({
  title,
  subtitle,
  emoji,
}: { title: string; subtitle: string; emoji: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-6xl mb-6">{emoji}</div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
          {title}
        </h1>
        <p className="text-lg mb-6" style={{ color: "#A7ADB7" }}>
          {subtitle}
        </p>
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{
            background: "rgba(24,214,214,0.08)",
            color: "#18D6D6",
            border: "1px solid rgba(24,214,214,0.2)",
          }}
        >
          Coming Soon
        </span>
      </motion.div>
    </main>
  );
}

function OnchainPage() {
  return (
    <StubPage
      emoji="⛓️"
      title="Onchain AI Models"
      subtitle="Discover AI models running fully on-chain on the Internet Computer."
    />
  );
}
// ---- Benchmark Data Hook ----
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
const FETCH_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h

type FetchSource = "lmarena" | "artificialanalysis" | "openllm" | "cached";

function useBenchmarkData() {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchSource, setFetchSource] = useState<FetchSource>("cached");
  const [changedRows, setChangedRows] = useState<Set<string>>(new Set());
  const [dataVersion, setDataVersion] = useState(0);
  const prevElosRef = useRef<Record<string, number>>({});

  const refresh = useCallback(async (force = false) => {
    const now = Date.now();
    const last = Number.parseInt(localStorage.getItem(LAST_FETCH_KEY) || "0");
    if (!force && now - last < FETCH_INTERVAL_MS) {
      // Still update lastUpdated from storage if available
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

      setFetchSource(source);
      localStorage.setItem(LAST_FETCH_KEY, String(Date.now()));
      setLastUpdated(new Date());

      // Detect changed rows vs previous ELOs
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
        // Seed prevElos on first cached load
        for (const row of FALLBACK_ARENA_DATA) {
          prevElosRef.current[row.model] = row.elo ?? 0;
        }
      }

      setDataVersion((v) => v + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount: respect 24h debounce
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Auto-refresh every 24h
  useEffect(() => {
    const id = setInterval(() => refresh(), FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  // Refresh on tab focus (respects debounce)
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

// --- Glass Spinner ---
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

// --- Relative timestamp ---
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
      transition={{ duration: 0.3 }}
    >
      Updated {text}
    </motion.span>
  );
}

// --- Source badge ---
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

function BenchmarksPage() {
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

  // Re-sort when new data version arrives - dataVersion intentionally triggers re-sort
  // biome-ignore lint/correctness/useExhaustiveDependencies: dataVersion triggers sort
  useEffect(() => {
    setSortKey((k) => k);
  }, [dataVersion]);

  const tabs = [
    "Chatbot Arena (ELO)",
    "Overall Intelligence",
    "Open Source Focus",
  ];

  // --- Data ---
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
  }: {
    cards: HCard[];
    barMode: "elo" | "gpqa";
  }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }, []);

    return (
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
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

              {/* ELO / GPQA Bar Chart */}
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
                        boxShadow: `0 0 8px ${c.color === "#ffffff" ? "rgba(24,214,214,0.6)" : `${c.color}99`}`,
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

    // Mobile card renderer
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
                  fontWeight: 800,
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
        {/* Mobile: card stack */}
        <div className="block sm:hidden">
          <MobileCards />
        </div>

        {/* Desktop/tablet: scrollable table */}
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
                          whiteSpace: "nowrap",
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
      className="min-h-screen pt-24 pb-16 px-4 md:px-6"
      style={{ background: "#000" }}
    >
      {dataLoading && <GlassSpinner />}
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
          {/* Last updated badge */}
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
          {/* Leaderboard external links */}
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
            {/* Refresh Data button */}
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

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <HighlightCards
              cards={tabContent[activeTab].highlights}
              barMode={tabContent[activeTab].barMode}
            />
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

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
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
function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-black text-white mb-4">
          About <span style={{ color: "#18D6D6" }}>Neural Linkz</span>
        </h1>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: "#A7ADB7" }}
        >
          Neural Linkz is the premier onchain AI directory, fully hosted and
          running on the Internet Computer via Caffeine. Think Linktree — but
          for the world&apos;s best AI models.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: "#A7ADB7" }}
        >
          We curate, index, and surface the most capable AI models across
          categories: mainstream assistants, open-source models, and
          cutting-edge on-chain AI running entirely on ICP.
        </p>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "#A7ADB7" }}
        >
          Our mission is simple: help you find the right AI for any task —
          instantly, from anywhere, with the censorship-resistance and
          permanence of the Internet Computer.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            "Onchain",
            "Censorship-resistant",
            "Always available",
            "Curated",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                background: "rgba(24,214,214,0.08)",
                color: "#18D6D6",
                border: "1px solid rgba(24,214,214,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "neural-linkz";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="mt-auto pt-8 pb-6 px-4 md:px-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <img
                src="/assets/uploads/nano-banana-2_futuristic_minimalist_logo_for_neural_linkz_an_ai_directory_app_deep_space_vanta-0-019d1c67-800b-710d-a1c5-eb045ada3bc9-1.jpg"
                alt="Neural Linkz"
                className="w-7 h-7 rounded-md object-cover"
              />
              <span className="font-bold text-white">
                Neural <span style={{ color: "#18D6D6" }}>Linkz</span>
              </span>
            </div>
            <p className="text-xs" style={{ color: "#A7ADB7" }}>
              The Onchain AI Directory
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              data-ocid="footer.link"
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#A7ADB7",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
              aria-label="X / Twitter"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X / Twitter</span>
            </a>
            <a
              data-ocid="footer.link"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#A7ADB7",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              data-ocid="footer.link"
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#A7ADB7",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
              aria-label="Discord"
            >
              <span className="sr-only">Discord</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 mb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              type="button"
              data-ocid="footer.link"
              onClick={() => onNavigate(item.page)}
              className="text-xs transition-colors hover:text-white"
              style={{ color: "#A7ADB7" }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p
          className="text-center md:text-left text-xs"
          style={{ color: "#A7ADB7" }}
        >
          © {year} Neural Linkz. Onchain on the Internet Computer. Built with ❤️
          using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#18D6D6" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  if (!deferredPrompt || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="pwa.toast"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed bottom-4 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl"
        style={{
          background: "#0E1A1F",
          border: "1px solid #18D6D6",
          boxShadow: "0 0 30px rgba(24,214,214,0.2)",
          maxWidth: "480px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 2rem)",
        }}
      >
        <img
          src="/assets/uploads/nano-banana-2_futuristic_minimalist_logo_for_neural_linkz_an_ai_directory_app_deep_space_vanta-0-019d1c67-800b-710d-a1c5-eb045ada3bc9-1.jpg"
          alt=""
          className="w-8 h-8 rounded-lg flex-shrink-0 object-cover"
        />
        <p className="flex-1 text-sm font-medium text-white">
          Install Neural Linkz for a native app experience
        </p>
        <button
          type="button"
          data-ocid="pwa.confirm_button"
          onClick={handleInstall}
          className="btn-cyan px-3 py-1.5 rounded-lg text-sm font-bold flex-shrink-0"
        >
          Install
        </button>
        <button
          type="button"
          data-ocid="pwa.close_button"
          onClick={() => setDismissed(true)}
          className="w-7 h-7 flex items-center justify-center rounded-md transition-colors flex-shrink-0"
          style={{ color: "#A7ADB7" }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "open-source":
        return <OpenSourcePage />;
      case "onchain":
        return <OnchainPage />;
      case "benchmarks":
        return <BenchmarksPage />;
      case "about":
        return <AboutPage />;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="min-h-screen flex flex-col"
      style={{ background: "#000", fontFamily: "Space Grotesk, sans-serif" }}
    >
      <Nav
        onMenuOpen={() => setDrawerOpen((v) => !v)}
        onNavigate={handleNavigate}
        isMenuOpen={drawerOpen}
      />
      <BottomSheetMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer onNavigate={handleNavigate} />
      <PWAInstallBanner />
    </div>
  );
}
