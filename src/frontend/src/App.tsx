import {
  AnimatePresence,
  motion,
  useAnimate,
  useReducedMotion,
} from "motion/react";
import type React from "react";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import GlassShimmer from "./components/GlassShimmer";
import { NAV_ITEMS } from "./data";
import type { Page } from "./types";

const HomePage = lazy(() => import("./pages/HomePage"));
const OpenSourcePage = lazy(() => import("./pages/OpenSourcePage"));
const BenchmarksPage = lazy(() => import("./pages/BenchmarksPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const OnchainPage = lazy(() => import("./pages/OnchainPage"));

// ─── Shared Components ───────────────────────────────────────────────────────

function Nav({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        height: "calc(64px + env(safe-area-inset-top, 0px))",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingLeft: "max(16px, calc(16px + env(safe-area-inset-left, 0px)))",
        paddingRight: "max(16px, calc(16px + env(safe-area-inset-right, 0px)))",
      }}
    >
      <button
        type="button"
        data-ocid="nav.link"
        onClick={() => onNavigate("home")}
        className="flex items-center justify-center group"
      >
        <img
          src="/assets/uploads/nano-banana-2_futuristic_minimalist_logo_for_neural_linkz_an_ai_directory_app_deep_space_vanta-0-019d1c67-800b-710d-a1c5-eb045ada3bc9-1.jpg"
          alt="Neural Linkz"
          className="w-8 h-8 rounded-lg object-cover"
        />
      </button>
    </header>
  );
}

