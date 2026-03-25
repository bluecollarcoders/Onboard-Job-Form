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

### Day 6: Enhanced Candidate Profile & Basic Features 📱🎨
**Goal:** Add professional candidate profiles and basic portfolio functionality.

- [ ] **Schema Update:** Add core profile fields to User and Job models
  - User: `avatarUrl`, `companyName`, `companyLogo`, `phoneNumber`, `portfolioUrl`
  - Job: `companyLogo` for branding consistency
- [ ] **Image Upload Service:** Implement file upload with Cloudinary (production-grade image handling)
- [ ] **Enhanced Candidate Profile:** Build comprehensive candidate detail panel
  - Contact information (phone, portfolio URL)
  - Basic portfolio file display (using existing `resumeUrl`)
  - Professional avatar upload and display
- [ ] **Basic Notes System:** Add internal recruiter notes functionality
  - Simple text area for recruiter comments
  - Display notes in candidate detail panel
  - Store in new `ApplicationNote` model
- [ ] **Avatar Components:** Replace ShadCN Avatar fallbacks with real profile pictures
- [ ] **Mobile Optimization:** Ensure the Job Board and Dashboard are responsive using Tailwind
- [ ] **Navigation Refactor:** Add a Navbar with links to "Browse Jobs," "My Applications," and "Profile"

### Day 7: Integration Testing & Profile Validation
**Goal:** Verify the enhanced candidate experience and recruiter tools.

- [ ] **Full Candidate Journey:** Sign up -> Complete Profile -> Upload Avatar -> Apply for Job
- [ ] **Recruiter Workflow:** View enhanced candidate details -> Add notes -> Move through pipeline
- [ ] **Profile Integration Testing:** Verify all candidate information displays correctly in kanban cards and detail panels
- [ ] **Notes System Testing:** Ensure recruiter notes save and display properly
- [ ] **Mobile Profile Testing:** Verify enhanced profiles work seamlessly on mobile devices

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

---

## 🏗️ Schema Updates for Week 5

### Enhanced User Model
```prisma
model User {
  // Existing fields...

  // ADD THESE in Week 5:
  phoneNumber    String? // Contact information
  portfolioUrl   String? // External portfolio website
  avatarUrl      String? // Profile picture
  companyName    String? // For recruiters
  companyLogo    String? // Company branding

  // Relations
  applicationNotes ApplicationNote[] @relation("NoteAuthor")
}

model Job {
  // Existing fields...

  // ADD THIS:
  companyLogo String? // Company branding for job listings
}

model ApplicationNote {
  id            String      @id @default(cuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id])

  authorId      String
  author        User        @relation("NoteAuthor", fields: [authorId], references: [id])

  content       String      // "Strong technical background..."
  isInternal    Boolean     @default(true) // Internal recruiter notes

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

// Update Application model
model Application {
  // Existing fields...

  // ADD THIS:
  notes ApplicationNote[]
}
```

**Next Week Preview:** Advanced Features (Notifications, Portfolio Management & Real-time Updates).
