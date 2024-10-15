// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();


// const reviewRouter = require('./routes/reviews');
// app.use('/reviews', reviewRouter);

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Correctly read environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/homepage', (req, res) => {
  res.json({ message: 'Welcome to the Homepage!' });
});

app.get('/music', (req, res) => {
  res.json({ message: 'Welcome to the Music page!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
