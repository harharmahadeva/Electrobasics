# Handoff: ElectroBasics — Login + Dashboard + Learning Flow (PWA, EN/HI)

## Overview
ElectroBasics is an interactive electronics-learning PWA for beginners. This handoff covers a
complete, clickable UI flow: **Login → Dashboard → Lesson View → Quiz (MCQ) → Test Result →
MCQ Review**, plus **Notes**, **Spark AI** (chat assistant), and **Continue Lesson**. Every screen
is **bilingual** with a live **English ⇄ Hindi** toggle, and every screen is **responsive**
(desktop web + mobile).

The target platforms are Web App (primary) and PWA (offline). The app should install to the home
screen, work offline, and adapt between a desktop layout (top bar + multi-column grid) and a mobile
layout (compact header + bottom tab bar).

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype that shows
the intended look, copy, and behavior. **They are not production code to copy verbatim.** The task
is to **recreate these designs in the target codebase's environment** using its established patterns
and libraries. If no codebase exists yet, choose an appropriate stack — a **React + Vite PWA** with
a component library and an i18n library (e.g. `react-i18next`) is a natural fit and matches the
prototype's structure.

`ElectroBasics.dc.html` is a single-file "Design Component" prototype. To view it, open it in a
browser (it loads its runtime from the sibling `support.js`). Read it for exact spacing, colors, and
copy; do not ship it as-is.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, and interactions are final. Recreate
the UI closely using the codebase's libraries. The only placeholders are **imagery** — greyscale
striped tiles marked `[ breadboard photo ]`, `[ circuit diagram ]`, and course-thumbnail tiles.
Replace these with real component photographs per the "Real Image Usage Guide" (see Assets).

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| bg / page | `#06080d` | App background (with layered radial glows, see below) |
| surface-1 | `#0c111b` | Inputs, inner wells, placeholder tiles |
| surface-card | gradient `#12171f → #0b0f17` (`rgba(18,23,34,.9)→rgba(11,15,23,.9)`) | Card backgrounds |
| border-subtle | `rgba(120,150,200,.14)` | Default card/input borders |
| text-primary | `#e8edf7` | Headings, body |
| text-secondary | `#8b97ac` | Sub-labels, captions |
| text-muted | `#55617a` / `#5b6a86` | Placeholders, meta |
| **amber** (primary) | `#f5a623`; gradient `#f5b643 → #e8790f` | Brand, primary buttons, Continue Learning |
| amber-text-on | `#1a1204` | Text/icon on amber buttons |
| **cyan** (AI) | `#22d3ee`; deep `#0891b2` | Spark AI, links, info accents |
| **green** (progress) | `#4ade80` | Progress gauge, correct answers, streak fill |
| **purple** (level/goal) | `#a78bfa`; deep `#7c5cf0` | Level card, Weekly Goal, Achievements panel |
| danger | `#ef4444` / text `#ef6b6b` | Notifications badge, incorrect answers |

Page background is `#06080d` overlaid with three radial glows:
`radial-gradient(1100px 700px at 12% -5%, rgba(245,166,35,.10), transparent 60%)`,
`radial-gradient(1000px 700px at 95% 8%, rgba(120,90,240,.12), transparent 60%)`,
`radial-gradient(900px 800px at 60% 110%, rgba(34,211,238,.08), transparent 55%)`.
A faint 46px circuit grid overlay sits above it at opacity .5, masked with a radial fade
(`linear-gradient` grid lines in `rgba(90,120,170,.05)`).

### Typography
- **Display / headings:** `Space Grotesk` (700/600). Falls back to `Noto Sans Devanagari` for Hindi.
- **Body / UI:** `IBM Plex Sans` (400–700), with `Noto Sans Devanagari` for Hindi text.
- **Mono / technical:** `IBM Plex Mono` (400/500) — kbd hints (`⌘K`), meta counters (`3 / 6`), tags.
- Scale (px): page H1 `clamp(24, 3.2vw, 34)`; card title 24–28; section eyebrow 13 (600, letter-spacing .6px, UPPERCASE); body 15 (line-height 1.7); labels 12–13; captions 11–12.
- Formula display (`V = I × R`): Space Grotesk 700, 34–40px, letter-spacing 1–2px, amber.

