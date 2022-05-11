import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

//Styles für Container
const useStyles = makeStyles({
  textContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
})

//Begrüßungstext für Patienten und Gäste auf Übersichtsseite
const InfoBoxText = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.textContainer} container justify="center">
      <Grid item xs={12} md={8}>
        <Typography variant="body1" align="center">
          Willkommen auf unserer Praxis-Webseite.
        </Typography>
        <Typography variant="body1" align="center">
          Verschaffen Sie sich einen kleinen Überblick:
        </Typography>
      </Grid>
    </Grid>
  )
}

export default InfoBoxText
