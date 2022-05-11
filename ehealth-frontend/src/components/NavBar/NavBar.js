import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirebase } from '../../firebase'
import { UserContext } from '../ContextProvider/UserProvider'
import PatientNavbar from './PatientNavbar'
import EmployeeNavbar from './EmployeeNavbar'
import GuestNavbar from './GuestNavbar'
import { Fade, makeStyles, Modal } from '@material-ui/core'

// Styles für Navbar, Popup und Buttons
const useStyles = makeStyles({
  navbar: {
    maxWidth: 235,
    margin: 'calc(5vh + 50px) auto',
    border: '1px solid #d2d2d2',
    borderRadius: 8,
    overflow: 'hidden',
  },
  navButton: {
    height: 80,
    textAlign: 'center',
    border: 'none !important',
    borderRadius: '0 !important',
    borderBottom: '1px solid #d2d2d2 !important',
    boxShadow: 'none !important',
  },
  modal: {
    zIndex: '1 !important',
    top: '75px !important',
    maxWidth: 350,
    margin: 'auto',
    '&:focus': {
      outline: 'none !important',
    },
  },
  modalContent: {
    '&:focus': {
      outline: 'none !important',
      overflow: 'auto',
    },
  },
  paper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
})

// Allgemeine Navbar, die zwischen Gast, Patient und Mitarbeiter unterscheidet
const NavBar = (props) => {
  const { small, open, setOpen } = props
  const { currentUser, instance } = useFirebase()
  const elementRef = useRef(null)
  const context = useContext(UserContext)
  const history = useHistory()
  const classes = useStyles()
  const role = context ? context.role : undefined

  // Firebase Logout Funktion
  const signOut = async () => {
    if (currentUser)
      await instance
        .auth()
        .signOut()
        .then(() => history.push('/'))
        .catch((err) => console.log(err))
  }

  // Funktion um richtige Navbar zu bekommen
  const getNavbar = (role) => {
    switch (role) {
      case 'patient':
        return <PatientNavbar classes={classes} signOut={signOut} />
      case 'employee':
        return <EmployeeNavbar classes={classes} signOut={signOut} />
      default:
        return <GuestNavbar classes={classes} />
    }
  }

  // Falls Bildschirm klein ist, zeige Navbar als Popup an
  return small ? (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      disableScrollLock
    >
      <Fade in={open}>
        <div className={classes.modalContent}>{getNavbar(role)}</div>
      </Fade>
    </Modal>
  ) : (
    <div
      ref={elementRef}
      className={classes.navbar}
      style={{
        position: 'sticky',
        top: elementRef.current
          ? `calc(50vh - ${elementRef.current.clientHeight / 2}px)`
          : '25vh',
      }}
    >
      {getNavbar(role)}
    </div>
  )
}

export default NavBar
