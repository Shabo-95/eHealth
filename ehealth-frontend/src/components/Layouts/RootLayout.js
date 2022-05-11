import React, { useLayoutEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import NavBar from '../NavBar/NavBar'
import FooterContainer from '../../containers/footer'
import HeaderContainer from '../../containers/header'

// Allgemeines Seitenlayout
const RootLayout = ({ children }) => {
  const [small, setSmall] = useState(window.innerWidth >= 960)
  const [open, setOpen] = useState(false)

  // Prüfung der Fensterbreite
  useLayoutEffect(() => {
    let sub = false
    const handleResize = (e) => {
      if (e.target.innerWidth < 960) {
        sub = true
        setSmall(false)
      } else if (sub && e.target.innerWidth >= 960) {
        sub = false
        setSmall(true)
      }
    }
    addEventListener('resize', handleResize)
    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      wrap="nowrap"
      style={{ minHeight: '100vh' }}
    >
      {/* Header Komponente */}
      <Grid item xs={12}>
        <HeaderContainer small={!small} setOpen={setOpen} />
      </Grid>
      {/* Allgemeine Unterteilung zwischen Navbar und Kindkomponenten */}
      <Grid item xs={12}>
        <Grid container direction="row" justify="space-around" wrap="wrap">
          {/* Falls Fenster klein ist, zeige Navbar in Header als Popup an */}
          {small ? (
            <Grid item md={3}>
              <NavBar open={open} setOpen={setOpen} small={!small} />
            </Grid>
          ) : (
            <NavBar open={open} setOpen={setOpen} small={!small} />
          )}
          <Grid item md={small ? 9 : 12}>
            {children}
          </Grid>
        </Grid>
      </Grid>
      {/* Footer Komponente */}
      <Grid item xs={12}>
        <FooterContainer />
      </Grid>
    </Grid>
  )
}

export default RootLayout
