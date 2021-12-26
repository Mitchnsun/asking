import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDB } from '@/lib/firebase-admin'
import { ErrorType } from '@/types/Error'

const postHandler = async (req: NextApiRequest, res: NextApiResponse<{ playerId: string | null } | ErrorType>): Promise<void> => {
  const { alias, roomId } = req.body

  if (!alias || !roomId) {
    return res.status(500).json({ code: 'server/missing-parameters' })
  }

  const roomRef = adminDB.ref('rooms').child(roomId)
  const playerRef = roomRef.child('players').push({ alias })

  return res.status(200).json({ playerId: playerRef.key })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return postHandler(req, res)
    default:
      return res.status(501).json({ code: 'server/not-implemented' })
  }
}

export default handler
