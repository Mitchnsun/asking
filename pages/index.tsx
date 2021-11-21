import Head from 'next/head'
import Link from 'next/link'
import { Button, CssBaseline, Grid } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import GroupsIcon from '@mui/icons-material/Groups'

import { Questions } from '@/utils/mongo.utils'

export default function Home({ id }: { id: string }): JSX.Element {
  return (
    <>
      <Head>
        <title>Play Trivia</title>
        <meta name="description" content="Play trivia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Grid container spacing={3} component="main" justifyContent="center" alignItems="center" style={{ height: '75vh' }}>
        <Grid item xs={10} sm={4} style={{ textAlign: 'center' }}>
          <PersonIcon color="secondary" fontSize="large" />
          <Link href={`/trivia/${id}`} passHref>
            <Button variant="contained" color="secondary" size="large" fullWidth>
              Jouer
            </Button>
          </Link>
        </Grid>
        <Grid item xs={10} sm={4} style={{ textAlign: 'center' }}>
          <GroupsIcon color="secondary" fontSize="large" />
          <Link href={`/knowyourfriends`} passHref>
            <Button variant="contained" color="secondary" size="large" fullWidth>
              Découvre tes amis
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export async function getServerSideProps(): Promise<{ props: { id: string } }> {
  const result = await Questions.random(1)
  const { _id } = (result || [])[0]

  return {
    props: {
      id: _id?.toString(),
    },
  }
}
