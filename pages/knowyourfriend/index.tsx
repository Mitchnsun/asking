import Head from 'next/head'
import Link from 'next/link'
import { Button, CssBaseline, Grid } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'

import CreateARoom from '../../components/CreateARoom'

export default function KnowYourFriendPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Know your friend</title>
        <meta name="description" content="Know your friend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Grid container spacing={3} component="main" justifyContent="center" alignItems="center" style={{ height: '75vh' }}>
        <Grid item xs={10} sm={4} style={{ textAlign: 'center' }}>
          <CreateARoom />
        </Grid>
        <Grid item xs={10} sm={4} style={{ textAlign: 'center' }}>
          <GroupIcon color="secondary" fontSize="large" />
          <Link href={`/knowyourfriend/join`} passHref>
            <Button variant="contained" color="secondary" size="large" fullWidth>
              Rejoindre une partie
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}
