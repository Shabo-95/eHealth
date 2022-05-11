import React, { useContext, useEffect, useRef, useState } from 'react'
import firebase from 'firebase/app'
import {
  Button,
  Snackbar,
  TextField,
  InputLabel,
  Grid,
  Divider,
  Tooltip,
  makeStyles,
  Typography,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import IconButtonContent from '../IconButtonContent/IconButtonContent'
import InfoIcon from '@material-ui/icons/Info'
import { UserContext } from '../ContextProvider/UserProvider'
import { FormRow } from './FormRow'
import { useForm } from 'react-hook-form'
import Loader from '../Loader/Loader'
import { updateUser } from '../../api/users'
import { useFirebase } from '../../firebase'

/* Styling Code (CSS) */
const useStyles = makeStyles((theme) => ({
  label2: {
    marginTop: 5,
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: { textAlign: 'center' },
  },
  saveButton: {
    marginTop: 30,
  },
  infoButtonContainer: {
    textAlign: 'center',
  },
  infoButton: {
    border: 'none !important',
    textAlign: 'center',
    minWidth: 100,
    padding: 6,
  },
  personalDivider: {
    marginTop: 5,
    marginBottom: 5,
  },
  gridContainer: {
    padding: 6,
  },
}))

/* Diese Funktion ist dafür da, um das Snackbar zu erzeugen */
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const PersonalDataForm = () => {
  const { user, setUser } = useContext(UserContext)
  const { currentUser } = useFirebase()
  const [userData, setUserData] = useState()
  const [inputRules, setInputRules] = useState()
  const [edits, setEdits] = useState([])
  const success = useRef()
  const { register, handleSubmit, getValues, setValue, errors } = useForm()
  const nonEditAble = ['gender', 'firstname', 'lastname']
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const openSnackbar = (bool) => {
    success.current = bool
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  /* Hier werden die Daten von Datembank geholt */
  useEffect(() => {
    let sub = true
    if (user) {
      const data = {
        place: user.place,
        street: user.street,
        zip: user.zip,
        phonenumber: user.phonenumber,
        insuranceNr: user.insuranceNr,
        email: user.email,
      }

      /* Regex für Users Eingabe */
      const rules = {
        place: {
          regex: { value: /^\D{2,}$/ },
          helperText: 'Stadt und Hausnummer erwartet',
        },
        street: {
          regex: { value: /^(([a-zA-ZäöüÄÖÜ]\D*)\s+\d+?\s*.*)$/ },
          helperText: 'Straße und Hausnummer erwartet',
        },
        zip: {
          regex: { value: /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/ },
          helperText: '5-stellige Postleitzahl erwartet',
        },
        phonenumber: {
          regex: {
            value: /^((?:\+\d+)?\s*(?:\(\d+\)\s*(?:[\/–-]\s*)?)?\d+(?:\s*(?:[\s\/–-]\s*)?\d+)*)$/,
          },
          helperText: 'Telefon-/Mobilnummer erwartet',
        },
        insuranceNr: {
          regex: { value: /^[A-Z][0-9]{9}$/ },
          helperText: 'Krankenversicherungsnummer erwartet',
        },
        email: {
          regex: { value: /(.+)@(.+){2,}\.(.+){2,}/ },
          helperText: 'Email Adresse erwartet',
        },
      }

      const result = []
      Object.keys(data).map(() => {
        result.push(false)
      })
      sub && setEdits(result)
      sub && setUserData(data)
      sub && setInputRules(rules)
    }

    return () => (sub = false)
  }, [user])

  /* Wenn User auf "Änderung Vornehmen" drückt (bzw. onSubmit) */
  const onSubmit = () => {
    const { password, ...data } = getValues()
    const { email } = data
    if (currentUser) {
      const credentials = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        password
      )
      currentUser
        .reauthenticateWithCredential(credentials)
        .then(() => {
          if (email !== currentUser.email)
            currentUser
              .updateEmail(email)
              .then(() => {
                updateUser(currentUser.uid, { ...data })
                  .then(() => {
                    setUser({ ...user, ...data })
                    /* Snackbar zeigen mit erfolg*/
                    openSnackbar(true)
                  })
                  .catch(() => {
                    /* Snackbar zeigen mit error*/
                    openSnackbar(false)
                  })
              })
              .catch(() => {
                /* Snackbar zeigen mit error*/
                openSnackbar(false)
              })
          else
            updateUser(currentUser.uid, { ...data })
              .then(() => {
                setUser({ ...user, ...data })
                /* Snackbar zeigen mit erfolg*/
                openSnackbar(true)
              })
              .catch(() => {
                /* Snackbar zeigen mit error*/
                openSnackbar(false)
              })
        })
        .catch(() => {
          /* Snackbar zeigen mit error*/
          openSnackbar(false)
        })
    }
    setValue('password', '')
  }

  const handleDisable = () => {
    const { password, ...data } = getValues()

    return (
      JSON.stringify(data) === JSON.stringify(userData) || edits.includes(true)
    )
  }

  /* Diese Funktion ist dafür da, um das Snackbar zu erzeugen */
  const getAlert = () => {
    switch (success.current) {
      /* Wenn die Eingaben der User nicht gültig sind und/oder das Passwort falsch eingegben ist */
      case false:
        return (
          <Alert onClose={handleClose} severity="error">
            Daten konnten nicht geändert werden
          </Alert>
        )
      case true:
        return (
          /* Wenn die Eingaben der User gültig sind und das Passwort richtig eingegben ist */
          <Alert onClose={handleClose} severity="success">
            Ihre Daten wurden erfolgreich aktualisiert
          </Alert>
        )
      default:
        return
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userData === undefined ? (
        <Loader />
      ) : (
        <Grid container>
          {/* Mithilfe der map funktion werden die Daten aus dem Datenbank geholt und automatisch ausgefüllt */}
          {Object.keys(userData).map((key, index) => {
            return (
              <React.Fragment key={index}>
                {/* Referenz für FormRow.js */}
                <FormRow
                  label={key}
                  data={user[key]}
                  inputRef={register({
                    required: true,
                    pattern: inputRules[key].regex,
                  })}
                  edits={edits}
                  setEdits={setEdits}
                  disabled={nonEditAble.includes(key)}
                  error={!!errors[key]}
                  helperText={errors[key] ? inputRules[key].helperText : null}
                />
                <Grid item xs={12}>
                  <Divider className={classes.personalDivider} />
                </Grid>
              </React.Fragment>
            )
          })}
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={4}>
              {/* Lable für das Passwort */}
              <InputLabel className={classes.label2}>Passwort:</InputLabel>
            </Grid>
            <Grid item xs={12} sm={5}>
              {/* TextField für das Passwort */}
              <TextField
                className={classes.gridContainer}
                name="password"
                type="password"
                inputRef={register({
                  required: true,
                })}
                variant="standard"
                fullWidth
                autoComplete="off"
                error={!!errors.password}
                helperText={
                  errors.password
                    ? 'Passwort zur Bestätigung der Eingaben benötigt'
                    : null
                }
              />
            </Grid>
            <Grid className={classes.infoButtonContainer} item xs={12} sm={3}>
              <Tooltip
                title={
                  <Typography variant="caption">
                    Falls Sie Ihr Passwort vergessen haben, müssen Sie sich als
                    erstes ausloggen und in der Anmeldebox auf 'Passwort
                    vergessen?' klicken, um Ihr Passwort zu ändern.
                  </Typography>
                }
              >
                <Button
                  className={classes.infoButton}
                  variant={'outlined'}
                  color={'primary'}
                >
                  <IconButtonContent icon={<InfoIcon />} title={'Info'} />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      )}
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4}>
          {/* Submit Button */}
          <Button
            type="submit"
            className={classes.saveButton}
            variant="contained"
            color={'primary'}
            fullWidth
            disabled={handleDisable()}
          >
            Änderung vornehmen
          </Button>
        </Grid>
      </Grid>
      {/* Snackbar zeigen */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {getAlert()}
      </Snackbar>
    </form>
  )
}

export default PersonalDataForm
