import { r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-BUkGlC3S.js";
function AboutPage() {
  const faqItems = [
    {
      q: "What is Neural Linkz?",
      a: "Neural Linkz (https://neural-linkz-xgf.caffeine.xyz/) is a premium decentralized AI directory on the Internet Computer built using caffeine.ai — like Linktree but for Grok, Claude, Gemini, Llama, and open source models."
    },
    {
      q: "Is Neural Linkz free to use?",
      a: "Yes, completely free. No account needed. Open the app, explore AI models, and install it as a PWA on your phone."
    },
    {
      q: "Is Neural Linkz built on ICP?",
      a: "Yes, fully onchain and unstoppable — tamperproof using Caffeine.ai on the Internet Computer Protocol."
    },
    {
      q: "Why is Grok featured first?",
      a: "Grok by xAI is the most powerful frontier model as of 2026. Neural Linkz showcases the best models first, with Grok leading the directory."
    },
    {
      q: "What open source models are listed?",
      a: "17+ open source models including Llama 4, Mistral, Qwen, Gemma, FLUX, and more — categorized by text, image, video, and voice generation."
    },
    {
      q: "How do I install Neural Linkz as a PWA?",
      a: "Open https://neural-linkz-xgf.caffeine.xyz/ in Chrome or Safari, tap Share → Add to Home Screen, and it launches full-screen like a native app."
    },
    {
      q: "What are the real-time benchmarks?",
      a: "Live ELO leaderboard with sortable scores from LMSYS, SWE-bench, GPQA, and ARC-AGI — auto-refreshed with fallback data."
    },
    {
      q: "Can I use Neural Linkz on desktop?",
      a: "Yes. The liquid glass PWA is fully responsive — works beautifully on mobile and desktop with the same premium experience."
    }
  ];
  reactExports.useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
    };
    let el = document.getElementById(
      "faqpage-schema"
    );
    if (!el) {
      el = document.createElement("script");
      el.id = "faqpage-schema";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      const existing = document.getElementById("faqpage-schema");
      if (existing) existing.remove();
    };
  }, []);
  const sectionCards = [
    {
      delay: 0.08,
      heading: "Why Neural Linkz? Your Gateway to the Neural Universe",
      answer: "One app. Every top AI model. No servers.",
      body: "Neural Linkz is the premier AI directory — like Linktree but for Grok by xAI, Claude by Anthropic, Gemini by Google, Llama by Meta, and 17+ categorized open source models. Discover, compare, and access the world's best AI tools instantly from a single beautifully designed onchain app."
    },
    {
      delay: 0.12,
      heading: "How is Neural Linkz Built? Fully Onchain with Caffeine.ai",
      answer: "No servers. No downtime. Pure blockchain.",
      body: "Neural Linkz runs 100% on the Internet Computer Protocol (ICP) using Caffeine.ai — the platform for building and deploying fullstack dApps onchain. Every page, every asset, every API call is served from onchain canisters. It's unstoppable, tamperproof, and censorship-resistant by design."
    },
    {
      delay: 0.16,
      heading: "What Makes Neural Linkz Different? Premium Liquid Glass + Bubble Animations on ICP",
      answer: "A native-feeling PWA with signature bubble-pop navigation.",
      body: "Neural Linkz features a deep Vanta black backdrop, ultra-premium liquid glassmorphism on every surface, and a signature Glowing Neural Nexus Orb that triggers a beautiful bubble-pop bottom sheet. Installable as a PWA on iOS and Android — full-screen, fast, and buttery smooth at 60fps."
    },
    {
      delay: 0.2,
      heading: "How Do I Explore the AI Models?",
      answer: "Tap the glowing orb at the bottom-right to open the menu.",
      body: "From the Neural Nexus Orb menu, navigate to Open Source Models (17+ models sorted by text, image, video, voice), Real-Time Benchmarks (live ELO leaderboard with LMSYS, SWE-bench, GPQA, ARC-AGI scores), and Onchain AI Models. All data refreshes automatically — no manual updates needed."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "main",
    {
      className: "min-h-screen flex items-start justify-center pb-24 px-4",
      style: {
        background: "transparent",
        paddingTop: "calc(96px + env(safe-area-inset-top, 0px))"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 360, damping: 26 },
          className: "w-full flex flex-col items-center text-center",
          style: { maxWidth: 680 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                  delay: 0.04
                },
                className: "w-full rounded-3xl p-8 md:p-12 mb-4 flex flex-col items-center",
                style: {
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/uploads/neurallinkzlogo-019d1dad-d950-73da-9406-095542613345-1.jpg",
                      alt: "Neural Linkz — Decentralized AI Directory on ICP",
                      width: 80,
                      height: 80,
                      className: "w-20 h-20 rounded-2xl object-cover mb-6",
                      style: { boxShadow: "0 0 32px rgba(24,214,214,0.25)" },
                      loading: "eager"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h1",
                    {
                      className: "text-2xl md:text-3xl font-black text-white mb-3 leading-tight",
                      style: { letterSpacing: "-0.01em" },
                      children: [
                        "What is Neural Linkz?",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#18D6D6" }, children: "Decentralized AI Directory" }),
                        " ",
                        "running fully onchain on the Internet Computer Protocol built using",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: "https://caffeine.ai",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                              color: "#18D6D6",
                              textDecoration: "underline",
                              textDecorationColor: "rgba(24,214,214,0.4)"
                            },
                            children: "caffeine.ai"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm md:text-base leading-relaxed mb-4",
                      style: { color: "rgba(255,255,255,0.55)", maxWidth: 520 },
                      children: [
                        "The AI directory like Linktree — but for Grok, Claude, Gemini, Llama, and the best open source models. Fully onchain at",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: "https://neural-linkz-xgf.caffeine.xyz/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: { color: "#18D6D6" },
                            children: "neural-linkz-xgf.caffeine.xyz"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
                      style: {
                        background: "rgba(24,214,214,0.08)",
                        border: "1px solid rgba(24,214,214,0.25)",
                        color: "#18D6D6"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#18D6D6",
                              display: "inline-block",
                              boxShadow: "0 0 6px rgba(24,214,214,0.8)"
                            }
                          }
                        ),
                        "Last updated: March 24, 2026"
                      ]
                    }
                  )
                ]
              }
            ),
            sectionCards.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                  delay: section.delay
                },
                className: "w-full rounded-2xl px-6 py-6 mb-3",
                style: {
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "text-lg md:text-xl font-bold text-white mb-2 leading-snug",
                      style: { letterSpacing: "-0.005em" },
                      children: section.heading
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-semibold mb-3",
                      style: { color: "#18D6D6" },
                      children: section.answer
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm md:text-base leading-relaxed",
                      style: {
                        color: "rgba(255,255,255,0.6)",
                        maxWidth: 520,
                        margin: "0 auto"
                      },
                      children: section.body
                    }
                  )
                ]
              },
              section.heading
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-24 h-px mx-auto my-5",
                style: {
                  background: "linear-gradient(90deg, transparent, rgba(24,214,214,0.4), transparent)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                  delay: 0.24
                },
                className: "w-full mb-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "text-lg font-bold mb-5",
                      style: { color: "rgba(255,255,255,0.85)" },
                      children: "Frequently Asked Questions"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 w-full", children: faqItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                        delay: 0.28 + i * 0.04
                      },
                      className: "w-full rounded-2xl px-6 py-5 text-center",
                      style: {
                        background: "rgba(24,214,214,0.04)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(24,214,214,0.12)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-semibold mb-2",
                            style: { color: "#18D6D6" },
                            children: item.q
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm leading-relaxed",
                            style: {
                              color: "rgba(255,255,255,0.55)",
                              maxWidth: 480,
                              margin: "0 auto"
                            },
                            children: item.a
                          }
                        )
                      ]
                    },
                    item.q
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 26,
                  delay: 0.6
                },
                className: "mt-2 flex flex-col items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-32 h-px",
                      style: {
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.4)" }, children: "Made with ❤️ for the AI community" })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  AboutPage as default
};
