import React from 'react'
import Link from 'next/link'

import { Button, Grid } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import CreateARoom from '@/components/CreateARoom'

const KnowYourFriends = (): JSX.Element => (
  <Grid container spacing={3} component="main" justifyContent="center" alignItems="center" style={{ height: '75vh' }}>
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
)

export default KnowYourFriends