function NeuralNexusOrb({
  onOpen,
  isSheetOpen,
  highFive,
}: {
  onOpen: (rect: DOMRect) => void;
  isSheetOpen?: boolean;
  highFive?: number;
}) {
  const [rippling, setRippling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInflating, setIsInflating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const rippleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inflateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const orbRef = useRef<HTMLButtonElement>(null);
  const [spinRef, animateSpin] = useAnimate<HTMLDivElement>();
  const [highFiveRef, animateHighFive] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (!highFive || !highFiveRef.current) return;
    animateHighFive(
      highFiveRef.current,
      { scale: [1, 1.22, 0.93, 1.07, 1] },
      { duration: 0.48, ease: "easeOut" },
    );
  }, [highFive, animateHighFive, highFiveRef]);

  const handleClick = () => {
    if (rippleTimer.current) clearTimeout(rippleTimer.current);
    setRippling(true);
    rippleTimer.current = setTimeout(() => {
      setRippling(false);
      rippleTimer.current = null;
    }, 700);
    if (orbRef.current) {
      const rect = orbRef.current.getBoundingClientRect();
      // Spin the orb 360° clockwise — sheet opens in parallel after first frame
      if (spinRef.current && !isSpinning) {
        setIsSpinning(true);
        animateSpin(
          spinRef.current,
          { rotate: [0, 360] },
          { duration: 0.36, ease: [0.4, 0, 0.2, 1] },
        ).then(() => setIsSpinning(false));
      }
      // Fire sheet open on next frame — zero perceived delay
      requestAnimationFrame(() => onOpen(rect));
      // Inflate effects start on next frame too
      requestAnimationFrame(() => {
        setIsInflating(true);
        if (inflateTimer.current) clearTimeout(inflateTimer.current);
        inflateTimer.current = setTimeout(() => {
          setIsInflating(false);
          inflateTimer.current = null;
        }, 700);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (rippleTimer.current) clearTimeout(rippleTimer.current);
      if (inflateTimer.current) clearTimeout(inflateTimer.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes neuralRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rimShift {
          0%, 100% { box-shadow: 0 0 24px rgba(255,255,255,0.12), 0 0 48px rgba(24,214,214,0.08), inset 0 1px 0 rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.25); }
          33% { box-shadow: 0 0 30px rgba(255,255,255,0.18), 0 0 56px rgba(24,214,214,0.14), inset 0 1px 0 rgba(255,255,255,0.35); border-color: rgba(255,255,255,0.45); }
          66% { box-shadow: 0 0 20px rgba(255,255,255,0.10), 0 0 40px rgba(24,214,214,0.06), inset 0 1px 0 rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.18); }
        }
        @keyframes rippleOut {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes inflateRipple {
          0% { transform: scale(1); opacity: 0.22; }
          100% { transform: scale(5.5); opacity: 0; }
        }
        @keyframes glowBurst {
          0% { transform: scale(0.6); opacity: 0.28; }
          100% { transform: scale(4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .neural-orb-container { animation: none !important; }
          .neural-orb-inner { animation: none !important; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
          right: "calc(24px + env(safe-area-inset-right, 0px))",
          zIndex: 50,
        }}
      >
        {rippling && (
          <>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 62,
                height: 62,
                marginTop: -31,
                marginLeft: -31,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.4)",
                animation: "rippleOut 0.7s ease-out forwards",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 62,
                height: 62,
                marginTop: -31,
                marginLeft: -31,
                borderRadius: "50%",
                border: "1px solid rgba(24,214,214,0.4)",
                animation: "rippleOut 0.7s ease-out 0.15s forwards",
                pointerEvents: "none",
              }}
            />
          </>
        )}
        {isInflating && (
          <>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 62,
                height: 62,
                marginTop: -31,
                marginLeft: -31,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(24,214,214,0.25) 0%, rgba(24,214,214,0) 70%)",
                animation: "glowBurst 0.55s ease-out forwards",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 62,
                height: 62,
                marginTop: -31,
                marginLeft: -31,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                animation: "inflateRipple 0.65s ease-out 0.05s forwards",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 62,
                height: 62,
                marginTop: -31,
                marginLeft: -31,
                borderRadius: "50%",
                border: "1px solid rgba(24,214,214,0.18)",
                animation: "inflateRipple 0.65s ease-out 0.18s forwards",
                pointerEvents: "none",
              }}
            />
          </>
        )}
        <div
          ref={highFiveRef}
          className="neural-orb-container"
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            animation: isSheetOpen
              ? "orbPulse 0.8s ease-in-out infinite, rimShift 2s ease-in-out infinite"
              : "orbPulse 5.6s ease-in-out infinite, rimShift 10s ease-in-out infinite",
            willChange: "transform",
            transform: isHovered ? "translateY(-4px)" : undefined,
            transition: "transform 0.2s ease",
          }}
        >
          <div
            ref={spinRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform",
            }}
          >
            <motion.button
              type="button"
              data-ocid="nav.open_modal_button"
              aria-label="Open menu"
              onClick={handleClick}
              ref={orbRef}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: 62,
                height: 62,
                borderRadius: "50%",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                background: isHovered
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: isHovered
                  ? "0 8px 40px rgba(255,255,255,0.2), 0 0 64px rgba(24,214,214,0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
                  : undefined,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                filter: isHovered ? "brightness(1.3)" : undefined,
              }}
            >
              <div
                className="neural-orb-inner"
                style={{
                  animation: "neuralRotate 600s linear infinite",
                  willChange: "transform",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="19" cy="19" r="3" fill="white" opacity="0.9" />
                  <circle cx="19" cy="8" r="2" fill="white" opacity="0.7" />
                  <circle cx="19" cy="30" r="2" fill="white" opacity="0.7" />
                  <circle cx="8" cy="19" r="2" fill="white" opacity="0.7" />
                  <circle cx="30" cy="19" r="2" fill="white" opacity="0.7" />
                  <circle cx="11" cy="11" r="1.5" fill="white" opacity="0.6" />
                  <circle cx="27" cy="11" r="1.5" fill="white" opacity="0.6" />
                  <circle cx="11" cy="27" r="1.5" fill="white" opacity="0.6" />
                  <circle cx="27" cy="27" r="1.5" fill="white" opacity="0.6" />
                  <circle
                    cx="19"
                    cy="3"
                    r="1"
                    fill="rgba(24,214,214,0.8)"
                    opacity="0.8"
                  />
                  <circle
                    cx="19"
                    cy="35"
                    r="1"
                    fill="rgba(24,214,214,0.8)"
                    opacity="0.8"
                  />
                  <circle
                    cx="3"
                    cy="19"
                    r="1"
                    fill="rgba(24,214,214,0.8)"
                    opacity="0.8"
                  />
                  <circle
                    cx="35"
                    cy="19"
                    r="1"
                    fill="rgba(24,214,214,0.8)"
                    opacity="0.8"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="19"
                    y2="8"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="19"
                    y2="30"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="8"
                    y2="19"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="30"
                    y2="19"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="11"
                    y2="11"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="27"
                    y2="11"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="11"
                    y2="27"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="19"
                    y1="19"
                    x2="27"
                    y2="27"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="19"
                    y1="8"
                    x2="19"
                    y2="3"
                    stroke="rgba(24,214,214,0.6)"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    x1="19"
                    y1="30"
                    x2="19"
                    y2="35"
                    stroke="rgba(24,214,214,0.6)"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    x1="8"
                    y1="19"
                    x2="3"
                    y2="19"
                    stroke="rgba(24,214,214,0.6)"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    x1="30"
                    y1="19"
                    x2="35"
                    y2="19"
                    stroke="rgba(24,214,214,0.6)"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    x1="11"
                    y1="11"
                    x2="27"
                    y2="11"
                    stroke="white"
                    strokeWidth="0.6"
                    opacity="0.25"
                  />
                  <line
                    x1="11"
                    y1="27"
                    x2="27"
                    y2="27"
                    stroke="white"
                    strokeWidth="0.6"
                    opacity="0.25"
                  />
                  <line
                    x1="11"
                    y1="11"
                    x2="11"
                    y2="27"
                    stroke="white"
                    strokeWidth="0.6"
                    opacity="0.25"
                  />
                  <line
                    x1="27"
                    y1="11"
                    x2="27"
                    y2="27"
                    stroke="white"
                    strokeWidth="0.6"
                    opacity="0.25"
                  />
                  <circle
                    cx="19"
                    cy="19"
                    r="14"
                    stroke="rgba(24,214,214,0.2)"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="3 5"
                  />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

function useScrollVelocity(ref: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState({
    velocity: 0,
    atTop: true,
    atBottom: false,
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = { t: Date.now(), y: el.scrollTop };
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const now = Date.now();
        const dt = now - last.t || 1;
        const dy = el.scrollTop - last.y;
        const vel = Math.abs(dy / dt);
        const atTop = el.scrollTop < 8;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
        setState({ velocity: vel, atTop, atBottom });
        last = { t: now, y: el.scrollTop };
        setTimeout(() => setState((s) => ({ ...s, velocity: 0 })), 300);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return state;
}

function ScrollEdgeGlow({
  scrollRef,
}: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const { velocity, atTop, atBottom } = useScrollVelocity(scrollRef);
  const fast = velocity > 0.8;
  if (!fast) return null;
  return (
    <>
      {!atTop && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(24,214,214,0.07) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 44,
            willChange: "opacity",
          }}
        />
      )}
      {!atBottom && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background:
              "linear-gradient(to top, rgba(24,214,214,0.07) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 44,
            willChange: "opacity",
          }}
        />
      )}
    </>
  );
}

