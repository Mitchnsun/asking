import CheckIcon from '@mui/icons-material/Check'
import { Chip, CircularProgress, ListItem, Typography } from '@mui/material'

const AnsweringPlayers = ({ players }: { players: Array<{ alias: string; answer?: string }> }): JSX.Element => {
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
    </>
  )
}

export default AnsweringPlayers
