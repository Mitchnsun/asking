import { Button, Grid } from '@mui/material'

const getFlexSize = (length: number, inc: number): 6 | 12 => {
  if (length % 2 === 0) return 6
  if (length % 2 === 1 && length === inc + 1) return 12
  return 6
}

const shuffleChoices = (choices: string[]): string[] => {
  const shuffled = choices.sort(() => 0.5 - Math.random())
  if (choices.length % 2 === 1) {
    const longest = choices.reduce<string>((a, b) => (a.length > b.length ? a : b), '')
    return [...shuffled.filter((w) => w !== longest), longest]
  }

  return shuffled
}

const Choices = ({ choices, onClick }: { choices: string[]; onClick: (choice: string) => void }): JSX.Element => (
  <Grid container item spacing={1}>
    {shuffleChoices(choices).map((choice, inc) => (
      <Grid item key={choice} xs={getFlexSize(choices.length, inc)} alignItems="center">
        <Button fullWidth onClick={() => onClick(choice)} variant="outlined" style={{ textTransform: 'none' }}>
          {choice}
        </Button>
      </Grid>
    ))}
  </Grid>
)

export default Choices
