// 🚨 Remember to keep your `*.test.js` files out of your `/pages` directory!
import { createMocks } from 'node-mocks-http'
import handleHello from '../../pages/api/hello'

describe('/api/hello', () => {
  test('returns a message that it works', async () => {
    const { req, res } = createMocks({ method: 'GET' })

    await handleHello(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'It works!' })
  })
})
