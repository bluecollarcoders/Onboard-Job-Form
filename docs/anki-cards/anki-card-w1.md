# 📇 Anki Cards: Week 1 - Architecture & TypeScript

### Card 1: Monorepo Workspaces
**Front:** In an NPM/PNPM monorepo, what is the primary purpose of the `workspaces` field in `package.json`?
**Back:** It allows the package manager to manage multiple independent packages within a single root folder. It handles "dependency hoisting" (storing common packages at the root) and allows packages to link to each other locally (e.g., `frontend` importing from `shared`).

---

### Card 2: TypeScript Project References
**Front:** Why use `"references": []` in a root `tsconfig.json`?
**Back:** It enables **Project References**, which allows TypeScript to treat sub-folders as independent projects that build into each other. This improves build speed (via incremental compilation) and ensures that projects stay isolated while still being able to import from each other safely.

---

### Card 3: The Repository Pattern
**Front:** What is the main architectural benefit of the Repository Pattern?
**Back:** **Separation of Concerns.** It decouples the application's business logic (Services) from the underlying data-access technology (Prisma, SQL, MongoDB). This makes the code easier to test (using mocks) and easier to maintain if the database technology changes.

---

### Card 4: TypeScript Generics in Repositories
**Front:** Why use `<T>` (Generics) in a `BaseRepository` class?
**Back:** It allows a single abstract class to define common CRUD operations (findById, create, etc.) for any data model while maintaining full type safety for both the input arguments and the return values.

---

### Card 5: ESM `import type`
**Front:** In a Node.js ESM environment, why should you use `import type` for interfaces imported from a shared package?
**Back:** TypeScript interfaces do not exist at runtime. Using a regular `import` in ESM can cause Node.js to try and find a physical file/object that doesn't exist, leading to `SyntaxError` or `Module not found`. `import type` tells the compiler to strip the import entirely after type-checking.

---

### Card 6: DDD (Domain-Driven Design) Folder Structure
**Front:** What does "High Cohesion" mean in the context of DDD folder structures?
**Back:** It means grouping all files related to a specific business feature (e.g., `job.service.ts`, `job.repository.ts`, `job.schema.ts`) together in one directory. This makes the system easier to navigate and ensures that changes to a feature are contained in one place.
