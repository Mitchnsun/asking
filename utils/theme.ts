import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: '#023047',
    },
    primary: {
      main: '#023047',
    },
    secondary: {
      main: '#ffb703',
    },
    info: {
      main: '#8ecae6',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F7F7FF',
        },
      },
    },
  },
})

export default theme
