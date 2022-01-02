import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import UserContext from '@/context/user.context'
import { RoomProps } from '@/types/Room'

const PlayersList = (): JSX.Element => {
  const { query } = useRouter()
  const { user } = useContext(UserContext)
  const [players, setPlayers] = useState<RoomProps['players']>({})

  useEffect(() => {
    const playersRef = ref(db, `rooms/${query.id}/players`)
    onValue(playersRef, (snapshot) => setPlayers(snapshot.val() || {}))
  }, [query.id])

  return (
    <>
      <Typography variant="h5">Liste des participants</Typography>
      {players && (
        <List>
          {Object.entries(players).map(([key, player]) => (
            <ListItem key={key}>
              {user.id === key && (
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
              )}
              <ListItemText inset={user.id !== key} primary={player.alias} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

export default PlayersList
