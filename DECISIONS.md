# Decision Log

This file records important architectural and technical decisions made during the development of ElectroBasics.

---

## 2026-07-01

### Decision
Use React + Vite.

Reason

Fast development.

Excellent PWA support.

Large ecosystem.

---

### Decision

Deploy using Vercel.

Reason

Simple deployment.

Fast global CDN.

GitHub integration.

---

### Decision

Use Supabase for backend services.

Reason

Cloud authentication.

Cloud database.

Student progress synchronization.

---

## 2026-07-02

### Decision

Use a dedicated Supabase project for ElectroBasics, separate from the user's other apps.

Reason

User management should live outside the app's own frontend code and be centrally administered through the Supabase dashboard, not hand-rolled with a custom Node.js/MongoDB auth layer.

Scoped to ElectroBasics only — not a shared identity provider across the user's other PWAs (Speako, Slimbo, Work Ready).

---

### Decision

Support English and Hindi.

Reason

Primary audience includes students and freshers from North India.

---

### Decision

Create Spark AI Tutor.

Reason

Students learn better when listening to explanations rather than only reading.

---

### Decision

Teach understanding instead of memorization.

Reason

Students should understand concepts and apply them in real life.

---

### Decision

Store progress online.

Reason

Students can continue learning across multiple devices.

---

### Decision

Follow OWASP Top 10.

Reason

Security will be part of the architecture from the beginning.

---

### Decision

Maintain a changelog for every meaningful modification.

Reason

Provides complete project history and easier maintenance.

---

## 2026-07-03

### Decision

Establish "Sandy" (User ID `sandy`, password `800390`) as the canonical default test user for local development, stubbed in `src/services/authService.js`.

Reason

The app currently runs locally with stubbed auth, but will move to GitHub → Vercel with centralized Supabase authentication, where every login is verified against a real account. Having one fixed, documented test identity now (rather than "any input succeeds") gives a consistent account to test against and a clear seed user to recreate once Supabase auth is wired in.