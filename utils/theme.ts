import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: '#023047',
    },
    primary: {
      main: '#8ecae6',
    },
    secondary: {
      main: '#ffb703',
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
