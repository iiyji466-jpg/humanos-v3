export const C = {
  bg:      "#07090f",
  surf:    "#0d1117",
  card:    "#111827",
  card2:   "#161f2e",
  border:  "rgba(255,255,255,0.07)",
  borderA: "rgba(99,102,241,0.3)",
  primary: "#6366f1",
  pGlow:   "rgba(99,102,241,0.22)",
  pLight:  "#818cf8",
  green:   "#10b981",
  gGlow:   "rgba(16,185,129,0.18)",
  amber:   "#f59e0b",
  red:     "#ef4444",
  pink:    "#ec4899",
  cyan:    "#06b6d4",
  text:    "#f1f5f9",
  sub:     "#94a3b8",
  muted:   "#475569",
} as const;

export const PAGES = [
  { id: "dash",     label: "الرئيسية",      icon: "LayoutDashboard" },
  { id: "coach",    label: "المدرب الذكي",   icon: "Bot"             },
  { id: "habits",   label: "العادات",         icon: "Flame"           },
  { id: "focus",    label: "التركيز",         icon: "Focus"           },
  { id: "mindmap",  label: "خريطة العقل",    icon: "Brain"           },
  { id: "learning", label: "التعلم",          icon: "BookOpen"        },
  { id: "settings", label: "الإعدادات",       icon: "Settings2"       },
] as const;

export const HABITS_DATA = [
  { name: "التأمل الصباحي", streak: 21, rate: 92, color: C.primary, time: "٧:٠٠ ص", trigger: "الهاتف عند الاستيقاظ"      },
  { name: "العمل العميق",   streak: 9,  rate: 74, color: C.cyan,    time: "٩:٠٠ ص", trigger: "الاجتماعات المبكرة"         },
  { name: "المشي المسائي",  streak: 34, rate: 88, color: C.green,   time: "٦:٣٠ م", trigger: "العشاء المتأخر"              },
  { name: "القراءة",         streak: 5,  rate: 61, color: C.pink,    time: "١٠:٠٠ م", trigger: "التمرير في السوشيال ميديا" },
];

export const WEEK_LABELS = ["إث", "ثل", "أر", "خم", "جم", "سب", "أح"];
export const WEEK_BARS   = [78, 55, 91, 42, 85, 63, 70];

export const AI_REPLIES = [
  "بناءً على نمطك، ذروة تركيزك الآن. ابدأ بأصعب مهمة فوراً.",
  "لاحظت كسر عادة القراءة ٣ مرات هذا الأسبوع — جميعها بعد السوشيال ميديا. هل نبني عادة بديلة؟",
  "سلسلة ٣٤ يوم على المشي استثنائية! لنستخدم هذا الزخم لتكديس عادة جديدة.",
  "مستوى تركيزك اليوم ٨٧/١٠٠ — أعلى بـ ١٢ نقطة من أمس. استمر!",
  "الوقت الآن مثالي للعمل العميق. أغلق الإشعارات وابدأ الآن.",
];

export const LEARNING_DATA = [
  { title: "التفكير المنظومي",    prog: 68, lessons: 12, color: C.primary },
  { title: "علم النفس السلوكي",  prog: 43, lessons: 8,  color: C.green   },
  { title: "الفلسفة الرواقية",    prog: 89, lessons: 15, color: C.amber   },
];
