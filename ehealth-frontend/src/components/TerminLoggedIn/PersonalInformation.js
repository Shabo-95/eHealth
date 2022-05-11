import {
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TerminContext } from '../ContextProvider/TerminProvider'
import { UserContext } from '../ContextProvider/UserProvider'

const useStyles = makeStyles({
  description: {
    marginTop: 10,
  },
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

const PersonalInformation = (props) => {
  const { register, handleSubmit, getValues, control, errors } = useForm()
  const userContext = useContext(UserContext)
  const { userRef } = useContext(TerminContext)
  const classes = useStyles()
  const user = userContext ? userContext.user : undefined

  const onSubmit = () => {
    userRef.current = getValues()
    props.setActiveStep((step) => step + 1)
  }

  var date = new Date().getDate() //To get the Current Date
  var month = new Date().getMonth() + 1 //To get the Current Month
  var year = new Date().getFullYear() //To get the Current Year

  //Mindestalter für die registrierung
  var mindestens12jahreAlt = year - 12 + '-' + month + '-' + date

  //Korrektheit der Daten überprüfen
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} direction="row" justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Bitte Überprüfen Sie Ihre Angaben
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography
            className={classes.description}
            variant="body1"
            align="center"
          >
            Bitte ergänzen Sie wenn nötig Ihre Kontaktdaten
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Anrede</FormLabel>
          <Controller
            name="gender"
            defaultValue={
              user
                ? user.gender
                : userRef.current
                ? userRef.current.gender
                : 'female'
            }
            rules={{ required: true }}
            control={control}
            as={
              <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  disabled={!!user}
                  label="Frau"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  disabled={!!user}
                  label="Herr"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  disabled={!!user}
                  label="Divers"
                />
              </RadioGroup>
            }
          />
        </Grid>
        <Grid item xl={5} md={6} xs={12}>
          <TextField
            name="firstname"
            type="text"
            inputRef={register({
              required: true,
              pattern: {
                value: /^([^0-9]*)$/,
              },
            })}
            defaultValue={
              user
                ? user.firstname
                : userRef.current
                ? userRef.current.firstname
                : ''
            }
            label="Vorname *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.firstname}
            helperText={
              errors.firstname ? 'Bitte geben Sie Ihren Vornamen ein' : null
            }
          />
        </Grid>
        <Grid item xl={5} md={6} xs={12}>
          <TextField
            name="lastname"
            type="text"
            inputRef={register({
              required: true,
              pattern: {
                value: /^([^0-9]*)$/,
              },
            })}
            defaultValue={
              user
                ? user.lastname
                : userRef.current
                ? userRef.current.lastname
                : ''
            }
            label="Nachname *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.lastname}
            helperText={
              errors.lastname ? 'Bitte geben Sie Ihren Nachnamen ein' : null
            }
          />
        </Grid>
        <Grid item xl={2} md={3} xs={12}>
          <TextField
            name="birthdate"
            className={classes.dateStyle}
            type="date"
            inputRef={register({
              required: true,
            })}
            label="Geburtsdatum *"
            defaultValue={
              user
                ? user.birthdate
                : userRef.current
                ? userRef.current.birthdate
                : null
            }
            inputProps={{
              min: '1900-01-01',
              max: mindestens12jahreAlt,
              style: { color: !!user ? '#bdbdbd' : '#808080' },
            }}
            onChange={(e) => {
              onChange(e)
            }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.birthdate}
            helperText={
              errors.birthdate ? 'Bitte geben Sie Ihr Geburtsdatum ein' : null
            }
          />
        </Grid>
        <Grid item xl={5} md={5} xs={12}>
          <TextField
            name="street"
            type="text"
            inputRef={register({ required: true })}
            defaultValue={
              user ? user.street : userRef.current ? userRef.current.street : ''
            }
            label="Straße und Hausnummer*"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.street}
            helperText={
              errors.street
                ? 'Bitte geben Sie Ihre Straße und Hausnummer an'
                : null
            }
          />
        </Grid>
        <Grid item xl={5} md={4} xs={12}>
          <TextField
            name="place"
            type="text"
            inputRef={register({ required: true })}
            defaultValue={
              user ? user.place : userRef.current ? userRef.current.place : ''
            }
            label="Wohnort *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
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
            defaultValue={
              user ? user.zip : userRef.current ? userRef.current.zip : ''
            }
            label="PLZ *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.zip}
            helperText={errors.zip ? 'Bitte geben Sie Ihre PLZ ein' : null}
          />
        </Grid>
        <Grid item xl={6} md={4} xs={12}>
          <TextField
            name="phonenumber"
            inputRef={register({
              required: true,
            })}
            defaultValue={
              user
                ? user.phonenumber
                : userRef.current
                ? userRef.current.phonenumber
                : ''
            }
            label="Telefonnummer *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.phonenumber}
            helperText={
              errors.phonenumber
                ? 'Bitte geben Sie Ihre Telefonnummer ein'
                : null
            }
          />
        </Grid>
        <Grid item xl={6} md={6} xs={12}>
          <TextField
            name="insuranceNr"
            inputRef={register({
              required: true,
            })}
            defaultValue={
              user
                ? user.insuranceNr
                : userRef.current
                ? userRef.current.insuranceNr
                : ''
            }
            label="Krankenversicherungsnummer *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
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
            defaultValue={
              user ? user.email : userRef.current ? userRef.current.email : ''
            }
            label="Email *"
            variant="outlined"
            margin="normal"
            fullWidth
            disabled={!!user}
            error={!!errors.email}
            helperText={
              errors.email ? 'Bitte geben Sie Ihre Email Adresse ein' : null
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={4} sm={3} xl={2}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => props.handleBack()}
          >
            Zurück
          </Button>
        </Grid>
        <Grid item xs={4} sm={3} xl={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Weiter
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PersonalInformation
