import React, { useState, useEffect, useRef } from "react";
import {
  Droplet, Dumbbell, CheckCircle2, AlertTriangle, RefreshCw, Sparkles,
  ChevronLeft, ChevronRight, Sun, Moon, Star, X, Smile, Meh, Frown,
  Save, Settings2, ClipboardList, CalendarCheck, Loader2, Info
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data: meal pools
// ---------------------------------------------------------------------------
const MAIN_POOL = [
  { id: "m1", name: "עוף + ירקות צלויים + טחינה", kcal: 730, protein: 50, fat: 54, satFat: 10, carbs: 21, sodium: 135, protein_src: "chicken", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m2", name: "דג + קינואה", kcal: 555, protein: 46, fat: 25, satFat: 4, carbs: 32, sodium: 85, protein_src: "fish", redMeat: false, nuts: false, dairy: false, grain: true, legume: false },
  { id: "m3", name: "בקר + ירקות צלויים", kcal: 500, protein: 40, fat: 30, satFat: 7, carbs: 23, sodium: 190, protein_src: "beef", redMeat: true, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m3b", name: "הודו טחון + ירקות צלויים", kcal: 480, protein: 40, fat: 26, satFat: 5, carbs: 23, sodium: 180, protein_src: "turkey", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m4", name: "עוף + סלט טרי", kcal: 460, protein: 42, fat: 30, satFat: 7, carbs: 8, sodium: 100, protein_src: "chicken", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m5", name: "דג + ירקות צלויים", kcal: 550, protein: 44, fat: 36, satFat: 6, carbs: 15, sodium: 115, protein_src: "fish", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m6", name: "בקר + קינואה", kcal: 505, protein: 42, fat: 19, satFat: 5.4, carbs: 40, sodium: 160, protein_src: "beef", redMeat: true, nuts: false, dairy: false, grain: true, legume: false },
  { id: "m6b", name: "הודו טחון + קינואה", kcal: 490, protein: 42, fat: 16, satFat: 3.8, carbs: 40, sodium: 150, protein_src: "turkey", redMeat: false, nuts: false, dairy: false, grain: true, legume: false },
  { id: "m7", name: "עוף + טחינה", kcal: 550, protein: 45, fat: 40, satFat: 8, carbs: 6, sodium: 95, protein_src: "chicken", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m8", name: "דג + סלט טרי", kcal: 460, protein: 41, fat: 28, satFat: 5, carbs: 8, sodium: 85, protein_src: "fish", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m9", name: "בקר + טחינה", kcal: 500, protein: 40, fat: 32, satFat: 7, carbs: 14, sodium: 155, protein_src: "beef", redMeat: true, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m9b", name: "הודו טחון + טחינה", kcal: 480, protein: 40, fat: 28, satFat: 5, carbs: 14, sodium: 145, protein_src: "turkey", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m10", name: "ביצים (3) + ירקות צלויים + טחינה", kcal: 635, protein: 29, fat: 50, satFat: 9, carbs: 27, sodium: 195, protein_src: "egg", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m11", name: "ביצים (3) + ירקות צלויים", kcal: 455, protein: 24, fat: 34, satFat: 7, carbs: 21, sodium: 190, protein_src: "egg", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m12", name: "בקר + אורז כרובית", kcal: 410, protein: 39, fat: 21, satFat: 6, carbs: 16, sodium: 200, protein_src: "beef", redMeat: true, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m12b", name: "הודו טחון + אורז כרובית", kcal: 400, protein: 39, fat: 18, satFat: 4, carbs: 16, sodium: 190, protein_src: "turkey", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m13", name: "עוף + קינואה", kcal: 555, protein: 47, fat: 27, satFat: 6, carbs: 32, sodium: 100, protein_src: "chicken", redMeat: false, nuts: false, dairy: false, grain: true, legume: false },
  { id: "m14", name: "עוף + אורז כרובית", kcal: 460, protein: 44, fat: 29, satFat: 7, carbs: 8, sodium: 140, protein_src: "chicken", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
  { id: "m15", name: "דג + אורז כרובית", kcal: 470, protein: 43, fat: 27, satFat: 4.5, carbs: 8, sodium: 110, protein_src: "fish", redMeat: false, nuts: false, dairy: false, grain: false, legume: false },
];

const SNACK_POOL = [
  { id: "s1", name: "תפוח + 5 שקדים", kcal: 145, protein: 3, fat: 5, satFat: 0.4, carbs: 27, sodium: 2, redMeat: false, nuts: true, peanuts: false, dairy: false, grain: false, legume: false },
  { id: "s2", name: "בננה", kcal: 105, protein: 1, fat: 0.3, satFat: 0, carbs: 27, sodium: 1, redMeat: false, nuts: false, peanuts: false, dairy: false, grain: false, legume: false },
  { id: "s3", name: "מלפפון + 2 כפות חומוס", kcal: 110, protein: 5, fat: 4, satFat: 0.5, carbs: 14, sodium: 60, redMeat: false, nuts: false, peanuts: false, dairy: false, grain: false, legume: true },
  { id: "s4", name: "5 אגוזי מלך + חופן ענבים", kcal: 140, protein: 3, fat: 9, satFat: 1, carbs: 15, sodium: 2, redMeat: false, nuts: true, peanuts: false, dairy: false, grain: false, legume: false },
  { id: "s5", name: "זיתים + קוביות גבינה קשה", kcal: 150, protein: 6, fat: 13, satFat: 6, carbs: 3, sodium: 300, redMeat: false, nuts: false, peanuts: false, dairy: true, grain: false, legume: false },
  { id: "s6", name: "ביצה קשה", kcal: 140, protein: 12, fat: 10, satFat: 3, carbs: 1, sodium: 140, redMeat: false, nuts: false, peanuts: false, dairy: false, grain: false, legume: false, protein_src: "egg" },
];

const DAY_DEFS = [
  { key: "sun", name: "ראשון" },
  { key: "mon", name: "שני" },
  { key: "tue", name: "שלישי" },
  { key: "wed", name: "רביעי" },
  { key: "thu", name: "חמישי" },
  { key: "fri", name: "שישי" },
  { key: "sat", name: "שבת" },
];

const byId = (pool, id) => pool.find((m) => m.id === id);

const TIME_OPTIONS = Array.from({ length: 48 }).map((_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

// Each goal contributes constraints; when several are selected they combine
// (numeric caps take the strictest value, calorie range narrows).
const GOALS = [
  { key: "bp", label: "שמירה על לחץ דם", sodiumMax: 1500 },
  { key: "chol", label: "שמירה על כולסטרול", satFatMax: 13 },
  { key: "sugar", label: "שמירה על סוכר", carbMax: 120 },
  { key: "lose", label: "ירידה במשקל", calMin: 1000, calMax: 1300 },
  { key: "gain", label: "עליה במסת שריר", calMin: 1800, calMax: 2200 },
];

const AVOID_OPTIONS = [
  { key: "avoidFish", label: "דגים", match: (m) => m.protein_src === "fish" },
  { key: "avoidBeef", label: "בקר", match: (m) => m.protein_src === "beef" },
  { key: "avoidTurkey", label: "הודו", match: (m) => m.protein_src === "turkey" },
  { key: "avoidChicken", label: "עוף", match: (m) => m.protein_src === "chicken" },
  { key: "avoidEggs", label: "ביצים", match: (m) => m.protein_src === "egg" },
  { key: "avoidDairy", label: "חלב", match: (m) => !!m.dairy },
  { key: "avoidPeanuts", label: "בוטנים", match: (m) => !!m.peanuts },
  { key: "avoidNuts", label: "אגוזים", match: (m) => !!m.nuts },
];

const STYLE_OPTIONS = [
  { key: "mediterranean", label: "ים תיכוני" },
  { key: "keto", label: "קיטו" },
  { key: "lowcarb", label: "דל פחמימה" },
  { key: "paleo", label: "פליאו" },
];

// Combine the constraints of every selected goal into one requirement set,
// starting from a neutral baseline and tightening as goals are added.
function combineGoals(goalKeys) {
  const base = { calMin: 1400, calMax: 1700, sodiumMax: 2300, satFatMax: 20, carbMax: 999 };
  goalKeys.forEach((key) => {
    const g = GOALS.find((g) => g.key === key);
    if (!g) return;
    if (g.sodiumMax !== undefined) base.sodiumMax = Math.min(base.sodiumMax, g.sodiumMax);
    if (g.satFatMax !== undefined) base.satFatMax = Math.min(base.satFatMax, g.satFatMax);
    if (g.carbMax !== undefined) base.carbMax = Math.min(base.carbMax, g.carbMax);
    if (g.calMin !== undefined) base.calMin = Math.max(base.calMin, g.calMin);
    if (g.calMax !== undefined) base.calMax = Math.min(base.calMax, g.calMax);
  });
  if (base.calMin > base.calMax) base.calMin = base.calMax;
  return base;
}

function defaultReqForGoals(goalKeys) {
  return combineGoals(goalKeys);
}

const defaultRequirements = {
  mode: "simple",
  goals: ["bp", "chol"],
  style: "mediterranean",
  eatStart: "12:00",
  eatEnd: "20:00",
  workoutDays: ["mon", "wed", "fri"],
  ...combineGoals(["bp", "chol"]),
  avoidFish: false,
  avoidBeef: false,
  avoidTurkey: false,
  avoidChicken: false,
  avoidEggs: false,
  avoidDairy: false,
  avoidPeanuts: false,
  avoidNuts: false,
};

// ---------------------------------------------------------------------------
// Helpers: generation & validation
// ---------------------------------------------------------------------------
function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STYLE_LIMITS = {
  mediterranean: { mainCarbMax: Infinity, snackCarbMax: Infinity },
  keto: { mainCarbMax: 16, snackCarbMax: 15 },
  lowcarb: { mainCarbMax: 25, snackCarbMax: 20 },
  paleo: { mainCarbMax: Infinity, snackCarbMax: Infinity },
};

function styleAllows(m, style, isSnack) {
  const limits = STYLE_LIMITS[style] || STYLE_LIMITS.mediterranean;
  const carbCap = isSnack ? limits.snackCarbMax : limits.mainCarbMax;
  if (m.carbs > carbCap) return false;
  if (style === "paleo" && (m.grain || m.legume || m.dairy)) return false;
  return true;
}

function poolFor(pool, req, isSnack = false) {
  return pool.filter((m) => {
    for (const opt of AVOID_OPTIONS) {
      if (req[opt.key] && opt.match(m)) return false;
    }
    if (!styleAllows(m, req.style || "mediterranean", isSnack)) return false;
    return true;
  });
}

function generateWeek(req) {
  const mainOptions = poolFor(MAIN_POOL, req, false);
  const snackOptions = poolFor(SNACK_POOL, req, true);
  const usageCount = {};
  const mid = (req.calMin + req.calMax) / 2;

  const days = DAY_DEFS.map((d) => {
    let best = null;
    for (let attempt = 0; attempt < 40; attempt++) {
      const lunch = shuffled(mainOptions)[0];
      const dinner = shuffled(mainOptions.filter((m) => m.id !== lunch.id))[0] || lunch;
      const snack = shuffled(snackOptions)[0];
      if (!lunch || !dinner || !snack) continue;
      const total = lunch.kcal + dinner.kcal + snack.kcal;
      const usagePenalty = (usageCount[lunch.id] || 0) + (usageCount[dinner.id] || 0);
      const score = Math.abs(total - mid) + usagePenalty * 120;
      if (!best || score < best.score) {
        best = { lunchId: lunch.id, dinnerId: dinner.id, snackId: snack.id, score };
      }
    }
    if (best) {
      usageCount[best.lunchId] = (usageCount[best.lunchId] || 0) + 1;
      usageCount[best.dinnerId] = (usageCount[best.dinnerId] || 0) + 1;
    }
    return {
      key: d.key,
      name: d.name,
      lunchId: best ? best.lunchId : mainOptions[0]?.id,
      dinnerId: best ? best.dinnerId : mainOptions[0]?.id,
      snackId: best ? best.snackId : snackOptions[0]?.id,
    };
  });
  return { days };
}

function dayMeals(day) {
  return {
    lunch: byId(MAIN_POOL, day.lunchId),
    dinner: byId(MAIN_POOL, day.dinnerId),
    snack: byId(SNACK_POOL, day.snackId),
  };
}

function dayTotals(day) {
  const { lunch, dinner, snack } = dayMeals(day);
  const parts = [lunch, dinner, snack].filter(Boolean);
  return parts.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal,
      protein: acc.protein + m.protein,
      fat: acc.fat + m.fat,
      satFat: acc.satFat + m.satFat,
      carbs: acc.carbs + m.carbs,
      sodium: acc.sodium + m.sodium,
    }),
    { kcal: 0, protein: 0, fat: 0, satFat: 0, carbs: 0, sodium: 0 }
  );
}

function weekTotals(week) {
  return week.days.reduce(
    (acc, d) => {
      const t = dayTotals(d);
      return {
        kcal: acc.kcal + t.kcal,
        protein: acc.protein + t.protein,
        fat: acc.fat + t.fat,
        satFat: acc.satFat + t.satFat,
        carbs: acc.carbs + t.carbs,
        sodium: acc.sodium + t.sodium,
      };
    },
    { kcal: 0, protein: 0, fat: 0, satFat: 0, carbs: 0, sodium: 0 }
  );
}

function redMeatCount(week) {
  return week.days.reduce((n, d) => {
    const { lunch, dinner } = dayMeals(d);
    return n + [lunch, dinner].filter((m) => m && m.protein_src === "beef").length;
  }, 0);
}

// Returns { mealIssues: {slotKey: [msgs]}, dayIssues: [msgs] } for one day
function validateDay(day, req) {
  const { lunch, dinner, snack } = dayMeals(day);
  const mealIssues = { lunch: [], dinner: [], snack: [] };
  const dayIssues = [];

  [["lunch", lunch], ["dinner", dinner], ["snack", snack]].forEach(([slot, m]) => {
    if (!m) return;
    AVOID_OPTIONS.forEach((opt) => {
      if (req[opt.key] && opt.match(m)) {
        mealIssues[slot].push(`מכיל ${opt.label}, וסימנת שאת נמנעת מזה`);
      }
    });
  });

  const totals = dayTotals(day);
  if (totals.kcal < req.calMin || totals.kcal > req.calMax) {
    dayIssues.push(`סה"כ קלוריות היום (${Math.round(totals.kcal)}) מחוץ לטווח שהגדרת (${req.calMin}–${req.calMax})`);
  }
  if (req.carbMax && totals.carbs > req.carbMax) {
    const worst = ["lunch", "dinner", "snack"].reduce((a, b) => {
      const ma = dayMeals(day)[a], mb = dayMeals(day)[b];
      return (ma?.carbs || 0) >= (mb?.carbs || 0) ? a : b;
    });
    mealIssues[worst].push(`התורם הגדול ביותר לחריגת פחמימות (סה"כ ${Math.round(totals.carbs)} ג', יעד עד ${req.carbMax})`);
  }
  if (totals.sodium > req.sodiumMax) {
    const worst = ["lunch", "dinner", "snack"].reduce((a, b) => {
      const ma = dayMeals(day)[a], mb = dayMeals(day)[b];
      return (ma?.sodium || 0) >= (mb?.sodium || 0) ? a : b;
    });
    mealIssues[worst].push(`התורם הגדול ביותר לחריגת נתרן יומית (סה"כ ${Math.round(totals.sodium)} מ"ג, יעד עד ${req.sodiumMax})`);
  }
  if (totals.satFat > req.satFatMax) {
    const worst = ["lunch", "dinner", "snack"].reduce((a, b) => {
      const ma = dayMeals(day)[a], mb = dayMeals(day)[b];
      return (ma?.satFat || 0) >= (mb?.satFat || 0) ? a : b;
    });
    mealIssues[worst].push(`התורם הגדול ביותר לחריגת שומן רווי (סה"כ ${totals.satFat.toFixed(1)} ג', יעד עד ${req.satFatMax})`);
  }

  return { mealIssues, dayIssues };
}

function suggestAlternative(slot, day, req) {
  const pool = slot === "snack" ? SNACK_POOL : MAIN_POOL;
  const current = byId(pool, slot === "lunch" ? day.lunchId : slot === "dinner" ? day.dinnerId : day.snackId);
  const candidates = poolFor(pool, req, slot === "snack").filter((m) => m.id !== current?.id);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => {
    const da = Math.abs(a.kcal - (current?.kcal || 0)) + a.sodium * 0.3 + a.satFat * 8;
    const db = Math.abs(b.kcal - (current?.kcal || 0)) + b.sodium * 0.3 + b.satFat * 8;
    return da - db;
  });
  return candidates[0];
}

// ---------------------------------------------------------------------------
// Small UI atoms
// ---------------------------------------------------------------------------
const num = (n, d = 0) => (n === undefined || n === null ? "-" : n.toFixed ? n.toFixed(d) : n);

function Pill({ children, tone = "stone" }) {
  const tones = {
    stone: "bg-stone-100 text-stone-700",
    orange: "bg-orange-100 text-orange-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-800",
    rose: "bg-rose-100 text-rose-700",
    teal: "bg-teal-100 text-teal-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-200 shadow-sm p-4 ${className}`}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Setup view
// ---------------------------------------------------------------------------
function range(start, end, step) {
  const out = [];
  for (let v = start; v <= end; v += step) out.push(v);
  return out;
}
const CAL_OPTIONS = range(800, 3000, 50);
const SODIUM_OPTIONS = range(500, 4000, 100);
const SATFAT_OPTIONS = range(5, 40, 1);
const CARB_OPTIONS = [...range(20, 350, 10), 999];

function TimeSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
      {TIME_OPTIONS.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}

function SetupView({ requirements, onGenerate }) {
  const [req, setReq] = useState(requirements);

  const toggleWorkoutDay = (key) => {
    setReq((r) => ({
      ...r,
      workoutDays: r.workoutDays.includes(key)
        ? r.workoutDays.filter((k) => k !== key)
        : [...r.workoutDays, key],
    }));
  };

  const toggleGoal = (goalKey) => {
    setReq((r) => {
      const goals = r.goals.includes(goalKey) ? r.goals.filter((k) => k !== goalKey) : [...r.goals, goalKey];
      return { ...r, goals, ...combineGoals(goals) };
    });
  };

  const toggleAvoid = (key) => setReq((r) => ({ ...r, [key]: !r[key] }));

  return (
    <div className="max-w-2xl mx-auto space-y-5" dir="rtl">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 text-orange-600 font-bold">
          <Sparkles size={20} />
          <span>הגדרת דרישות לשבוע</span>
        </div>
        <p className="text-stone-500 text-sm">מלאי פעם בתחילת השבוע — ואני אבנה לך תפריט מותאם</p>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex bg-white border border-stone-300 rounded-full p-1">
          {[{ k: "simple", l: "פשוטה" }, { k: "advanced", l: "מתקדמת" }].map((m) => (
            <button key={m.k} onClick={() => setReq((r) => ({ ...r, mode: m.k }))}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${
                req.mode === m.k ? "bg-stone-800 text-white" : "text-stone-500"
              }`}>
              {m.l}
            </button>
          ))}
        </div>
      </div>

      <SectionCard className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">חלון אכילה (צום לסירוגין)</label>
          <div className="flex items-center gap-3">
            <TimeSelect value={req.eatStart} onChange={(v) => setReq((r) => ({ ...r, eatStart: v }))} />
            <span className="text-stone-400 shrink-0">עד</span>
            <TimeSelect value={req.eatEnd} onChange={(v) => setReq((r) => ({ ...r, eatEnd: v }))} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">ימי אימון</label>
          <div className="flex flex-wrap gap-2">
            {DAY_DEFS.map((d) => (
              <button key={d.key} type="button" onClick={() => toggleWorkoutDay(d.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${
                  req.workoutDays.includes(d.key)
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-stone-600 border-stone-300"
                }`}>
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">סגנון תפריט</label>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((s) => (
              <button key={s.key} type="button" onClick={() => setReq((r) => ({ ...r, style: s.key }))}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${
                  req.style === s.key
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-stone-600 border-stone-300"
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {req.mode === "simple" ? (
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">מה המטרה שלך השבוע? (אפשר לבחור כמה)</label>
            <div className="flex flex-col gap-2">
              {GOALS.map((g) => (
                <label key={g.key}
                  className={`flex items-center gap-2 border rounded-xl px-3 py-2 text-sm font-semibold cursor-pointer ${
                    req.goals.includes(g.key) ? "border-orange-400 bg-orange-50 text-orange-700" : "border-stone-200 text-stone-600"
                  }`}>
                  <input type="checkbox" checked={req.goals.includes(g.key)} onChange={() => toggleGoal(g.key)} className="w-4 h-4" />
                  {g.label}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">קלוריות ליום — מינימום</label>
              <select value={req.calMin} onChange={(e) => setReq((r) => ({ ...r, calMin: Number(e.target.value) }))}
                className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                {CAL_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">קלוריות ליום — מקסימום</label>
              <select value={req.calMax} onChange={(e) => setReq((r) => ({ ...r, calMax: Number(e.target.value) }))}
                className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                {CAL_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">נתרן מקסימלי ליום (מ"ג)</label>
              <select value={req.sodiumMax} onChange={(e) => setReq((r) => ({ ...r, sodiumMax: Number(e.target.value) }))}
                className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                {SODIUM_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">שומן רווי מקסימלי ליום (ג')</label>
              <select value={req.satFatMax} onChange={(e) => setReq((r) => ({ ...r, satFatMax: Number(e.target.value) }))}
                className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                {SATFAT_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-stone-700 mb-2">פחמימות מקסימליות ליום (ג')</label>
              <select value={req.carbMax} onChange={(e) => setReq((r) => ({ ...r, carbMax: Number(e.target.value) }))}
                className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                {CARB_OPTIONS.map((v) => <option key={v} value={v}>{v === 999 ? "ללא הגבלה" : v}</option>)}
              </select>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">להימנע מ...</label>
          <div className="grid grid-cols-2 gap-2">
            {AVOID_OPTIONS.map((a) => (
              <label key={a.key} className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                <input type="checkbox" checked={req[a.key]} onChange={() => toggleAvoid(a.key)} className="w-4 h-4" />
                {a.label}
              </label>
            ))}
          </div>
        </div>
      </SectionCard>

      <button onClick={() => onGenerate(req)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm">
        <Sparkles size={18} />
        צרי לי תפריט לשבוע
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meal picker modal
// ---------------------------------------------------------------------------
function MealPicker({ slot, req, onPick, onClose }) {
  const pool = slot === "snack" ? SNACK_POOL : MAIN_POOL;
  const options = poolFor(pool, req, slot === "snack");
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-4 space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-stone-800">בחרי חלופה</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
        </div>
        {options.map((m) => (
          <button key={m.id} onClick={() => onPick(m.id)}
            className="w-full text-right border border-stone-200 rounded-xl p-3 hover:border-orange-400 hover:bg-orange-50 transition">
            <div className="font-semibold text-stone-800 text-sm">{m.name}</div>
            <div className="text-xs text-stone-500 mt-1">{m.kcal} קק"ל · נתרן {m.sodium} מ"ג · שומן רווי {m.satFat}ג'</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Menu view (editable)
// ---------------------------------------------------------------------------
const SLOT_META = {
  lunch: { label: "ארוחת צהריים", time: "12:00", icon: Sun, tone: "orange" },
  dinner: { label: "ארוחת ערב", time: "19:00", icon: Moon, tone: "emerald" },
  snack: { label: "חטיף", time: "16:30", icon: Star, tone: "amber" },
};

function MealSlot({ day, slot, req, issues, onSwap }) {
  const meal = dayMeals(day)[slot];
  const meta = SLOT_META[slot];
  const Icon = meta.icon;
  const [picking, setPicking] = useState(false);
  if (!meal) return null;

  const toneBg = {
    orange: "bg-orange-50 border-orange-200",
    emerald: "bg-emerald-50 border-emerald-200",
    amber: "bg-amber-50 border-amber-200",
  }[meta.tone];

  const hasIssue = issues && issues.length > 0;

  return (
    <div className={`rounded-xl border p-3 ${hasIssue ? "border-rose-300 bg-rose-50" : toneBg}`}>
      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
        <span className="font-semibold">{meta.label}</span>
        <span>{meta.time}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-stone-400 shrink-0" />
          <span className="font-semibold text-stone-800 text-sm">{meal.name}</span>
        </div>
        <button onClick={() => setPicking(true)}
          className="text-xs font-semibold text-stone-500 hover:text-orange-600 border border-stone-300 rounded-full px-2.5 py-1 shrink-0">
          החלפה
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <Pill>{meal.kcal} קק"ל</Pill>
        <Pill>נתרן {meal.sodium} מ"ג</Pill>
        <Pill>רווי {meal.satFat}ג'</Pill>
      </div>
      {hasIssue && (
        <div className="mt-2 space-y-1.5">
          {issues.map((msg, i) => {
            const alt = suggestAlternative(slot, day, req);
            return (
              <div key={i} className="flex items-start gap-1.5 text-xs text-rose-700 bg-rose-100 rounded-lg p-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div>{msg}</div>
                  {alt && (
                    <button onClick={() => onSwap(slot, alt.id)}
                      className="mt-1 inline-flex items-center gap-1 text-rose-800 font-bold underline">
                      <RefreshCw size={12} /> החליפי ל: {alt.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {picking && (
        <MealPicker slot={slot} req={req}
          onPick={(id) => { onSwap(slot, id); setPicking(false); }}
          onClose={() => setPicking(false)} />
      )}
    </div>
  );
}

function MenuView({ week, requirements, onChangeWeek, onRegenerate, onConfirm }) {
  const wt = weekTotals(week);
  const rmCount = redMeatCount(week);

  const swapMeal = (dayKey, slot, mealId) => {
    const days = week.days.map((d) => {
      if (d.key !== dayKey) return d;
      const field = slot === "lunch" ? "lunchId" : slot === "dinner" ? "dinnerId" : "snackId";
      return { ...d, [field]: mealId };
    });
    onChangeWeek({ days });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5" dir="rtl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-600 font-bold">
            <ClipboardList size={20} />
            <span>התפריט השבועי שלך</span>
          </div>
          <p className="text-stone-500 text-sm">אפשר לערוך כל ארוחה — לחצי "החלפה"</p>
        </div>
        <button onClick={onRegenerate}
          className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1.5 border border-stone-300 rounded-full px-3 py-1.5">
          <RefreshCw size={14} /> תפריט חדש
        </button>
      </div>

      <SectionCard className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-stone-500 ml-1">סה"כ שבועי:</span>
        <Pill tone="orange">{Math.round(wt.kcal)} קק"ל</Pill>
        <Pill tone="emerald">חלבון {Math.round(wt.protein)}ג'</Pill>
        <Pill tone="amber">שומן רווי {wt.satFat.toFixed(1)}ג'</Pill>
        <Pill tone="teal">נתרן {Math.round(wt.sodium)} מ"ג</Pill>
        {rmCount > 3 && (
          <Pill tone="rose"><AlertTriangle size={12} /> בשר אדום {rmCount} פעמים השבוע (מומלץ עד 3)</Pill>
        )}
      </SectionCard>

      <div className="space-y-4">
        {week.days.map((day) => {
          const { mealIssues, dayIssues } = validateDay(day, requirements);
          const totals = dayTotals(day);
          return (
            <SectionCard key={day.key}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-stone-800">יום {day.name}</h3>
                <span className="text-xs text-stone-500">{Math.round(totals.kcal)} קק"ל ליום</span>
              </div>
              {dayIssues.length > 0 && (
                <div className="mb-2 space-y-1">
                  {dayIssues.map((msg, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-100 rounded-lg p-2">
                      <AlertTriangle size={14} /> {msg}
                    </div>
                  ))}
                </div>
              )}
              <div className="grid sm:grid-cols-3 gap-2">
                <MealSlot day={day} slot="lunch" req={requirements} issues={mealIssues.lunch}
                  onSwap={(slot, id) => swapMeal(day.key, slot, id)} />
                <MealSlot day={day} slot="dinner" req={requirements} issues={mealIssues.dinner}
                  onSwap={(slot, id) => swapMeal(day.key, slot, id)} />
                <MealSlot day={day} slot="snack" req={requirements} issues={mealIssues.snack}
                  onSwap={(slot, id) => swapMeal(day.key, slot, id)} />
              </div>
            </SectionCard>
          );
        })}
      </div>

      <button onClick={onConfirm}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm">
        <CalendarCheck size={18} />
        אשרי תפריט וצרי מעקב יומי
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tracker view (read-only menu + tracking)
// ---------------------------------------------------------------------------
function StarRow({ value, onChange, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}
          className={`text-xl ${value >= i + 1 ? "text-amber-400" : "text-stone-300"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

function TrackerView({ week, requirements, tracker, onChangeTracker, onBackToMenu, onShowReport }) {
  const [dayIdx, setDayIdx] = useState(0);
  const day = week.days[dayIdx];
  const { lunch, dinner, snack } = dayMeals(day);
  const t = tracker[day.key] || { lunchDone: false, dinnerDone: false, snackDone: false, satiety: 0, mood: 0, notes: "" };

  const update = (patch) => {
    onChangeTracker({ ...tracker, [day.key]: { ...t, ...patch } });
  };

  const totals = dayTotals(day);
  const isWorkout = requirements.workoutDays.includes(day.key);

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 text-rose-500 font-bold">
          <CalendarCheck size={20} />
          <span>המעקב היומי שלי</span>
        </div>
        <p className="text-stone-500 text-sm">כל יום מוצג בנפרד — סמני מה אכלת ואיך הרגשת</p>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => setDayIdx((i) => Math.max(0, i - 1))} disabled={dayIdx === 0}
          className="p-2 rounded-full border border-stone-300 disabled:opacity-30">
          <ChevronRight size={18} />
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center">
          {week.days.map((d, i) => (
            <button key={d.key} onClick={() => setDayIdx(i)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${
                i === dayIdx ? "bg-rose-500 text-white border-rose-500" : "bg-white text-stone-600 border-stone-300"
              }`}>
              {d.name}
            </button>
          ))}
        </div>
        <button onClick={() => setDayIdx((i) => Math.min(week.days.length - 1, i + 1))} disabled={dayIdx === week.days.length - 1}
          className="p-2 rounded-full border border-stone-300 disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
      </div>

      <SectionCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-stone-800">יום {day.name}</h3>
          <div className="flex gap-1.5">
            <Pill tone="orange">{Math.round(totals.kcal)} קק"ל</Pill>
            {isWorkout && <Pill tone="teal"><Dumbbell size={12} /> יום אימון</Pill>}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { slot: "lunch", meal: lunch, done: t.lunchDone, key: "lunchDone" },
            { slot: "dinner", meal: dinner, done: t.dinnerDone, key: "dinnerDone" },
            { slot: "snack", meal: snack, done: t.snackDone, key: "snackDone" },
          ].map(({ slot, meal, done, key }) => {
            const meta = SLOT_META[slot];
            const Icon = meta.icon;
            const toneBg = {
              orange: "bg-orange-50 border-orange-200",
              emerald: "bg-emerald-50 border-emerald-200",
              amber: "bg-amber-50 border-amber-200",
            }[meta.tone];
            return (
              <button key={slot} onClick={() => update({ [key]: !done })}
                className={`w-full text-right rounded-xl border p-3 flex items-center gap-3 transition ${toneBg} ${done ? "opacity-70" : ""}`}>
                <CheckCircle2 size={26} className={done ? "text-emerald-500" : "text-stone-300"} />
                <Icon size={18} className="text-stone-400 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold">{meta.label}</span>
                    <span>{meta.time}</span>
                  </div>
                  <div className={`font-semibold text-sm text-stone-800 ${done ? "line-through" : ""}`}>{meal?.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <div>
          <div className="text-sm font-bold text-stone-700 mb-1.5">רמת שובע היום</div>
          <StarRow value={t.satiety} onChange={(v) => update({ satiety: v })} />
        </div>
        <div>
          <div className="text-sm font-bold text-stone-700 mb-1.5">מצב רוח היום</div>
          <div className="flex gap-3">
            {[
              { v: 1, icon: Frown, label: "לא משהו" },
              { v: 3, icon: Meh, label: "בסדר" },
              { v: 5, icon: Smile, label: "מעולה" },
            ].map(({ v, icon: I, label }) => (
              <button key={v} onClick={() => update({ mood: v })}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-semibold ${
                  t.mood === v ? "bg-rose-100 border-rose-300 text-rose-700" : "border-stone-200 text-stone-500"
                }`}>
                <I size={22} />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-stone-700 mb-1.5">הערות</div>
          <textarea value={t.notes} onChange={(e) => update({ notes: e.target.value })}
            placeholder="איך היה היום? משהו ששווה לזכור לפעם הבאה?"
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm min-h-[70px]" />
        </div>
      </SectionCard>

      <div className="flex gap-2">
        <button onClick={onBackToMenu}
          className="flex-1 text-stone-500 hover:text-stone-700 text-sm font-semibold flex items-center justify-center gap-1.5 py-2 border border-stone-300 rounded-xl">
          <Settings2 size={14} /> עריכת התפריט
        </button>
        <button onClick={onShowReport}
          className="flex-1 text-orange-600 hover:text-orange-700 text-sm font-bold flex items-center justify-center gap-1.5 py-2 border border-orange-300 bg-orange-50 rounded-xl">
          <Sparkles size={14} /> דוח סיכום שבועי
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Weekly report view
// ---------------------------------------------------------------------------
function ReportView({ week, requirements, tracker, onBackToTracker }) {
  const wt = weekTotals(week);
  const rmCount = redMeatCount(week);

  let doneCount = 0;
  let satietySum = 0, satietyN = 0;
  let moodSum = 0, moodN = 0;
  let daysInCalRange = 0, daysSodiumOk = 0, daysSatFatOk = 0, daysCarbOk = 0;
  const notedDays = [];

  week.days.forEach((day) => {
    const t = tracker[day.key] || {};
    if (t.lunchDone) doneCount++;
    if (t.dinnerDone) doneCount++;
    if (t.snackDone) doneCount++;
    if (t.satiety) { satietySum += t.satiety; satietyN++; }
    if (t.mood) { moodSum += t.mood; moodN++; }
    const totals = dayTotals(day);
    if (totals.kcal >= requirements.calMin && totals.kcal <= requirements.calMax) daysInCalRange++;
    if (totals.sodium <= requirements.sodiumMax) daysSodiumOk++;
    if (totals.satFat <= requirements.satFatMax) daysSatFatOk++;
    if (!requirements.carbMax || totals.carbs <= requirements.carbMax) daysCarbOk++;
    if (t.notes && t.notes.trim()) notedDays.push({ name: day.name, notes: t.notes });
  });

  const totalMeals = week.days.length * 3;
  const adherencePct = Math.round((doneCount / totalMeals) * 100);
  const avgSatiety = satietyN ? (satietySum / satietyN).toFixed(1) : "-";
  const avgMood = moodN ? (moodSum / moodN).toFixed(1) : "-";

  let headline = "כל התחלה היא הישג — השבוע הבא יהיה עוד יותר טוב!";
  if (adherencePct >= 80) headline = "שבוע מדהים! עמדת ביעדים כמעט כל הזמן 🎉";
  else if (adherencePct >= 50) headline = "שבוע טוב עם המון עקביות — כל הכבוד!";

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 text-orange-600 font-bold">
          <Sparkles size={20} />
          <span>דוח סיכום שבועי</span>
        </div>
        <p className="text-stone-500 text-sm">{headline}</p>
      </div>

      <SectionCard className="text-center">
        <div className="text-4xl font-black text-orange-500">{adherencePct}%</div>
        <div className="text-sm text-stone-500 font-semibold mt-1">עמידה בתפריט ({doneCount} מתוך {totalMeals} ארוחות סומנו)</div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-3">
        <SectionCard className="text-center">
          <div className="text-2xl font-bold text-amber-500">{avgSatiety}</div>
          <div className="text-xs text-stone-500 font-semibold mt-1">ממוצע שובע (מתוך 5)</div>
        </SectionCard>
        <SectionCard className="text-center">
          <div className="text-2xl font-bold text-rose-500">{avgMood}</div>
          <div className="text-xs text-stone-500 font-semibold mt-1">ממוצע מצב רוח (מתוך 5)</div>
        </SectionCard>
      </div>

      <SectionCard className="space-y-2">
        <div className="font-bold text-stone-700 text-sm mb-1">עמידה ביעדים התזונתיים</div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600">ימים בטווח הקלוריות</span>
          <Pill tone={daysInCalRange >= 5 ? "emerald" : "amber"}>{daysInCalRange}/7 ימים</Pill>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600">ימים בגבול הנתרן</span>
          <Pill tone={daysSodiumOk >= 5 ? "emerald" : "amber"}>{daysSodiumOk}/7 ימים</Pill>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600">ימים בגבול השומן הרווי</span>
          <Pill tone={daysSatFatOk >= 5 ? "emerald" : "amber"}>{daysSatFatOk}/7 ימים</Pill>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600">ימים בגבול הפחמימות</span>
          <Pill tone={daysCarbOk >= 5 ? "emerald" : "amber"}>{daysCarbOk}/7 ימים</Pill>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600">בשר אדום השבוע</span>
          <Pill tone={rmCount <= 3 ? "emerald" : "rose"}>{rmCount} ארוחות</Pill>
        </div>
      </SectionCard>

      <SectionCard className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-stone-500 ml-1">סה"כ תזונתי שבועי:</span>
        <Pill tone="orange">{Math.round(wt.kcal)} קק"ל</Pill>
        <Pill tone="emerald">חלבון {Math.round(wt.protein)}ג'</Pill>
        <Pill tone="amber">שומן רווי {wt.satFat.toFixed(1)}ג'</Pill>
        <Pill tone="teal">נתרן {Math.round(wt.sodium)} מ"ג</Pill>
      </SectionCard>

      {notedDays.length > 0 && (
        <SectionCard className="space-y-2">
          <div className="font-bold text-stone-700 text-sm mb-1">ההערות שלך השבוע</div>
          {notedDays.map((n, i) => (
            <div key={i} className="text-sm bg-stone-50 rounded-lg p-2">
              <span className="font-semibold text-stone-700">יום {n.name}: </span>
              <span className="text-stone-600">{n.notes}</span>
            </div>
          ))}
        </SectionCard>
      )}

      <button onClick={onBackToTracker}
        className="w-full text-stone-500 hover:text-stone-700 text-sm font-semibold flex items-center justify-center gap-1.5 py-2">
        <ChevronRight size={14} /> חזרה למעקב היומי
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root app
// ---------------------------------------------------------------------------
const STORAGE_KEY = "weekly-meal-planner-state-v1";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState("setup"); // setup | menu | tracker
  const [requirements, setRequirements] = useState(defaultRequirements);
  const [week, setWeek] = useState(null);
  const [tracker, setTracker] = useState({});
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          if (parsed.requirements) setRequirements(parsed.requirements);
          if (parsed.week) setWeek(parsed.week);
          if (parsed.tracker) setTracker(parsed.tracker);
          if (parsed.stage) setStage(parsed.stage);
        }
      } catch (e) {
        // no saved state yet — start fresh
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(
          STORAGE_KEY,
          JSON.stringify({ requirements, week, tracker, stage }),
          false
        );
      } catch (e) {
        // best-effort persistence
      }
    }, 300);
    return () => clearTimeout(saveTimer.current);
  }, [requirements, week, tracker, stage, loading]);

  const handleGenerate = (req) => {
    setRequirements(req);
    setWeek(generateWeek(req));
    setStage("menu");
  };

  const handleRegenerate = () => {
    setWeek(generateWeek(requirements));
  };

  const handleConfirm = () => {
    setStage("tracker");
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-orange-50">
        <Loader2 className="animate-spin text-orange-400" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-stone-50 to-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-center gap-2 flex-wrap" dir="rtl">
        {[
          { key: "setup", label: "דרישות", icon: Settings2 },
          { key: "menu", label: "תפריט", icon: ClipboardList },
          { key: "tracker", label: "מעקב יומי", icon: CalendarCheck },
          { key: "report", label: "דוח שבועי", icon: Sparkles },
        ].map((s, i) => {
          const Icon = s.icon;
          const active = stage === s.key;
          const reachable = s.key === "setup" || week;
          return (
            <React.Fragment key={s.key}>
              {i > 0 && <div className="w-6 h-px bg-stone-300" />}
              <button
                disabled={!reachable}
                onClick={() => reachable && setStage(s.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  active ? "bg-stone-800 text-white" : reachable ? "bg-white text-stone-500 border border-stone-300" : "bg-stone-100 text-stone-300"
                }`}>
                <Icon size={13} /> {s.label}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {stage === "setup" && <SetupView requirements={requirements} onGenerate={handleGenerate} />}

      {stage === "menu" && week && (
        <MenuView
          week={week}
          requirements={requirements}
          onChangeWeek={setWeek}
          onRegenerate={handleRegenerate}
          onConfirm={handleConfirm}
        />
      )}

      {stage === "tracker" && week && (
        <TrackerView
          week={week}
          requirements={requirements}
          tracker={tracker}
          onChangeTracker={setTracker}
          onBackToMenu={() => setStage("menu")}
          onShowReport={() => setStage("report")}
        />
      )}

      {stage === "report" && week && (
        <ReportView
          week={week}
          requirements={requirements}
          tracker={tracker}
          onBackToTracker={() => setStage("tracker")}
        />
      )}
    </div>
  );
}