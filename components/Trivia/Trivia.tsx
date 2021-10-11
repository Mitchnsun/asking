import React, { useState } from 'react'
import axios from 'axios'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Card from '../atoms/Card'
import Answer from '../Answer'
import Question from '../Question'

interface Props {
  id: string
  question: string
  category: string
}

interface State {
  status?: string
  success?: boolean
  answers?: string[]
  video?: string
  selection?: {
    answer: string
  }
  next?: string
  wiki?: string
}

const Trivia = ({ id, question, category }: Props): JSX.Element => {
  const theme = useTheme()
  const isUpLGBreakpoint = useMediaQuery(theme.breakpoints.up('lg'))
  const [state, setState] = useState<State>({})

  const onSubmit = ({ answer }: { answer: string }): Promise<void> => {
    setState({ status: 'loading' })
    return axios
      .post('/api/answer', { answer, id })
      .then((result) => {
        setState({
          status: result.data.success ? 'success' : 'wrong',
          ...result.data,
        })
      })
      .catch(() => {
        setState({ status: 'error' })
      })
  }

  return (
    <main style={{ margin: isUpLGBreakpoint ? '10vh 1rem' : '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} style={{ margin: '0 auto' }}>
          <Card isMaxWidth>
            <Question
              question={question}
              category={category}
              status={state.status}
              nextURI={state.next ? `/trivia/${state.next}` : null}
              reset={() => setState({})}
              onSubmit={onSubmit}
            />
          </Card>
        </Grid>
        {state.selection ? (
          <Grid item xs={12} lg={7}>
            <Card isMaxWidth={!isUpLGBreakpoint}>
              <Answer {...state} />
            </Card>
          </Grid>
        ) : null}
      </Grid>
    </main>
  )
}

export default Trivia
