"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar  from "@/components/layout/Topbar";
import AiChat  from "@/components/ui/AiChat";
import PageDash from "@/components/pages/PageDash";
import {
  PageHabits, PageFocus, PageMindMap,
  PageLearning, PageSettings,
} from "@/components/pages/OtherPages";
import { C } from "@/lib/constants";

export default function Home() {
  const [page, setPage] = useState("dash");

  const VIEWS: Record<string, React.ReactNode> = {
    dash: <PageDash />,
    coach: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", overflow: "hidden" }}>
        <div className="animate-fadeUp">
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.4px" }}>🤖 المدرب الذكي</h2>
          <p style={{ color: C.sub, fontSize: 13, marginTop: 4 }}>ذكاء اصطناعي يتذكر ويتكيف وينمو معك</p>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <AiChat />
        </div>
      </div>
    ),
    habits:   <PageHabits />,
    focus:    <PageFocus />,
    mindmap:  <PageMindMap />,
    learning: <PageLearning />,
    settings: <PageSettings />,
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        direction: "rtl",
        background: C.bg,
      }}
    >
      {/* Sidebar */}
      <Sidebar page={page} setPage={setPage} />

      {/* Main area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        {/* Ambient glow orbs */}
        <div
          style={{
            position: "absolute", top: -120, right: -120,
            width: 420, height: 420, borderRadius: "50%", pointerEvents: "none",
            background: `radial-gradient(circle,${C.pGlow},transparent 70%)`,
            filter: "blur(60px)", opacity: 0.45,
          }}
        />
        <div
          style={{
            position: "absolute", bottom: -80, left: -60,
            width: 320, height: 320, borderRadius: "50%", pointerEvents: "none",
            background: `radial-gradient(circle,rgba(236,72,153,.14),transparent 70%)`,
            filter: "blur(50px)", opacity: 0.35,
          }}
        />

        {/* Topbar */}
        <Topbar page={page} />

        {/* Page content */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: "24px 28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {VIEWS[page]}
        </div>
      </main>
    </div>
  );
        }
