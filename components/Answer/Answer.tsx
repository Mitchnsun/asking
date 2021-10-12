import React, { useRef, useState, useLayoutEffect } from 'react'
import { Grid, Chip, Link, Stack, Typography } from '@mui/material'

interface Props {
  answers?: string[]
  video?: string
  selection?: {
    answer: string
  }
  wiki?: string
}

const Answer = ({ answers, video, wiki, selection }: Props): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(500)

  useLayoutEffect(() => {
    if (iframeRef.current) {
      setHeight(iframeRef.current.offsetWidth / 1.77)
    }
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          <b>Réponse(s) acceptée(s)</b>
        </Typography>
        <Stack direction="row" spacing={1}>
          {(answers || []).map((answer) => (
            <Chip key={answer} label={answer} variant="outlined" color="primary" aria-label={answer} role="listitem" />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          <b>Plus d&apos;informations</b>
        </Typography>
        <Typography color="primary" gutterBottom>
          <Link href={wiki} color="secondary" underline="hover" target="_blank" rel="noreferrer" gutterBottom>
            Pour en apprendre plus, lire cet article
          </Link>
        </Typography>
        {video ? (
          <iframe
            ref={iframeRef}
            height={height}
            src={video}
            title={selection?.answer}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%' }}
            role="application"
          ></iframe>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default Answer
