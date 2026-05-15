"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Mic, Sparkles } from "lucide-react";
import { C, AI_REPLIES } from "@/lib/constants";

interface Msg { role: "ai" | "user"; text: string; }

export default function AiChat({ compact = false }: { compact?: boolean }) {
  const [msgs, setMsgs]     = useState<Msg[]>([
    { role: "ai", text: "صباح الخير! 🌅 ذروة تركيزك الآن مفتوحة. ما هي أولويتك اليوم؟" },
  ]);
  const [val, setVal]       = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!val.trim()) return;
    const t = val; setVal("");
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        { role: "ai", text: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)] },
      ]);
      setTyping(false);
    }, 1500);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: compact ? "100%" : "calc(100vh - 120px)",
        width: compact ? 285 : "100%",
        flexShrink: 0,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: `linear-gradient(135deg,${C.primary},${C.pLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bot size={17} color="#fff" strokeWidth={1.8} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: C.green,
              border: `2px solid ${C.card}`,
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 600, fontSize: 13.5 }}>المدرب الذكي</div>
          <div style={{ color: C.green, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, display: "inline-block" }}
              className="animate-pulse-op"
            />
            نشط • يتعلم منك
          </div>
        </div>
        <Sparkles size={15} color={C.primary} />
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-start" : "flex-end",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            {m.role === "ai" && (
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 9,
                  flexShrink: 0,
                  background: `linear-gradient(135deg,${C.primary},${C.pLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={13} color="#fff" strokeWidth={2} />
              </div>
            )}
            <div
              style={{
                maxWidth: "83%",
                padding: "10px 14px",
                borderRadius:
                  m.role === "user"
                    ? "16px 16px 16px 4px"
                    : "16px 16px 4px 16px",
                background:
                  m.role === "user"
                    ? "rgba(255,255,255,.05)"
                    : `linear-gradient(135deg,rgba(99,102,241,.14),rgba(99,102,241,.05))`,
                border: `1px solid ${m.role === "ai" ? "rgba(99,102,241,.2)" : C.border}`,
                color: C.text,
                fontSize: 13,
                lineHeight: 1.65,
                boxShadow: m.role === "ai" ? `0 4px 16px ${C.pGlow}` : "none",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "flex-end" }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 9,
                background: `linear-gradient(135deg,${C.primary},${C.pLight})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot size={13} color="#fff" strokeWidth={2} />
            </div>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "16px 16px 4px 16px",
                background: `rgba(99,102,241,.1)`,
                border: `1px solid rgba(99,102,241,.2)`,
                display: "flex",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: C.primary,
                  }}
                  className={`dot-${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}` }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            background: "rgba(255,255,255,.04)",
            border: `1px solid ${C.border}`,
            borderRadius: 13,
            padding: "7px 10px",
          }}
        >
          <Mic size={15} color={C.muted} strokeWidth={1.8} />
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="اكتب لمدربك..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: C.text,
              fontSize: 13,
              outline: "none",
              textAlign: "right",
            }}
          />
          <button
            onClick={send}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: `linear-gradient(135deg,${C.primary},${C.pLight})`,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 10px ${C.pGlow}`,
              flexShrink: 0,
            }}
          >
            <Send size={14} color="#fff" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
    }
