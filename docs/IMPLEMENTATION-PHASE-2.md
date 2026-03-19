# 🏗️ Week 2: REST API & PostgreSQL Migration

## 🎯 Mission: Elevate Infrastructure & Expose Business Logic

**Duration:** 7 Days (March 16-22, 2026)
**Focus:** PostgreSQL migration and RESTful API architecture
**Success Metric:** Working API endpoints with proper error handling and a cloud-ready database

---

## 📋 Week 2 Checklist

### Days 1-2: PostgreSQL Migration 🐘
**Goal:** Transition from SQLite to a production-grade database

- [ ] Install PostgreSQL driver and adapter (`pg` and `@prisma/adapter-pg`)
- [ ] Set up a local or cloud PostgreSQL instance (e.g., Docker or Railway)
- [ ] Update `schema.prisma` datasource provider to `postgresql`
- [ ] Run fresh migrations and seed the new database
- [ ] Update `DATABASE_URL` in `.env`

### Days 3-5: Controller & Router Layer
**Goal:** Expose the Service Layer via HTTP

- [ ] Implement `JobController` (Get all, Get by ID, Post)
- [ ] Implement `ApplicationController` (Apply for job, Get details)
- [ ] Set up Express `App` with proper routing structure
- [ ] Implement `JobRouter` and `ApplicationRouter`
- [ ] Test endpoints using Postman or Thunder Client

### Day 6: Global Error Middleware 🛡️
**Goal:** Map custom domain errors to HTTP status codes

- [ ] Create `errorHandler` middleware
- [ ] Map `AlreadyAppliedError` -> 409 Conflict
- [ ] Map `JobClosedError` -> 410 Gone / 400 Bad Request
- [ ] Map `JobNotFound` -> 404 Not Found
- [ ] Map generic errors -> 500 Internal Server Error

### Day 7: Validation & Cleanup
**Goal:** Ensure data integrity at the entry point

- [ ] Integrate **Zod** for request body validation
- [ ] Refactor controllers to use Zod schemas
- [ ] Finalize documentation for Week 2

---

## 🎯 Architectural Patterns

**1. Controller Pattern:**
Controllers should be "thin." Their only jobs are:
- Extract data from the request (`req.body`, `req.params`)
- Call the Service Layer
- Return the response (`res.status(200).json(data)`)

**2. Global Error Handler:**
This allows your services and controllers to throw errors without worrying about `res.status()`. The middleware handles the "translation" to HTTP.

---

## 🏗️ Technical Stack (Updated)

- **Database:** PostgreSQL (Production standard)
- **API:** Express (Modern version)
- **Validation:** Zod (Type-safe schemas)
- **ORM:** Prisma 7 (With PostgreSQL adapter)

---

## 💪 Success Criteria for Week 2

### Infrastructure
- [ ] Successfully migrated all data and schemas to PostgreSQL
- [ ] No brittle `file:./` paths in connection strings

### API Excellence
- [ ] Professional RESTful URL structures (e.g., `/api/jobs/:id`)
- [ ] Clean separation between Routing, Controllers, and Services
- [ ] No `try/catch` blocks inside controllers (all handled by global middleware)

### Type Safety
- [ ] End-to-end type safety from the DB to the API response
- [ ] Runtime validation of all incoming request bodies

---

## 🚀 Ready to Start?

**Your first task:** Install the PostgreSQL dependencies and update your `schema.prisma`.

**Coach's expectation:** By the end of this week, you should have a "Full-Stack Ready" backend that can be consumed by any frontend (React, Next.js, or mobile).

