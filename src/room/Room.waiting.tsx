import { useContext, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { Alert, Button, CircularProgress, Grid, Typography } from '@mui/material'
import Card from '@/atoms/Card'
import { RoomProps } from '@/types/Room'
import UserContext from '@/context/user.context'
import AliasForm from '@/KYF/components/AliasForm'
import PlayersList from '@/components/PlayersList'

const WaitingRoom = ({ admin, players = {} }: RoomProps): JSX.Element => {
  const { query } = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [error, setError] = useState<string | null>(null)

  const addPlayer = (alias: string): Promise<void> =>
    axios
      .post<{ playerId: string }>('/api/room/add-player', { alias, roomId: query.id })
      .then((result) => setUser({ ...user, alias, id: result.data.playerId, roomId: query.id as string }))
      .catch((error) => setError(error.message))

  const startGame = (): Promise<void | AxiosResponse<{ status: string }>> =>
    axios.patch(`/api/room/${query.id}`, { action: 'start' }).catch((error) => setError(error.message))

  return (
    <>
      <Grid item xs={12} lg={5} style={{ margin: '0 auto' }}>
        <Card>
          <>
            <Typography variant="h4" component="h4" paragraph>
              Bienvenue {user.alias || ''}
            </Typography>
            {user.id === admin ? (
              <>
                <Alert variant="filled" severity="info">
                  Vous êtes l&apos;administrateur de cette partie
                </Alert>
                <br />
                <Typography paragraph>Dès que la liste des joueurs est complète, lancez la partie:</Typography>
                <Button variant="contained" color="primary" size="large" onClick={startGame}>
                  Lancer la partie
                </Button>
              </>
            ) : (
              <>
                <Typography paragraph>
                  <CircularProgress size={20} color="primary" style={{ marginRight: 10 }} />
                  En attente des autres joueurs
                </Typography>
                <Typography paragraph>
                  Une fois que tous les joueurs seront inscrits,&nbsp;
                  <strong>{players[admin]?.alias || "l'administrateur"}</strong> pourra lancer la partie
                </Typography>
              </>
            )}
          </>
        </Card>
        {error && (
          <Alert severity="error" style={{ marginTop: '1rem' }}>
            {error}
          </Alert>
        )}
        <br />
        {user.roomId !== query.id && (
          <Card>
            <>
              <AliasForm onCreate={(alias) => addPlayer(alias)} />
              {error && (
                <Alert severity="error" style={{ marginTop: '1rem' }}>
                  {error}
                </Alert>
              )}
            </>
          </Card>
        )}
      </Grid>
      <Grid item xs={12} lg={7}>
        <Card>
          <>
            <PlayersList />
          </>
        </Card>
      </Grid>
    </>
  )
}

export default WaitingRoom
