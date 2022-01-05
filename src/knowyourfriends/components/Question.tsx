import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import UserContext from '@/context/user.context'

import { Grid, Typography, Table, TableContainer, TableBody, TableCell, TableRow } from '@mui/material'
import CategoryTag from '@/atoms/CategoryTag'
import Question from '@/components/Question'
import { QuestionType } from '@/types/Question'

import { point, Player } from '../utils/score'

const pointLabel = (point: number): string => {
  if (point === 0) return 'Aucun point'
  if (point === 1) return '1 point'
  return `${point} points`
}

const KYFQuestion = ({ players }: { players: Player[] }): JSX.Element => {
  const { query } = useRouter()
  const { user } = useContext(UserContext)
  const [question, setQuestion] = useState<QuestionType>({} as QuestionType)
  const [status, setStatus] = useState<string | null>(null)
  const isAllAnswered = players.filter((player) => !player.answer).length === 0
  const you = players.find((player) => player.id === user.id)

  useEffect(() => {
    const questionRef = ref(db, `rooms/${query.id}/question`)
    onValue(questionRef, (snapshot) => setQuestion(snapshot.val() || {}))
  }, [query.id])

  const answering = (answer: string): void => {
    setStatus('loading')
    axios
      .patch(`/api/room/answer`, {
        game: 'knowyourfriends',
        questionId: question.id,
        answer,
        roomId: query.id,
        playerId: user.id,
      })
      .then(() => setStatus(null))
      .catch(() => setStatus('error'))
  }

  return (
    <>
      {isAllAnswered ? (
        <Grid container spacing={2} direction="column">
          <Grid item>
            <CategoryTag cat={question.category} />
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h5">
              {question.question?.replace('${name}', question.alias)}
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer>
              <Table aria-label="Table des réponses">
                <TableBody>
                  {players.map(({ id, alias, answer }) => (
                    <TableRow key={alias} selected={user.id === id}>
                      <TableCell scope="row">{alias}</TableCell>
                      <TableCell align="right">{answer}</TableCell>
                      <TableCell align="right">
                        {you?.id !== id
                          ? pointLabel(point({ you, other: { id, alias, answer }, idToQuestion: question.player }))
                          : ''}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Question
          question={question.question?.replace('${name}', question.alias)}
          category={question.category}
          status={status}
          nextURI={null}
          reset={() => {}}
          onSubmit={({ answer }) => answering(answer)}
        />
      )}
    </>
  )
}

export default KYFQuestion
