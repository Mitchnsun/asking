import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import UserContext from '@/context/user.context'

import { Grid, Typography, Table, TableContainer, TableBody, TableCell, TableRow } from '@mui/material'
import CategoryTag from '@/atoms/CategoryTag'
import Question from '@/components/Question'

const KYFQuestion = ({ players }: { players: Array<{ alias: string; answer?: string }> }): JSX.Element => {
  const { query } = useRouter()
  const { user } = useContext(UserContext)
  const [question, setQuestion] = useState<any>({})
  const [status, setStatus] = useState<string | null>(null)
  const isAllAnswered = Object.values(players).filter((player) => !player.answer).length === 0

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
                  {players.map(({ alias, answer }) => (
                    <TableRow key={alias}>
                      <TableCell component="th" scope="row">
                        {alias}
                      </TableCell>
                      <TableCell align="right">{answer}</TableCell>
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
