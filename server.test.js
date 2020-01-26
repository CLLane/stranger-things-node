const request = require("https");
const app = require('./server');


describe('Get', () => {
  it('should return a 200 status', async () => {
    const res = await request(app).getHeader('/')
    expect(res.status).toBe(200)
  })
})