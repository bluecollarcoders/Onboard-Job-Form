# 🏗️ Week 3: Full-Stack Integration & Enterprise Scale

## 🎯 Mission: Bridge the Gap and Build for Scale

**Duration:** 7 Days (March 23-29, 2026)
**Focus:** Connecting the React frontend to the PostgreSQL backend while implementing production-grade performance patterns.
**Success Metric:** A working UI that displays paginated job listings and allows real-time application submissions.

---

## 📋 Week 3 Checklist

### Days 1-2: Frontend Connectivity & Data Fetching 🔗
**Goal:** Replace mock logic with real API communication.

- [ ] Update `ContactForm.tsx` to hit the real `POST /api/applications/apply` endpoint.
- [ ] Implement a `JobService` on the frontend (using `fetch` or `axios`) to centralize API calls.
- [ ] Build the `JobList` component to fetch and display data from `GET /api/jobs`.
- [ ] Map backend domain errors (e.g., `ALREADY_APPLIED`) to user-friendly UI alerts.

### Days 3-4: UI/UX Professionalism 🎨
**Goal:** Build a "Bulletproof" interface that feels like an enterprise SaaS.

- [ ] Implement **Loading States** and **Skeletons** for the Job List.
- [ ] Add **React Error Boundaries** to handle API failures gracefully.
- [ ] Integrate **React Toast** for immediate feedback on form actions.
- [ ] Handle "Empty States" (e.g., "No jobs found matching your criteria").

### Days 5-6: Enterprise Power-Up (Pagination & Indexing) ⚡
**Goal:** Ensure the system scales as data grows.

- [ ] **Backend:** Implement **Offset-based Pagination** in the `getAllJobs` service and controller (`?page=1&limit=10`).
- [ ] **Database:** Add Indexes in `schema.prisma` for high-traffic search columns:
  - `idx_jobs_location`
  - `idx_jobs_title`
  - `idx_applications_user_job`
- [ ] **Frontend:** Build a "Pagination" component (Next/Previous) to control the list view.

### Day 7: End-to-End Validation & Filtering 🧪
**Goal:** Prove the "Hybrid" search works.

- [ ] Add a basic **Filter Bar** (e.g., filter by location) that updates the URL and fetches new data.
- [ ] Perform a full E2E test: Post a Job -> See it in List -> Apply as a User -> Verify in DB.
- [ ] Update documentation with "Week 3 Architecture Decisions."

---

## 🎯 Architectural Patterns

**1. The "Single Source of Truth" UI:**
Ensure your React components are "dumb" and your frontend service/hook layer handles the "smart" logic of talking to the backend.

**2. Query Optimization:**
Learn to use Prisma's `skip` and `take` for pagination, and understand how database indexes turn O(n) searches into O(log n).

---

## 🏗️ Technical Stack (Current)

- **Frontend:** React + TailwindCSS
- **State Management:** React Hooks (useState, useEffect)
- **Backend:** Express + Prisma + PostgreSQL
- **Validation:** Zod (Shared between layers)

---

## 💪 Success Criteria for Week 3

### Integration
- [ ] The entire "Job Search -> Apply" flow works without manual database entry.
- [ ] API metadata (total count, page) is correctly displayed in the UI.

### Performance
- [ ] Initial page load returns data in < 100ms.
- [ ] No "Full Table Scans" reported in Postgres logs for job searches.

---

## 🚀 Ready to Start?

**Your first task:** Update `ContactForm.tsx` to use the new shared `CreateApplicationDTO` and hit the live backend.

**Coach's expectation:** By the end of this week, you will have a **Full-Stack Portfolio Piece.** You won't just have code; you'll have a product that handles scale like a senior engineer.

**Let's bridge the gap! 🌉🔥**
