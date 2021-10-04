import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CssBaseline, Grid, ThemeProvider } from '@material-ui/core'
import { Db, ObjectId } from 'mongodb'

import theme from '../../utils/theme'
import { withMongo } from '../../lib/mongodb'
import Question from '../../components/Question'

export default function Home({ id, question }: { id: string; question: string }): JSX.Element {
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
          <Question id={id} question={question} />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { id: string | null; question: string | null } }> => {
  const { id } = context.query
  const result = await withMongo(async (db: Db) => {
    const collection = db.collection('questions')
    return await collection.findOne({ _id: new ObjectId(id?.toString()) }, { projection: { question: 1 } })
  })

  const { question, _id } = result || {}

  return {
    props: {
      id: _id?.toString() || null,
      question: question || null,
    },
  }
}
