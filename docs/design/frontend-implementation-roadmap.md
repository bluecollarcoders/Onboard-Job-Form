# 🚀 Frontend Implementation Roadmap
## Job Application Platform - Week 3 Dashboard Development

**Status**: Infrastructure Complete → Shell Development Phase
**Approach**: Mobile-First, ShadCN Components, Clinical Modern Aesthetic
**Target**: Responsive dashboard with kanban board and candidate management

---

## ✅ Completed Infrastructure (Week 3, Day 1-2)

### **Type Safety & API Layer**
- ✅ `lib/api.ts` - HTTP client with Zod error parsing
- ✅ `lib/errors.ts` - Structured error handling classes
- ✅ `services/job.service.ts` - Domain-specific API calls
- ✅ `hooks/api/useJobs.ts` - TanStack Query integration
- ✅ `shared/src/job.schema.ts` - Full-stack type safety with JobSchema
- ✅ TanStack Query v5 syntax (fixed invalidateQueries)

### **Dependencies Installed**
- ✅ `react-router-dom` - Routing with modal support
- ✅ `@tanstack/react-query` - Data fetching & caching
- ✅ `react-hot-toast` - Global error/success notifications
- ✅ `lucide-react` - Icon library
- ✅ `clsx` - Conditional class utilities

---

## 🎯 Current Phase: Dashboard Shell (Week 3, Day 2-3)

### **Strategic Decisions**
- **Mobile-First**: `useBreakpoint` hook at 768px transition
- **ShadCN Components**: Convert Stitch designs to reusable components
- **Data Strategy**: Seed backend with ~15 jobs for stress testing
- **Navigation**: Auto-collapse sidebar + bottom nav switching

### **Architecture Patterns**
- **URL-Driven State**: `?candidateId=123` for deep linking
- **Domain Contexts**: Separate contexts for jobs/candidates
- **Parallel Routing**: Modal routes for candidate details
- **Column Pagination**: TanStack Query for kanban performance

---

## 📋 Implementation Checklist

### **Phase 1: App Shell Foundation** 🔄
- [ ] **App.tsx Setup**
  - [ ] QueryClient provider with error handling
  - [ ] BrowserRouter with route structure
  - [ ] Toast container configuration
  - [ ] Redirect `/` → `/dashboard/overview`

- [ ] **useBreakpoint Hook**
  - [ ] 768px mobile breakpoint detection
  - [ ] Auto-collapse logic (768px-1024px)
  - [ ] Debounced resize handling
  - [ ] TypeScript interface for breakpoint state

- [ ] **DashboardLayout Shell**
  - [ ] Conditional sidebar/bottom nav rendering
  - [ ] `<Outlet />` for nested routes
  - [ ] Modal outlet system for candidate details
  - [ ] Responsive content area margins

### **Phase 2: Navigation Components** ⏳
- [ ] **Sidebar Component (Desktop)**
  - [ ] Path prefix active state matching
  - [ ] Auto-collapse animation (300ms)
  - [ ] Navigation items with Lucide icons
  - [ ] Mini-sidebar state (icon-only)

- [ ] **BottomNav Component (Mobile)**
  - [ ] Backdrop blur effect (`backdrop-blur-lg`)
  - [ ] Badge support for notification counts
  - [ ] Touch-friendly targets (44px minimum)
  - [ ] Safe area padding for notched devices

- [ ] **Header Component**
  - [ ] Responsive title/breadcrumb
  - [ ] User profile placeholder
  - [ ] Mobile hamburger toggle (if needed)

### **Phase 3: Route Structure** ⏳
- [ ] **Route Definitions**
  - [ ] `/dashboard/overview` - Dashboard home with stats
  - [ ] `/dashboard/jobs` - Job listings table
  - [ ] `/dashboard/jobs/:id` - Job detail view
  - [ ] `/dashboard/candidates` - Kanban board
  - [ ] `/dashboard/candidates?candidateId=:id` - Modal details

- [ ] **Protected Route Wrapper**
  - [ ] Authentication guard (future-ready)
  - [ ] Loading states during auth check
  - [ ] Redirect logic for unauthorized access

