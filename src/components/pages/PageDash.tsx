"use client";
import { useState } from "react";
import {
  Zap, Flame, Award, Brain, Target, BarChart3,
  CheckCircle2, Circle, TrendingUp, ArrowUpRight, Plus,
  Lightbulb, Activity, Focus, BookOpen,
} from "lucide-react";
import { C, HABITS_DATA, WEEK_LABELS, WEEK_BARS } from "@/lib/constants";
import AiChat from "@/components/ui/AiChat";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Focus, Activity, BookOpen,
};

function StatCard({
  label, value, sub, color, Icon: Ic, delay = 0,
}: {
  label: string; value: string; sub: string; color: string;
  Icon: React.ElementType; delay?: number;
}) {
  return (
    <div
      className="animate-fadeUp"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: "20px 18px",
        flex: 1,
        minWidth: 140,
        animationDelay: `${delay}ms`,
        transition: "transform .25s, box-shadow .25s, border-color .25s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: 13,
            background: `${color}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Ic size={19} color={color} strokeWidth={1.8} />
        </div>
        <span style={{ color: C.green, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
          <ArrowUpRight size={11} /> +12٪
        </span>
      </div>
      <div style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>
        {label}
      </div>
      <div style={{ color: C.text, fontSize: 24, fontWeight: 700, letterSpacing: "-.5px", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color, fontSize: 12, marginTop: 5, fontWeight: 500 }}>{sub}</div>
    </div>
  );
}

export default function PageDash() {
  const [tasks, setTasks] = useState([
    { text: "مراجعة الأهداف الفصلية", done: false, p: "high" },
    { text: "إنهاء وثيقة التصميم",     done: true,  p: "high" },
    { text: "التأمل ١٥ دقيقة",          done: false, p: "med"  },
    { text: "قراءة فصل جديد",            done: false, p: "low"  },
  ]);
  const toggle = (i: number) =>
    setTasks((t) => t.map((x, j) => (j === i ? { ...x, done: !x.done } : x)));

  return (
    <div style={{ display: "flex", gap: 20, height: "100%", overflow: "hidden" }}>
      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, overflowY: "auto", paddingBottom: 8 }}>
        {/* Greeting */}
        <div className="animate-fadeUp">
          <div style={{ color: C.muted, fontSize: 12.5, marginBottom: 4 }}>الجمعة، ١٥ مايو ٢٠٢٦</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-.5px", lineHeight: 1.2 }}>
            صباح الخير، أحمد 👋
          </h1>
          <p style={{ color: C.sub, fontSize: 13.5, marginTop: 6 }}>
            نقاط تركيزك قوية اليوم — لنجعلها تُحدث فرقاً حقيقياً.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <StatCard label="نقاط التركيز" value="87"   sub="↑ +12 نقطة اليوم"  color={C.primary} Icon={Zap}   delay={0}  />
          <StatCard label="العادات"       value="٣/٤"  sub="٧٥٪ اكتمال"        color={C.green}   Icon={Flame} delay={60} />
          <StatCard label="السلسلة"       value="٢١ي"  sub="الأفضل: ٢٨ يوم"    color={C.amber}   Icon={Award} delay={120}/>
          <StatCard label="عمل عميق"      value="٣.٢س" sub="الهدف: ٤ ساعات"   color={C.pink}    Icon={Brain} delay={180}/>
        </div>

        {/* Tasks */}
        <div
          className="animate-fadeUp"
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 20, padding: "20px", animationDelay: "80ms",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <Target size={16} color={C.primary} strokeWidth={2} />
              أهم ٤ مهام اليوم
            </div>
            <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
              <Plus size={13} /> إضافة
            </button>
          </div>
          {tasks.map((t, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 0",
                borderBottom: i < tasks.length - 1 ? `1px solid ${C.border}` : "none",
                cursor: "pointer",
              }}
            >
              {t.done
                ? <CheckCircle2 size={20} color={C.green} strokeWidth={1.8} />
                : <Circle size={20} color={C.muted} strokeWidth={1.5} />
              }
              <span
                style={{
                  flex: 1, color: t.done ? C.muted : C.text, fontSize: 13.5,
                  textDecoration: t.done ? "line-through" : "none",
                  transition: "all .2s",
                }}
              >
                {t.text}
              </span>
              <span
                className="tag"
                style={{
                  background: t.p === "high" ? `${C.red}18` : t.p === "med" ? `${C.amber}18` : `${C.green}18`,
                  color: t.p === "high" ? C.red : t.p === "med" ? C.amber : C.green,
                }}
              >
                {t.p === "high" ? "عالي" : t.p === "med" ? "متوسط" : "عادي"}
              </span>
            </div>
          ))}
        </div>

        {/* Habits */}
        <div
          className="animate-fadeUp"
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 20, padding: "20px", animationDelay: "140ms",
          }}
        >
          <div style={{ color: C.text, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Flame size={16} color={C.amber} strokeWidth={2} />
            حالة العادات
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {HABITS_DATA.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 11,
                    background: `${h.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  <Activity size={17} color={h.color} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{h.name}</span>
                    <span style={{ color: h.color, fontSize: 12, fontWeight: 700 }}>{h.rate}٪</span>
                  </div>
                  <div className="pbar-bg" style={{ height: 5 }}>
                    <div
                      style={{
                        width: `${h.rate}%`, height: "100%", borderRadius: 99,
                        background: `linear-gradient(90deg,${h.color},${h.color}88)`,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
                <div style={{ color: C.muted, fontSize: 11, flexShrink: 0, display: "flex", alignItems: "center", gap: 3 }}>
                  <Flame size={11} color={C.amber} strokeWidth={2} /> {h.streak}ي
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Week chart */}
        <div
          className="animate-fadeUp"
          style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 20, padding: "20px", animationDelay: "200ms",
          }}
        >
          <div style={{ color: C.text, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <BarChart3 size={16} color={C.cyan} strokeWidth={2} />
            أداء الأسبوع
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 100 }}>
            {WEEK_BARS.map((v, i) => (
              <div
                key={i}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}
              >
                <div
                  style={{
                    width: "100%",
                    borderRadius: "7px 7px 0 0",
                    height: `${v}%`,
                    background:
                      v >= 80
                        ? `linear-gradient(180deg,${C.primary},${C.primary}88)`
                        : v >= 60
                        ? `rgba(99,102,241,.3)`
                        : `rgba(99,102,241,.15)`,
                    transition: "height .7s ease",
                  }}
                />
                <span style={{ color: C.muted, fontSize: 10.5 }}>{WEEK_LABELS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat panel */}
      <div style={{ width: 280, flexShrink: 0, height: "100%", overflow: "hidden" }}>
        <AiChat compact />
      </div>
    </div>
  );
}