### Spacing / Radius / Shadow
- Card padding: 22px (dashboard cards), 24–26px (content panels).
- Grid gaps: 18–20px. Inner element gaps: 10–16px.
- Radii: cards 18–24px; buttons/inputs 11–13px; chips/pills 20px; icon tiles 9–13px; rings 50%.
- Primary button shadow: `0 8px 24px rgba(245,166,35,.3)` (hero: `0 10px 30px rgba(245,166,35,.35)`).
- Card glows (colored): e.g. gauge `0 0 40px rgba(74,222,128,.18)`.

### Progress rings
Built with `conic-gradient(<accent> <deg>, rgba(255,255,255,.06) 0)` + an inner filled circle for the
label. 42% → 151deg; 90% → 324deg; Weekly Goal 4/7 → 206deg (purple `#a78bfa`).

---

## Screens / Views

### 1. Login
- **Purpose:** Authenticate; entry point.
- **Layout:** Full-viewport, centered card `max-width: 430px`. Logo lockup (⚡ tile + wordmark) above
  the card; EN/HI toggle pinned top-right; "Create an account" line below.
- **Components:** Card `#141a26/#0c1019` gradient, radius 22, padding 34/30, shadow `0 30px 80px rgba(0,0,0,.55)`.
  H1 "Welcome Back! 👋"; subtitle. Email + Password fields (well `#0c111b`, leading ✉/🔒 icon, eye toggle
  on password). "Forgot Password?" (amber, right-aligned). Full-width amber **Sign In** button. Divider
  "or continue with". Three social buttons (Google / Apple / GitHub) — all currently proceed to dashboard.
- **Copy (EN):** "Welcome Back!", "Sign in to continue your learning journey", "Email", "Password",
  "Forgot Password?", "Sign In", "or continue with", "Don't have an account? Sign Up".
- **Copy (HI):** "स्वागत है!", "अपने सीखने की यात्रा शुरू करने के लिए लॉगिन करें", "ईमेल", "पासवर्ड",
  "पासवर्ड भूल गए?", "लॉगिन करें", "या इनसे लॉगिन करें", "खाता नहीं है? साइन अप करें".

### 2. Dashboard
- **Purpose:** Home. Overview of progress, quick resume, AI, courses, activity, achievements, goals.
- **Layout:** Sticky header (see Chrome). Hero row (greeting + Day-Streak card + Level card). Row 1:
  3-col `repeat(auto-fit, minmax(300px,1fr))` — **Continue Learning**, **Spark AI Terminal**, **Progress
  Gauge**. Row 2: `repeat(auto-fit, minmax(260px,1fr))` — **Course Library** (spans 2 cols), **Activity
  Timeline**, **Achievements**, **Weekly Goal**.
- **Key components & content:**
  - Greeting: "Good Evening, Sandeep 👋" / "नमस्ते, संदीप! 👋" + floating ⚡ tile (amber radial, `ebFloat` 4s).
  - Day Streak: 🔥 **12**. Level card (purple): "Level 3 · Novice Engineer", XP bar 53%, "320 / 600 XP".
  - Continue Learning (amber-bordered): "Lesson 03 · Ohm's Law · Basic Electronics", 42% ring, breadboard
    placeholder, **Resume Lesson** (→ Lesson) + **Lesson Info** (→ Continue Lesson).
  - Spark AI (cyan-bordered, whole card → Spark): speech bubble message, floating 🤖, ask-field, 3 chips
    ("Explain Ohm's Law", "Series vs Parallel", "What is Voltage?").
  - Progress Gauge (green): 42% ring + 3 stats — 18 Lessons Completed / 7 Quizzes Passed / 4h 32m Time Learned.
  - Course Library: 4 tiles (Basic 12/28 amber, Analog 8/24 green, Digital 6/26 cyan, Sensors 2/18 purple),
    each with progress bar; tile & "View All" → Lesson.
  - Activity Timeline: 3 rows (✓ Completed Lesson 02 · Kirchhoff's Voltage Law · 2h ago; ☑ Quiz Score 90% ·
    5h ago; ▶ Started Lesson 03 · Yesterday) + "View Full Activity".
  - Achievements (purple panel): Ω Ohm's Expert; 📅 Consistent Learner; ⬡ Circuit Explorer.
  - Weekly Goal (purple): 4/7 ring, "You're doing great! 🚀", **View Goals**.

