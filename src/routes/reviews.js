// src/routes/reviews.js
import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

// Create a new review
router.post('/', async (req, res) => {
  const { title, content, rating } = req.body;

  const { data, error } = await supabase
    .from('reviews')
    .insert([{ title, content, rating }]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data);
});

export default router;
