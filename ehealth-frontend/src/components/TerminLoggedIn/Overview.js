import React, { useContext } from 'react'
import {
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core'
import { TerminContext } from '../ContextProvider/TerminProvider'
import { createAppointment } from '../../api/appointment'
import { useForm } from 'react-hook-form'
import { useFirebase } from '../../firebase'
import { format } from 'date-fns'
import emailjs from 'emailjs-com'

const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: 10,
  },
  overview: {
    marginTop: 35,
  },
  entry: {
    margin: 5,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  oddRow: {
    backgroundColor: '#F2F2F2',
  },
  divider: {
    marginTop: 5,
    marginBottom: 15,
  } /*
  bigRow: {
    backgroundColor: '#F2F2F2',
    [theme.breakpoints.down('xs')]: { minHeight: 85 },
    [theme.breakpoints.down('sm')]: { minHeight: 82 },
    [theme.breakpoints.down('md')]: { minHeight: 82 },
    [theme.breakpoints.down('lg')]: { minHeight: 82 },
    //[theme.breakpoints.down('xl')]: { minHeight: 57 },
  },*/,
}))

const Overview = (props) => {
  const { dateRef, userRef, anamneseRef } = useContext(TerminContext)
  const { currentUser } = useFirebase()
  const { handleSubmit } = useForm()
  const classes = useStyles()

  //übergabe der Daten
  const onSubmit = async () => {
    const data = {
      ...userRef.current,
      ...dateRef.current,
      ...anamneseRef.current,
    }
    //Umwandeln der Uhrzeit und des Datums
    data.date = format(dateRef.current.date, 'yyyy-MM-dd')
    data.time = format(dateRef.current.time, 'HH:mm:ss')

    //Weiterstellen des Steppers
    if (currentUser) data.userId = currentUser.uid
    props.setActiveStep((step) => step + 1)
    await createAppointment({ ...data })
      .then(() =>
        //Email an den User bei erfolgreicher Terminanfrage
        sendMail(data)
      )
      .catch((err) => console.log(err))
  }

  //brief: Email an den User bei erfolgreicher Terminanfrage
  const sendMail = (data) => {
    const { email, doctor, firstname, lastname, time, subject } = data
    const date = format(dateRef.current.date, 'dd.MM.yyyy')
    emailjs
      .send(
        'service_udrl9a7',
        'template_fsniud9',
        {
          email,
          doctor,
          firstname,
          lastname,
          date,
          time,
          subject,
        },
        'user_lfZ5e7vxGfXHseee5HOX2'
      )
      .catch((error) => {
        console.log(error)
      })
  }

  const printList = (array) => {
    const { length } = array
    return array.reduce((result, value, i) => {
      if (i < length - 1) {
        result.push(value, ', ')
      } else {
        result.push(value)
      }
      return result
    }, [])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="center" spacing={3}>
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
            Wenn Ihnen Fehler in den unten angegebenen Daten auffallen, können
            Sie diese beheben indem Sie mit den sich unten links befindenden
            Button "Zürück" zum gewünschten Formular zurück navigieren können.
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="flex-start" spacing={3}>
        <Grid item xs={12} md={10}>
          <Grid
            className={classes.overview}
            container
            justify="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Ihr Termin
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Anliegen:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {dateRef.current['subject']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Datum:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {format(dateRef.current.date, 'dd.MM.yyyy')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Uhrzeit:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {format(dateRef.current.time, 'HH:mm:ss')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Arzt:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {dateRef.current['doctor']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Terminart:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {dateRef.current['type']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid
            className={classes.overview}
            container
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Ihr Anamnesebogen
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>

            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Hatten Sie Kontakt mit einer auf Corona positiv getesteten
                Person?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['conronaContact'] === 'true'
                  ? ' Ja'
                  : ' Nein'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Haben Sie Alergien?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['alergies'] === 'true'
                  ? ' ' + anamneseRef.current['alergiesText']
                  : ' Nein'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Sind Sie in den letzten zwei Wochen verreist?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['traveled'] === 'true' ? ' Ja' : ' Nein'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Rauchen Sie?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['smoke'] === 'true' ? ' Ja' : ' Nein'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Waren Sie in Menschenmassen?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['crowd'] === 'true' ? ' Ja' : ' Nein'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Trinken Sie Alkohol?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['alcohol'] === 'true' ? ' Ja' : ' Nein'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Medikamente die Sie aktuell nehmen:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['drugs'].length == 0
                  ? 'Keine'
                  : anamneseRef.current['drugs']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Sind Sie schwanger?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['pregnant'] === 'true'
                  ? ' ' + anamneseRef.current['pregnantText']
                  : ' Nein'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Vorerkrankungen:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['diseases'].length === 0
                  ? 'Keine'
                  : printList(anamneseRef.current['diseases']).map((value) => {
                      return value
                    })}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Extra Vorerkrankungen:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {anamneseRef.current['otherDiseases'] &&
                anamneseRef.current['otherDiseases'].length !== 0
                  ? anamneseRef.current['otherDiseases']
                  : 'Keine'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid
            className={classes.overview}
            container
            justify="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Persönlichen Angaben
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Geschlecht:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['gender'] === 'female' && ' Weiblich'}
                {userRef.current['gender'] === 'male' && ' Männlich'}
                {userRef.current['gender'] === 'other' && ' Divers'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Vorname:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['firstname']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Nachname:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['lastname']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Straße:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['street']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Postleitzahl:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['zip']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Stadt:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['place']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Versichertennummer:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['insuranceNr']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                Telefonnummer:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.oddRow}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['phonenumber']}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="left"
              >
                E-Mail Adresse:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                className={classes.entry}
                variant="body1"
                align="right"
              >
                {userRef.current['email']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={12}>
          <TextField style={{ width: '0px' }}> </TextField>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={4} sm={3} md={2}>
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
        <Grid item xs={4} sm={3} md={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Absenden
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Overview
