import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { AI_MODELS, GROK_FALLBACK, GROK_LOGO } from "../data";
import type { AIModel } from "../types";

const CAFFEINE_LOGO =
  "/assets/uploads/caffeineai-019d2eec-e466-748a-a5a7-c8d30234a018-1.jpg";
const CLAUDE_LOGO =
  "/assets/uploads/claude-ai-icon-019d21d9-5604-75eb-b393-5b31129f9f9b-1.webp";

// Brightness/contrast filters for icons that need dark-mode visibility boost.
const NEW_ICON_FILTERS: Record<string, string> = {
  udio: "brightness(1.1) saturate(1.2)",
  suno: "brightness(1.05) saturate(1.1)",
  llama: "brightness(1.1) contrast(1.05)",
  mistral: "brightness(1.1) saturate(1.15)",
  glm: "brightness(1.3) contrast(1.1) saturate(1.1)",
  "minimax-music": "brightness(1.1) saturate(1.1)",
  midjourney: "brightness(1.0)",
  flux: "brightness(1.1)",
  "adobe-firefly": "brightness(1.0)",
  runway: "brightness(1.1)",
  elevenlabs: "brightness(1.1)",
  "github-copilot": "brightness(1.1)",
  vercel: "brightness(1.1)",
  manus: "brightness(1.1)",
  "claude-code": "brightness(1.0) saturate(1.1)",
  kimi: "brightness(1.1) saturate(1.1)",
  codex: "brightness(1.1)",
  huggingface: "brightness(1.0) saturate(1.1)",
  kling: "brightness(1.1)",
  "stable-diffusion": "brightness(1.1) saturate(1.1)",
  ideogram: "brightness(1.1)",
  "leonardo-ai": "brightness(1.0)",
  notebooklm: "brightness(1.1)",
  dalle: "brightness(1.05) saturate(1.1)",
  "nano-banana": "brightness(1.05) saturate(1.1)",
  replicate: "brightness(1.0)",
  "ai-studio-google": "brightness(1.2) contrast(1.1)",
  "anti-gravity": "brightness(1.05) saturate(1.1)",
};

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
        suno: "https://suno.com/favicon.ico",
        udio: "https://udio.com/favicon.ico",
        "minimax-music": "https://www.minimaxi.com/favicon.ico",
        qwen: "https://lobehub.com/icons/qwen.svg",
        glm: "https://chatglm.cn/favicon.ico",
        cursor: "https://lobehub.com/icons/cursor.svg",
        "claude-code": "https://lobehub.com/icons/claude.svg",
        midjourney: "https://lobehub.com/icons/midjourney.svg",
        flux: "https://blackforestlabs.ai/favicon.ico",
        "adobe-firefly": "https://lobehub.com/icons/adobe-firefly.svg",
        runway: "https://runwayml.com/favicon.ico",
        elevenlabs: "https://elevenlabs.io/favicon.ico",
        "github-copilot": "https://lobehub.com/icons/github-copilot.svg",
        vercel: "https://vercel.com/favicon.ico",
        manus: "https://manus.im/favicon.ico",
        kimi: "https://kimi.moonshot.cn/favicon.ico",
        codex: "https://openai.com/favicon.ico",
        huggingface: "https://huggingface.co/favicon.ico",
        kling: "https://kling.ai/favicon.ico",
        "stable-diffusion": "https://stability.ai/favicon.ico",
        ideogram: "https://ideogram.ai/favicon.ico",
        "leonardo-ai": "https://leonardo.ai/favicon.ico",
        notebooklm: "https://notebooklm.google/favicon.ico",
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
      width={80}
      height={80}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      onError={handleError}
    />
  );
}

