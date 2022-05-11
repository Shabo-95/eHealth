import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import RegisterPopup from '../RegisterPopup/RegisterPopup'

//Styles für Container und Divider
const useStyles = makeStyles({
  subjectContainer: {
    marginBottom: 50,
  },
  infoboxDivider: {
    marginBottom: 5,
  },
})

//Komponente zum vorstellen einer einzelnen Seite auf Überssichtsseite
//Titel, Infotext, ggf. zusätzliche Informationen und Verlinkung auf vorgestellte Seite
const InfoBoxSubject = (props) => {
  const { title, text, addInfo, link } = props
  const classes = useStyles()
  return (
    <Grid className={classes.subjectContainer} container spacing={1}>
      <Grid item xs={12}>
        {/* Überschrift */}
        <Typography variant="h4">{title}</Typography>
        <Divider className={classes.infoboxDivider} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container justify="flex-end">
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              {/* Infotext */}
              {text}
            </Typography>
            {/* Zusatzinfo, falls vorhanden */}
            {addInfo && (
              <RegisterPopup autoOpen={true}>
                <Typography variant="body1" align="center">
                  {addInfo}
                </Typography>
              </RegisterPopup>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} sm={8}>
            {/* Verlinkung auf vorgestellte Seite */}
            <Link to={link}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                endIcon={<ArrowForwardIcon />}
              >
                {title}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InfoBoxSubject
