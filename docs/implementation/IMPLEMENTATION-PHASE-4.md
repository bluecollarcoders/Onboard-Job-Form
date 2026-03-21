# 🧠 Week 4: The Intelligent Data Layer (Vector Search)

## 🎯 Mission: Transition from CRUD to Orchestrating Intelligence

**Duration:** 7 Days (March 30 - April 5, 2026)
**Focus:** Semantic Search and High-Dimensional Data
**Success Metric:** A system that understands "meaning" through vector embeddings, not just keywords.

---

## 📋 Week 4 Checklist

### Days 1-2: Vector Infrastructure ⚡
**Goal:** Enable vector capabilities in your stack

- [ ] Update `docker-compose.yml` to use a `pgvector` enabled image (e.g., `ankane/pgvector:v0.5.0`)
- [ ] Enable the extension in PostgreSQL (`CREATE EXTENSION vector;`)
- [ ] Update `schema.prisma` to support the `vector` type using `Unsupported("vector(1536)")`
- [ ] Research and select an Embedding Model (OpenAI `text-embedding-3-small` or local HuggingFace)

### Days 3-4: Embedding Engine
**Goal:** Transform strings into mathematical "meaning"

- [ ] Create an `EmbeddingService` to handle API calls to OpenAI/Anthropic
- [ ] Implement a logic to generate embeddings for Job Descriptions automatically on creation
- [ ] Store these embeddings in the new `embedding` column in the `Job` table
- [ ] Create a "Backfill" script to generate embeddings for existing jobs in the database

### Day 5: Semantic Search Implementation
**Goal:** Build the "Match Score" logic

- [ ] Write a "Vector Search" repository method using Prisma's `$queryRaw` (since Prisma doesn't natively support vector math yet)
- [ ] Implement Cosine Similarity search to find jobs matching a user's natural language query
- [ ] Create a new API endpoint: `GET /api/jobs/search?q="meaningful query"`

### Day 6: Hybrid Search Logic 🏎️
**Goal:** Combine traditional SQL filters with Vector Search

- [ ] Refactor the search service to allow "Hybrid Queries" (e.g., "Remote jobs for TypeScript devs" -> Filter by `location='Remote'` + Vector match for the rest)
- [ ] Add metadata filtering to ensure the AI only searches relevant records

### Day 7: Validation & Demo
**Goal:** Prove the "Intelligence" works

- [ ] Test with "Hidden Matches" (queries that don't share keywords but share meaning)
- [ ] Document the "Search Architecture" in your blog notes
- [ ] Finalize documentation for Week 4

---

## 🎯 Architectural Patterns

**1. The Embedding Pipeline:**
Data doesn't just "go" into the DB anymore. It passes through a transformation layer: 
`Request -> Zod Validation -> Embedding Service -> Prisma -> PostgreSQL`.

**2. Raw SQL Bridge:**
Learn how to use Prisma `$queryRaw` to perform advanced vector math (like `<->` distance operator) that the ORM doesn't yet abstraction. This is a critical "Senior" skill.

---

## 🏗️ Technical Stack (Updated)

- **Vector Extension:** `pgvector` (PostgreSQL)
- **AI Models:** OpenAI API (for embeddings)
- **Search Engine:** Hybrid (Prisma SQL + Vector Distance)

---

## 💪 Success Criteria for Week 4

### Intelligence
- [ ] User can search for "Work from home" and find jobs with location "Remote" (Keyword vs Semantic)
- [ ] System can calculate a "Match Percentage" between a query and a job

### Performance
- [ ] Search results return in < 200ms (Understanding vector indexing)

### Portfolio Value
- [ ] Can explain how high-dimensional vectors represent human language in a database context.

---

## 🚀 Ready to Start?

**Your first task:** Update Docker to include `pgvector` and enable it in your DB.

**Coach's expectation:** By the end of this week, you will have moved from a standard developer to an **AI-Native Engineer.** You aren't just storing data; you're storing intent.

**Let's build the future! 🧠🔥**
