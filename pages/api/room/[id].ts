import type { NextApiRequest, NextApiResponse } from 'next'
import { ref, get, child } from 'firebase/database'
import { adminDB } from '@/lib/firebase-admin'
import { db } from '@/lib/firebase'
import { KnowYourFriend } from '@/utils/mongo.utils'
import { GetNextPlayerToPlay } from '@/utils/players.utils'
import { ErrorType } from '@/types/Error'
import { QuestionType } from '@/types/Question'
import { PlayerType, ScoresType, ScoreType } from '@/types/Room'
import { point } from '@/KYF/utils/score'

const cleanPlayers = (players: Record<string, PlayerType>): Record<string, PlayerType> => {
  const keys = Object.keys(players)
  const clean = keys.reduce((prev: Record<string, PlayerType>, curr) => {
    prev[curr] = players[curr]
    delete prev[curr].answer
    return prev
  }, {})
  return clean
}

const scorePlayers = ({
  question,
  playerId,
  players,
  prevScore,
}: {
  question: QuestionType
  playerId: string
  players: Record<string, PlayerType>
  prevScore: ScoresType
}): Record<string, { id: string; alias: string; score: number }> => {
  const board: Record<string, ScoreType> = {}
  Object.keys(players).forEach((id: string) => {
    if (id !== playerId) {
      board[id] = {
        id,
        alias: players[id].alias,
        score:
          (prevScore?.board[id].score || 0) +
          point({ question, you: { ...players[playerId], id: playerId }, other: { ...players[id], id } }),
      }
    }
  }, {})
  return board
}

const patchHandler = async (req: NextApiRequest, res: NextApiResponse<{ status: string } | ErrorType>): Promise<void> => {
  const { id } = req.query
  const { action } = req.body

  if (!action) {
    return res.status(500).json({ code: 'server/missing-parameters' })
  }

  const roomRef = ref(db, `rooms/${id}`)
  const playersSnap = await get(child(roomRef, 'players'))

  if (!playersSnap.exists()) {
    return res.status(404).json({ code: 'server/room-not-found' })
  }

  const players = playersSnap.val()
  const game = await get(child(roomRef, 'game'))
  let question = {} as QuestionType

  if (game.val() === 'knowyourfriends') {
    const result = await KnowYourFriend.random(1)
    question = (result || [])[0] as QuestionType
    question.id = (question._id || '').toString()
  }

  if (action === 'start') {
    question.player = Object.keys(players).sort(() => 0.5 - Math.random())[0]
    question.alias = players[question.player].alias
    await adminDB
      .ref('rooms')
      .child(id as string)
      .update({ status: 'playing' })
    await adminDB
      .ref(`rooms/${id}`)
      .child('question')
      .set({ ...question, status: 'answering', alias: players[question.player].alias, id: question._id?.toString() })
    return res.status(200).json({ status: 'playing' })
  }

  if (action === 'next') {
    const questionRef = await get(child(roomRef, 'question'))
    const questionPlayerId = questionRef.val().player
    const prevScores = (await get(child(roomRef, 'scores'))).val() || {}
    const scores: Record<string, ScoresType> = {}
    Object.keys(players).forEach((id) => {
      scores[id] = {
        id,
        alias: players[id].alias,
        played: questionPlayerId === id ? (prevScores[id]?.played || 0) + 1 : prevScores[id]?.played || 0,
        board: scorePlayers({ question: questionRef.val(), playerId: id, players, prevScore: prevScores[id] }),
      }
    })
    const playerId = GetNextPlayerToPlay(scores)
    question.player = playerId
    question.alias = players[playerId].alias
    await adminDB.ref(`rooms/${id}`).child('scores').set(scores)
    await adminDB.ref(`rooms/${id}`).child('players').set(cleanPlayers(players))
    await adminDB.ref(`rooms/${id}`).child('question').set(question)
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
