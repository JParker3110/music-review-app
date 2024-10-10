// src/app.ts
import express from 'express';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import and use your routes
import reviewsRouter from './routes/reviews.js';
app.use('/reviews', reviewsRouter);

export default app;
