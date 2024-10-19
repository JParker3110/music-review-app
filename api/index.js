import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: '.env.local' });

const server = express();


server.use(cors({
    origin: ['http://localhost:3000', 'https://music-review-app.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));


server.use(app);

const port = process.env.PORT || 4001;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