### 3. Lesson View
- **Purpose:** Read lesson content.
- **Layout:** 2-col `260px 1fr` (stacks < 880px). Left: lesson outline (6 steps, step 3 active). Right:
  breadcrumb "Lesson 03 · Basic Electronics", H1 "Ohm's Law", tab pills (Lesson / Explanation / Simulation /
  Notes — active is amber, sets `tab` state), formula panel (`V = I × R` + Where V/I/R legend) beside a
  circuit-diagram placeholder, action buttons (**Ask Spark AI** → Spark, **Notes** → Notes, **Bookmark**),
  footer nav (**Previous** → Dashboard, "3 / 6", **Take Quiz** → Quiz).
- **Body copy (EN):** "Ohm's Law states that the current through a conductor between two points is directly
  proportional to the voltage across the two points." Legend: V = Voltage (Volts), I = Current (Amperes),
  R = Resistance (Ohms).
- **Outline steps (EN):** 1 Introduction · 2 What is Resistance? · 3 Ohm's Law Formula (active) · 4 Real
  Life Examples · 5 Solved Examples · 6 Summary. (HI equivalents in the file.)

### 4. Quiz (MCQ)
- **Purpose:** Answer a multiple-choice question.
- **Layout:** 2-col `240px 1fr` (stacks < 880px). Left: quiz meta + 10-cell question navigator (Q1 answered
  green, Q2 current cyan) + legend (Answered / Current). Right: "Question 2 of 10", question, 4 options
  (A–D). Selecting an option highlights it cyan (`selected` state). Footer: **View Explanation** (→ Review),
  **Next** (→ Result).
- **Copy:** "Ohm's Law Quiz", "According to Ohm's Law, which of the following is correct?", options
  `V = I / R`, `V = I × R` (**correct, index 1**), `R = V − I`, `I = V ÷ R`.

### 5. Test Result
- **Purpose:** Show score.
- **Layout:** Centered card `max-width: 920px`, green-bordered, glow. 🏆, "Great Job! 🎉", **90%** ring
  (324deg green), "You scored 9 out of 10", 3 stat tiles (Correct 9 / Incorrect 1 / Time Taken 04:32),
  buttons **Review Answers** (→ Review) + **Back to Lesson** (→ Lesson), "Keep practicing to achieve 100%!".

### 6. MCQ Review
- **Purpose:** Review right/wrong answers with explanation.
- **Layout:** 2-col `200px 1fr` (stacks < 880px). Left: Q1–Q6 list with ✓/✕ (Q2 wrong = red row). Right:
  question, **Your Answer** `V = I / R` (red ✕), **Correct Answer** `V = I × R` (green ✓), Explanation panel
  ("Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R).", big `V = I × R`),
  footer **Back to Lesson** (→ Result) + **Next** (→ Dashboard).

### 7. Notes
- **Purpose:** Read/write personal notes.
- **Layout:** 2-col `240px 1fr` (stacks < 880px). Left: note list (Ohm's Law active, Kirchhoff's Laws,
  Series Circuit, Parallel Circuit) + "+ Add New Note". Right: H2 "Ohm's Law", formula panel, Key Points
  list (3 bullets), editable textarea, **Back to Lesson** + **Save Note**.

