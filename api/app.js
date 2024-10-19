import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import reviewsRouter from '../routes/reviews.js';

dotenv.config();

const app = express();

app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Homepage route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Music Review App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: black;
            text-align: center;
            padding: 50px;
            background-image: url('https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-creative-headset-song-king-competition-poster-background-material-image_153272.jpg');
            background-size: cover;
            background-position: center;
          }
          h1 {
            color: black;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to the Music Review App!</h1>
        <p>Discover and share your thoughts on the latest music.</p>
        <a href="music-review-frontend-app.vercel.app">Go to Music Page</a> <!-- Update this link -->
      </body>
    </html>
  `);
});
app.get('/test-supabase', async (req, res) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.get('/api/music', async (_req, res) => {
  const { data, error } = await supabase
    .from('music')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.use('/api/reviews', reviewsRouter);

export default app;
