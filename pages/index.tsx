import Head from 'next/head'
import { CssBaseline, Grid, ThemeProvider } from '@material-ui/core'

import theme from '../utils/theme'
import Question from '../components/Question'

export default function Home(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Play Trivia</title>
        <meta name="description" content="Play trivia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Grid container component="main" alignItems="center" style={{ height: '75vh' }}>
        <Grid item xs={12}>
          <Question />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
