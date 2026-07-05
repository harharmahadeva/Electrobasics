# Changelog

## 2026-07-02

### Added
- Design token system (`src/styles/tokens/`) matching the Claude design handover's color, typography, and spacing spec.
- i18n via `react-i18next`, with full EN/HI resource dictionaries (`src/content/en`, `src/content/hi`) ported from the handover.
- Shared app chrome: `AppLayout`, desktop/mobile `Header` with EN/HI toggle, and `BottomNav` (Home/Courses/Spark/Quiz/Notes).
- Full route set for the 9-screen nav map, with placeholder `ComingSoon` pages for the 7 screens not yet built (Lesson, Quiz, Result, Review, Notes, Spark AI, Continue Lesson).

### Changed
- Rebuilt Login screen to match the handover exactly: centered card, email/password, social row, EN/HI toggle.
- Rebuilt Dashboard (`DashboardV2`) to token-exact fidelity: conic-gradient progress rings, auto-fit responsive grids, correct colors/copy per card, course library spanning 2 columns.
- `authService`/`useLogin` now use email instead of a 5-digit student code.

### Removed
- Unused Vite-template boilerplate (`src/index.css`, `@fontsource/inter`) and dead duplicate components (old dashboard v1, `BrandHeader` duplicates, `SparkCard`/`KittScanner`/`DisclaimerCard`, `AppIcons`).

### Decisions
- Dedicated Supabase project for ElectroBasics (see `DECISIONS.md`).
- Icons via `lucide-react`, role-matched to the handover's emoji/glyphs rather than literal emoji.

Phase 2 (the 7 remaining screens) is planned separately.
