import type { NextApiRequest, NextApiResponse } from 'next'
import { ref, get } from 'firebase/database'
import { adminDB } from '@/lib/firebase-admin'
import { db } from '@/lib/firebase'
import { ErrorType } from '@/types/Error'

const patchHandler = async (req: NextApiRequest, res: NextApiResponse<ErrorType>): Promise<void> => {
  const { answer, questionId, playerId, roomId } = req.body

  if (!questionId || !roomId || !answer || !playerId) {
    return res.status(500).json({ code: 'server/missing-parameters' })
  }

  const playerRef = ref(db, `rooms/${roomId}/players/${playerId}`)
  const snapshot = await get(playerRef)

  if (!snapshot.exists()) {
    return res.status(404).json({ code: 'server/player-not-found' })
  }

  adminDB.ref(`rooms/${roomId}/players`).child(playerId).update({ answer: answer })

  return res.status(200).json({ code: 'success' })
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
