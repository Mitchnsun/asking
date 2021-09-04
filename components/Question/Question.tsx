import { Button, Grid, TextField, Typography, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  question: {
    margin: 'auto',
    padding: '1rem',
    maxWidth: 550,
    height: 300,
  },
  container: {
    height: '100%',
    justifyContent: 'space-around',
  },
})
const Question = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Paper className={classes.question} elevation={3}>
      <Grid container component="form" spacing={2} direction="column" className={classes.container}>
        <Grid item>
          <Typography variant="h2">Question ?</Typography>
        </Grid>
        <Grid item>
          <TextField label="Réponse" variant="outlined" fullWidth />
        </Grid>
        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary">
            Répondre
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Question
