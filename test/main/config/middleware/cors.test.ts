import request from 'supertest'
import app from '@/main/config/app'

describe('CORS middleware', () => {
  test('should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
