const request = require('supertest');
const express = require('express');
const app = express();


describe('Get', () => {
  it('should return a 200 status', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
  })
})