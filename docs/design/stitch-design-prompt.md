# Stitch Design Brief: Recruiter Dashboard UI/UX

## Project Overview
**Product:** Job Application Management Dashboard for Recruiters
**Tech Stack:** React + TypeScript + ShadCN + Tailwind CSS
**User:** HR professionals and recruiters managing job applications
**Goal:** Create an intuitive, data-heavy interface that feels fast and professional

## Core User Journey
1. **Dashboard Overview** - Quick stats and recent activity feed
2. **Job Management** - Table view of all job postings with application counts
3. **Application Pipeline** - Kanban board showing candidate progression through hiring stages
4. **Candidate Details** - Side panel with comprehensive applicant information
5. **Status Updates** - Quick actions to move candidates between stages

## Design Requirements

### Visual Style
**Aesthetic:** Clean, professional, data-focused (think Linear, Notion, or Vercel dashboard)
**Color Palette:**
- Primary: Professional blue (#3B82F6) for actions and highlights
- Success: Green (#10B981) for positive states (hired, active jobs)
- Warning: Orange (#F59E0B) for pending/review states
- Danger: Red (#EF4444) for rejections and errors
- Neutral: Gray scale (#F8FAFC to #1E293B) for backgrounds and text
- Background: Light mode primary, optional dark mode support

**Typography:** Clean, readable sans-serif (Inter or similar system font)
**Icons:** Lucide React icons (already in ShadCN ecosystem)

### Layout Patterns

#### 1. Dashboard Overview Layout
- **Header:** Logo, navigation, user profile dropdown
- **Stats Row:** 4 metric cards showing key numbers (active jobs, new applications, in pipeline, hired)
- **Two-Column:** Left = Recent activity feed, Right = Quick job list with application counts
- **Responsive:** Stack columns on mobile

#### 2. Jobs Table Layout
- **Full-width data table** with sorting, filtering, searching
- **Columns:** Job Title, Company, Location, Application Count, Status, Actions
- **Pagination:** Standard pagination controls
- **Actions:** "View Pipeline" button for each job

#### 3. Kanban Pipeline Layout
- **Horizontal scrolling** kanban board with 7 status columns:
  - SUBMITTED → RECEIVED → SCREENING → INTERVIEWING → OFFER_EXTENDED → HIRED → REJECTED
- **Candidate Cards:** Compact cards with avatar, name, time since last update, key skills
- **Drag & Drop:** Visual feedback for dragging between columns
- **Mobile:** Convert to vertical stacked list with dropdown status selectors

#### 4. Candidate Detail Panel
- **Slide-out panel** or modal overlay (ShadCN Sheet component)
- **Sections:** Contact info, cover letter excerpt, status history timeline, notes, resume/portfolio links
- **Actions:** Quick status change buttons, note-taking area

### Interaction Design

#### Drag & Drop Behavior
- **Hover States:** Cards lift with subtle shadow when draggable
- **Drop Zones:** Columns highlight when valid drop target
- **Snap Animation:** Smooth card positioning when dropped
- **Loading State:** Optimistic updates with spinner overlay on network calls

#### Micro-interactions
- **Hover Effects:** Subtle elevations and color changes
- **Loading States:** Skeleton loaders for data tables and cards
- **Success Feedback:** Toast notifications for status updates
- **Error Handling:** Clear error messages with recovery actions

#### Progressive Disclosure
- **Overview → Jobs Table → Pipeline → Detail Panel**
- **Mobile Navigation:** Bottom tab bar or hamburger menu
- **Breadcrumbs:** Clear navigation path

### Component Specifications

#### Metric Cards (Dashboard)
```
┌─────────────────┐
│ Active Jobs     │
│ 12             │  ← Large number, primary color
│ +2 this week   │  ← Small trend indicator
└─────────────────┘
```

#### Candidate Cards (Kanban)
```
┌─────────────────┐
│ 👤 John Doe     │  ← Avatar + name
│ 2 days ago      │  ← Time indicator
│ React, 3 years  │  ← Key skills/experience
│ [View Details]  │  ← Action button
└─────────────────┘
```

#### Status Timeline (Detail Panel)
```
🟢 SUBMITTED    → Dec 20, 2:30 PM
🟡 RECEIVED     → Dec 20, 2:31 PM
📋 Note added  → "Strong portfolio"
```

### Accessibility Requirements
- **Keyboard Navigation:** Full keyboard support for all interactions
- **Screen Reader:** Proper ARIA labels and semantic HTML
- **Color Contrast:** WCAG AA compliant color ratios
- **Focus Management:** Clear focus indicators and logical tab order

### Performance Considerations
- **Virtualization:** Handle 100+ candidate cards smoothly
- **Optimistic Updates:** Immediate UI feedback before server confirmation
- **Skeleton Loading:** No flash of empty content
- **Progressive Loading:** Load critical data first, details on demand

### Responsive Breakpoints
- **Desktop:** Full kanban board with drag & drop (1200px+)
- **Tablet:** Horizontal scroll kanban or stacked columns (768px-1199px)
- **Mobile:** Vertical list with dropdown status selectors (320px-767px)

## Technical Integration Notes

### ShadCN Components to Use
- **Table:** For jobs management view
- **Card:** For metric cards and candidate cards
- **Sheet:** For candidate detail panel
- **Button:** All actions and navigation
- **Badge:** For status indicators
- **Toast:** For success/error feedback
- **Skeleton:** For loading states
- **Dropdown Menu:** For actions and filters

### State Management Patterns
- **React Query:** Handle all server state (jobs, applications, status updates)
- **Local State:** Manage drag & drop operations and UI-only state
- **Optimistic Updates:** Update UI immediately, rollback on error

### Data Flow
- **Jobs List:** `GET /api/jobs` → Table component
- **Application Pipeline:** `GET /api/applications/job/:jobId` → Kanban board
- **Status Update:** `PATCH /api/applications/:id/status` → Optimistic UI update
- **Real-time Updates:** Polling every 30 seconds for new applications

## Success Metrics
**Usability:** Recruiters can change candidate status in <3 clicks
**Performance:** Table loads in <500ms, drag operations feel instant
**Visual Quality:** Professional appearance suitable for enterprise sales demos
**Responsiveness:** Fully functional on mobile devices

## Deliverables Expected
1. **High-fidelity mockups** for all 4 main views
2. **Component library** showing key UI elements
3. **Interaction specifications** for drag & drop and status changes
4. **Responsive layouts** for mobile adaptation
5. **Color palette and typography** guidelines
6. **Icon specifications** using Lucide React icon system

## References & Inspiration
- **Linear:** Clean kanban boards with smooth interactions
- **Notion:** Data-heavy interfaces with good information hierarchy
- **Vercel Dashboard:** Professional metric cards and status indicators
- **GitHub Projects:** Drag & drop functionality and card design
- **Slack:** Sidebar navigation and progressive disclosure patterns

This dashboard will be the centerpiece of a portfolio project demonstrating enterprise-grade React development skills. The design should feel sophisticated enough for a senior developer's portfolio while remaining intuitive for everyday recruiter use.