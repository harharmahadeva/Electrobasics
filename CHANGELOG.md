# Changelog

## 2026-07-07

### Fixed
- Reworked the lesson Spark widget into a compact black scanner console that fits its sidebar/card parent and opens as a mobile bottom sheet.
- Removed XP Reward and Next Lesson Preview from the lesson right sidebar, leaving only Spark AI Console and the Lesson Checklist.
- Cleaned BE-001 section rendering so each section uses its single main public image without duplicate visual cards, raw prompts, filenames, or asset metadata.
- Simplified BE-001 Section 05 to the guided-visuals image plus a short beginner-friendly explanation.
- Verified 393px mobile routes for dashboard, modules, Module 01, BE-001, and all 12 BE-001 sections with no page-level horizontal overflow.

## 2026-07-06

### Fixed
- Removed remaining 393px mobile overflow sources by constraining dashboard hero decoration, notification badges, Courses route aliases, All Modules cards, and Module 01 lesson cards to viewport-safe widths.
- Tightened iPhone-width mobile layouts for login, dashboard, BE-001 lesson, and SectionPlayer at 393px/390px/430px viewports.
- Reduced dashboard mobile card padding, heights, gaps, and typography while keeping header, Continue Learning, and profile/signout menu inside the viewport.
- Removed visible lesson image metadata/caption text under lesson visuals and restored explicit image object-fit classes so existing public PNGs render instead of blank placeholders.
- Fixed mobile login overflow and height by switching to a compact single-column `100dvh` layout with the disclaimer and copyright inside the login card.
- Fixed BE-001 lesson mobile clipping by clamping lesson/player wrappers and SectionPlayer cards to the viewport with 16px mobile padding.
- Removed raw BE-001 image filenames from lesson image cards and missing-image fallbacks so successful image loads show only the visual.
- Kept the mobile profile/signout menu inside the viewport with a fixed right offset and `calc(100vw - 24px)` width cap.
- Rebuilt the mobile responsive layouts for login, dashboard, all modules, Module 01, BE-001 lesson, and SectionPlayer against the approved design references.
- Added viewport containment for mobile cards, headers, profile/signout menus, Spark bottom sheets, modal sheets, lesson controls, and bottom navigation to prevent page-level horizontal scrolling.
- Tightened mobile lesson and module layouts so cards, images, Start Lesson controls, section navigation, and PNG-backed BE-001 visuals fit within narrow phone widths.
- Corrected the mobile login screen to use a single-column vertical layout with centered hero content, feature cards, language toggle, and login card.
- Prevented horizontal overflow on mobile login at narrow widths and kept the card fully visible within a 100% / 420px max-width layout.
- Fixed login-facing Hindi text and the language toggle Hindi label.

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
