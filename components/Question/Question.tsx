import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'

import CategoryTag from '../atoms/CategoryTag'

interface Props {
  question: string
  category: string
  status?: string
  nextURI: string | null
  reset: () => void
  onSubmit: ({ answer }: { answer: string }) => void
}

const useStyles = makeStyles({
  container: {
    justifyContent: 'space-around',
  },
  video: {
    position: 'relative',
    width: '100%',
  },
})

const schema = yup.object({
  answer: yup.string().required('Indiquer votre réponse'),
})

const Question = ({ question, category, status, nextURI, reset, onSubmit }: Props): JSX.Element => {
  const classes = useStyles()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ answer: string }>({ resolver: yupResolver(schema) })

  return (
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
        <CategoryTag cat={category} />
      </Grid>
      <Grid item>
        <Typography component="h2" variant="h5">
          {question}
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
      <Grid item container spacing={1} justifyContent="flex-end" alignItems="center">
        {status && status !== 'loading' ? (
          <Grid item style={{ flexGrow: 1 }} xs={12} sm={8}>
            {status === 'error' && <Alert severity="error">Une erreur est survenue</Alert>}
            {status === 'wrong' && <Alert severity="warning">Mauvaise réponse</Alert>}
            {status === 'success' && <Alert severity="success">Bravo !</Alert>}
          </Grid>
        ) : null}
        <Grid item xs={6} sm={4}>
          {nextURI ? (
            <Link href={nextURI} passHref>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                onClick={() => {
                  setValue('answer', '')
                  reset()
                }}
              >
                Suite
              </Button>
            </Link>
          ) : (
            <Button type="submit" variant="contained" color="primary" disabled={status === 'loading'} fullWidth>
              Répondre {status === 'loading' && <CircularProgress size={20} color="secondary" style={{ marginLeft: 10 }} />}
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Question
