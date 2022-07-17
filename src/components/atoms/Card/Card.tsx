import React from 'react'
import { Paper } from '@mui/material'

const Card = ({ isMaxWidth, children }: { isMaxWidth?: boolean; children: string | JSX.Element }): JSX.Element => {
  return (
    <Paper
      sx={{
        position: 'relative',
        margin: 'auto',
        padding: '1rem',
        width: '100%',
        maxWidth: isMaxWidth ? 550 : '100%',
      }}
      component="article"
      elevation={3}
    >
      {children}
    </Paper>
  )
}

export default Card
