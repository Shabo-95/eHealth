import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

// Style für Icons und Registrierungslink
const useStyles = makeStyles((theme) => ({
  registerLink: {
    color: '#212e53',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  check: {
    color: theme.palette.primary.light,
  },
  error: {
    color: theme.palette.secondary.dark,
  },
}))

// Daten, welche abgebildet werden
const raw = [
  { title: 'Termin anlegen', acc: true, guest: true },
  { title: 'Bestätigungsemail', acc: true, guest: true },
  { title: 'Termin einsehen', acc: true, guest: false },
  { title: 'Dokumenteübersicht', acc: true, guest: false },
  { title: 'Persönliche Daten selbst verwalten', acc: true, guest: false },
]

// Komponente für Popup, die anzeigt welche Vorteile ein Account hat
const RegisterPopup = (props) => {
  const { children, autoOpen } = props
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    let sub = true
    // Automatisches öffnen des Popups nach 5 Sekunden, falls autoOpen auf true gesetzt wurde
    if (autoOpen) setTimeout(() => sub && setOpen(true), 5000)
    return () => {
      sub = false
    }
  }, [])

  return (
    <>
      {/* Verlinkung für Popup und Darstellung von Kindkomponenten */}
      <div className={classes.registerLink} onClick={() => setOpen(true)}>
        {children}
      </div>
      <Dialog
        open={open}
        keepMounted
        disableScrollLock
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* Popup Überschrift */}
        <DialogTitle id="alert-dialog-slide-title">
          Vorteile eines Patienten-Accounts
        </DialogTitle>
        <DialogContent dividers>
          {/* Tabellenansicht */}
          <Grid container spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="center">
                Gast
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="center">
                Konto
              </Typography>
            </Grid>
            {/* Mapping der Daten mit Titel und entsprechenden Icons */}
            {raw.map((data, key) => {
              return (
                <React.Fragment key={key}>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="left">
                      {data.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" align="center">
                      {data.guest ? (
                        <CheckIcon className={classes.check} />
                      ) : (
                        <CloseIcon className={classes.error} />
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" align="center">
                      {data.acc ? (
                        <CheckIcon className={classes.check} />
                      ) : (
                        <CloseIcon className={classes.error} />
                      )}
                    </Typography>
                  </Grid>
                </React.Fragment>
              )
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* Button zum schließen des Popups */}
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
          >
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RegisterPopup
