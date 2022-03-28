import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import theme from '@/utils/theme'
import UserContext, { User, INITIAL_USER } from '@/context/user.context'
import UserUtils from '@/utils/user.utils'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [user, setUser] = useState<User>(INITIAL_USER)

  useEffect(() => setUser(UserUtils.retrieve()), [])
  useEffect(() => UserUtils.persist(user), [user])

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
export default MyApp
