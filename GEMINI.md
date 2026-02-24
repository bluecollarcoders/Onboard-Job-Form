These are instuctions to turn this into a full-stack app. You can refine the process if you need to. You're a senior lead architect who is mentoring a mid-level transitioning to senior software engineer who has enterprise experience with WordPress who is getting ready for a frontend Interview but wants to stretch a bit and add a backend to the project to have deeper understanding. Don't implement the code for them, but please do help them get unblocked, explain coding concepts, and best archtectual patterns. This developer seeks to be a in demand and highly sought after Software Engineer commanding a 200k to 254k salary in the very near future. He needs the skills to be deep in Typescript, React, Node.js, Express, Next.js, and Nest.js. This project is in vite so it's a good starting point. Look at the code first to see what has already been built. Seek the best way to make this a full-stack application. Also, lets spend one week with Express to understand how HTTP requests, responses, and middleware work at a basic level. Let's include this in the app we're building.


⏺ 🚀 GEMINI.md - Your Path to Senior Full-Stack Engineer Excellence                                                                                         
                                                                                                                                                            
  A comprehensive roadmap designed by a Senior Lead Architect to transform you from mid-level to senior engineer commanding $190k-$258k in 6 months         
                                                                                                                                                            
  🎯 Mission Statement                                                                                                                                      
                                                                                                                                                            
  Transform from mid-level developer to senior full-stack/DevOps/platform engineer with deep expertise in TypeScript, React, Express, Node.js, Next.js, and
  Nest.js. Target compensation: $190k-$258k by August 24th, 2026.

  ---
  📋 Current Project Assessment

  ✅ Strong Foundation Established:
  - React 19.2.0 frontend with TypeScript
  - Express backend with Prisma ORM
  - SQLite database with proper migrations
  - Monorepo structure with shared types
  - Type-safe API integration
  - Production-ready error handling

  🎯 Next Evolution Target:
  Professional portfolio platform with advanced features demonstrating senior-level architecture decisions.

  ---
  🏗️  Architecture Philosophy - Senior Level Thinking

  Phase 0: Senior Mindset Shift (Weeks 1-2)

  Key Principles You Must Internalize:

  1. System Design First, Code Second
    - Always design the system architecture before writing code
    - Consider scalability, maintainability, and performance from day 1
    - Think in terms of microservices, data flow, and failure modes
  2. Ownership Beyond Code
    - Own the entire product lifecycle: requirements → design → implementation → deployment → monitoring
    - Anticipate edge cases and failure scenarios
    - Design for observability and debugging
  3. Technical Leadership
    - Make architectural decisions with clear reasoning
    - Document decisions and trade-offs
    - Mentor others through code reviews and design discussions

  🧠 Anki Cards - Phase 0:
  - What are the 12-factor app principles?
  - How do you design for horizontal scaling?
  - What's the difference between tactical and strategic technical debt?

  ---
  🎯 Phase 1: Advanced Full-Stack Architecture (Weeks 3-6)

  Current Project Extensions - Senior Level Implementation

  1. Resume & Portfolio Platform Enhancement

  Your Mission: Transform your contact form into a comprehensive professional platform.

  Senior-Level Challenges:
  - Design a multi-tenant architecture (even if single-tenant now)
  - Implement proper domain-driven design patterns
  - Create a robust file upload system with security considerations

  Key Learning Objectives:
  - Advanced TypeScript patterns (discriminated unions, conditional types)
  - Event-driven architecture patterns
  - Security best practices (OWASP Top 10)

  Architecture Decisions You Must Make:
  1. Data Model Design:
  // Challenge: Design this with future scalability in mind
  model User {
    id        String   @id @default(cuid())
    // What fields support multi-tenancy later?
  }

  model Contact {
    // How do you handle different contact types?
    // How do you design for audit trails?
  }

  model Resume {
    // How do you handle file versioning?
    // What metadata is crucial for search/filtering?
  }
  2. API Design:
    - RESTful vs GraphQL - justify your choice
    - Pagination strategies for large datasets
    - Rate limiting and caching strategies
  3. File Upload Architecture:
    - Local vs cloud storage decision matrix
    - Security scanning pipeline
    - CDN integration strategy

  🧠 Anki Cards - Phase 1:
  - When would you choose REST over GraphQL?
  - What are the 5 levels of caching in web applications?
  - How do you prevent file upload vulnerabilities?

  ---
  🚀 Phase 2: Advanced Backend Engineering (Weeks 7-10)

  Nest.js Migration & Enterprise Patterns

  Your Mission: Migrate your Express backend to Nest.js while implementing enterprise-grade patterns.

  Why Nest.js for Senior Engineers:
  - Dependency injection and IoC containers
  - Decorator-based architecture
  - Built-in testing infrastructure
  - Microservices support
  - Enterprise-grade project structure

  Senior-Level Implementation Challenges:

  1. Clean Architecture Implementation:
  // Design challenge: Implement hexagonal architecture
  src/
  ├── domain/           # Business logic (pure TypeScript)
  ├── application/      # Use cases and application services
  ├── infrastructure/   # External concerns (DB, email, etc.)
  └── presentation/     # Controllers and DTOs
  2. Advanced Design Patterns:
    - Repository pattern with proper abstractions
    - CQRS (Command Query Responsibility Segregation)
    - Event sourcing for audit trails
    - Factory pattern for complex object creation
  3. Enterprise-Grade Features:
    - JWT authentication with refresh tokens
    - Role-based access control (RBAC)
    - API versioning strategy
    - Comprehensive logging and monitoring

  🧠 Anki Cards - Phase 2:
  - What's the difference between Repository and Data Mapper patterns?
  - When should you implement CQRS?
  - How do you design JWT refresh token rotation?

  ---
  ⚡ Phase 3: Advanced Frontend Engineering (Weeks 11-14)

  Next.js Migration & Performance Optimization

  Your Mission: Migrate to Next.js App Router with advanced performance optimization.

  Senior-Level Frontend Challenges:

  1. Advanced Next.js Patterns:
  // Server Components vs Client Components decision making
  // Streaming and Suspense implementation
  // Advanced caching strategies
  2. State Management Architecture:
    - Zustand vs Redux Toolkit decision matrix
    - Server state vs client state separation
    - Optimistic updates implementation
  3. Performance Engineering:
    - Core Web Vitals optimization
    - Bundle analysis and code splitting strategies
    - Image optimization and lazy loading
    - Service worker implementation

  🧠 Anki Cards - Phase 3:
  - What's the difference between SSR, SSG, and ISR?
  - How do you optimize Largest Contentful Paint (LCP)?
  - When should you use Server Components vs Client Components?

  ---
  🔧 Phase 4: DevOps & Platform Engineering (Weeks 15-18)

  CI/CD Pipeline & Infrastructure as Code

  Your Mission: Build production-grade deployment infrastructure.

  Senior-Level DevOps Implementation:

  1. CI/CD Pipeline Architecture:
  # GitHub Actions workflow design
  # Multi-environment deployment strategy
  # Automated testing and quality gates
  2. Infrastructure as Code:
    - Terraform or AWS CDK implementation
    - Container orchestration (Docker + Kubernetes)
    - Database migration strategies
    - Monitoring and alerting setup
  3. Platform Engineering Mindset:
    - Developer experience optimization
    - Self-service deployment capabilities
    - Observability stack implementation

  🧠 Anki Cards - Phase 4:
  - What's the difference between blue-green and canary deployments?
  - How do you implement database migrations in production?
  - What are the four golden signals of monitoring?

  ---
  📈 Phase 5: System Design & Architecture (Weeks 19-22)

  Microservices & Distributed Systems

  Your Mission: Design and implement a microservices architecture.

  Senior-Level System Design:

  1. Service Decomposition:
    - Domain boundaries identification
    - Data consistency patterns
    - Inter-service communication strategies
  2. Distributed System Challenges:
    - Event-driven architecture implementation
    - Saga pattern for distributed transactions
    - Circuit breaker and retry patterns

  🧠 Anki Cards - Phase 5:
  - How do you maintain data consistency in microservices?
  - What's the difference between choreography and orchestration?
  - When should you use event sourcing?

  ---
  🎯 Phase 6: Leadership & Advanced Concepts (Weeks 23-26)

  Technical Leadership & Advanced Patterns

  Your Mission: Demonstrate technical leadership through code reviews, mentoring, and architectural decisions.

  Senior-Level Leadership Skills:
  - Code review excellence
  - Technical documentation
  - Architecture decision records (ADRs)
  - Performance monitoring and optimization
  - Security vulnerability assessment

  ---
  📚 Continuous Learning Stack

  Daily Habits:
  - 30 minutes of Anki card reviews
  - 1 hour of implementation
  - 30 minutes of reading system design content

  Weekly Goals:
  - Complete one major feature
  - Write one technical blog post
  - Contribute to open source

  Resources to Master:
  - "System Design Interview" by Alex Xu
  - "Designing Data-Intensive Applications" by Martin Kleppmann
  - AWS/GCP architecture certifications

  ---
  🎯 Success Metrics

  Technical Metrics:
  - Code quality (test coverage, type safety)
  - Performance metrics (Core Web Vitals)
  - System reliability (uptime, error rates)

  Career Metrics:
  - GitHub contributions and portfolio quality
  - Technical blog posts and community engagement
  - Interview preparation and practice

