import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CssBaseline, ThemeProvider } from '@mui/material'

import theme from '../../utils/theme'
import { Questions } from '../../utils/mongo.utils'
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
  const { id = '' } = context.query
  const result = await Questions.get(id.toString())
  const { _id, question = null, category = null } = result || {}

  return {
    props: {
      id: _id?.toString() || null,
      question,
      category,
    },
  }
}
