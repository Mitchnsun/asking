import React from 'react'
import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'

const Card = ({ isMaxWidth, children }: { isMaxWidth?: boolean; children: string | JSX.Element }): JSX.Element => {
  const useStyles = makeStyles({
    card: {
      position: 'relative',
      margin: 'auto',
      padding: '1rem',
      width: '100%',
      maxWidth: isMaxWidth ? 550 : '100%',
    },
  })
  const classes = useStyles()

  return (
    <Paper component="article" className={classes.card} elevation={3}>
      {children}
    </Paper>
  )
}

export default Card
