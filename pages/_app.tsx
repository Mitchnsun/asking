import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import theme from '@/utils/theme'
import UserContext, { User } from '@/context/user.context'
import UserUtils from '@/utils/user.utils'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [user, setUser] = useState<User>(UserUtils.retrieve())

  const persistUser = (user: User): void => {
    UserUtils.persist(user)
    setUser(user)
  }

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser: persistUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
export default MyApp
