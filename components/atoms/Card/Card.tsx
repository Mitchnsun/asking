import React from 'react'
import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  card: {
    position: 'relative',
    margin: 'auto',
    padding: '1rem',
  },
})

const Card = ({ isMaxWidth, children }: { isMaxWidth: boolean; children: JSX.Element }): JSX.Element => {
  const classes = useStyles()
  return (
    <Paper className={classes.card} elevation={3} style={{ maxWidth: isMaxWidth ? 550 : '100%' }}>
      {children}
    </Paper>
  )
}

export default Card
