import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import UserContext from '@/context/user.context'

import { Alert, Button, Grid } from '@mui/material'
import Card from '@/atoms/Card'
import KYFQuestion from '@/KYF/components/Question'
import AnsweringPlayers from '@/KYF/components/AnsweringPlayers'

const PlayingRoom = ({ admin }: { admin: string }): JSX.Element => {
  const { query } = useRouter()
  const { user } = useContext(UserContext)
  const [players, setPlayers] = useState<Array<{ alias: string; answer?: string }>>([])

  useEffect(() => {
    const playersRef = ref(db, `rooms/${query.id}/players`)
    onValue(playersRef, (snapshot) => setPlayers(Object.values(snapshot.val() || {})))
  }, [query.id])

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
                <Button variant="contained" color="primary" size="large">
                  Question suivante
                </Button>
              </>
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
