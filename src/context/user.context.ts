import { createContext } from 'react'

const initialUser = {
  user: { alias: null, roomId: null, isAdmin: false },
  setUser: () => {},
}

export interface User {
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
