import { useContext } from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField, Typography } from '@mui/material'
import UserContext from '@/context/user.context'

const schema = yup.object({
  alias: yup.string().required('Indiquer votre prénom'),
})

const AliasForm = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ alias: string }>({ resolver: yupResolver(schema) })
  const { user, setUser } = useContext(UserContext)

  const onSubmit = ({ alias }: { alias: string }): void => setUser({ ...user, alias })

  return (
    <Grid container component="form" spacing={1} direction="column" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid item>
        <Typography component="h2" variant="h5">
          Quel est votre prénom ?
        </Typography>
      </Grid>
      <Grid item>
        <Controller
          name="alias"
          control={control}
          defaultValue={user.alias || ''}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prénom"
              inputProps={{ 'aria-label': 'Prénom' }}
              variant="outlined"
              fullWidth
              error={!!errors.alias}
              helperText={errors.alias?.message}
            />
          )}
        />
      </Grid>
      <Grid item container spacing={1} justifyContent="flex-end" alignItems="center">
        <Grid item xs={6} sm={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Soumettre
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AliasForm
