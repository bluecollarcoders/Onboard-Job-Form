# 👤 Week 5: The Candidate Experience

## 🎯 Mission: Complete the Job Seeker's Journey

**Duration:** 7 Days (April 6 - April 12, 2026)
**Focus:** Building the UI for finding jobs, applying, and tracking application status.
**Success Metric:** A candidate can log in, view a job's details, apply with a cover letter, and see their application progress.

---

## 📋 Week 5 Checklist

### Days 1-2: Job Detail & Discovery 🔍
**Goal:** Help candidates find the right role.

- [ ] **Job Detail Page:** Build a dedicated page for a single job (`/jobs/:id`).
- [ ] **Rich Description:** Use Markdown or a clean text layout to display job responsibilities and requirements.
- [ ] **Dynamic "Apply" Button:** Show the apply button only if the user hasn't already applied.

### Days 3-4: The Application Flow 📝
**Goal:** Make applying seamless and type-safe.

- [ ] **Application Form:** Integrate the shared Zod schema into a React form (using `react-hook-form`).
- [ ] **Cover Letter Upload:** (Optional/Bonus) Basic text area for cover letters.
- [ ] **Instant Feedback:** Show success/error toasts using the codes from the backend (`ALREADY_APPLIED`).

### Day 5: Candidate Dashboard 📊
**Goal:** Provide a central hub for the applicant.

- [ ] **"My Applications" View:** A list showing every job the user has applied for.
- [ ] **Status Badges:** Display the current status (`SUBMITTED`, `INTERVIEWING`, etc.) with different colors.
- [ ] **Historical View:** Allow the candidate to click an application and see its basic timeline.

### Day 6: Responsive UI & Polish 📱
**Goal:** Ensure the app works on all devices.

- [ ] **Mobile Optimization:** Ensure the Job Board and Dashboard are responsive using Tailwind.
- [ ] **Navigation Refactor:** Add a Navbar with links to "Browse Jobs," "My Applications," and "Profile."

### Day 7: Integration Testing
**Goal:** Verify the full candidate-to-recruiter loop.

- [ ] Test the full flow: Sign up as Candidate -> Apply for Job -> Log in as Recruiter -> Move to Interview -> Log back in as Candidate -> See updated status.

---

## 🎯 Architectural Patterns

**1. Conditional Rendering:**
Learn how to use user roles and application state to toggle UI elements (e.g., hiding the "Apply" button after submission).

**2. Shared Logic (Hooks):**
Create custom hooks (like `useApplications`) to reuse data-fetching logic across different dashboard views.

---

## 💪 Success Criteria

- [ ] Candidates can track their own progress without reaching out to HR.
- [ ] No "Duplicate Application" attempts reach the server (blocked by frontend + backend).
- [ ] UI is 100% responsive.

**Next Week Preview:** The Innovation Layer (Vector Search & AI Assistant).
