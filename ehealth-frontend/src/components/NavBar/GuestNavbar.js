import React from 'react'
import { Button, Paper } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import PersonIcon from '@material-ui/icons/Person'
import IconButtonContent from '../IconButtonContent/IconButtonContent'

// Daten für Verlinkungen von Gästeseiten
const guestOptions = [
  { link: '/guest', icon: <HomeIcon />, title: 'Home' },
  {
    link: '/request_appointment',
    icon: <AddCircleOutlineIcon />,
    title: 'Termin Beantragen',
  },
  {
    link: '/register',
    icon: <PersonIcon />,
    title: 'Registrieren',
  },
  {
    link: '/',
    icon: <ExitToAppIcon transform="rotate(180)" />,
    title: 'Zurück zur Startseite',
  },
]

// Navbar für Gäste
const GuestNavbar = (props) => {
  const { classes } = props
  const { pathname } = useLocation()
  return (
    <Paper elevation={1} className={classes.paper}>
      {/* Verlinkungen auf Gästeseiten */}
      {guestOptions.map((option, key) => {
        return (
          <Link to={option.link} key={key}>
            <Button
              className={classes.navButton}
              variant={pathname === option.link ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
            >
              <IconButtonContent icon={option.icon} title={option.title} />
            </Button>
          </Link>
        )
      })}
    </Paper>
  )
}

export default GuestNavbar