**Let's build! 🐘🔥**

  Context & Project Overview                                                                                                                                

  We successfully refactored a TypeScript/Node.js backend from a traditional layered architecture to a Domain-Driven Design (DDD) structure. The application
   is a job application platform with three core business domains: User, Job, and Application.

  Technology Stack:
  - Backend: Node.js + Express + TypeScript
  - Database: PostgreSQL with Prisma ORM
  - Validation: Zod schemas for type-safe input validation
  - Architecture: Clean Architecture + DDD principles

  What We Accomplished

  1. Domain Reorganization

  Before: Traditional layered structure
  src/
  ├── domain/
  │   ├── repositories/          # All repository interfaces
  │   └── error/                 # Shared errors
  ├── services/                  # Business logic services
  └── infrastructure/            # Database implementations

  After: Domain-driven structure
  src/
  ├── domain/
  │   ├── repositories/
  │   │   └── base.repository.ts          # Shared base repository
  │   ├── job/
  │   │   ├── job.repository.ts           # Job repository interface
  │   │   └── job.schema.ts               # Job validation schemas
  │   ├── application/
  │   │   ├── application.repository.ts   # Application repository interface
  │   │   └── application.schema.ts       # Application validation schemas
  │   ├── user/
  │   │   └── user.repository.ts          # User repository interface
  │   └── error/
  │       ├── base.error.ts               # Base error classes
  │       └── application.errors.ts       # Domain-specific errors
  ├── services/                           # Business logic orchestration
  │   ├── job.service.ts
  │   └── application.service.ts
  └── infrastructure/                     # Implementation details
      ├── database/
      │   ├── prisma.client.ts            # Database singleton
      │   └── repositories/               # Prisma implementations
      │       ├── prisma-job.repo.ts
      │       ├── prisma-user.repo.ts
      │       └── prisma-application.repo.ts
      └── http/
          ├── controllers/
          │   └── job.controller.ts
          └── middleware/
              └── error.middleware.ts

  2. Zod Schema Integration

  Purpose: Contract-first development with runtime validation + TypeScript types

  Example Implementation:
  // application.schema.ts
  export const CreateApplicationSchema = z.object({
      userId: z.cuid(),
      jobId: z.cuid(),
      coverLetter: z.string().min(1).optional()
  });

  export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>;

  Benefits Achieved:
  - Single source of truth for validation rules AND TypeScript types
  - Runtime input validation at API boundaries
  - Automatic type generation with z.infer<>
  - Contract-first development approach

  3. Path Alias Configuration

  TypeScript Path Mappings:
  {
    "@domain/*": ["src/domain/*"],
    "@infrastructure/*": ["src/infrastructure/*"],
    "@services/*": ["src/services/*"],
    "@errors/*": ["src/domain/error/*"]
  }

  Import Examples:
  // Clean domain imports
  import { JobRepository } from '@domain/job/job.repository.js';
  import { CreateApplicationDTO } from '@domain/application/application.schema.js';
  import { JobNotFound } from '@errors/application.errors.js';

  Domain-Driven Architecture Diagram

  ┌─────────────────────────────────────────────────────────────────────────┐
  │                          🏗️  CLEAN ARCHITECTURE                          │
  │                     Domain-Driven Design Structure                      │
  └─────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────┐
  │                      📡 INFRASTRUCTURE LAYER                            │
  ├─────────────────────────────────────────────────────────────────────────┤
  │  HTTP Controllers          │  Database Implementations                  │
  │  ┌─────────────────────┐   │  ┌─────────────────────────────────────┐   │
  │  │  JobController      │   │  │  PrismaJobRepository           │   │
  │  │  - getAllJobs()     │   │  │  - extends AbstractBaseRepo    │   │
  │  │  - getJobById()     │   │  │  - implements JobRepository    │   │
  │  │  └─────────────────┘   │  │                                │   │
  │  │                        │  │  PrismaApplicationRepository    │   │
  │  │  ErrorMiddleware       │  │  - findByUserAndJob()          │   │
  │  │  - HTTP status mapping │  │  - getWithHistory()            │   │
  │  └────────────────────────│  └─────────────────────────────────────┘   │
  │                           │                                            │
  │  Prisma Client Singleton  │  PostgreSQL Database                       │
  │  ┌─────────────────────┐   │  ┌─────────────────────────────────────┐   │
  │  │  - Connection pool  │   │  │  Tables: User, Job, Application,    │   │
  │  │  - Single instance  │   │  │          ApplicationStatusEvent     │   │
  │  └─────────────────────┘   │  └─────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                       🎯 APPLICATION/SERVICE LAYER                      │
  ├─────────────────────────────────────────────────────────────────────────┤
  │  Business Logic Orchestration                                          │
  │  ┌─────────────────────────┐      ┌─────────────────────────────────┐   │
  │  │     JobService          │      │     ApplicationService          │   │
  │  │  ┌─────────────────┐    │      │  ┌─────────────────────────────┐│   │
  │  │  │ getAllOpenRoles │    │      │  │ Business Rules:            ││   │
  │  │  │ getJobDetails   │    │      │  │ - Duplicate Prevention     ││   │
  │  │  │ postNewJob      │    │      │  │ - Job Validity Check       ││   │
  │  │  └─────────────────┘    │      │  │ - Status Workflow          ││   │
  │  │                         │      │  └─────────────────────────────┘│   │
  │  │  Dependencies:          │      │                                 │   │
  │  │  - JobRepository        │      │  Dependencies:                  │   │
  │  └─────────────────────────┘      │  - ApplicationRepository        │   │
  │                                   │  - JobRepository                │   │
  │                                   └─────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                        🏛️  DOMAIN LAYER                                  │
  ├─────────────────────────────────────────────────────────────────────────┤
  │  Pure Business Logic & Contracts                                       │
  │                                                                         │
  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐      │
  │  │   JOB DOMAIN    │  │APPLICATION DOMAIN│  │    USER DOMAIN      │      │
  │  ├─────────────────┤  ├─────────────────┤  ├─────────────────────┤      │
  │  │📋 job.schema.ts │  │📋 application.   │  │📋 user.repository.ts│      │
  │  │ - CreateJobDTO  │  │   schema.ts      │  │ - UserRepository    │      │
  │  │ - Zod validation│  │ - CreateApp...   │  │ - Business methods  │      │
  │  │                 │  │ - Zod validation │  │   (findByEmail)     │      │
  │  │🏛️  job.repository│  │                 │  └─────────────────────┘      │
  │  │   .ts           │  │🏛️  application.   │                              │
  │  │ - JobRepository │  │   repository.ts  │                              │
  │  │ - Business      │  │ - Application... │                              │
  │  │   methods       │  │ - Custom methods │                              │
  │  │   (findActive)  │  │   (findByUser..) │                              │
  │  └─────────────────┘  └─────────────────┘                              │
  │                                                                         │
  │  ┌─────────────────────────────────────────────────────────────────┐   │
  │  │                    SHARED DOMAIN INFRASTRUCTURE                  │   │
  │  ├─────────────────────────────────────────────────────────────────┤   │
  │  │  📁 repositories/base.repository.ts                             │   │
  │  │  - AbstractBaseRepository<T, CreateInput, UpdateInput...>       │   │
  │  │  - BaseDelegate interface                                       │   │
  │  │  - Common CRUD operations (findById, create, update, delete)    │   │
  │  │                                                                 │   │
  │  │  📁 error/                                                      │   │
  │  │  - base.error.ts: AppError abstract class                      │   │
  │  │  - application.errors.ts: JobNotFound, AlreadyApplied...       │   │
  │  └─────────────────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────────────┘

  Key Architectural Decisions & Benefits

  1. Domain Co-location

  - Decision: Group repository interfaces and schemas by business domain
  - Benefit: Easy to find all "job-related" or "application-related" code
  - Example: When modifying job validation, both schema and repository interface are in domain/job/

  2. Shared Infrastructure Pattern

  - Decision: Keep base.repository.ts and error/ folder shared
  - Rationale: These are used across multiple domains
  - Benefit: DRY principle while maintaining domain boundaries

  3. Service Layer Orchestration

  - Decision: Services stay in separate services/ folder, not in domains
  - Rationale: Services often coordinate between multiple domains
  - Example: ApplicationService uses both ApplicationRepository AND JobRepository

  4. Zod Schema-First Development

  - Decision: Define validation schemas in domain folders, generate types with z.infer<>
  - Benefits:
    - Runtime validation at API boundaries
    - TypeScript type safety
    - Single source of truth for data contracts
    - API documentation through schemas

  Business Logic Implementation

  Example: Application Submission Workflow

  async applyForJob(data: CreateApplicationDTO): Promise<Application> {
      // Business Rule 1: Duplicate Prevention
      const existingApp = await this.appRepo.findByUserAndJob(data.userId, data.jobId);
      if (existingApp) throw new AlreadyAppliedError();

      // Business Rule 2: Job Validity
      const job = await this.jobRepo.findById(data.jobId);
      if (!job) throw new JobNotFound();
      if (!job.isActive) throw new JobClosedError();

      // Atomic operation with audit trail
      return this.appRepo.create({
          user: { connect: { id: data.userId } },
          job: { connect: { id: data.jobId } },
          coverLetter: data.coverLetter,
          status: "SUBMITTED",
          statusHistory: {
              create: { toStatus: "SUBMITTED" }
          }
      });
  }

  Questions for Further Development

  1. API Layer: Should we create route handlers that use Zod schemas for request validation?
  2. Testing Strategy: How should we structure unit tests for each domain?
  3. Authentication: Where should JWT middleware and user context fit in this architecture?
  4. Event Sourcing: Should status changes trigger domain events?
  5. Microservices: Could each domain become a separate service in the future?

  Current Status: Architecture refactoring complete ✅
  Next Steps: Build REST API controllers with Zod validation middleware
  Goal: Enterprise-ready job application platform with clean, maintainable architecture

  ---
  This refactoring demonstrates professional software architecture principles and prepares the codebase for scalable growth while maintaining clean
  separation of concerns.
