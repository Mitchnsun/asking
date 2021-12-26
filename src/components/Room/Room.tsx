import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Grid } from '@mui/material'
import { RoomProps } from '@/types/Room'
import WaitingRoom from './WaitingRoom'

const Room = (props: RoomProps): JSX.Element => {
  const theme = useTheme()
  const isUpLGBreakpoint = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <main style={{ margin: isUpLGBreakpoint ? '10vh 1rem' : '1rem' }}>
      <Grid container spacing={2}>
        <WaitingRoom {...props} />
      </Grid>
    </main>
  )
}

export default Room
