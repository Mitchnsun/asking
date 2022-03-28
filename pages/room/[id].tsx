import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { ref, get } from 'firebase/database'

import { CssBaseline } from '@mui/material'
import { db } from '@/lib/firebase'
import { RoomProps } from '@/types/Room'
import { Room, NoRoom } from '@/components/Room'

const RoomPage = ({ room }: { room: RoomProps | null }): JSX.Element => (
  <>
    <Head>
      <title>Play Trivia</title>
      <meta name="description" content="Play trivia" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <CssBaseline />
    {room ? <Room {...room} /> : <NoRoom />}
  </>
)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { room: RoomProps | null } }> => {
  const { id = '' } = context.query
  const roomRef = ref(db, `rooms/${id}`)
  const snapshot = await get(roomRef)
  const room = snapshot.exists() ? snapshot.val() : null

  return {
    props: { room },
  }
}

export default RoomPage
