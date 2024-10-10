
import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();
const Review = require('../../models/Review.js');

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/reviews', async (req, res) => {
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
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