### 8. Spark AI
- **Purpose:** Chat with the AI tutor.
- **Layout:** Single column `max-width: 820px`, cyan-bordered, `min-height: 560px`. Header (🤖 "Spark AI ·
  ● Online"). Message thread: user bubble (amber, right) + AI bubble (cyan, left, with avatar). Suggestion
  chips. Input row with send button.
- **Copy (EN):** User: "Explain why resistance affects the voltage in a circuit?" AI: "Great question!
  According to Ohm's Law (V = I × R), if current stays constant and resistance (R) increases, the voltage
  (V) across the component also increases. Resistance opposes the flow of current, creating a voltage drop.
  Would you like a worked example?"

### 9. Continue Lesson
- **Purpose:** Resume in-progress lesson with sub-step progress.
- **Layout:** Single column `max-width: 720px`, amber-bordered. "Lesson 03 · Ohm's Law · Basic Electronics",
  42% ring, breadboard placeholder, full-width **Continue** (→ Lesson), then "Lesson Progress" list — 5
  sub-steps with ✓ done (green dot), current (amber dot), or pending (grey dot).

### Chrome (shared, all screens except Login)
- **Desktop header** (≥ 881px): logo (→ Dashboard) · centered search field with `⌘K` · EN/HI toggle ·
  🔔 (badge 3) · ☀ · avatar "SN / Sandeep / Level 3" (→ Login/logout). Sticky, blurred bg `rgba(6,8,13,.85)`.
- **Mobile header** (≤ 880px): logo · compact EN/HI toggle · 🔔 · avatar.
- **Bottom tab bar** (≤ 880px, fixed): Home · Courses · Spark · Quiz · Notes; active tab amber. Respects
  `env(safe-area-inset-bottom)`.

---

## Interactions & Behavior
- **Navigation map:** Login→Dashboard (Sign In / any social / guest). Dashboard: Resume Lesson & course
  tiles & View All→Lesson; Lesson Info→Continue; Spark card→Spark. Lesson: Ask Spark→Spark, Notes→Notes,
  Take Quiz→Quiz, Previous→Dashboard. Quiz: View Explanation→Review, Next→Result. Result: Review Answers→
  Review, Back to Lesson→Lesson. Review: Back→Result, Next→Dashboard. Bottom nav routes to the 5 tabs.
  Logo & avatar in header return to Dashboard / Login respectively.
- **Language toggle:** switches ALL copy live (header, cards, lessons, quiz, chat) between EN and HI. Persist
  the choice (localStorage) and set `<html lang>` accordingly in the real app.
- **Quiz option select:** clicking A–D sets a `selected` index and highlights cyan; correct answer is index 1.
- **Lesson tabs:** clicking a pill sets a `tab` index (active pill amber).
- **Animations:** `ebFloat` (translateY ±8px, 4s / 3.5s ease-in-out) on the hero ⚡ and Spark 🤖; caret
  `ebBlink` 1s. Keep transitions subtle (150–250ms) on hover/press in the real build.
- **Responsive:** single breakpoint at ~880px flips header style, collapses 2-col split panes to 1 col, and
  reveals the bottom tab bar. Cards themselves use `auto-fit` grids and reflow fluidly.

## State Management
- `lang`: `'en' | 'hi'` — active language (persist).
- `view`: `'login' | 'dashboard' | 'lesson' | 'quiz' | 'result' | 'review' | 'notes' | 'spark' | 'continue'`
  — active screen/route. In production, back this with the router (URL per screen) so the PWA supports deep
  links and the back button.
- `selected`: `number | null` — chosen quiz option (reset on navigation).
- `tab`: `number` — active lesson content tab.
- **Data:** all lesson/quiz/course/activity content is currently static in the prototype's dictionary. In
  production these become API/data-layer reads. Auth is stubbed (any submit proceeds) — wire to the real
  auth provider. Spark AI is a static transcript — connect to the real assistant endpoint.

## i18n
Two full string tables (`en`, `hi`) live in the prototype's logic class, plus localized arrays
(courses, activities, achievements, lesson steps, notes, progress steps). Move these into i18n resource
files (`en.json`, `hi.json`) and render via the i18n library. Math/formulas (`V = I × R`) are identical
across languages. Load `Noto Sans Devanagari` whenever Hindi can render.

## Assets
- **Fonts (Google):** Space Grotesk, IBM Plex Sans, IBM Plex Mono, Noto Sans Devanagari.
- **Icons:** currently emoji/Unicode glyphs (⚡ 🔥 ✦ 🤖 🏅 Ω ⬡ ✓ ✕ ➤ etc.). In production, swap for a real
  icon set (e.g. Lucide/Phosphor) for consistent rendering; keep the lightning-bolt brand mark.
- **Imagery (placeholders to replace):** breadboard photo (Continue Learning / Continue Lesson), circuit
  diagram (Lesson View), 4 course thumbnails (IC chip, waveform, digital IC, sensor). Per the source
  "Real Image Usage Guide": use **real, high-quality component photographs** (breadboards, instruments,
  build photos), consistent style & lighting — not illustrations.
- **Reference designs (included in this bundle, `reference/`):** the original ChatGPT-designed spec sheets —
  full desktop+mobile EN flow, full Hindi interface, product/curriculum map, and the standalone dashboard
  render. Use these for component inventory, the 60-lesson curriculum, and image direction.

## Files
- `ElectroBasics.dc.html` — the hi-fi prototype (all 9 screens + EN/HI + responsive). Open in a browser to
  interact; read the source for exact values.
- `support.js` — runtime required to open the prototype locally. Not part of the app to build.
- `reference/` — original design reference images (PNG).
