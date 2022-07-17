import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'

import CategoryTag from '@/atoms/CategoryTag'
import Choices from './Choices'

interface Props {
  question: string
  category?: string
  nextURI: string | null
  status?: string | null
  type?: 'free' | 'multiple' | 'number'
  choices?: string[]
  reset: () => void
  onSubmit: ({ answer }: { answer: string }) => void
}

const schemaFree = yup.object({ answer: yup.string().required('Indiquer votre réponse') })
const schemaNumber = yup.object({ answer: yup.number().required('Indiquer votre réponse') })

const Question = ({ question, category, choices = [], status, nextURI, type, reset, onSubmit }: Props): JSX.Element => {
  const schema = type === 'number' ? schemaNumber : schemaFree
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ answer: any }>({ resolver: yupResolver(schema) })

  return (
    <Grid
      sx={{ justifyContent: 'space-around' }}
      container
      component="form"
      spacing={2}
      direction="column"
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
      {type === 'multiple' ? (
        <Choices
          choices={choices}
          onClick={(choice) => {
            setValue('answer', choice)
            onSubmit({ answer: choice })
          }}
        />
      ) : null}
      <Grid item>
        <Controller
          name="answer"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Réponse"
              inputProps={{ 'aria-label': 'Réponse' }}
              variant="outlined"
              type={type === 'number' ? 'number' : 'text'}
              fullWidth
              error={!!errors.answer}
              helperText={errors.answer?.message as ReactNode}
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
