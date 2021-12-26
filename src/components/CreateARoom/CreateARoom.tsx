import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Alert, Button, CircularProgress } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import UserContext from '@/context/user.context'

const CreateARoom = (): JSX.Element => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { user, setUser } = useContext(UserContext)

  const create = (): Promise<void> => {
    setLoading(true)
    return axios
      .post('/api/room/', { game: 'knowyourfriends', alias: user.alias })
      .then((result) => {
        setSuccess('La partie a été créée!')
        setUser({ ...user, id: result.data.userId, roomId: result.data.roomId, isAdmin: true })
        router.push(`/room/${result.data.roomId}`)
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <PersonIcon color="secondary" fontSize="large" />
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Button variant="contained" color="secondary" size="large" fullWidth onClick={create} disabled={loading || !user.alias}>
        Créer une partie {loading && <CircularProgress size={20} color="secondary" style={{ marginLeft: 10 }} />}
      </Button>
    </>
  )
}

export default CreateARoom
