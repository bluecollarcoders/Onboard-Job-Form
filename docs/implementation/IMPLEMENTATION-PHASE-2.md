# 🏗️ Week 2: REST API & Relational Hooks

## 🎯 Mission: Finalize the Backend "Engine" for Complex UI

**Duration:** 7 Days (March 16-22, 2026)
**Focus:** Enhancing the API to support Search, Filtering, and Status Workflows.
**Success Metric:** A backend that can handle candidate status updates and server-side searching.

---

## 📋 Week 2 Checklist (Updated)

### Days 1-4: The Core REST API ✅
- [x] Migrate to PostgreSQL & Docker.
- [x] Implement DDD folder structure.
- [x] Set up Zod validation and shared schemas.
- [x] Build initial Job and Application controllers.
- [x] Verify all endpoints via Postman.

### Days 5-6: Advanced Relational Hooks 🔗
**Goal:** Unlock the Recruiter Dashboard features.

- [ ] **Status Update Logic:** Add `updateStatus` to `ApplicationService`. Ensure it creates an `ApplicationStatusEvent` for the audit trail.
- [ ] **Search Engine:** Update `JobService.getAllOpenRoles` to support server-side search (e.g., `?q=TypeScript`).
- [ ] **Relational Fetches:** Add `getApplicationsByJob` to the `JobController` so recruiters can see who applied.
- [ ] **Database Optimization:** Add indexes to `title`, `location`, and `jobId` in `schema.prisma`.

### Day 7: The UI Preparation
**Goal:** Prepare for the Frontend build.

- [ ] Standardize the "Search Result" response object.
- [ ] Update `DEV-NOTES.md` with these Relational Hook decisions.

---

## 🏗️ Technical Stack (Updated)

- **Backend:** Express + Prisma + PostgreSQL
- **Search:** Prisma Full-Text Search / `contains`
- **Audit Trail:** Atomic status events

---

## 💪 Success Criteria

- [ ] Admin can move a candidate to "INTERVIEWING" via a single API call.
- [ ] Searching for "Remote" returns only relevant jobs in < 50ms.
- [ ] `ApplicationStatusEvent` is populated automatically.

**Next Week Preview:** Full-Stack Integration (React Dashboard & Job Board).
