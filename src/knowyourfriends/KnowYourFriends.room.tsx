import { useContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import UserContext from '@/context/user.context'

import { Alert, Button, Grid } from '@mui/material'
import Card from '@/atoms/Card'
import { PlayerType } from '@/types/Room'
import KYFQuestion from './components/Question'
import AnsweringPlayers from './components/AnsweringPlayers'

const PlayingRoom = ({ admin }: { admin: string }): JSX.Element => {
  const { query } = useRouter()
  const { user } = useContext(UserContext)
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const playersRef = ref(db, `rooms/${query.id}/players`)
    onValue(playersRef, (snapshot) => {
      const keys: string[] = Object.keys(snapshot.val() || {})
      const values: PlayerType[] = Object.values(snapshot.val() || {})
      setPlayers(values.map((player, index) => ({ ...player, id: keys[index] })))
    })
  }, [query.id])

  const nextQuestion = (): Promise<void | AxiosResponse<{ status: string }>> =>
    axios.patch(`/api/room/${query.id}`, { action: 'next' }).catch((error) => setError(error.message))

  return (
    <>
      <Grid item xs={12} lg={5} style={{ margin: '0 auto' }}>
        <Card isMaxWidth>
          <>
            <KYFQuestion players={players} />
            {user.id === admin && (
              <>
                <br />
                <Alert variant="filled" severity="info">
                  Vous êtes l&apos;administrateur de cette partie
                </Alert>
                <br />
                <Button variant="contained" color="primary" size="large" onClick={nextQuestion}>
                  Question suivante
                </Button>
              </>
            )}
            {error && (
              <Alert severity="error" style={{ marginTop: '1rem' }}>
                {error}
              </Alert>
            )}
          </>
        </Card>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Card>
          <AnsweringPlayers players={players} />
        </Card>
      </Grid>
    </>
  )
}

export default PlayingRoom
