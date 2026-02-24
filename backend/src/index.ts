import "dotenv/config";
import express from 'express';
import cors from "cors";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from '@prisma/client';
import type { ContactFormData } from '@my-app/shared';


const adapter = new PrismaBetterSqlite3({
    url: 'file:./prisma/dev.db'
});

const prisma = new PrismaClient({
    adapter
});


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async ( req, res) => {
    const data: ContactFormData = req.body;

    try {
        const contact = await prisma.contact.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            }
        });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
