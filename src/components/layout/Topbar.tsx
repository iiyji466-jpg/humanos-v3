"use client";
import { Bell } from "lucide-react";
import { C, PAGES } from "@/lib/constants";

export default function Topbar({ page }: { page: string }) {
  const current = PAGES.find((p) => p.id === page);

  return (
    <header
      style={{
        padding: "0 28px",
        height: 58,
        flexShrink: 0,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(7,9,15,.85)",
        backdropFilter: "blur(20px)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <span style={{ color: C.muted, fontSize: 13 }}>{current?.label}</span>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Online badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 11,
            padding: "7px 14px",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.green,
            }}
            className="animate-pulse-op"
          />
          <span style={{ color: C.sub, fontSize: 12 }}>نشط الآن</span>
        </div>

        {/* Bell */}
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: C.card,
            border: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell size={15} color={C.sub} strokeWidth={1.8} />
        </button>

        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            background: `linear-gradient(135deg,${C.primary},${C.pink})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          أ
        </div>
      </div>
    </header>
  );
        }
