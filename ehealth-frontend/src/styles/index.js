import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

export let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1B3D9F',
    },
    secondary: {
      main: '#DF8874',
    },
  },
})

theme = responsiveFontSizes(theme)
theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
  },
}

theme.typography.body2 = {
  ...theme.typography.body2,
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
  },
}

theme.typography.button = {
  ...theme.typography.button,
  [theme.breakpoints.down('xs')]: {
    fontSize: 14,
  },
}

// Hocker Farbe: #759CAB
// Dunkel Grau: #415265
// Pflanzen Grün: #728104
// Sitzbank blau/silber: #7F93AC
// Sitzbank braun: #B19F89
// Sitzbank dunkel braun: #765E42
// Glasspiegelung türkis: #A1CEEF
