# 📇 Anki Cards: Week 2 - Infrastructure & API Patterns

### Card 1: Prisma Driver Adapters
**Front:** What is a Prisma "Driver Adapter" (e.g., `@prisma/adapter-pg`) and why is it used?
**Back:** It allows Prisma to use a specific, externally provided database driver (like `pg` for PostgreSQL or `better-sqlite3` for SQLite). It is required in Prisma 7 for explicit database connections and enables advanced features like connection pooling and environment-specific drivers.

---

### Card 2: Connection Pooling
**Front:** Why is a `pg.Pool` used in a production PostgreSQL setup?
**Back:** It maintains a cache of open database connections that can be reused for future requests. This is much faster than opening and closing a new connection for every query and prevents the database from being overwhelmed by too many simultaneous connection attempts.

---

### Card 3: The Composition Root (`app.ts`)
**Front:** In Dependency Injection, what is a "Composition Root"?
**Back:** It is the single place in the application (usually `app.ts`) where all dependencies (Repositories, Services, Controllers) are instantiated and wired together. This keeps the rest of the application code clean and independent of how its dependencies are created.

---

### Card 4: Global Error Middleware
**Front:** What is the primary benefit of mapping Domain Errors to HTTP Status Codes in a central middleware?
**Back:** It keeps controllers "thin" and removes repetitive `try/catch` and `res.status()` logic from the business layer. It ensures that the API returns consistent, predictable error responses across all endpoints.

---

### Card 5: Zod Validation & `z.infer`
**Front:** How does `z.infer` bridge the gap between runtime validation and compile-time type safety?
**Back:** `z.infer` automatically generates a TypeScript type from a Zod schema. This ensures that the TypeScript type used in your Services and Controllers is always perfectly synchronized with the actual validation rules enforced at runtime.

---

### Card 6: RESTful Success Codes
**Front:** When should an API return a `201 Created` status vs. a `200 OK`?
**Back:** `201 Created` should be used for successful `POST` requests that result in the creation of a new resource (e.g., creating a Job or an Application). `200 OK` is used for successful `GET`, `PUT`, or `DELETE` requests where a resource was retrieved, updated, or deleted.

---

### Card 7: Zod `parseAsync` vs `parse`
**Front:** Why might you use `parseAsync` in a validation middleware?
**Back:** `parseAsync` allows the Zod schema to include asynchronous validation rules, such as checking a database to see if a username is already taken. Even if the schema is currently synchronous, using `parseAsync` in middleware makes the system "future-proof."
