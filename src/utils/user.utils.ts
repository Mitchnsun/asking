import type { User } from '@/context/user.context'
import Storage from '@/utils/storage.utils'

const retrieve = (): User => Storage.local.get('user') || { alias: null, roomId: null, isAdmin: false }

const persist = (user: User): void => Storage.local.set('user', user)

const UserUtils = { retrieve, persist }

export default UserUtils
