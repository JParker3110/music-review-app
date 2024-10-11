import express from 'express';
import reviewsRouter from '../routes/reviews.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the reviews router
app.use('/api', reviewsRouter);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import and use your routes
// import reviewsRouter from '../routes/reviews.js';
// app.use('/reviews', reviewsRouter);

export default app;
