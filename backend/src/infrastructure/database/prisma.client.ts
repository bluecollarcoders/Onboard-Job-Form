import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from 'pg';

// Setup the connection pool for better performance
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

// Setup the adapter with pooling
const adapter = new PrismaPg(pool);

// Create the single instance.
export const prisma = new PrismaClient({adapter});
