import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import CheckIcon from '@mui/icons-material/Check'
import { Chip, CircularProgress, ListItem, Table, TableBody, TableHead, TableRow, TableCell, Typography } from '@mui/material'
import UserContext from '@/context/user.context'

interface ScoreType {
  id: string
  alias: string
  score: number
}

const AnsweringPlayers = ({ players }: { players: Array<{ alias: string; answer?: string }> }): JSX.Element => {
  const { query } = useRouter()
  const { user } = useContext(UserContext)
  const [scores, setScores] = useState<ScoreType[]>([])

  useEffect(() => {
    const scoreRef = ref(db, `rooms/${query.id}/scores/${user.id}/board`)
    onValue(scoreRef, (snapshot) => {
      setScores(
        Object.values(snapshot.val() || {}).sort((a, b) => (b as ScoreType).score - (a as ScoreType).score) as ScoreType[]
      )
    })
  }, [query.id, user.id])

  return (
    <>
      <Typography variant="h5">Statut des joueurs:</Typography>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {players.map(({ alias, answer }) => (
          <ListItem key={alias} sx={{ width: 'auto' }}>
            <Chip
              icon={answer ? <CheckIcon /> : <CircularProgress size={20} />}
              label={alias}
              variant="outlined"
              color={answer ? 'success' : 'primary'}
            />
          </ListItem>
        ))}
      </ul>
      {scores.length > 0 && (
        <>
          <Typography variant="h5">Tes points:</Typography>
          <Table sx={{ width: 'auto', minWidth: '25%' }} aria-label="Score board">
            <TableHead>
              <TableRow>
                <TableCell>Amis</TableCell>
                <TableCell align="right">Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map(({ id, alias, score }) => (
                <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {alias}
                  </TableCell>
                  <TableCell align="right">{score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}

export default AnsweringPlayers
