import type { NextApiRequest, NextApiResponse } from 'next'
import { Db, ObjectId } from 'mongodb'

import { withMongo } from '../../lib/mongodb'
import * as utils from '../../utils/string.utils'
const ANSWER_TOLERANCE = 0.7

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
  const { answer, id } = req.body
  const normalizeAnswer = utils.normalize(answer).toLowerCase()
  const result = await withMongo<{ answers: string[] }>(async (db: Db) => {
    const collection = db.collection('questions')
    return await collection.findOne({ _id: new ObjectId(id) }, { answers: 1 })
  })

  const verification = (result.answers || []).map((item) => ({
    answer: item,
    strict: normalizeAnswer === utils.normalize(item).toLowerCase(),
    contain: normalizeAnswer.includes(utils.normalize(item).toLowerCase()),
    similar: utils.similarity(answer, item),
  }))
  const selection = verification.reduce((prev, curr) => (prev.similar > curr.similar ? prev : curr))
  res.status(200).json({
    success: selection.strict || selection.contain || selection.similar >= ANSWER_TOLERANCE,
    selection,
    answers: result.answers,
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
