import Head from 'next/head'
import { CssBaseline, Grid, ThemeProvider } from '@material-ui/core'
import type { Db, ObjectId } from 'mongodb'

import theme from '../utils/theme'
import { withMongo } from '../lib/mongodb'
import Question from '../components/Question'

interface Trivia extends Document {
  _id: ObjectId
  question: string
  answers: string[]
  category: string
  edition: string
}

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

export async function getServerSideProps(): { props: { id: string; question: string } } {
  const result = await withMongo<Trivia[]>(async (db: Db) => {
    const collection = db.collection('questions')
    return await collection.aggregate([{ $sample: { size: 1 } }]).toArray()
  })

  const { question, _id } = (result || [])[0]

  return {
    props: {
      id: _id?.toString(),
      question: question,
    },
  }
}
