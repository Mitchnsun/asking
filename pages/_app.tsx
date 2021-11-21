import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'

import theme from '@/utils/theme'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
