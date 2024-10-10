import request from 'supertest';
import app from '../src/app';
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const reviewRouter = require('../src/routes/reviews.js');

const app = express();
app.use(express.json());
app.use('/reviews', reviewRouter);

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/music_review_test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /reviews', () => {
    it('should return all reviews', async () => {
        const res = await request(app).get('/reviews');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('POST /reviews', () => {
    it('should create a new review', async () => {
        const res = await request(app)
            .post('/reviews')
            .send({
                title: 'Test Review',
                content: 'This is a test review.',
                rating: 5
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('title', 'Test Review');
    });

    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/reviews')
            .send({
                content: 'This is a test review.',
                rating: 5
            });
        expect(res.statusCode).toBe(400);
    });
});
