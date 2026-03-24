import { motion } from "motion/react";

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
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
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

export default function OnchainPage() {
  return (
    <StubPage
      emoji="⛓️"
      title="Onchain AI Models"
      subtitle="Discover AI models running fully on-chain on the Internet Computer."
    />
  );
}
