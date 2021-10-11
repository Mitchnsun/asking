import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Db, ObjectId } from 'mongodb'

import theme from '../../utils/theme'
import { withMongo } from '../../lib/mongodb'
import Trivia from '../../components/Trivia'

export default function Home({ id, question, category }: { id: string; question: string; category: string }): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Play Trivia</title>
        <meta name="description" content="Play trivia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Trivia id={id} question={question} category={category} />
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { id: string | null; question: string | null; category: string | null } }> => {
  const { id } = context.query
  const result = await withMongo(async (db: Db) => {
    const collection = db.collection('questions')
    return await collection.findOne({ _id: new ObjectId(id?.toString()) }, { projection: { question: 1, category: 1 } })
  })

  const { _id, question = null, category = null } = result || {}

  return {
    props: {
      id: _id?.toString() || null,
      question,
      category,
    },
  }
}
