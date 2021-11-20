import type { NextApiRequest, NextApiResponse } from 'next'

const post = async (req: NextApiRequest, res: NextApiResponse<{ roomId: string }>): Promise<void> => {
  return res.status(200).json({
    roomId: 'AC76GDT',
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
