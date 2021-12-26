import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDB } from '@/lib/firebase-admin'
import { ErrorType } from '@/types/Error'

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ roomId: string | null; userId: string | null } | ErrorType>
): Promise<void> => {
  const { game, alias } = req.body

  if (!game || !alias) {
    return res.status(500).json({ code: 'server/missing-parameters' })
  }

  const roomRef = adminDB.ref('rooms').push({ game })
  const playerRef = roomRef.child('players').push({ alias })
  roomRef.child('admin').set(playerRef.key)
  roomRef.child('status').set('waiting')

  return res.status(200).json({
    roomId: roomRef.key || null,
    userId: playerRef.key || null,
  })
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
