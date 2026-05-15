"use client";
import { useState } from "react";
import {
  LayoutDashboard, Bot, Flame, Brain, BookOpen, Settings2,
  Focus, Cpu, TrendingUp, Bell, Menu, X, ChevronLeft,
  Sparkles,
} from "lucide-react";
import { C, PAGES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Bot, Flame, Focus, Brain, BookOpen, Settings2,
};

interface SidebarProps {
  page: string;
  setPage: (p: string) => void;
}

export default function Sidebar({ page, setPage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 64 : 232,
        minHeight: "100vh",
        height: "100%",
        background: C.surf,
        borderLeft: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width .3s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 13,
            flexShrink: 0,
            background: `linear-gradient(135deg,${C.primary},${C.pink})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px ${C.pGlow}`,
          }}
          className="animate-float"
        >
          <Cpu size={18} color="#fff" strokeWidth={1.8} />
        </div>

        {!collapsed && (
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 15, letterSpacing: "-.3px" }}>
              HumanOS
            </div>
            <div style={{ color: C.muted, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase" }}>
              نظام الحياة الذكي
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginRight: "auto",
            background: "none",
            border: "none",
            color: C.muted,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 4,
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          {collapsed ? <Menu size={16} /> : <X size={15} />}
        </button>
      </div>

      {/* Score */}
      {!collapsed && (
        <div style={{ padding: "14px 14px 10px" }}>
          <div
            style={{
              background: "linear-gradient(135deg,rgba(99,102,241,.12),rgba(236,72,153,.06))",
              border: `1px solid rgba(99,102,241,.2)`,
              borderRadius: 15,
              padding: "13px 14px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
              <span style={{ color: C.sub, fontSize: 11.5 }}>نقاط اليوم</span>
              <Sparkles size={13} color={C.primary} />
            </div>
            <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: "-1px", lineHeight: 1 }}>
              87{" "}
              <span style={{ color: C.muted, fontSize: 13, fontWeight: 400 }}>/100</span>
            </div>
            <div style={{ margin: "8px 0 6px" }}>
              <div className="pbar-bg" style={{ height: 4 }}>
                <div
                  style={{
                    width: "87%",
                    height: "100%",
                    borderRadius: 99,
                    background: `linear-gradient(90deg,${C.primary},${C.pink})`,
                  }}
                />
              </div>
            </div>
            <div style={{ color: C.green, fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
              <TrendingUp size={11} /> أعلى بـ ١٢ نقطة عن أمس
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "4px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
        {PAGES.map(({ id, label, icon }) => {
          const Ic = ICON_MAP[icon];
          return (
            <button
              key={id}
              className={`nav-btn ${page === id ? "active" : ""}`}
              onClick={() => setPage(id)}
              title={collapsed ? label : undefined}
              style={{ justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <Ic size={17} strokeWidth={1.8} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && page === id && (
                <ChevronLeft size={13} style={{ opacity: 0.5, marginRight: "auto" }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div
        style={{
          padding: "14px",
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            flexShrink: 0,
            background: `linear-gradient(135deg,${C.primary},${C.pink})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          أ
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>أحمد العمري</div>
            <div style={{ color: C.green, fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.green,
                  display: "inline-block",
                }}
                className="animate-pulse-op"
              />
              Pro Member
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
