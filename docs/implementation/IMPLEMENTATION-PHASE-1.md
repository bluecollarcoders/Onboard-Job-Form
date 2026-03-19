# 🏗️ Week 1: Database Schema & Repository Foundation

## 🎯 Mission: Establish Core Backend Architecture

**Duration:** 7 Days (March 7-13, 2026)
**Focus:** Database design and clean data access patterns
**Success Metric:** Working repository layer with proper business domain

---

## 📋 Week 1 Checklist

### Days 1-2: Database Schema Design ✅
**Goal:** Finalize the core domain models

- [✅] Update Prisma schema with job application models
- [ ] Create database migration
- [ ] Generate Prisma client
- [ ] Create seed script with sample data
- [ ] Test relationships and constraints

### Days 3-4: Repository Pattern Implementation
**Goal:** Build clean data access layer

- [ ] Create base repository interface
- [ ] Implement UserRepository
- [ ] Implement JobRepository
- [ ] Implement ApplicationRepository
- [ ] Test all CRUD operations

### Days 5-6: Service Layer Foundation
**Goal:** Add business logic layer

- [ ] Create service interfaces
- [ ] Implement JobService
- [ ] Implement ApplicationService
- [ ] Add validation and business rules
- [ ] Test service methods

### Day 7: Integration & Testing
**Goal:** Prove everything works together

- [ ] Integration tests for repositories
- [ ] Integration tests for services
- [ ] Update existing API endpoints
- [ ] Document what you learned

---

## 🎯 Core Database Models

Based on your ADR-001, implement these four models:

```prisma
model User {
  id           String        @id @default(cuid())
  email        String        @unique
  name         String?
  role         UserRole      @default(APPLICANT)

  applications Application[]
  jobs         Job[]         // Jobs posted by recruiters
  statusEvents ApplicationStatusEvent[]

  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Job {
  id           String        @id @default(cuid())
  title        String
  company      String
  description  String
  location     String?
  salary       String?
  isActive     Boolean       @default(true)
  postedById   String

  postedBy     User          @relation(fields: [postedById], references: [id])
  applications Application[]

  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Application {
  id           String                    @id @default(cuid())
  userId       String
  jobId        String
  status       ApplicationStatus         @default(SUBMITTED)
  coverLetter  String?
  resumeUrl    String?

  user         User                      @relation(fields: [userId], references: [id])
  job          Job                       @relation(fields: [jobId], references: [id])
  statusHistory ApplicationStatusEvent[]

  createdAt    DateTime                  @default(now())
  updatedAt    DateTime                  @updatedAt

  @@unique([userId, jobId]) // Can't apply twice to same job
}

model ApplicationStatusEvent {
  id            String            @id @default(cuid())
  applicationId String
  fromStatus    ApplicationStatus?
  toStatus      ApplicationStatus
  notes         String?
  changedById   String?

  application   Application       @relation(fields: [applicationId], references: [id])
  changedBy     User?             @relation(fields: [changedById], references: [id])

  createdAt     DateTime          @default(now())
}
```

## 🏗️ Repository Pattern (Keep It Simple)

**Base Repository Interface:**
```typescript
interface BaseRepository<T> {
  findById(id: string): Promise<T | null>
  findMany(filters?: any): Promise<T[]>
  create(data: any): Promise<T>
  update(id: string, data: any): Promise<T>
}
```

**No Magic, No Complexity - Just Clean Data Access**

## 🎯 This Week's Learning Goals

### Technical Skills
- **Prisma ORM:** Schema design, relationships, migrations
- **TypeScript:** Interfaces, generics, type safety
- **Repository Pattern:** Data access abstraction
- **Business Logic:** Service layer separation

### Architecture Thinking
- **Domain Modeling:** How business concepts map to data
- **Separation of Concerns:** Repository vs Service responsibilities
- **Interface Design:** Clean contracts between layers
- **Error Handling:** Proper exception handling patterns

---

## 💪 Success Criteria for Week 1

### Functionality
- [ ] All four models implemented with proper relationships
- [ ] Repository methods work for all CRUD operations
- [ ] Service layer handles business logic correctly
- [ ] Audit trail works (ApplicationStatusEvent creation)

### Code Quality
- [ ] Clean, readable TypeScript with proper types
- [ ] Clear separation between repository and service layers
- [ ] Consistent error handling patterns
- [ ] Professional code organization and structure

### Understanding
- [ ] Can explain the repository pattern and its benefits
- [ ] Understands the difference between data access and business logic
- [ ] Can walk through the application workflow step-by-step
- [ ] Knows how to add new features using the established patterns

---

## 🚀 Ready to Start?

**Your first task:** Update your `schema.prisma` file with the models above.

**Coach's expectation:** By the end of this week, you should have a solid foundation that makes adding API endpoints in Week 2 straightforward and clean.

**Remember:** Focus on getting the fundamentals right. Clean, simple code that works is better than clever, complex code that's hard to understand.

**Let's build! 🔥**
