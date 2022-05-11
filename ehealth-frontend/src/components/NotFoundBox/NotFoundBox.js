import React from 'react'
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

// Styles für Divider
const useStyles = makeStyles({
  divider: {
    marginTop: 10,
    marginBottom: 15,
  },
})

// Komponente für Infotext über nicht vorhandene Seite
const NotFoundBox = () => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="center">
          Die von Ihnen eingegebene URL passt zu keiner von unseren Seiten.
          Bitte überprüfen Sie Ihre Eingabe oder gehen Sie zurück auf die Home
          Seite.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {/* Verlinkung auf Startseite */}
        <Link to="/">
          <Button type="button" variant="contained" color="primary" fullWidth>
            Zurück zum Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default NotFoundBox
