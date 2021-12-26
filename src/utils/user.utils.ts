import { User, INITIAL_USER } from '@/context/user.context'
import Storage from '@/utils/storage.utils'

const retrieve = (): User => Storage.local.get('user') || INITIAL_USER

const persist = (user: User): void => Storage.local.set('user', user)

const UserUtils = { retrieve, persist }

export default UserUtils
