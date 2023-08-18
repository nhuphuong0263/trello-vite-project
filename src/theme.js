import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { teal, pink, cyan, orange, deepOrange } from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },

  colorSchemes: {
    light: {
      palette: {
        // primary: deepOrange,
        // secondary: teal
      },
      spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        // primary: cyan,
        // secondary: orange
      },
      spacing: (factor) => `${0.25 * factor}rem`
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#fff',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            fontSize: '0.875rem',
            '& fieldset': { borderWidth: '0.5px !important' },
            '&:hover fieldset': { borderWidth: '1px !important' },
            '& .Mui-focused fieldset': { borderWidth: '1px !important' }
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875' }
        }
      }
    }
  }
})

export default theme