function BottomSheetMenu({
  open,
  onClose,
  onNavigate,
  currentPage,
  originRect,
  onCloseComplete,
}: {
  open: boolean;
  onClose: () => void;
  onCloseComplete?: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  originRect?: DOMRect | null;
}) {
  const prefersReduced = useReducedMotion();
  const [closeOrbRef, animateCloseOrb] = useAnimate();

  const handleCloseOrb = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent) => {
      e.stopPropagation();
      if (prefersReduced) {
        onClose();
        return;
      }
      if (closeOrbRef.current) {
        // Spin starts immediately — sheet shrinks at 180° mark (180ms into 360ms spin)
        animateCloseOrb(
          closeOrbRef.current,
          { rotate: [0, 360], scale: [1, 0.93, 0.97, 1] },
          { duration: 0.36, ease: [0.4, 0, 0.6, 1] },
        ).then(() => {
          if (closeOrbRef.current) {
            animateCloseOrb(
              closeOrbRef.current,
              { rotate: 0 },
              { duration: 0 },
            );
          }
          onCloseComplete?.();
        });
        // Trigger bubble-shrink at 180° (halfway through spin)
        setTimeout(onClose, 180);
      } else {
        onClose();
      }
    },
    [onClose, onCloseComplete, prefersReduced, animateCloseOrb, closeOrbRef],
  );

  const transformOrigin = originRect
    ? `${originRect.left + originRect.width / 2}px ${originRect.top + originRect.height / 2}px`
    : "center bottom";
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Micro-pulse on close orb when sheet fully opens — acknowledges main orb spin
  useEffect(() => {
    if (!open || prefersReduced) return;
    const t = setTimeout(() => {
      if (closeOrbRef.current) {
        animateCloseOrb(
          closeOrbRef.current,
          { scale: [1, 1.18, 0.94, 1.06, 1] },
          { duration: 0.42, ease: "easeOut" },
        );
      }
    }, 430);
    return () => clearTimeout(t);
  }, [open, prefersReduced, animateCloseOrb, closeOrbRef]);

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

  const springTransition = prefersReduced
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 450,
        damping: 30,
        mass: 0.7,
        opacity: { delay: 0, duration: 0.1, ease: "easeOut" },
      };

  const exitTransition = prefersReduced
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 450,
        damping: 30,
        mass: 0.65,
        opacity: { duration: 0.08, ease: "easeIn" },
      };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-ocid="nav.modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 26 }
            }
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
              if (info.offset.y > 80 || info.velocity.y > 400) onClose();
            }}
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { scale: 0.08, borderRadius: "9999px", opacity: 0 }
            }
            animate={{ scale: 1, borderRadius: "28px 28px 0 0", opacity: 1 }}
            exit={{
              scale: prefersReduced ? 1 : 0.04,
              borderRadius: "9999px",
              opacity: prefersReduced ? 1 : 0,
              transition: exitTransition,
            }}
            transition={springTransition}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 51,
              maxHeight: "85vh",
              borderRadius: "28px 28px 0 0",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderBottom: "none",
              boxShadow:
                "0 -8px 60px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.22), 0 -1px 0 rgba(255,255,255,0.08), 0 -12px 40px rgba(255,255,255,0.04), 0 0 40px rgba(24,214,214,0.08)",
              display: "flex",
              flexDirection: "column",
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              transformOrigin: transformOrigin,
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
                  background: "rgba(255,255,255,0.20)",
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

              {/* Positioning wrapper — never animated, owns the translateY */}
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 9999,
                  pointerEvents: "auto",
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.button
                  ref={closeOrbRef}
                  type="button"
                  data-ocid="nav.close_button"
                  onTap={handleCloseOrb}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow:
                      "0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(24,214,214,0.08), inset 0 1px 0 rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="19"
                        cy="19"
                        r="3"
                        fill="white"
                        opacity="0.9"
                      />
                      <circle cx="19" cy="8" r="2" fill="white" opacity="0.7" />
                      <circle
                        cx="19"
                        cy="30"
                        r="2"
                        fill="white"
                        opacity="0.7"
                      />
                      <circle cx="8" cy="19" r="2" fill="white" opacity="0.7" />
                      <circle
                        cx="30"
                        cy="19"
                        r="2"
                        fill="white"
                        opacity="0.7"
                      />
                      <circle
                        cx="11"
                        cy="11"
                        r="1.5"
                        fill="white"
                        opacity="0.6"
                      />
                      <circle
                        cx="27"
                        cy="11"
                        r="1.5"
                        fill="white"
                        opacity="0.6"
                      />
                      <circle
                        cx="11"
                        cy="27"
                        r="1.5"
                        fill="white"
                        opacity="0.6"
                      />
                      <circle
                        cx="27"
                        cy="27"
                        r="1.5"
                        fill="white"
                        opacity="0.6"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="19"
                        y2="8"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="19"
                        y2="30"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="8"
                        y2="19"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="30"
                        y2="19"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="11"
                        y2="11"
                        stroke="white"
                        strokeWidth="0.8"
                        opacity="0.4"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="27"
                        y2="11"
                        stroke="white"
                        strokeWidth="0.8"
                        opacity="0.4"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="11"
                        y2="27"
                        stroke="white"
                        strokeWidth="0.8"
                        opacity="0.4"
                      />
                      <line
                        x1="19"
                        y1="19"
                        x2="27"
                        y2="27"
                        stroke="white"
                        strokeWidth="0.8"
                        opacity="0.4"
                      />
                      <line
                        x1="11"
                        y1="11"
                        x2="27"
                        y2="11"
                        stroke="white"
                        strokeWidth="0.6"
                        opacity="0.25"
                      />
                      <line
                        x1="11"
                        y1="27"
                        x2="27"
                        y2="27"
                        stroke="white"
                        strokeWidth="0.6"
                        opacity="0.25"
                      />
                      <line
                        x1="11"
                        y1="11"
                        x2="11"
                        y2="27"
                        stroke="white"
                        strokeWidth="0.6"
                        opacity="0.25"
                      />
                      <line
                        x1="27"
                        y1="11"
                        x2="27"
                        y2="27"
                        stroke="white"
                        strokeWidth="0.6"
                        opacity="0.25"
                      />
                      <circle
                        cx="19"
                        cy="19"
                        r="14"
                        stroke="rgba(24,214,214,0.2)"
                        strokeWidth="0.5"
                        fill="none"
                        strokeDasharray="3 5"
                      />
                    </svg>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        margin: "auto",
                        opacity: 0.4,
                        pointerEvents: "none",
                      }}
                    >
                      <path
                        d="M2 2L12 12M12 2L2 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </motion.button>
              </div>
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
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 350,
                            damping: 26,
                            delay: i * 0.045,
                          }
                    }
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
                padding:
                  "12px 24px calc(24px + env(safe-area-inset-bottom, 0px))",
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
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="fixed z-40 flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(24,214,214,0.15)",
          maxWidth: "480px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 2rem)",
          bottom: "calc(env(safe-area-inset-bottom, 16px) + 16px)",
        }}
      >
        <img
          src="/assets/generated/neural-nexus-icon-192.dim_192x192.png"
          alt="Neural Linkz"
          className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          style={{ boxShadow: "0 0 12px rgba(24,214,214,0.4)" }}
        />
        <div className="flex-1 flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-white">
            Add Neural Linkz to Home Screen
          </p>
          <p className="text-xs text-white/50">
            Tap for a native app experience
          </p>
        </div>
        <button
          type="button"
          data-ocid="pwa.confirm_button"
          onClick={handleInstall}
          className="px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0 transition-all"
          style={{
            background: "rgba(24,214,214,0.15)",
            border: "1px solid rgba(24,214,214,0.5)",
            color: "#18D6D6",
          }}
        >
          Install
        </button>
        <button
          type="button"
          data-ocid="pwa.close_button"
          onClick={() => setDismissed(true)}
          className="w-7 h-7 flex items-center justify-center rounded-full transition-all flex-shrink-0"
          style={{
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// Polyfill requestIdleCallback
const rIC: (cb: () => void, opts?: { timeout: number }) => number =
  typeof requestIdleCallback !== "undefined"
    ? (cb, opts) => requestIdleCallback(cb, opts)
    : (cb) => setTimeout(cb, 1) as unknown as number;
const cIC: (id: number) => void =
  typeof cancelIdleCallback !== "undefined" ? cancelIdleCallback : clearTimeout;

export default function App() {
  const prefersReduced = useReducedMotion();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orbRect, setOrbRect] = useState<DOMRect | null>(null);
  const [orbHighFive, setOrbHighFive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTransitionShimmer, setShowTransitionShimmer] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // Preload all other routes after mount during idle time
  useEffect(() => {
    const id = rIC(
      () => {
        import("./pages/OpenSourcePage");
        import("./pages/BenchmarksPage");
        import("./pages/AboutPage");
        import("./pages/OnchainPage");
      },
      { timeout: 2000 },
    );
    return () => cIC(id);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowTransitionShimmer(true);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(
      () => setShowTransitionShimmer(false),
      240,
    );
  }, []);

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
      data-scroll-container=""
      className="min-h-screen flex flex-col"
      style={{
        background: "#000",
        fontFamily: "Space Grotesk, sans-serif",
        overflowY: "auto",
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
        height: "100%",
      }}
    >
      <AnimatePresence>
        {showTransitionShimmer && (
          <motion.div
            key="page-transition-shimmer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 45,
              pointerEvents: "none",
            }}
          >
            <GlassShimmer />
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollEdgeGlow scrollRef={scrollRef} />
      <Nav onNavigate={handleNavigate} />
      <NeuralNexusOrb
        onOpen={(rect) => {
          setOrbRect(rect);
          setDrawerOpen((v) => !v);
        }}
        isSheetOpen={drawerOpen}
        highFive={orbHighFive}
      />
      <BottomSheetMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCloseComplete={() => setOrbHighFive((v) => v + 1)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        originRect={orbRect}
      />
      <Suspense fallback={<GlassShimmer />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={prefersReduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.6,
                  }
            }
            className="flex-1"
            style={{ willChange: "transform, opacity" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </Suspense>
      {currentPage === "about" && <Footer onNavigate={handleNavigate} />}
      <PWAInstallBanner />
    </div>
  );
}
