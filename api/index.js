import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: '.env.local' });

const server = express();

// Use cors middleware with specific origin
server.use(cors({
    origin: ['http://localhost:3000', 'https://music-review-app.vercel.app'], // Add your Vercel URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods if needed
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Ensure the app is used after the middleware
server.use(app);

const port = process.env.PORT || 4001;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
