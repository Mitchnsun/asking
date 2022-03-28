// 🚨 Remember to keep your `*.test.js` files out of your `/pages` directory!
import { createMocks as _createMocks } from 'node-mocks-http'
import type { RequestOptions, ResponseOptions } from 'node-mocks-http'
import handleHello from '../../pages/api/hello'

const createMocks = _createMocks as (
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Fixing this: https://github.com/howardabrams/node-mocks-http/issues/245
) => Mocks<NextApiRequest, NextApiResponse>

describe('/api/hello', () => {
  test('returns a message that it works', async () => {
    const { req, res } = createMocks({ method: 'GET' })

    await handleHello(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'It works!' })
  })
})
