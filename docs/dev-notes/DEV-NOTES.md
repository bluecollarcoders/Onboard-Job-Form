## Week 2
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

---

## Phase 2.5: "Holy Grail" Shared Schema Implementation

### Problem Analysis
After completing the DDD refactor, identified a critical issue: validation logic would need to be written twice - once for backend API validation and once for frontend form validation. This creates:
- **Maintenance burden:** Changes require updates in multiple locations
- **Runtime errors:** Frontend/backend validation mismatches cause poor UX
- **Type drift:** Manual interface definitions become outdated

### The "Holy Grail" Solution
Implemented shared Zod schemas that generate both runtime validation AND TypeScript types, usable across frontend and backend.

#### Architecture Decision: Workspace Structure
```
my-form-app-test-1/
├── shared/                    # 🔑 Single source of truth
│   ├── src/
│   │   ├── job.schema.ts      # Business domain schemas
│   │   ├── application.schema.ts
│   │   ├── user.schema.ts
│   │   └── index.ts           # Barrel exports
│   ├── package.json           # Independent package with Zod
│   └── tsconfig.json
├── backend/                   # Consumes shared schemas
└── frontend/                  # Will consume same schemas
```

#### Technical Implementation Details

**1. Shared Schema Example (application.schema.ts):**
```typescript
import { z } from 'zod';

export const CreateApplicationSchema = z.object({
    userId: z.cuid(),                    // Validates CUID format
    jobId: z.cuid(),                     // Validates CUID format
    coverLetter: z.string().min(1).optional() // Optional with validation
});

// Type automatically inferred from schema
export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>;
```

**2. Backend Pass-Through Pattern:**
```typescript
// backend/src/domain/application/application.schema.ts
export { CreateApplicationSchema, CreateApplicationDTO } from '@my-app/shared';
```

This maintains clean import paths while schemas live in shared package.

**3. Path Alias Configuration:**
```json
// tsconfig.json
{
  "paths": {
    "@my-app/shared": ["../shared/index.ts"],
    "@domain/*": ["src/domain/*"],
    "@infrastructure/*": ["src/infrastructure/*"],
    "@services/*": ["src/services/*"],
    "@errors/*": ["src/domain/error/*"]
  }
}
```

#### Benefits Realized

**Runtime + Compile-time Safety:**
```typescript
// Backend: Runtime validation
const result = CreateApplicationSchema.safeParse(requestBody);
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() });
}

// Frontend: Form validation (future implementation)
const form = useForm({
  resolver: zodResolver(CreateApplicationSchema)  // Same schema!
});
```

**Single Source of Truth:**
- Change validation rule once → Updates everywhere
- Business rules centralized in schemas
- Automatic TypeScript type generation
- Consistent error messages across platforms

### Migration Process & Lessons Learned

#### Step-by-Step Implementation
1. **Created shared package structure** with domain organization
2. **Added Zod dependency** to shared workspace
3. **Moved existing schemas** from backend to shared
4. **Created pass-through exports** in backend domains
5. **Updated TypeScript configurations** to recognize new structure
6. **Verified import resolution** across all layers

#### Technical Challenges Resolved

**Challenge 1: Module Resolution**
- **Problem:** `Cannot find module '@my-app/shared/src/index.js'`
- **Root Cause:** TypeScript looking for compiled .js files
- **Solution:** Updated shared/tsconfig.json to include `"src/**/*"` pattern

**Challenge 2: Database Adapter Mismatch**
- **Problem:** Entry point still used SQLite adapter instead of PostgreSQL
- **Root Cause:** Legacy code in index.ts not updated during migration
- **Solution:** Replaced with singleton Prisma client import

**Challenge 3: Zod API Deprecations**
- **Problem:** `z.string().email()` deprecated in Zod v4+
- **Solution:** Updated to regex-based email validation for future compatibility

### Architectural Impact Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    BEFORE: Validation Duplication               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend                    Backend                            │
│  ┌─────────────────┐        ┌─────────────────────────────────┐ │
│  │ Manual Forms    │        │ Manual Interfaces               │ │
│  │ - Required rules│ ≠≠≠≠≠≠ │ - Different validation         │ │
│  │ - Length limits │        │ - Inconsistent error messages  │ │
│  │ - Format rules  │        │ - Separate type definitions    │ │
│  └─────────────────┘        └─────────────────────────────────┘ │
│                                                                 │
│  ❌ Problems:                                                   │
│  • Validation logic written twice                              │
│  • Runtime errors from mismatches                              │
│  • Manual type definitions drift over time                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                AFTER: "Holy Grail" Shared Validation           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         ┌─────────────────────────────────────────┐             │
│         │           @my-app/shared                │             │
│         │  ┌─────────────────────────────────────┐│             │
│         │  │     Zod Schemas                    ││             │
│         │  │  • Runtime validation              ││             │
│         │  │  • TypeScript type generation      ││             │
│         │  │  • Error message definitions       ││             │
│         │  └─────────────────────────────────────┘│             │
│         └─────────────────┬───────────────────────┘             │
│                          │                                     │
│            ┌─────────────┴─────────────┐                       │
│            ▼                           ▼                       │
│  ┌─────────────────┐        ┌─────────────────────────────────┐ │
│  │    Frontend     │        │           Backend               │ │
│  │ ┌─────────────┐ │        │ ┌─────────────────────────────┐ │ │
│  │ │ Same Schema │ │ ====== │ │       Same Schema           │ │ │
│  │ │ Same Types  │ │        │ │       Same Types            │ │ │
│  │ │ Same Rules  │ │        │ │       Same Validation       │ │ │
│  │ └─────────────┘ │        │ └─────────────────────────────┘ │ │
│  └─────────────────┘        └─────────────────────────────────┘ │
│                                                                 │
│  ✅ Benefits:                                                   │
│  • Single source of truth for validation                       │
│  • Identical types across frontend/backend                     │
│  • Consistent user experience                                  │
│  • Reduced maintenance overhead                                │
└─────────────────────────────────────────────────────────────────┘
```

### Production Readiness Assessment

**What This Enables:**
- **Team Scalability:** New developers can't create validation inconsistencies
- **Feature Velocity:** No need to duplicate validation logic for new features
- **User Experience:** Consistent, immediate feedback across all interfaces
- **Maintenance:** Single location for business rule changes

**Enterprise Patterns Implemented:**
- Domain-Driven Design with clean boundaries
- Repository pattern with dependency injection
- Error handling with custom exception hierarchy
- Database connection pooling and singleton pattern
- Path alias configuration for clean imports

### Next Phase Preparation

The shared schema foundation enables:
1. **REST API Endpoints** with automatic request validation
2. **Frontend Integration** using identical validation schemas
3. **OpenAPI Documentation** generated from Zod schemas
4. **Testing Strategy** with shared test fixtures

**Current Status:** ✅ Architecture foundation complete, ready for API development

---

This implementation demonstrates enterprise-level architectural thinking: solving not just immediate problems, but preventing entire classes of future issues through thoughtful design decisions.
