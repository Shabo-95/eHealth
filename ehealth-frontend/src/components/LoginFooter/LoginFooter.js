import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

// Styles für Überschriften
const useStyles = makeStyles({
  header: {
    marginBottom: 20,
  },
  subHeader: {
    marginTop: 10,
    marginBottom: 10,
  },
})

// Komponente die auf Registrierung oder Gastnutzung hinweist
const LoginFooter = () => {
  const classes = useStyles()
  return (
    <>
      <Typography className={classes.subHeader} variant="h5" align="center">
        Kein Account?
      </Typography>
      {/* Verlinkung auf Registrierung */}
      <Link to="/register">
        <Button type="button" variant="outlined" color="primary" fullWidth>
          Als neuer Patient Registrieren
        </Button>
      </Link>
      <Typography className={classes.subHeader} variant="body1" align="center">
        oder
      </Typography>
      {/* Verlinkung auf Gastübersichtsseite */}
      <Link to="/guest">
        <Button type="button" variant="contained" color="primary" fullWidth>
          Als Patient ohne Konto fortfahren
        </Button>
      </Link>
    </>
  )
}

export default LoginFooter
