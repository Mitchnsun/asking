// 🚨 Remember to keep your `*.test.ts` files out of your `/pages` directory!
import { createMocks as _createMocks } from 'node-mocks-http'
import type { RequestOptions, ResponseOptions } from 'node-mocks-http'
import handleAnswer from '../../pages/api/answer'

const mockGetA = jest.fn()
const mockRandQ = jest.fn()

const createMocks = _createMocks as (
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Fixing this: https://github.com/howardabrams/node-mocks-http/issues/245
) => Mocks<NextApiRequest, NextApiResponse>

jest.mock('@/utils/mongo.utils', () => ({
  Questions: {
    getAnswers: (id: string) => mockGetA(id),
    random: (size: number) => mockRandQ(size),
  },
}))

describe('/api/answer', () => {
  beforeEach(() => {
    mockGetA.mockClear()
    mockRandQ.mockClear()
  })

  describe('POST: submit an answer', () => {
    test('return 200 for success answer', async () => {
      mockGetA.mockResolvedValue({
        answers: ['Au revoir'],
        video: 'https://www.youtube.com/watch?v=yHsOeutCWU0',
        wiki: 'https://fr.wikipedia.org/wiki/Au_revoir_(citation)',
      })
      mockRandQ.mockResolvedValue([{ _id: '1234' }, { _id: '5678' }])

      const { req, res } = createMocks({ method: 'POST', body: { id: '1234', answer: 'aurevoir' }, env: 'test' })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        selection: {
          answer: 'Au revoir',
          strict: false,
          contain: false,
          similar: 0.8888888888888888,
        },
        answers: ['Au revoir'],
        video: 'https://www.youtube.com/watch?v=yHsOeutCWU0',
        wiki: 'https://fr.wikipedia.org/wiki/Au_revoir_(citation)',
        next: '5678',
      })
    })

    test('return 200 for wrong answer', async () => {
      mockGetA.mockResolvedValue({
        answers: ['Au revoir'],
        video: 'https://www.youtube.com/watch?v=yHsOeutCWU0',
        wiki: 'https://fr.wikipedia.org/wiki/Au_revoir_(citation)',
      })
      mockRandQ.mockResolvedValue([{ _id: '1234' }, { _id: '5678' }])

      const { req, res } = createMocks({ method: 'POST', body: { id: '1234', answer: 'bonjour' } })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        selection: {
          answer: 'Au revoir',
          strict: false,
          contain: false,
          similar: 0.2222222222222222,
        },
        answers: ['Au revoir'],
        video: 'https://www.youtube.com/watch?v=yHsOeutCWU0',
        wiki: 'https://fr.wikipedia.org/wiki/Au_revoir_(citation)',
        next: '5678',
      })
    })

    test('return 500 for missing parameter (answer)', async () => {
      const { req, res } = createMocks({ method: 'POST', body: { id: '1234' } })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(500)
      expect(JSON.parse(res._getData())).toEqual({ code: 'server/missing-parameters' })
    })

    test('return 500 for missing parameter (id)', async () => {
      const { req, res } = createMocks({ method: 'POST', body: { answer: 'toto' } })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(500)
      expect(JSON.parse(res._getData())).toEqual({ code: 'server/missing-parameters' })
    })
  })

  describe('Not implemented methods', () => {
    test('return 501 http status for GET', async () => {
      const { req, res } = createMocks({ method: 'GET' })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(501)
      expect(JSON.parse(res._getData())).toEqual({ code: 'server/not-implemented' })
    })

    test('return 501 http status for PUT', async () => {
      const { req, res } = createMocks({ method: 'PUT' })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(501)
      expect(JSON.parse(res._getData())).toEqual({ code: 'server/not-implemented' })
    })

    test('return 501 http status for DELETE', async () => {
      const { req, res } = createMocks({ method: 'DELETE' })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(501)
      expect(JSON.parse(res._getData())).toEqual({ code: 'server/not-implemented' })
    })

    test('return 501 http status for PATCH', async () => {
      const { req, res } = createMocks({ method: 'PATCH' })
      await handleAnswer(req, res)

      expect(res._getStatusCode()).toBe(501)
      expect(JSON.parse(res._getData())).toEqual({ code: 'server/not-implemented' })
    })
  })
})