### **Phase 4: Dashboard Pages** ⏳
- [ ] **Overview Page**
  - [ ] Stats cards (total jobs, active applications)
  - [ ] Recent activity feed
  - [ ] Quick action buttons
  - [ ] Responsive grid layout

- [ ] **Jobs Page**
  - [ ] Jobs table with sorting/filtering
  - [ ] Search functionality (`useJobs` with filters)
  - [ ] Pagination or infinite scroll
  - [ ] Mobile-optimized card layout

### **Phase 5: Kanban Board** ⏳
- [ ] **Candidate Context Setup**
  - [ ] Domain-specific state management
  - [ ] Optimistic drag-and-drop updates
  - [ ] URL sync for selected candidate

- [ ] **Kanban Components**
  - [ ] Column-based layout (desktop)
  - [ ] Stacked sections (mobile)
  - [ ] Drag-and-drop with react-beautiful-dnd
  - [ ] Column-level pagination

- [ ] **Candidate Detail Modal**
  - [ ] Parallel routing implementation
  - [ ] Slide-over desktop, full-screen mobile
  - [ ] Journey timeline component
  - [ ] Internal notes section

---

## 🎨 ShadCN Component Strategy

### **Components to Build**
1. **Button** - Primary/secondary variants
2. **Card** - Stats cards, candidate cards
3. **Table** - Jobs listing with sorting
4. **Modal/Sheet** - Candidate details overlay
5. **Badge** - Status indicators, notification counts
6. **Tabs** - Kanban column organization (mobile)

### **Stitch Design → ShadCN Conversion**
- **Colors**: Extract CSS variables for clinical modern palette
- **Typography**: Configure Tailwind typography scale
- **Spacing**: Consistent padding/margin system
- **Shadows**: Subtle elevation for cards/modals

---

## 📊 Data Requirements

### **Backend Seeding (Immediate Need)**
```sql
-- Current: 3 jobs
-- Target: ~15 jobs for stress testing
-- Include: Various locations, companies, status states
-- Test cases: Long titles, descriptions, salary ranges
```

### **Mock Candidate Data**
```typescript
// For kanban development
interface MockCandidate {
  id: string
  name: string
  stage: 'submitted' | 'screening' | 'interviewing' | 'offer'
  jobId: string
  appliedAt: string
  experience: string
}
```

---

## 🔧 Technical Debt & Future Considerations

### **Performance Optimization**
- [ ] React.memo for expensive components
- [ ] useMemo for computed values
- [ ] Virtual scrolling for large datasets
- [ ] Image optimization for candidate photos

### **Accessibility (ShadCN Benefits)**
- [ ] ARIA labels and roles
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus management in modals

### **Testing Strategy**
- [ ] Unit tests for hooks and services
- [ ] Integration tests for user flows
- [ ] Visual regression tests for components
- [ ] E2E tests for critical paths

---

## 🎯 Success Metrics

### **Week 3 Goals**
- ✅ **Infrastructure**: Type-safe API layer with error handling
- 🎯 **Shell**: Responsive navigation with mobile-first design
- 🎯 **Data Flow**: Jobs listing with real backend integration
- 🎯 **Foundation**: Ready for kanban board implementation

### **Quality Standards**
- **TypeScript**: Strict mode, no `any` types
- **Performance**: <3s initial load, <1s navigation
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile**: Touch-friendly, thumb-accessible navigation

---

## 📱 Breakpoint Strategy

```typescript
// useBreakpoint implementation
const breakpoints = {
  mobile: 0,      // 0-767px
  tablet: 768,    // 768-1023px
  desktop: 1024,  // 1024px+
  narrow: 1024,   // 768-1023px (auto-collapse)
}
```

### **Layout Behavior**
- **< 768px**: Bottom nav, stacked kanban, full-screen modals
- **768-1023px**: Auto-collapsed sidebar, optimized kanban
- **≥ 1024px**: Full sidebar, horizontal kanban, slide-over modals

---

**Next Immediate Action**: Transform App.tsx with QueryClient and Router setup