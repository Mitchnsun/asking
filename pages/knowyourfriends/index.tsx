import Head from 'next/head'
import { CssBaseline } from '@mui/material'
import KnowYourFriends from '@/KYF/KnowYourFriends.view'

const KnowYourFriendsPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Know your friend</title>
        <meta name="description" content="Know your friend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <KnowYourFriends />
    </>
  )
}

export default KnowYourFriendsPage
