import React from "react";

const GlassShimmer = React.memo(function GlassShimmer() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: "80px 24px 24px",
        willChange: "opacity",
      }}
    >
      <style>{`
        @keyframes glassShimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .glass-shimmer-bar {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
          background-size: 400px 100%;
          animation: glassShimmer 1.4s ease-in-out infinite;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
        }
      `}</style>
      <div
        className="glass-shimmer-bar"
        style={{ height: 120, borderRadius: 24 }}
      />
      <div className="glass-shimmer-bar" style={{ height: 80, width: "70%" }} />
      <div className="glass-shimmer-bar" style={{ height: 80, width: "85%" }} />
      <div className="glass-shimmer-bar" style={{ height: 160 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="glass-shimmer-bar" style={{ height: 100 }} />
        <div className="glass-shimmer-bar" style={{ height: 100 }} />
        <div className="glass-shimmer-bar" style={{ height: 100 }} />
        <div className="glass-shimmer-bar" style={{ height: 100 }} />
      </div>
    </div>
  );
});

export default GlassShimmer;
