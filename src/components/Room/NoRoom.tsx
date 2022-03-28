import Link from 'next/link'
import { Alert, AlertTitle, Button, Grid } from '@mui/material'

const NoRoom = (): JSX.Element => (
  <Grid container spacing={1} component="main" alignItems="center" justifyContent="center" style={{ height: '75vh' }}>
    <Grid item container xs={6} spacing={2} justifyContent="flex-end">
      <Grid item xs={12}>
        <Alert severity="error">
          <AlertTitle>Fausse route</AlertTitle>
          Cette partie n&apos;existe pas
        </Alert>
      </Grid>
      <Grid item>
        <Link href="/knowyourfriends" passHref>
          <Button variant="contained" color="secondary" size="large">
            Retour à l&apos;accueil
          </Button>
        </Link>
      </Grid>
    </Grid>
  </Grid>
)

export default NoRoom
