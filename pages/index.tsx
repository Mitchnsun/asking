import Head from 'next/head'
import Link from 'next/link'
import { Button, CssBaseline, Grid } from '@mui/material'
import type { Db } from 'mongodb'

import { withMongo } from '../lib/mongodb'

export default function Home({ id }: { id: string }): JSX.Element {
  return (
    <>
      <Head>
        <title>Play Trivia</title>
        <meta name="description" content="Play trivia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Grid container component="main" justifyContent="center" alignItems="center" style={{ height: '75vh' }}>
        <Grid item xs={10} sm={4}>
          <Link href={`/trivia/${id}`} passHref>
            <Button variant="contained" color="secondary" size="large" fullWidth>
              Jouer
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export async function getServerSideProps(): Promise<{ props: { id: string } }> {
  const result = await withMongo(async (db: Db) => {
    const collection = db.collection('questions')
    return await collection.aggregate([{ $sample: { size: 1 } }]).toArray()
  })

  const { _id } = (result || [])[0]

  return {
    props: {
      id: _id?.toString(),
    },
  }
}
