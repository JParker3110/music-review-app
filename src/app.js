// src/app.js
import express from 'express';
import reviewsRouter from './routes/reviews.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/reviews', reviewsRouter); // Use the router

export default app;
