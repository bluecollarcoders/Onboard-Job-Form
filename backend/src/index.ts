import "dotenv/config";
import express from 'express';
import cors from "cors";
import { prisma } from "@infrastructure/database/prisma.client.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Job Application Platform API is running',
        timestamp: new Date().toISOString()
    });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        // Simple database test - count users
        const userCount = await prisma.user.count();
        res.json({
            database: 'connected',
            userCount,
            message: 'PostgreSQL connection successful'
        });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Job Application Platform API running on http://127.0.0.1:${PORT}`);
    console.log(`📊 Health check: http://127.0.0.1:${PORT}/api/health`);
    console.log(`🔍 Database test: http://127.0.0.1:${PORT}/api/test-db`);
});
