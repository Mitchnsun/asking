import { createTheme, adaptV4Theme } from '@mui/material/styles'

const theme = createTheme(
  adaptV4Theme({
    palette: {
      background: {
        default: '#2B4141',
      },
      primary: {
        main: '#0EB1D2',
      },
      secondary: {
        main: '#C8C2AE',
      },
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: '#F7F7FF',
        },
      },
    },
  })
)

export default theme
