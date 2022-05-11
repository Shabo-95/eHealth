import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import {
  Button,
  FormLabel,
  Grid,
  Radio,
  TextField,
  RadioGroup,
  FormControlLabel,
  Divider,
  makeStyles,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useFirebase } from '../../firebase'
import { createUser } from '../../api/users'
import RegisterPopup from '../RegisterPopup/RegisterPopup'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

var date = new Date().getDate() //To get the Current Date
var month = new Date().getMonth() + 1 //To get the Current Month
var year = new Date().getFullYear() //To get the Current Year

/* um zu überprüfen ob die/der Patientin/Patient mindestens 12 Jahre Alt sind */
var mindestens12jahreAlt = year - 12 + '-' + month + '-' + date

/* Styling (Css) */
const useStyles = makeStyles({
  divider: {
    marginTop: 5,
    marginBottom: 15,
  },
  dateStyle: {
    '& ::-webkit-calendar-picker-indicator': {
      margin: '0',
      fontSize: 10,
    },
  },
})

const RegisterForm = () => {
  const [open, setOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState(
    'Eingabe bitte Korrigieren!' //"Standart" error message
  )
  const { register, handleSubmit, control, errors } = useForm()
  const { instance } = useFirebase()
  const history = useHistory()
  const classes = useStyles()

  //alert für die Snackbar
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  /* um zu überprüfen ob der eingegebene Geburtsdatum gültig bzw. realistisch ist */
  const onChange = (e) => {
    let selectedDate = e.target.value
    if (selectedDate > mindestens12jahreAlt) {
      e.target.setCustomValidity('Sie müssen mindestens 12 Jahre alt sein')
    } else if (selectedDate < '1900-01-01') {
      e.target.setCustomValidity('Bitte geben Sie ein realistisches Alter ein')
    } else {
      e.target.setCustomValidity('')
    }
  }

  //Schließung der Snackbar, wenn man neben sie drückt
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  //setzt SetOpen auf true, damit sich die Snackbar öffnet
  const handleOpen = (text) => {
    setErrorMessage(text)
    setOpen(true)
  }

  /* Wenn der Button "Account erstellen" gedrückt wird (bzw. onSubmit) */
  const onSubmit = async (data, e) => {
    await instance
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (credentials) => {
        sendMail(e)
        const { password, ...userData } = data
        const patientData = {
          ...userData,
          role: 'patient',
        }
        const id = credentials.user?.uid
        if (id)
          await createUser(id, { ...patientData })
            .then(() => history.push('/'))
            .catch((err) => console.log(err))
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use')
          handleOpen('Unter der eingegebenen E-Mail besteht bereits ein Profil')
        //setzt die Error Message
        else
          handleOpen(
            'Ein unerwarteter Fehler ist aufgetreten. Überprüfen Sie bitte Ihre Eingaben.'
          )
      })
  }

  /* Eine bestätigungsemail an dem User senden, Falls die Regestrierungsprozess erfolgreich war */
  const sendMail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_udrl9a7',
        'template_ql80m3i',
        e.target,
        'user_lfZ5e7vxGfXHseee5HOX2'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  /* "return" ist änlich wie die Main-Methode in Java */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12}>
          <RegisterPopup>
            <Button variant="outlined" color="primary">
              Account-Vorteile einsehen
            </Button>
          </RegisterPopup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Anrede</FormLabel>
          <Controller
            name="gender"
            defaultValue="female"
            rules={{ required: true }}
            control={control}
            as={
              <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Frau"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Herr"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  label="Divers"
                />
              </RadioGroup>
            }
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            name="firstname"
            type="text"
            inputRef={register({
              required: true,
              pattern: {
                value: /^\D{2,}$/,
              },
            })}
            label="Vorname *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.firstname}
            helperText={
              errors.firstname ? 'Bitte geben Sie Ihren Vornamen ein' : null
            }
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            name="lastname"
            type="text"
            inputRef={register({
              required: true,
              pattern: {
                value: /^\D{2,}$/,
              },
            })}
            label="Nachname *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.lastname}
            helperText={
              errors.lastname ? 'Bitte geben Sie Ihren Nachnamen ein' : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            name="birthdate"
            type="date"
            className={classes.dateStyle}
            onChange={(e) => {
              {
                onChange(e)
              }
            }}
            inputProps={{
              min: '1900-01-01',
              max: mindestens12jahreAlt,
              style: { color: '#808080' },
            }}
            inputRef={register({
              required: true,
            })}
            InputLabelProps={{ shrink: true }}
            label="Geburtsdatum *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.birthdate}
            helperText={
              errors.birthdate ? 'Bitte geben Sie Ihr Geburtsdatum ein' : null
            }
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            name="street"
            type="text"
            inputRef={register({
              required: true,
              pattern: {
                value: /^(([a-zA-ZäöüÄÖÜ]\D*)\s+\d+?\s*.*)$/,
              },
            })}
            label="Straße und Hausnummer*"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.street}
            helperText={
              errors.street
                ? 'Bitte geben Sie Ihre Straße und Hausnummer an'
                : null
            }
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            name="place"
            type="text"
            inputRef={register({
              required: true,
              pattern: {
                value: /^\D{2,}$/,
              },
            })}
            label="Wohnort *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.place}
            helperText={
              errors.place ? 'Bitte geben Sie Ihren Wohnort ein' : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            name="zip"
            inputRef={register({
              required: true,
              pattern: {
                value: /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/,
              },
            })}
            label="PLZ *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.zip}
            helperText={errors.zip ? 'Bitte geben Sie Ihre PLZ ein' : null}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="phonenumber"
            inputRef={register({
              required: true,
              pattern: {
                value: /^((?:\+\d+)?\s*(?:\(\d+\)\s*(?:[\/–-]\s*)?)?\d+(?:\s*(?:[\s\/–-]\s*)?\d+)*)$/,
              },
            })}
            label="Telefonnummer *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.phonenumber}
            helperText={
              errors.phonenumber
                ? 'Bitte geben Sie Ihre Telefonnummer ein'
                : null
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="insuranceNr"
            inputRef={register({
              required: true,
              pattern: {
                value: /^[A-Z][0-9]{9}$/,
              },
            })}
            label="Krankenversicherungsnummer *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.insuranceNr}
            helperText={
              errors.insuranceNr
                ? 'Bitte geben Sie Ihre Krankenversicherungsnummer ein'
                : null
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="email"
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
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="password"
            type="password"
            inputRef={register({
              required: true,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              },
            })}
            label="Passwort *"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.password}
            helperText={
              errors.password
                ? 'Bitte geben Sie mindestens 8-stelliges Passwort ein (mindestens ein Buchstabe und eine Zahl)'
                : null
            }
          />
        </Grid>
      </Grid>

      {/* //Snackbar aufruf hier, weil JSX */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/">
            {/* Home-Button */}
            <Button type="button" variant="outlined" color="primary" fullWidth>
              Zurück zur Startseite
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Submit-Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Account erstellen
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default RegisterForm
