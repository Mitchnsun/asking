import type { NextApiRequest, NextApiResponse } from 'next'
import { ref, get } from 'firebase/database'
import { adminDB } from '@/lib/firebase-admin'
import { db } from '@/lib/firebase'
import { KnowYourFriend } from '@/utils/mongo.utils'
import { ErrorType } from '@/types/Error'

const patchHandler = async (req: NextApiRequest, res: NextApiResponse<{ status: string } | ErrorType>): Promise<void> => {
  const { id } = req.query
  const { action } = req.body

  if (!action) {
    return res.status(500).json({ code: 'server/missing-parameters' })
  }

  const roomRef = ref(db, `rooms/${id}`)
  const snapshot = await get(roomRef)

  if (!snapshot.exists()) {
    return res.status(404).json({ code: 'server/room-not-found' })
  }

  const play = snapshot.val()
  let question: any = {}

  if (play.game === 'knowyourfriends') {
    const result = await KnowYourFriend.random(1)
    question = (result || [])[0]
    question.player = Object.keys(play.players).sort(() => 0.5 - Math.random())[0]
  }

  if (action === 'start') {
    adminDB
      .ref('rooms')
      .child(id as string)
      .update({ status: 'playing' })
    adminDB
      .ref(`rooms/${id}`)
      .child('question')
      .set({ ...question, status: 'answering', alias: play.players[question.player].alias, id: question._id?.toString() })
    return res.status(200).json({ status: 'playing' })
  }

  return res.status(501).json({ code: 'server/action-not-implemented' })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>): Promise<void> => {
  switch (req.method) {
    case 'PATCH':
      return patchHandler(req, res)
    default:
      return res.status(501).json({ code: 'server/not-implemented' })
  }
}

export default handler
