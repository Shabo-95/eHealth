import React from 'react'
import { Button, Paper } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EventNoteIcon from '@material-ui/icons/EventNote'
import DescriptionIcon from '@material-ui/icons/Description'
import PersonIcon from '@material-ui/icons/Person'
import IconButtonContent from '../IconButtonContent/IconButtonContent'

// Daten für Verlinkungen von Patientenseite
const patientOptions = [
  { link: '/', icon: <HomeIcon />, title: 'Home' },
  {
    link: '/request_appointment',
    icon: <AddCircleOutlineIcon />,
    title: 'Termin Beantragen',
  },
  {
    link: '/appointment',
    icon: <EventNoteIcon />,
    title: 'Persönliche Termine',
  },
  {
    link: '/documents',
    icon: <DescriptionIcon />,
    title: 'Persönliche Dokumente',
  },
  { link: '/personal', icon: <PersonIcon />, title: 'Account verwalten' },
]

// Navbar für Patienten
const PatientNavbar = (props) => {
  const { classes, signOut } = props
  const { pathname } = useLocation()
  return (
    <Paper elevation={1} className={classes.paper}>
      {/* Verlinkungen auf Patientenseiten */}
      {patientOptions.map((option, key) => {
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
      {/* LogoutButton */}
      <Button
        className={classes.navButton}
        fullWidth
        onClick={() => signOut()}
        variant="outlined"
        color="primary"
      >
        <IconButtonContent
          icon={<ExitToAppIcon transform="rotate(180)" />}
          title="Ausloggen"
        />
      </Button>
    </Paper>
  )
}

export default PatientNavbar
