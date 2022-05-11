import React from 'react'
import { Button, Paper } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import EventNoteIcon from '@material-ui/icons/EventNote'
import DescriptionIcon from '@material-ui/icons/Description'
import PeopleIcon from '@material-ui/icons/People'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButtonContent from '../IconButtonContent/IconButtonContent'

// Daten für Verlinkungen von Mitarbeiterseiten
const employeeOptions = [
  { link: '/', icon: <HomeIcon />, title: 'Home' },
  {
    link: '/appointments',
    icon: <EventNoteIcon />,
    title: 'Alle Termine',
  },
  {
    link: '/documents',
    icon: <DescriptionIcon />,
    title: 'Alle Dokumente',
  },
  {
    link: '/patients',
    icon: <PeopleIcon />,
    title: 'Alle Patienten',
  },
]

// Navbar für Mitarbeiter
const EmployeeNavbar = (props) => {
  const { classes, signOut } = props
  const { pathname } = useLocation()
  return (
    <Paper elevation={1} className={classes.paper}>
      {/* Verlinkungen auf Mitarbeiterseiten */}
      {employeeOptions.map((option, key) => {
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
        variant={pathname === '/guest' ? 'contained' : 'outlined'}
        color="primary"
        fullWidth
        onClick={() => signOut()}
      >
        <IconButtonContent
          icon={<ExitToAppIcon transform="rotate(180)" />}
          title="Ausloggen"
        />
      </Button>
    </Paper>
  )
}

export default EmployeeNavbar