const AICard = React.memo(function AICard({
  model,
  index,
}: { model: AIModel; index: number }) {
  const [logoHovered, setLogoHovered] = useState(false);

  const iconFilter = NEW_ICON_FILTERS[model.id] ?? undefined;

  return (
    <motion.div
      data-ocid={`ai.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 26,
        delay: index * 0.05,
      }}
      className="card-hover group flex flex-col items-center text-center rounded-2xl p-3 sm:p-4 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.10)",
        // Reduced glow: softer box-shadow (~50% less intensity)
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        minHeight: "245px",
      }}
    >
      {/* Icon centered at top */}
      <div
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        className="mx-auto mb-2 flex-shrink-0"
        style={{
          borderRadius: "12px",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        <AILogoImg
          src={model.logo}
          alt={`${model.name} logo`}
          fallbackText={model.id}
          className="ai-logo w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] flex-shrink-0 rounded-xl object-contain bg-black/30 p-1.5"
          style={{
            border: logoHovered
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.06)",
            // Reduced hover glow: ~50% less intensity
            boxShadow: logoHovered
              ? "0 0 10px rgba(255,255,255,0.05), inset 0 0 5px rgba(255,255,255,0.02)"
              : "none",
            transition: "border-color 0.2s, box-shadow 0.2s, filter 0.2s",
            filter: iconFilter,
          }}
        />
      </div>

      {/* Model name */}
      <h3
        className="font-bold text-white text-center leading-tight w-full"
        style={{
          fontSize: "clamp(15px, 4vw, 18px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        {model.name}
      </h3>

      {/* Provider / subtitle */}
      <p
        className="text-xs text-center mt-0.5 mb-2"
        style={{ color: "#A7ADB7" }}
      >
        {model.company}
      </p>

      {/* Description */}
      <p
        className="text-xs sm:text-sm flex-1 leading-relaxed mb-4 text-center w-full"
        style={{ color: "#A7ADB7" }}
      >
        {model.desc}
      </p>

      {/* Chat Now button */}
      <a
        data-ocid={`ai.primary_button.${index + 1}`}
        href={model.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyan-outline w-full py-2 px-4 rounded-xl text-sm text-center font-semibold block"
      >
        {model.buttonText ? `${model.buttonText} →` : "Chat Now →"}
      </a>
    </motion.div>
  );
});

const GrokFeaturedCard = React.memo(function GrokFeaturedCard() {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <motion.div
      data-ocid="featured.card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="rounded-2xl p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center h-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1.5px solid rgba(24,214,214,0.4)",
        boxShadow:
          "0 0 10px rgba(24,214,214,0.04), 0 0 20px rgba(24,214,214,0.02), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        className="flex-shrink-0"
        style={{ borderRadius: "16px" }}
      >
        <AILogoImg
          src={GROK_LOGO}
          alt="Grok logo"
          fallbackText="grok"
          className="ai-logo w-20 h-20 md:w-24 md:h-24 object-contain rounded-2xl bg-black/30 p-2"
          style={{
            border: logoHovered
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.12)",
            boxShadow: logoHovered
              ? "0 0 6px rgba(255,255,255,0.04), inset 0 0 3px rgba(255,255,255,0.02)"
              : "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        />
      </div>
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
                background: "rgba(24,214,214,0.07)",
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
  );
});

const CaffeineFeaturedCard = React.memo(function CaffeineFeaturedCard() {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <motion.div
      data-ocid="featured.caffeine_card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.08 }}
      className="rounded-2xl p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center h-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1.5px solid rgba(204,255,0,0.4)",
        boxShadow:
          "0 0 10px rgba(204,255,0,0.04), 0 0 20px rgba(204,255,0,0.02), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        className="flex-shrink-0"
        style={{ borderRadius: "16px" }}
      >
        <AILogoImg
          src={CAFFEINE_LOGO}
          alt="Caffeine.ai logo"
          fallbackText="caffeine"
          className="ai-logo w-20 h-20 md:w-24 md:h-24 object-contain rounded-2xl bg-black/30 p-2"
          style={{
            border: logoHovered
              ? "1px solid rgba(204,255,0,0.4)"
              : "1px solid rgba(204,255,0,0.18)",
            boxShadow: logoHovered
              ? "0 0 7px rgba(204,255,0,0.05), inset 0 0 3px rgba(204,255,0,0.02)"
              : "0 0 3px rgba(204,255,0,0.03)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Caffeine.ai
          </h2>
          <span className="text-sm font-medium" style={{ color: "#A7ADB7" }}>
            by Caffeine
          </span>
        </div>
        <p className="text-sm md:text-base mb-3" style={{ color: "#A7ADB7" }}>
          Build Full-Stack Apps on ICP by Chatting
        </p>
        <p className="text-xs md:text-sm mb-3" style={{ color: "#A7ADB7" }}>
          The easiest way to create decentralized AI-powered apps on the
          Internet Computer. Chat → Code → Deploy.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Chat to Code", "ICP Native", "Full-Stack"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(204,255,0,0.07)",
                color: "#CCFF00",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full md:w-auto flex-shrink-0">
        <a
          data-ocid="featured.caffeine_primary_button"
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lime w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold"
        >
          Build with Caffeine →
        </a>
      </div>
    </motion.div>
  );
});

const ClaudeFeaturedCard = React.memo(function ClaudeFeaturedCard() {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <motion.div
      data-ocid="featured.claude_card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.16 }}
      className="rounded-2xl p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center h-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1.5px solid rgba(205,133,63,0.4)",
        boxShadow:
          "0 0 10px rgba(205,133,63,0.04), 0 0 20px rgba(205,133,63,0.02), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        className="flex-shrink-0"
        style={{ borderRadius: "16px" }}
      >
        <AILogoImg
          src={CLAUDE_LOGO}
          alt="Claude logo"
          fallbackText="claude"
          className="ai-logo w-20 h-20 md:w-24 md:h-24 object-contain rounded-2xl bg-black/30 p-2"
          style={{
            border: logoHovered
              ? "1px solid rgba(205,133,63,0.4)"
              : "1px solid rgba(205,133,63,0.18)",
            boxShadow: logoHovered
              ? "0 0 7px rgba(205,133,63,0.06), inset 0 0 3px rgba(205,133,63,0.02)"
              : "0 0 3px rgba(205,133,63,0.03)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Claude</h2>
          <span className="text-sm font-medium" style={{ color: "#A7ADB7" }}>
            Anthropic
          </span>
        </div>
        <p className="text-sm md:text-base mb-3" style={{ color: "#A7ADB7" }}>
          Powerful, safe, and helpful AI from Anthropic — excellent at reasoning
          and complex tasks.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Deep reasoning", "Safety-first", "Long context"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(205,133,63,0.08)",
                color: "#CD853F",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full md:w-auto flex-shrink-0">
        <a
          data-ocid="featured.claude_primary_button"
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold"
          style={{
            background: "rgba(205,133,63,0.15)",
            border: "1.5px solid rgba(205,133,63,0.5)",
            color: "#CD853F",
          }}
        >
          Chat with Claude →
        </a>
      </div>
    </motion.div>
  );
});

/**
 * FeaturedSection — horizontally swipeable on mobile, 3-column grid on desktop.
 *
 * Centering fix: each card wrapper is `min-width: 100%` of the scroll container
 * (no gap, no padding offset), with `scrollSnapAlign: start`. On mount we
 * imperatively reset scrollLeft to 0 so the first card is always flush-left
 * and perfectly fills the viewport.
 *
 * Swipe indicator: an onScroll handler tracks the active card index and
 * animates the "-••" pill/dot indicator below the cards.
 */
function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Force scrollLeft = 0 on mount so Grok is always perfectly centered on load.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Use requestAnimationFrame to ensure layout has settled before resetting.
    requestAnimationFrame(() => {
      el.scrollLeft = 0;
    });
  }, []);

  // Track which card is in view by comparing scrollLeft to card width.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth;
    if (cardWidth === 0) return;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(2, index)));
  };

  const ACCENT_COLORS = ["#18D6D6", "#CCFF00", "#CD853F"];
  const activeColor = ACCENT_COLORS[activeIndex];

  return (
    <div className="mb-10">
      <div className="flex justify-center md:justify-start mb-3">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(24,214,214,0.07)",
            color: "#18D6D6",
            border: "1px solid rgba(24,214,214,0.18)",
          }}
        >
          ★ Featured AI
        </span>
      </div>

      {/*
        Outer wrapper: clips overflow on mobile, becomes a plain flex grid on md+.
        On mobile the scroll container fills 100% so each card snaps exactly.
      */}
      <div
        className="md:grid md:grid-cols-3 md:gap-4"
        style={{ overflow: "hidden" }}
      >
        {/* Scroll container — mobile only */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="md:contents"
          style={{
            // Mobile: full-width scroll track, each card = 100% width → perfect centering
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling:
              "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
            msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
            // No padding / gap here — card wrappers are min-width:100% so
            // card 0 starts exactly at x=0 with no right-shift.
          }}
        >
          <style>{".featured-track::-webkit-scrollbar{display:none}"}</style>

          {/* Grok */}
          <div
            className="shrink-0"
            style={{
              minWidth: "100%",
              // Horizontal padding on mobile for breathing room (does NOT shift snap)
              paddingLeft: "0px",
              paddingRight: "0px",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <GrokFeaturedCard />
          </div>

          {/* Caffeine.ai */}
          <div
            className="shrink-0"
            style={{
              minWidth: "100%",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <CaffeineFeaturedCard />
          </div>

          {/* Claude */}
          <div
            className="shrink-0"
            style={{
              minWidth: "100%",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <ClaudeFeaturedCard />
          </div>
        </div>
      </div>

      {/*
        Animated swipe indicator — visible on mobile only.
        Active dot expands into a pill ("–") and takes the accent color of the
        current card. Inactive dots are small circles.
      */}
      <div
        className="flex justify-center items-center gap-[6px] mt-4 md:hidden"
        aria-label="Featured card indicator"
      >
        {[0, 1, 2].map((i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={i}
              animate={{
                width: isActive ? 22 : 6,
                opacity: isActive ? 1 : 0.3,
                backgroundColor: isActive ? activeColor : "#ffffff",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                height: 6,
                borderRadius: 3,
                // Subtle glow on active
                boxShadow: isActive ? `0 0 6px ${activeColor}80` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative pb-6 px-4 text-center overflow-hidden"
      style={{
        background: "#000",
        paddingTop: "calc(72px + env(safe-area-inset-top, 0px))",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(24,214,214,0.03) 0%, transparent 70%)",
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
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
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
          Discover, Connect and Compare the World&apos;s Best AI Models
        </p>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main data-ocid="home.page">
      <Hero />
      <section className="px-4 md:px-6 pb-16" style={{ background: "#000" }}>
        <div className="max-w-7xl mx-auto">
          <FeaturedSection />
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {AI_MODELS.map((model, i) => (
              <AICard key={model.id} model={model} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
