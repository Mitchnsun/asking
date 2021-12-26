import { createContext } from 'react'

export const INITIAL_USER = { id: null, alias: null, roomId: null, isAdmin: false }

const initialUser = {
  user: INITIAL_USER,
  setUser: () => {},
}

export interface User {
  id: string | null
  alias: string | null
  roomId: string | null
  isAdmin: boolean
}

interface UserContextProps {
  user: User
  setUser: (user: User) => void
}

const UserContext = createContext<UserContextProps>(initialUser)

export default UserContext
