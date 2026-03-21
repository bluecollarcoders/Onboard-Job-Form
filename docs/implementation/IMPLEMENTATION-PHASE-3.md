# 🏗️ Week 3: Full-Stack Integration & Recruiter Dashboard

## 🎯 Mission: Bridge the Gap and Build the Admin Experience

**Duration:** 7 Days (March 23-29, 2026)
**Focus:** Connecting the React frontend to the PostgreSQL backend and building the complex "Recruiter Dashboard" flow.
**Success Metric:** A working UI that allows recruiters to view applications and update candidate statuses in real-time.

---

## 📋 Week 3 Checklist

### Days 1-2: Frontend Infrastructure & Public View 🔗
**Goal:** Establish the React -> Express bridge.

- [ ] Implement a `useApi` custom hook or a `services/api.ts` layer to handle base URL and error parsing.
- [ ] Build the **Public Job Board:**
  - `JobCard` component.
  - Search bar that triggers backend `?q=` queries.
  - Job details modal or page.
- [ ] Connect the `ContactForm` to the real `POST /api/applications/apply` endpoint.

### Days 3-5: The Recruiter Dashboard (MVP Killer) 💼
**Goal:** Handle complex relational data in the UI.

- [ ] Build the **Job Management View:** A table showing all jobs posted by the recruiter.
- [ ] Build the **Applicant List View:** When a job is clicked, show all candidates who applied.
- [ ] Implement **Status Update UI:** Buttons to "Move to Interview" or "Reject" that hit the `PATCH /api/applications/:id/status` hook.
- [ ] Display the **Application History:** Show the `statusEvents` audit trail for a candidate.

### Day 6: Advanced UX: Skeletons & Boundaries 🎨
**Goal:** Make the app feel premium.

- [ ] Add **React Skeletons** for the Job List and Applicant Table.
- [ ] Implement a **Global Error Boundary** to catch UI crashes.
- [ ] Add **Toasts** for successful status updates.

### Day 7: End-to-End Validation & Performance ⚡
**Goal:** Prove the system scales.

- [ ] Implement **Pagination** (Next/Prev) on the Job Board to handle large datasets.
- [ ] Verify that database indexes are being hit during searches.
- [ ] Update `DEV-NOTES.md` with the "UI Composition Root" strategy.

---

## 🎯 Architectural Patterns

**1. Smart/Dumb Component Pattern:**
Ensure your dashboard components are presentational (dumb) and your Page/Container components handle the data fetching (smart).

**2. Optimistic UI Updates (Senior Concept):**
Learn how to update the candidate's status in the UI *immediately* before the API call finishes, making the app feel lightning-fast.

---

## 💪 Success Criteria for Week 3

### Functional
- [ ] Recruiter can successfully change a candidate's status from the dashboard.
- [ ] Search bar correctly filters jobs server-side.

### Quality
- [ ] No "Flash of Empty Content" (using Skeletons).
- [ ] Error messages from Zod validation are displayed clearly in the forms.

---

## 🚀 Ready to Start?

**Your first task:** Update your API service on the frontend to talk to the new Express endpoints.

**Coach's expectation:** By the end of this week, you will have a **Product** you can actually demo. This is the moment your portfolio becomes "Senior."

**Let's build the Dashboard! 📊🔥**
