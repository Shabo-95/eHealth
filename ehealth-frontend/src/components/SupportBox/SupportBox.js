import { React, useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import {
  Button,
  FormLabel,
  Grid,
  Radio,
  TextField,
  FormControlLabel,
  Divider,
  Typography,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
const useStyles = makeStyles({
  error: { color: 'red' },
  buttonContainer: { padding: '0 20px 30px 20px' },
  button: { marginTop: 15 },
})

const SupportBox = () => {
  const [email, setEmail] = useState(true)
  const [telefon, setTelefon] = useState(false)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const { errors, handleSubmit, register } = useForm()
  const history = useHistory()
  const classes = useStyles()

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  //Snackbar verschwindet nach 4500 ms
  useEffect(() => {
    if (showSnackBar) {
      setTimeout(() => {
        history.push('/')
      }, 4500)
    }
  }, [showSnackBar])

  //Öffnet Snackbar
  const handleSnackOpen = () => {
    setShowSnackBar(true)
  }

  //Schließt Snackbar beim wegklicken
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowSnackBar(false)
  }

  //Anzeigen der Snackbar und senden der Email an den Patienten
  const onSubmit = (data) => {
    handleSnackOpen()
    sendMail(data)
  }

  //Setzt den Rückmelde Wunsch
  const handleEmail = () => {
    setEmail(!email)
    setTelefon(false)
  }

  //Setzt den Rückmelde Wunsch
  const handleTelefon = () => {
    setTelefon(!telefon)
    setEmail(false)
  }

  //Sendet eine Bestätigungsemail an den Patienten
  function sendMail(data) {
    const anliegen = data.anliegen
    const lastname = data.lastname
    const firstname = data.firstname
    const beschreibungAnliegen = data.beschreibungAnliegen
    const telefon = data.telefon
    const email = data.email

    emailjs
      .send(
        'service_tsgngnk',
        'template_qx1wvi3',
        { anliegen, lastname, firstname, beschreibungAnliegen, telefon, email },
        'user_D7fm6sKn3jOeQWZZ4vZNp'
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} justify="space-around" alignItems="center">
        <Grid item xs={10}>
          <Typography variant="h6" align="center">
            Wenn Sie noch Fragen haben, können Sie sich gerne über dieses
            Formular bei uns Melden. Wir werden Ihnen so schnell wie möglich
            Antworten.
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            name="anliegen"
            inputRef={register({
              required: true,
            })}
            type="text"
            label="Anliegen *"
            margin="normal"
            fullWidth
            helperText={
              errors.anliegen && (
                <div className={classes.error}>
                  Bitte geben Sie Ihr Anliegen an.
                </div>
              )
            }
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <TextField
            name="firstname"
            inputRef={register({
              required: true,
              pattern: {
                value: /^([^0-9]*)$/,
              },
            })}
            type="text"
            label="Vorname *"
            margin="normal"
            fullWidth
            helperText={
              errors.firstname && (
                <div className={classes.error}>
                  Bitte geben Sie Ihren richtigen Vornamen an.{' '}
                </div>
              )
            }
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <TextField
            name="lastname"
            inputRef={register({
              required: true,
              pattern: {
                value: /^([^0-9]*)$/,
              },
            })}
            type="text"
            label="Nachname *"
            margin="normal"
            fullWidth
            helperText={
              errors.lastname && (
                <div className={classes.error}>
                  Bitte geben Sie Ihren richtigen Nachnamen an.
                </div>
              )
            }
          />
        </Grid>

        <Grid item xs={10} md={5}>
          <FormLabel component="legend">
            Auf welchem Weg möchten Sie von uns kontaktiert werden?
          </FormLabel>

          <Grid item xs={10} md={6}>
            <FormControlLabel
              checked={email}
              value="E-Mail"
              control={<Radio color="primary" />}
              label="E-Mail"
              onChange={() => handleEmail()}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <FormControlLabel
              checked={telefon}
              value="Rückruf"
              control={<Radio color="primary" />}
              label="Rückruf"
              onChange={() => handleTelefon()}
            />
          </Grid>
        </Grid>
        <Grid item xs={10} md={3}>
          {telefon && (
            <TextField
              name="telefon"
              inputRef={register({
                required: true,
                pattern: {
                  value: /^((?:\+\d+)?\s*(?:\(\d+\)\s*(?:[\/–-]\s*)?)?\d+(?:\s*(?:[\s\/–-]\s*)?\d+)*)$/,
                },
              })}
              label="Telefonnummer:"
              fullWidth
              helperText={
                errors.telefon && (
                  <div className={classes.error}>
                    Bitte geben Sie Ihre richtige Telefonnummer an.
                  </div>
                )
              }
            />
          )}
          {email && (
            <TextField
              name="email"
              inputRef={register({
                required: true,
                pattern: {
                  value: /(.+)@(.+){2,}\.(.+){2,}/,
                },
              })}
              label="E-Mail:"
              fullWidth
              helperText={
                errors.email && (
                  <div className={classes.error}>
                    Bitte geben Sie Ihre richtige Email an.
                  </div>
                )
              }
            />
          )}
        </Grid>
        <Grid item xs={10}>
          <TextField
            name="beschreibungAnliegen"
            inputRef={register({ required: true })}
            type="text"
            variant="outlined"
            label="Beschreibung Ihres Anliegens *"
            margin="normal"
            fullWidth
            multiline
            rows={6}
            helperText={
              errors.beschreibungAnliegen && (
                <div className={classes.error}>
                  Bitte beschreiben sie Ihr Anliegen.
                </div>
              )
            }
          />
        </Grid>
        <Grid
          container
          justify="space-between"
          className={classes.buttonContainer}
        >
          <Grid item xs={12}>
            <TextField style={{ width: '0px' }}> </TextField>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Snackbar
            open={showSnackBar}
            autoHideDuration={4000}
            onClose={handleSnackClose}
          >
            <Alert onClose={handleSnackClose} severity="success">
              Ihre Anfrage wurde erfolgreich Weitergeleitet!
            </Alert>
          </Snackbar>
          <Grid item xs={4} sm={3} md={2}>
            <Link to="/">
              <Button
                className={classes.button}
                type="button"
                variant="outlined"
                color="primary"
                fullWidth
              >
                Zurück
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4} sm={3} md={2}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Absenden
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default SupportBox
