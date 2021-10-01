import type { NextApiRequest, NextApiResponse } from 'next'
import * as utils from '../../utils/string.utils'
const ANSWER_TOLERANCE = 0.7
const temp = ['Charles de Gaulle', 'Général de Gaulle', 'De Gaulle']

type Answer = {
  answers: string[]
  selection: {
    answer: string
    contain: boolean
    similar: number
    strict: boolean
  }
  success: boolean
}

const post = async (req: NextApiRequest, res: NextApiResponse<Answer>): Promise<void> => {
  const { answer } = req.body
  const normalizeAnswer = utils.normalize(answer).toLowerCase()

  const verification = temp.map((item) => ({
    answer: item,
    strict: normalizeAnswer === utils.normalize(item).toLowerCase(),
    contain: normalizeAnswer.includes(utils.normalize(item).toLowerCase()),
    similar: utils.similarity(answer, item),
  }))
  const selection = verification.reduce((prev, curr) => (prev.similar > curr.similar ? prev : curr))
  res.status(200).json({
    success: selection.strict || selection.contain || selection.similar >= ANSWER_TOLERANCE,
    selection,
    answers: temp,
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Answer | { code: string }>): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return post(req, res)
    default:
      return res.status(501).json({ code: 'server/not-implemented' })
  }
}

export default handler
