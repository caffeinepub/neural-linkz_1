import { motion } from "motion/react";
import React, { useState } from "react";
import { AI_MODELS, GROK_FALLBACK, GROK_LOGO } from "../data";
import type { AIModel } from "../types";

// Brightness/contrast filters for icons that need dark-mode visibility boost.
const NEW_ICON_FILTERS: Record<string, string> = {
  udio: "brightness(1.1) saturate(1.2)",
  suno: "brightness(1.05) saturate(1.1)",
  llama: "brightness(1.1) contrast(1.05)",
  mistral: "brightness(1.1) saturate(1.15)",
  glm: "brightness(1.3) contrast(1.1) saturate(1.1)",
  "minimax-music": "brightness(1.1) saturate(1.1)",
  // new additions
  midjourney: "brightness(1.0)",
  flux: "brightness(1.1)",
  "adobe-firefly": "brightness(1.0)",
  runway: "brightness(1.1)",
  elevenlabs: "brightness(1.1)",
  "github-copilot": "brightness(1.1)",
  vercel: "brightness(1.1)",
  manus: "brightness(1.1)",
  "claude-code": "brightness(1.0) saturate(1.1)",
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
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
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
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: logoHovered
              ? "0 0 16px rgba(255,255,255,0.15), inset 0 0 8px rgba(255,255,255,0.05)"
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
        Chat Now →
      </a>
    </motion.div>
  );
});

const FeaturedCard = React.memo(function FeaturedCard() {
  const [logoHovered, setLogoHovered] = useState(false);

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
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
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
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(255,255,255,0.15)",
              boxShadow: logoHovered
                ? "0 0 16px rgba(255,255,255,0.15), inset 0 0 8px rgba(255,255,255,0.05)"
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
});

function Hero() {
  return (
    <section
      className="relative pb-16 px-4 text-center overflow-hidden"
      style={{
        background: "#000",
        paddingTop: "calc(128px + env(safe-area-inset-top, 0px))",
      }}
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
          The premier onchain AI directory — discover, compare, and connect with
          the world&apos;s best AI models.
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
