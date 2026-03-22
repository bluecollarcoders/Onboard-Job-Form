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

**Frontend Lead AI Coach Notes**

  ✅ What You Already Have (Week 2 Complete)

  API Endpoints:
  // These work perfectly for the dashboard
  GET  /api/jobs              // Jobs table view
  GET  /api/jobs/:id          // Job details
  POST /api/applications      // Application submission

  Data Models:
  // Your Prisma schema is perfect
  enum ApplicationStatus {
    SUBMITTED, RECEIVED, SCREENING,
    INTERVIEWING, OFFER_EXTENDED, HIRED, REJECTED
  }

  model ApplicationStatusEvent {
    // Perfect for audit trail
    fromStatus, toStatus, changedAt, changedById
  }

  Domain Architecture:
  // Your DDD structure is ideal
  ApplicationService.applyForJob()     // ✅ Business logic
  Custom error classes (JobNotFound)   // ✅ Error handling
  Zod validation                       // ✅ Type safety

  🔧 What You Need to ADD (Not Refactor)

  You only need to extend your existing backend with these endpoints:
```
  // backend/src/infrastructure/http/routes/application.routes.ts
  // Add these routes to your existing router

  router.get('/applications/job/:jobId', applicationController.getByJob);
  router.patch('/applications/:id/status', applicationController.updateStatus);
  router.get('/applications/:id/history', applicationController.getHistory);

  New controller methods (extend existing controller):
  // backend/src/infrastructure/http/controllers/application.controller.ts

  export class ApplicationController {
    // Your existing methods stay untouched

    // Add these new methods:
    getApplicationsByJob = async (req: Request, res: Response, next: NextFunction) => {
      // Use existing ApplicationService
    };

    updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
      // Use existing ApplicationService + add status update logic
    };
  }
```

  📋 Exact Implementation Plan (Matches Your Week 3)

  Days 1-2: API Extensions (30 minutes work)

  Add these to your existing ApplicationService:
  // backend/src/services/application.service.ts
  export class ApplicationService {
    // Your existing methods stay unchanged

    // Add these:
    async getApplicationsByJob(jobId: string): Promise<Application[]> {
      return this.appRepo.findByJobId(jobId);
    }

    async updateApplicationStatus(
      applicationId: string,
      newStatus: ApplicationStatus
    ): Promise<Application> {
      // Business logic + create status history event
      const app = await this.appRepo.findById(applicationId);
      if (!app) throw new ApplicationNotFound();

      // Create history event
      await this.createStatusEvent(applicationId, app.status, newStatus);

      // Update status
      return this.appRepo.update(applicationId, { status: newStatus });
    }
  }

  Days 3-5: Frontend Dashboard (Your Learning Focus)

  This is where you'll learn deep React patterns:

  // frontend/src/hooks/useApplications.ts - Learn React Query
  export const useApplications = (jobId: string) => {
    return useQuery({
      queryKey: ['applications', jobId],
      queryFn: () => fetchApplications(jobId),
      refetchInterval: 30000, // Poll every 30 seconds
    });
  };

  // frontend/src/hooks/useDragAndDrop.ts - Learn complex state management
  export const useDragAndDrop = () => {
    // Complex state logic for drag operations
    // Perfect for learning useState, useCallback, useRef patterns
  };

  // frontend/src/components/KanbanBoard.tsx - Learn component composition
  export const KanbanBoard = ({ jobId }: { jobId: string }) => {
    // Smart component orchestrating dumb components
    // Perfect for learning props/callback patterns
  };

  🧠 Deep Learning Opportunities

  This dashboard will teach you:

  React Patterns:

  - Smart/Dumb components (data vs presentation)
  - Custom hooks (reusable stateful logic)
  - Context for theming (dark/light mode)
  - Error boundaries (graceful failure handling)
  - Optimistic updates (UX responsiveness)

  TypeScript Mastery:

  - Generic hooks (useMutation<T>)
  - Discriminated unions (ApplicationStatus)
  - Interface composition (extending base props)
  - Type guards (runtime type checking)

  Advanced UX Patterns:

  - Skeleton loading (perceived performance)
  - Toast notifications (user feedback)
  - Drag and drop (complex interactions)
  - Keyboard navigation (accessibility)

  💡 Intuitive UX = Impressive Interactions

  Your instinct is correct! Here's what makes it intuitive:

  Immediate Feedback Patterns:
  // When user drags a card:
  1. Card lifts with shadow (immediate visual feedback)
  2. Column highlights as valid drop zone (guidance)
  3. Card snaps to position (satisfying interaction)
  4. Status updates instantly (optimistic update)
  5. Toast confirms action (completion feedback)

  Progressive Disclosure:
  Jobs Table → Click → Pipeline View → Click Card → Detail Panel
  (Simple)      (Focused)    (Rich)       (Complete)
