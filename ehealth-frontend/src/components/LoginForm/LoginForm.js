import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useFirebase } from '../../firebase'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../../api/users'
import { makeStyles } from '@material-ui/styles'

// Styles für Form, Fehlermeldung, Passwort Vergessen und Popup Buttons
const useStyles = makeStyles({
  loginForm: {
    marginBottom: 30,
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
  },
  forgotPassword: {
    fontSize: '0.9rem',
    textAlign: 'end',
    color: '#3f51b5',
    margintop: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dialogButtons: {
    padding: '8px 24px 24px 24px',
    justifyContent: 'space-between',
  },
})

// Login Komponente, in der Email und Passwort eingegeben werden muss mit zusätzlicher Passwort vergessen Funktion
const LoginForm = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { register, handleSubmit, errors } = useForm()
  const { instance } = useFirebase()
  const history = useHistory()
  const classes = useStyles()

  // Funktion die den Firebaselogin über Email und Passwort realisiert
  const onSubmit = async (data) => {
    await instance
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (credentials) => {
        const userId = credentials.user?.uid

        // LastLogin wird aktualisiert und man wird bei Erfolg weitergeleitet
        if (userId)
          await updateUser(userId, {
            lastLogin: Date.now(),
          })
            .then(() => history.push('/'))
            .catch((err) => console.log(err))
      })
      .catch(() => {
        // Fehlermeldung für falsche Logindaten wird gesetzt
        setErrorMessage(
          'Die eingegebene Email und das Passwort stimmen nicht überein. Bitte versuchen Sie es erneut.'
        )
      })
  }

  // Funktion für Passwort zurücksetzen
  const resetPassword = async () => {
    await instance
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true)
      })
      .catch(() => {
        alert(
          'Beim Versenden der Email ist ein Fehler unterlaufen. Bitte überprüfen Sie Ihre Eingaben.'
        )
      })
  }

  return (
    <>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
        {/* Email Textfeld */}
        <TextField
          name="email"
          type="text"
          inputRef={register({
            required: true,
            pattern: {
              value: /(.+)@(.+){2,}\.(.+){2,}/,
            },
          })}
          label="Email *"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.email}
          helperText={
            errors.email ? 'Bitte geben Sie Ihre Email Adresse ein' : null
          }
        />

        {/* Passwort Textfeld */}
        <TextField
          name="password"
          type="password"
          inputRef={register({
            required: true,
          })}
          label="Passwort *"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.password}
          helperText={
            errors.password ? 'Bitte geben Sie Ihr Passwort ein' : null
          }
        />

        {/* Button um Passwort vergessen Fenster zu öffnen */}
        <Typography
          variant="body1"
          gutterBottom
          onClick={() => setOpen(true)}
          className={classes.forgotPassword}
        >
          Passwort vergessen?
        </Typography>

        {/* Fehlermeldung, falls vorhanden */}
        <Typography
          variant="body1"
          gutterBottom
          className={classes.errorMessage}
        >
          {errorMessage}
        </Typography>

        {/* LoginButton */}
        <Button type="submit" variant="contained" color={'primary'} fullWidth>
          Einloggen
        </Button>
      </form>

      {/* Passwort vergessen Popup */}
      <Dialog
        open={open}
        keepMounted
        disableScrollLock
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Passwort vergessen
        </DialogTitle>

        {/* Bestätigungstext, wenn Email versendet wird */}
        {emailSent ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Es wurde eine Nachricht an die von Ihnen eingegebene Email Adresse
              versendet.
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Wenn Sie Ihr Passwort vergessen haben, geben Sie bitte hier Ihre
              Email-Adresse ein, sodass das Passwort zurückgesetzt werden kann.
            </DialogContentText>

            {/* Textfeld für Email */}
            <TextField
              name="email"
              type="text"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
        )}
        <DialogActions className={classes.dialogButtons}>
          {/* Button um Popup zu schließen */}
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
          >
            Schließen
          </Button>

          {/* Button um Passwort zurückzusetzen */}
          {emailSent ? null : (
            <Button
              onClick={() => resetPassword()}
              variant="contained"
              color="primary"
            >
              Absenden
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginForm
