# 🔐 Week 4: Authentication & Secure Identity

## 🎯 Mission: Secure the Platform and Establish User Ownership

**Duration:** 7 Days (March 30 - April 5, 2026)
**Focus:** Implementing JWT-based authentication and transitioning from hardcoded IDs to session-based identity.
**Success Metric:** A secure login/signup flow where users can only access and modify their own data.

---

## 📋 Week 4 Checklist

### Days 1-2: Backend Auth Infrastructure 🛡️
**Goal:** Add security layers to the Express API.

- [ ] **Database:** Add `password` (hashed) field to the `User` model in `schema.prisma`.
- [ ] **Service:** Create an `AuthService` for password hashing (using `bcrypt`) and JWT generation.
- [ ] **Middleware:** Build a `protect` middleware that verifies the JWT and attaches the user to `req.user`.
- [ ] **Routes:** Implement `POST /api/auth/register` and `POST /api/auth/login`.

### Days 3-4: Secure Repository Access
**Goal:** Enforce ownership at the database level.

- [ ] Update `JobService` and `ApplicationService` to use the `userId` from the authenticated token instead of the request body.
- [ ] Implement "Role-Based Access Control" (RBAC):
  - Ensure only users with role `RECRUITER` can create jobs.
  - Ensure only the applicant can see their own application details.

### Day 5: Frontend Auth Pages 🎨
**Goal:** Build the entry point for users.

- [ ] Build the **Login Page** and **Sign Up Page** in React.
- [ ] Implement an `AuthContext` to manage the user's logged-in state globally.
- [ ] Secure the **Recruiter Dashboard** route so it redirects to `/login` if no token is present.

### Day 6: Secure Data Fetching
**Goal:** Connect the UI to the secure API.

- [ ] Update the frontend API layer to automatically include the `Authorization: Bearer <token>` header in all requests.
- [ ] Handle "401 Unauthorized" errors by logging the user out and clearing the token.

### Day 7: Validation & Security Audit
**Goal:** Finalize and polish.

- [ ] Add Zod validation for Login/Register payloads.
- [ ] Audit the API to ensure no "Broken Object Level Authorization" (BOLA) exists.

---

## 🎯 Architectural Patterns

**1. JWT (JSON Web Token) Strategy:**
Understand how to securely store tokens and verify them using middleware.

**2. RBAC (Role-Based Access Control):**
Establish a clear hierarchy between `CANDIDATE`, `RECRUITER`, and `ADMIN` to protect business workflows.

---

## 💪 Success Criteria

- [ ] A user cannot post a job without being logged in as a Recruiter.
- [ ] A user cannot view someone else's application history.
- [ ] Passwords are never stored in plain text (verified in Postgres).

**Next Week Preview:** The Candidate Experience (My Applications & Job Details).
