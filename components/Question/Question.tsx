import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Grid, TextField, Typography, Paper, makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'

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

const schema = yup.object({
  answer: yup.string().required('Indiquer votre réponse'),
})

const Question = (): JSX.Element => {
  const classes = useStyles()
  const [status, setStatus] = useState<string>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ answer: string }>({ resolver: yupResolver(schema) })

  const onSubmit = ({ answer }: { answer: string }): Promise<void> =>
    axios
      .post('/api/answer', { answer })
      .then((result) => setStatus(result.data.success ? 'success' : 'wrong'))
      .catch(() => setStatus('error'))

  return (
    <Paper className={classes.question} elevation={3}>
      <Grid
        container
        component="form"
        spacing={2}
        direction="column"
        className={classes.container}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Grid item>
          <Typography component="h2" variant="h5">
            Quel est le premier président de la Vième République ?
          </Typography>
        </Grid>
        <Grid item>
          <Controller
            name="answer"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Réponse"
                variant="outlined"
                fullWidth
                error={!!errors.answer}
                helperText={errors.answer?.message}
              />
            )}
          />
        </Grid>
        {status ? (
          <Grid item>
            {status === 'error' && <Alert severity="error">Une erreur est survenue</Alert>}
            {status === 'wrong' && <Alert severity="warning">Mauvaise réponse</Alert>}
            {status === 'success' && <Alert severity="success">Bravo !</Alert>}
          </Grid>
        ) : (
          <Grid item style={{ alignSelf: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Répondre
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default Question
