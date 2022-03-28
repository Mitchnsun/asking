import { useContext } from 'react'
import Link from 'next/link'
import { Alert, Button, Grid } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import Card from '@/atoms/Card'
import CreateARoom from '@/components/CreateARoom'
import AliasForm from '@/components/AliasForm'
import UserContext from '@/context/user.context'

const KnowYourFriends = (): JSX.Element => {
  const { user } = useContext(UserContext)

  return (
    <Grid container spacing={1} component="main" alignItems="center" style={{ height: '75vh' }}>
      <Grid container item xs={12}>
        <Card isMaxWidth>
          <AliasForm />
        </Card>
      </Grid>
      {!user.alias && (
        <Grid item xs={12}>
          <Alert severity="warning">Vous devez indiquez un prénom avant</Alert>
        </Grid>
      )}
      <Grid container item spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={4} style={{ textAlign: 'center' }}>
          <CreateARoom />
        </Grid>
        <Grid item xs={10} sm={4} style={{ textAlign: 'center' }}>
          <GroupIcon color="secondary" fontSize="large" />
          <Link href={`/knowyourfriends/join`} passHref>
            <Button variant="contained" color="secondary" size="large" fullWidth>
              Rejoindre une partie
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default KnowYourFriends
