import React, { useContext } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { SiYoutube, SiFacebook, SiInstagram, SiTwitter } from 'react-icons/si'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { GoLaw } from 'react-icons/go'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/ContextProvider/UserProvider'
import { makeStyles, ThemeProvider } from '@material-ui/styles'

/* Styling Code (CSS) */
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#0c5f9a',
    color: '#FFF',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    opacity: 0.95,
    paddingBottom: '1rem',
    borderRadius: '20% 20% 0 0',
    '-webkit-box-shadow': '0px -4px 5px 0px rgba(0, 0, 0, 0.3)',
    '-moz-box-shadow': '0px -4px 5px 0px rgba(0, 0, 0, 0.3)',
    boxShadow: '0px -4px 5px 0px rgba(0, 0, 0, 0.3)',
  },
  contentHeader: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  GridSocialmediaitems1: {
    textAlign: 'end',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  GridSocialmediaitems2: {
    textAlign: 'start',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  /* Falls das Fenster des Browsers kleiner wird (xs < 576px), dann packe die Footer Componenten in 2 Spalten */
  /* und zeige eine Distanz zwischen die Kommponenten, die sich in der Spalte befinden */
  Grid1xs: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 30,
    },
  },
  Grid2xs: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 30,
    },
  },
  link: {
    color: '#FFF',
    '&:hover': {
      color: '#76b5c5',
    },
  },
  typography: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.800rem',
    },
  },
  rowIcon: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  youtube: {
    color: '#FFF',
    '&:hover': {
      color: '#ff0000',
    },
  },
  facebook: {
    color: '#FFF',
    '&:hover': {
      color: '#243F9D',
    },
  },
  twitter: {
    color: '#FFF',
    '&:hover': {
      color: '#1da1f2',
    },
  },
  instagram: {
    color: '#FFF',
    '&:hover': {
      color: 'palevioletred',
    },
  },
}))

const FooterContainer = () => {
  /* role = entweder Patient, Gast oder Mitarbeiter */
  const { role } = useContext(UserContext) ?? ''
  const classes = useStyles()

  /* hier return ist änlich wie Main z.B. in Java */
  return (
    <footer className={classes.footer}>
      {/* Div Container für Footer-Komponenten (Gruppierung) */}
      <Grid container className={classes.contentHeader} justify="space-around">
        {/* Div für jede Footer-Komponente (Hier nämlich für "Datenschutz") */}
        {/* xs, sm, md, lg => um Footer responsive zu machen */}
        <Grid item xs={6} sm={3} md={3} lg={3} className={classes.Grid1xs}>
          {/* Link ist änlich wie <a href> */}
          <Link to="./Datenschutz">
            {/* Typography ist änlich wie <p> "Paragraph" */}
            <Typography
              className={classes.link}
              variant="body1"
              align="center"
              gutterBottom
            >
              Datenschutz
            </Typography>
          </Link>
          <Link to="./Datenschutz">
            <AiFillSafetyCertificate className={classes.link} size={34} />
          </Link>
        </Grid>
        {/* Div für jede Footer-Komponente (Hier nämlich für "Impressum") */}
        <Grid item xs={6} sm={2} md={3} lg={3} className={classes.Grid2xs}>
          <Link to="/impressum">
            <Typography
              className={classes.link}
              variant="body1"
              align="center"
              gutterBottom
            >
              Impressum
            </Typography>
          </Link>
          <Link to="/impressum">
            <GoLaw className={classes.link} size={34} />
          </Link>
        </Grid>
        {/* Div für jede Footer-Komponente (Hier nämlich für "Support") */}
        <Grid item xs={6} sm={4} md={3} lg={3}>
          {role !== 'employee' ? (
            <Link to="./Support">
              <Typography
                className={classes.link}
                variant="body1"
                align="center"
                gutterBottom
              >
                Support
              </Typography>
            </Link>
          ) : (
            <Typography variant="body1" align="center" gutterBottom>
              Support
            </Typography>
          )}
          <Typography
            variant="body2"
            align="center"
            className={classes.typography}
          >
            <FaPhoneAlt className={classes.rowIcon} size={20} />
            +49 (0) 174 9074688
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className={classes.typography}
          >
            <MdEmail className={classes.rowIcon} size={20} />
            BlauesKreuz@praxis.de
          </Typography>
        </Grid>
        {/* Div für jede Footer-Komponente (Hier nämlich für "Folge uns") */}
        <Grid item xs={6} sm={3} md={3} lg={3}>
          {/* Ein interne Div Container für Social-Media Kommponents*/}
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" align="center" gutterBottom>
                Folge uns
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.GridSocialmediaitems1}>
              <Typography variant="body2">
                <a
                  href="https://www.youtube.com/ArtztPraxis"
                  className={classes.rowIcon}
                >
                  <SiYoutube className={classes.youtube} size={34} />
                </a>
                <a
                  href="https://www.facebook.com/ArtztPraxis/"
                  className={classes.rowIcon}
                >
                  <SiFacebook className={classes.facebook} size={34} />
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.GridSocialmediaitems2}>
              <Typography variant="body2">
                <a
                  href="https://www.twitter.com/ArtztPraxis"
                  className={classes.rowIcon}
                >
                  <SiTwitter className={classes.twitter} size={34} />
                </a>
                <a
                  href="https://www.instagram.com/ArtztPraxis"
                  className={classes.rowIcon}
                >
                  <SiInstagram className={classes.instagram} size={34} />
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
export default FooterContainer
