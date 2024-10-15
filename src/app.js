import express from 'express';
import reviewsRouter from './routes/reviews.js';
import supabase from './supabaseClient.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Music Review App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: #ff6600;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to the Music Review App!</h1>
        <p>Discover and share your thoughts on the latest music.</p>
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

app.use('/api/reviews', reviewsRouter); // Use the router

export default app;
