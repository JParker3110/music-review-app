const request = require('supertest');
const app = require('./api/app'); 
describe('API Tests', () => {
  it('GET /api/music - should return a list of songs', async () => {
    const response = await request(app).get('/api/music');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

 it('GET /api/reviews/reviews - should return all reviews', async () => {
    const response = await request(app).get('/api/reviews');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

 
});
