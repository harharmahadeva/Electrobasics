# Image Assets

Drop ChatGPT-generated images into these folders using the exact filenames below (kebab-case, lowercase). I'll wire each one in as soon as it lands — no code changes needed on your end beyond the drop.

**General rules:**
- Illustrations that sit on top of the dark app background (mascot, hero art, floating components) → **PNG with a transparent background**.
- Real photos (components, breadboards, course thumbnails) → **JPG**, real/high-quality photographs, not illustrations (per the project's "Real Image Usage Guide" — no stock-art look, no stray watermarks/text baked into the image).
- If you're not sure of exact pixel size, generate large (the app will scale down) — just keep the aspect ratio close to what's listed.

---

## `login/`
| Filename | Used for | Format | Approx size / aspect |
|---|---|---|---|
| `hero-desktop.png` | **Full background** of the left hero panel on the desktop login split-screen (lightning bolt + floating components on circuit board). Text sits directly on top, so this must be a complete, self-contained dark scene — **not transparent**. | JPG or opaque PNG | ~1600×1200, landscape (roughly matches the panel's ~1.3:1 width:height) |
| `hero-mobile.png` | Simplified centerpiece version (chip + bolt only) for a future mobile hero treatment | JPG or opaque PNG | ~1000×1000, square |

## `mascot/`
Spark, the AI tutor robot. Used on the dashboard's Spark Terminal card, the full Spark AI chat screen, and anywhere else Spark appears.
| Filename | Used for | Format |
|---|---|---|
| `spark-idle.png` | Default/resting pose | PNG, transparent bg |
| `spark-wave.png` | Greeting pose (optional, e.g. dashboard) | PNG, transparent bg |
| `spark-thinking.png` | "Typing/thinking" state in chat (optional) | PNG, transparent bg |

Only `spark-idle.png` is required to start — the other two are optional polish for later.

## `courses/`
Course Library thumbnails on the dashboard (currently 4 tiles).
| Filename | Course |
|---|---|
| `basic-electronics.jpg` | Basic Electronics |
| `analog-electronics.jpg` | Analog Electronics |
| `digital-electronics.jpg` | Digital Electronics |
| `sensors-actuators.jpg` | Sensors & Actuators |

## `components/`
Real macro photos of individual electronic components, for lesson cards and the Continue Learning breadboard visual (Phase 2). Not urgent yet — add as Phase 2 lesson content gets built. Naming convention: `<component-name>.jpg`, e.g. `resistor.jpg`, `led.jpg`, `capacitor.jpg`, `multimeter.jpg`, `breadboard.jpg`.

## `lessons/`
Per-lesson breadboard photos / circuit diagrams (Phase 2 — Lesson View, Continue Lesson screens). Naming convention: `<lesson-slug>-breadboard.jpg` / `<lesson-slug>-circuit.png`, e.g. `ohms-law-breadboard.jpg`.

---

**Right now, blocking for the dashboard:** `lessons/ohms-law-breadboard.jpg`, all 4 files in `courses/`, and `mascot/spark-idle.png`. These are already wired into the dashboard code — they'll appear the moment you drop them in, no further changes needed.
