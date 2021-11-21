import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDB } from '@/lib/firebase'

const post = async (req: NextApiRequest, res: NextApiResponse<{ roomId: string }>): Promise<void> => {
  const { game = '' } = req.body
  const newRef = adminDB.ref('rooms').push({ game })
  return res.status(200).json({
    roomId: newRef.key || '',
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Record<string, unknown>>): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return post(req, res)
    default:
      return res.status(501).json({ code: 'server/not-implemented' })
  }
}

export default handler
