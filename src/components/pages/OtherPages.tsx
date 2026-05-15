"use client";
import { useState, useEffect, useRef } from "react";
import {
  Flame, Focus, Activity, BookOpen, Brain, Layers, Star,
  BarChart3, Shield, Lightbulb, Clock, Check, Plus,
  Play, Pause, RotateCcw, Bot, Sparkles, Calendar,
  TrendingUp, Zap, ArrowUpRight,
} from "lucide-react";
import { C, HABITS_DATA, WEEK_LABELS, WEEK_BARS, LEARNING_DATA } from "@/lib/constants";
import AiChat from "@/components/ui/AiChat";

/* ──────────────────────────────────────
   HABITS
────────────────────────────────────── */
export function PageHabits() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflowY: "auto" }}>
      <div className="animate-fadeUp" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.4px" }}>🔥 نظام العادات</h2>
          <p style={{ color: C.sub, fontSize: 13, marginTop: 4 }}>بنِ، اكسر، واستبدل العادات بدقة ذكاء اصطناعي</p>
        </div>
        <button className="btn-primary"><Plus size={15} /> عادة جديدة</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {HABITS_DATA.map((h, i) => (
          <div
            key={i}
            className="animate-fadeUp"
            style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px",
              animationDelay: `${i * 60}ms`,
              transition: "transform .25s, box-shadow .25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${h.color}18`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 15, background: `${h.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Activity size={22} color={h.color} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{h.name}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} strokeWidth={1.8} /> {h.time}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[{ l: "السلسلة", v: `${h.streak} يوم` }, { l: "المعدل", v: `${h.rate}٪` }].map((s, j) => (
                <div key={j} style={{ background: C.card2, borderRadius: 12, padding: "11px 13px" }}>
                  <div style={{ color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 3 }}>{s.l}</div>
                  <div style={{ color: h.color, fontSize: 18, fontWeight: 700 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: `${C.amber}0e`, border: `1px solid ${C.amber}25`, borderRadius: 11, padding: "10px 13px", marginBottom: 14 }}>
              <div style={{ color: C.amber, fontSize: 11, marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                <Lightbulb size={11} strokeWidth={2} /> محفز الفشل
              </div>
              <div style={{ color: C.sub, fontSize: 12 }}>{h.trigger}</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn-primary"
                style={{
                  flex: 1, justifyContent: "center",
                  background: `linear-gradient(135deg,${h.color},${h.color}bb)`,
                  boxShadow: `0 4px 14px ${h.color}33`,
                }}
              >
                <Check size={14} /> أنجزت اليوم
              </button>
              <button className="btn-ghost" style={{ padding: "10px 13px" }}>
                <BarChart3 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   FOCUS MODE
────────────────────────────────────── */
export function PageFocus() {
  const [secs, setSecs]   = useState(25 * 60);
  const [run, setRun]     = useState(false);
  const [mode, setMode]   = useState<"work" | "break">("work");
  const interval          = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (run) {
      interval.current = setInterval(() => {
        setSecs((s) => { if (s <= 1) { setRun(false); return 0; } return s - 1; });
      }, 1000);
    }
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [run]);

  const totalSecs = mode === "work" ? 25 * 60 : 5 * 60;
  const pct       = (totalSecs - secs) / totalSecs;
  const mm        = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss        = String(secs % 60).padStart(2, "0");
  const R         = 100;
  const circ      = 2 * Math.PI * R;

  const reset = () => { setRun(false); setSecs(mode === "work" ? 25 * 60 : 5 * 60); };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 28 }}>
      <div className="animate-fadeUp" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.5px", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <Zap size={22} color={C.primary} strokeWidth={2} /> وضع التركيز
        </h2>
        <p style={{ color: C.sub, fontSize: 13.5, marginTop: 6 }}>عمل عميق. لا مشتتات. حضور تام.</p>
      </div>

      {/* Circle timer */}
      <div className="animate-fadeUp" style={{ position: "relative", width: 240, height: 240, animationDelay: "80ms" }}>
        <div style={{
          position: "absolute", inset: 20, borderRadius: "50%",
          background: `radial-gradient(circle,${C.pGlow},transparent 70%)`,
          filter: "blur(20px)",
        }} />
        <svg width="240" height="240" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
          <circle cx="120" cy="120" r={R} stroke="rgba(255,255,255,.06)" strokeWidth="8" fill="none" />
          <circle
            cx="120" cy="120" r={R}
            stroke="url(#focusGrad)" strokeWidth="8" fill="none"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear", filter: `drop-shadow(0 0 10px ${C.primary})` }}
          />
          <defs>
            <linearGradient id="focusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={C.primary} />
              <stop offset="100%" stopColor={C.pink} />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1 }}>{mm}:{ss}</div>
          <div style={{ color: C.muted, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 6 }}>
            {mode === "work" ? "عمل عميق" : "استراحة"}
          </div>
        </div>
      </div>

      <div className="animate-fadeUp" style={{ display: "flex", gap: 12, animationDelay: "120ms" }}>
        <button onClick={() => setRun(!run)} className="btn-primary" style={{ padding: "13px 30px", fontSize: 15 }}>
          {run ? <><Pause size={16} /> إيقاف</> : <><Play size={16} /> ابدأ</>}
        </button>
< truncated lines 166-302 >
   LEARNING
────────────────────────────────────── */
const LEARN_ICONS: Record<string, React.ElementType> = { primary: Layers, green: Brain, amber: Star };

export function PageLearning() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflowY: "auto" }}>
      <div className="animate-fadeUp" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.4px" }}>📚 نظام التعلم</h2>
          <p style={{ color: C.sub, fontSize: 13, marginTop: 4 }}>مسارات تعليمية مخصصة بالذكاء الاصطناعي</p>
        </div>
        <button className="btn-primary"><Sparkles size={14} /> مسار جديد</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {LEARNING_DATA.map((lp, i) => {
          const Ic = LEARN_ICONS[Object.keys(LEARN_ICONS)[i]] ?? Layers;
          return (
            <div
              key={i}
              className="animate-fadeUp"
              style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px",
                animationDelay: `${i * 70}ms`,
                transition: "transform .25s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${lp.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ic size={22} color={lp.color} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{lp.title}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{lp.lessons} درس • متكيف مع تقدمك</div>
                </div>
                <div style={{ color: lp.color, fontSize: 20, fontWeight: 700 }}>{lp.prog}٪</div>
              </div>
              <div className="pbar-bg" style={{ height: 6, marginBottom: 14 }}>
                <div style={{ width: `${lp.prog}%`, height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${lp.color},${lp.color}88)`, transition: "width 1s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ background: `linear-gradient(135deg,${lp.color},${lp.color}bb)`, boxShadow: `0 4px 14px ${lp.color}33` }}>
                  متابعة التعلم →
                </button>
                <button className="btn-ghost">بطاقات التذكر</button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="animate-fadeUp"
        style={{
          background: "rgba(99,102,241,.06)", border: `1px solid rgba(99,102,241,.2)`,
          borderRadius: 20, padding: "20px", animationDelay: "220ms",
        }}
      >
        <div style={{ color: C.primary, fontSize: 12.5, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
          <Calendar size={13} strokeWidth={2} /> درس اليوم — التفكير المنظومي • الدرس ٩
        </div>
        <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
          حلقات التغذية الراجعة وتغيير السلوك
        </div>
        <div style={{ color: C.sub, fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
          فهم كيف تُشكّل الحلقات المُعززة والمُوازِنة تكوين العادات طويلة الأمد — ولماذا يفشل معظم الناس في تغيير سلوكهم.
        </div>
        <button className="btn-primary">ابدأ الدرس →</button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   SETTINGS
────────────────────────────────────── */
function Toggle({ val, onChange }: { val: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 99, cursor: "pointer",
        background: val ? C.primary : C.card2,
        border: `1px solid ${val ? C.primary : C.border}`,
        position: "relative", transition: "all .3s", flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute", top: 3,
          right: val ? 3 : "auto",
          left: val ? "auto" : 3,
          width: 16, height: 16, borderRadius: "50%",
          background: "#fff", transition: "all .3s",
        }}
      />
    </div>
  );
}

export function PageSettings() {
  const [dark, setDark]   = useState(true);
  const [tone, setTone]   = useState("مباشر");
  const [notif, setNotif] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 580, overflowY: "auto", height: "100%" }}>
      <div className="animate-fadeUp">
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.4px" }}>⚙️ الإعدادات</h2>
        <p style={{ color: C.sub, fontSize: 13, marginTop: 4 }}>خصّص تجربة HumanOS الخاصة بك</p>
      </div>

      {[
        {
          title: "المظهر",
          rows: [
            { label: "الوضع الداكن", sub: "مريح للعيون في أي وقت", ctrl: <Toggle val={dark} onChange={() => setDark(!dark)} /> },
          ],
        },
        {
          title: "المدرب الذكي",
          rows: [
            {
              label: "أسلوب المدرب", sub: "كيف تريد أن يتحدث معك الذكاء الاصطناعي؟",
              ctrl: (
                <select value={tone} onChange={(e) => setTone(e.target.value)}
                  style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 12px", color: C.text, fontSize: 13, cursor: "pointer", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                  {["مباشر", "لطيف", "تحفيزي", "تحليلي"].map((o) => <option key={o}>{o}</option>)}
                </select>
              ),
            },
          ],
        },
        {
          title: "الإشعارات",
          rows: [
            { label: "التنبيهات الذكية", sub: "الذكاء الاصطناعي يتدخل في لحظات الخطر", ctrl: <Toggle val={notif} onChange={() => setNotif(!notif)} /> },
          ],
        },
      ].map((sec, si) => (
        <div key={si} className="animate-fadeUp" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px", animationDelay: `${si * 60}ms` }}>
          <div style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>{sec.title}</div>
          {sec.rows.map((row, ri) => (
            <div key={ri} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: ri < sec.rows.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 500 }}>{row.label}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{row.sub}</div>
              </div>
              {row.ctrl}
            </div>
          ))}
        </div>
      ))}

      <div className="animate-fadeUp" style={{ background: "rgba(239,68,68,.04)", border: `1px solid rgba(239,68,68,.15)`, borderRadius: 20, padding: "18px 22px", animationDelay: "200ms" }}>
        <div style={{ color: C.red, fontWeight: 600, fontSize: 14, marginBottom: 6 }}>منطقة الخطر</div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 14 }}>حذف الحساب يُزيل جميع بياناتك نهائياً.</div>
        <button className="btn-ghost" style={{ color: C.red, borderColor: `${C.red}33` }}>حذف الحساب</button>
      </div>
    </div>
  );
}
