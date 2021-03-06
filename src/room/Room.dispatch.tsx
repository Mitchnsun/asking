import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Grid } from '@mui/material'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import { RoomProps } from '@/types/Room'
import KYFRoom from '@/KYF/KnowYourFriends.room'
import NoRoom from './Room.404'
import WaitingRoom from './Room.waiting'

const dispatch = (props: RoomProps): JSX.Element => {
  switch (props.game) {
    case 'knowyourfriends':
      return <KYFRoom admin={props.admin} />
    default:
      return <NoRoom />
  }
}

const RoomDispatch = (props: RoomProps): JSX.Element => {
  const { query } = useRouter()
  const theme = useTheme()
  const isUpLGBreakpoint = useMediaQuery(theme.breakpoints.up('lg'))
  const [status, setStatus] = useState<RoomProps['status']>('')

  useEffect(() => {
    const playersRef = ref(db, `rooms/${query.id}/status`)
    onValue(playersRef, (snapshot) => setStatus(snapshot.val() || ''))
  }, [query.id])

  return (
    <main style={{ margin: isUpLGBreakpoint ? '10vh 1rem' : '1rem' }}>
      <Grid container spacing={2}>
        {status === 'waiting' && <WaitingRoom {...props} />}
        {status === 'playing' && dispatch(props)}
      </Grid>
    </main>
  )
}

export default RoomDispatch
