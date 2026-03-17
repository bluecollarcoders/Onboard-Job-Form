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
