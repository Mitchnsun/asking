import type { NextApiRequest, NextApiResponse } from 'next'

import * as utils from '@/utils/string.utils'
import { Questions } from '@/utils/mongo.utils'
import { ErrorType } from '@/types/Error'

const ANSWER_TOLERANCE = 0.75

type Selection = {
  answer: string
  contain: boolean
  similar: number
  strict: boolean
}

type Answer = {
  answers: string[]
  selection: Selection
  video?: string
  wiki?: string
  next: string
  success: boolean
}

const post = async (req: NextApiRequest, res: NextApiResponse<Answer | ErrorType>): Promise<void> => {
  const { answer, id } = req.body

  if (!answer || !id) {
    return res.status(500).json({ code: 'server/missing-parameters' })
  }

  const normalizeAnswer = utils.normalize(answer).toLowerCase()

  // Get data from question
  const result = await Questions.getAnswers(id)

  // Verification good or bad answer
  const { answers, video, wiki } = result || {}
  const verification = (answers || []).map((item: string) => ({
    answer: item,
    strict: normalizeAnswer === utils.normalize(item).toLowerCase(),
    contain: normalizeAnswer.includes(utils.normalize(item).toLowerCase()),
    similar: utils.similarity(answer, item),
  }))
  const selection = verification.reduce((prev: Selection, curr: Selection) => (prev.similar > curr.similar ? prev : curr))

  // Fetch next question
  const next = await Questions.random(2)
  const { _id } = (next?.filter((q) => q._id.toString() !== id) || [])[0]

  return res.status(200).json({
    success: selection.strict || selection.contain || selection.similar > ANSWER_TOLERANCE,
    selection,
    answers,
    video,
    wiki,
    next: _id.toString(),
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Answer | ErrorType>): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return post(req, res)
    default:
      return res.status(501).json({ code: 'server/not-implemented' })
  }
}

export default handler
