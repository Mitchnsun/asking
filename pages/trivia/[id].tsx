import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'

import { Questions } from '@/utils/mongo.utils'
import Trivia from '@/trivia/Trivia.view'
import { QuestionType } from '@/types/Question'

export default function TriviaPage({ id, question, category }: { id: string; question: string; category: string }): JSX.Element {
  return (
    <>
      <Head>
        <title>Play Trivia</title>
        <meta name="description" content="Play trivia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Trivia id={id} question={question} category={category} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { id: string | null; question: string | null; category: string | null } }> => {
  const { id = '' } = context.query
  const result = await Questions.get(id.toString())
  const { _id, question = null, category = null } = (result || {}) as QuestionType

  return {
    props: {
      id: _id?.toString() || null,
      question,
      category,
    },
  }
}
