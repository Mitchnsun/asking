// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.status(200).json({ message: 'It works!' })
}

export default handler
