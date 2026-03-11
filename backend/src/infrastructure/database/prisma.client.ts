import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Setup the adater.
const adapter = new PrismaBetterSqlite3( { 
    url: process.env.DATABASE_URL || "file:./prisma/dev.db"
});

// Create the single instance.
export const prisma = new PrismaClient({adapter});
