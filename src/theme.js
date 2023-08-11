import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { teal, deepOrange, cyan, orange } from '@mui/material/colors'

const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: cyan
      },
      spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: deepOrange,
        secondary: orange
      },
      spacing: (factor) => `${0.25 * factor}rem`
    }
  }
})

export default theme