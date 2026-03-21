# 📓 Dev Notes: Week 1 - Foundation & Architecture

## 🏛️ Decision: Monorepo Refactor
**Why:** To ensure a "Single Source of Truth" between the frontend and backend. 
**Impact:** Moved from a flat Vite project to a monorepo with `frontend`, `backend`, and `shared` workspaces. This allows us to share TypeScript interfaces and Zod schemas across the network boundary, eliminating "Type Drift."

## 🧩 Decision: Domain-Driven Design (DDD)
**Why:** As the project grows, a flat "controllers" or "services" folder becomes a bottleneck. 
**Impact:** Refactored the folder structure to group logic by domain (e.g., `src/domain/job`, `src/domain/application`). This increases **high cohesion**—everything related to a specific business feature lives together.

## 🏗️ Decision: Repository Pattern with Generics
**Why:** To decouple the business logic (Services) from the data access technology (Prisma). 
**Impact:** Implemented `AbstractBaseRepository<T>` using TypeScript Generics. This reduced boilerplate code by 60% and enforced a consistent CRUD contract across all entities (Users, Jobs, Applications).

## 🛡️ Decision: Semantic Custom Errors
**Why:** Generic `Error` strings are brittle and hard for the transport layer (HTTP) to interpret.
**Impact:** Created a base `AppError` class. Implemented specific domain errors like `AlreadyAppliedError` and `JobClosedError`. This allows the backend to communicate specific business failures to the frontend using unique error codes.

## ⚙️ Technical Hurdles: Prisma 7 & TS Project References
**The Challenge:** Setting up Prisma 7 in a monorepo caused a "vicious loop" of validation errors regarding the `DATABASE_URL`.
**The Fix:** 
1.  Used **Project References** in `tsconfig.json` to bridge the `shared` and `backend` packages.
2.  Switched to the **Adapter Pattern** (`@prisma/adapter-better-sqlite3`) to make database connections explicit and stable.
