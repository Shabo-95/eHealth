import React, { useEffect, useState } from 'react'
import BoxLayout from '../Layouts/BoxLayout'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DateFnsUtils from '@date-io/date-fns'
import emailjs from 'emailjs-com'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import { deleteAppointment, getAllAppointment } from '../../api/appointment'
import { format } from 'date-fns'
import { Button, Divider, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import AppointmentBox from './AppointmentBox'
import LoadingContainer from '../LoadingContainer/LoadingContainer'
import { makeStyles } from '@material-ui/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import deLocale from 'date-fns/locale/de'

//An array that represents the days of the week
const weekDay = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
]
//An array that represents the months of the year
const months = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
]

//The Styles to be used in this component
const useStyles = makeStyles((theme) => ({
  icon: {
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  headerBox: {
    marginTop: 30,
    marginBottom: 10,
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  appointments: {
    marginTop: 15,
    marginBottom: 15,
  },
  subHeader: {
    marginBottom: 15,
  },
  dateFont: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.95rem',
    },
  },
  noAppointment: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  dialogContainer: {
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: 1.5,
  },
}))

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

//The component is defined here
const AllAppointsmentsBox = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [doctor, setDoctor] = useState('alle')
  const [appointments, setApppointments] = useState()
  const [fiveDays, setFiveDays] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dayOne, setDayOne] = useState([])
  const [dayTwo, setDayTwo] = useState([])
  const [dayThree, setDayThree] = useState([])
  const [dayFour, setDayFour] = useState([])
  const [dayFive, setDayFive] = useState([])
  const [showSnackBar, setShowSnackBar] = useState(false)
  const classes = useStyles()
  const allDoctors = [
    'Dr. Anna Müller',
    'Dr. Jonathan Schmidt',
    'Dr. Hendrik Wolf',
    'Dr. Lisa Scheuer',
  ]

  //A function to fetch all the appointments
  useEffect(() => {
    let sub = true
    const fetchAppointments = async () => {
      sub && setLoading(true)
      await getAllAppointment()
        .then((data) => {
          sub && setApppointments(data)
          sub && setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          sub && setLoading(false)
        })
    }
    fetchAppointments()
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0)
      sub && setSelectedDate(nextDay(selectedDate))
    return () => {
      sub = false
    }
  }, [])

  //A function to distribute the appointments
  //on the calendar based on their dates
  useEffect(() => {
    let sub = true
    if (appointments) {
      sub && setDayOne(getAppointments(selectedDate))
      sub && setDayTwo(getAppointments(nextDay(selectedDate)))
      sub && setDayThree(getAppointments(nextDay(nextDay(selectedDate))))
      sub &&
        setDayFour(getAppointments(nextDay(nextDay(nextDay(selectedDate)))))
      sub &&
        setDayFive(
          getAppointments(nextDay(nextDay(nextDay(nextDay(selectedDate)))))
        )
    }
    return () => {
      sub = false
    }
  }, [selectedDate, appointments, doctor])

  //A function to filter the appointments based on the selected doctor
  const getAppointments = (date) => {
    return Object.keys(appointments).filter((key) => {
      return (
        (appointments[key].doctor === doctor || doctor === 'alle') &&
        appointments[key].date === format(date, 'yyyy-MM-dd')
      )
    })
  }

  //A function that returns the next day on the calendar
  const nextDay = (date) => {
    const newDate = new Date(date.getTime())
    const day = date.getDay()
    let add = 1
    if (day === 5) add = 3
    else if (day === 6) add = 2
    newDate.setDate(newDate.getDate() + add)
    return newDate
  }

  //A function that returns the previous day on the calendar
  const previousDay = (date) => {
    const newDate = new Date(date.getTime())
    const day = date.getDay()
    let substract = -1
    if (day === 0) substract = -2
    else if (day === 1) substract = -3
    newDate.setDate(newDate.getDate() + substract)
    return newDate
  }

  //A function to view the date range on the calendar
  const printDateRange = (date) => {
    return `${weekDay[date.getDay()]}, ${date.getDate()}. ${
      months[date.getMonth()]
    }`
  }

  //A function to view the date in a proper way
  const printDate = (date) => {
    return (
      <div className={classes.subHeader}>
        <Typography className={classes.dateFont} variant="h5" align="center">
          {weekDay[date.getDay()]},
        </Typography>
        <Typography className={classes.dateFont} variant="h5" align="center">
          {date.getDate()}. {months[date.getMonth()]}
        </Typography>
      </div>
    )
  }

  //A function that returns an AppointmentBox
  //component for the selected appointment
  const printAppointment = (key) => {
    return (
      <Grid item xs={12} key={key}>
        <AppointmentBox data={appointments[key]} deleteMe={deleteChild} />
      </Grid>
    )
  }

  //Gets User information for sendMail through the passed user id
  const getAppointmentByid = (id) => {
    let result
    Object.keys(appointments).forEach((appointment) => {
      if (appointments[appointment].id === id)
        result = appointments[appointment]
    })

    return result
  }

  //A function to send an email to inform the patient
  //when something has changed about the appointment
  function sendMail(data) {
    const { lastname, firstname, type, email, date, time, doctor } = data

    emailjs
      .send(
        'service_tsgngnk',
        'template_n1hgk95',
        {
          firstname,
          lastname,
          date: format(new Date(date), 'dd.MM.yyyy'),
          time,
          doctor,
          type,
          email,
        },
        'user_D7fm6sKn3jOeQWZZ4vZNp'
      )
      .catch((error) => {
        console.log(error.text)
      })
  }

  //A function to delete an appointment and update the calendar
  const deleteChild = (id) => {
    deleteAppointment(id)
    sendMail(getAppointmentByid(id))

    setApppointments(
      Object.keys(appointments)
        .filter((i) => appointments[i].id !== id)
        .map((i) => appointments[i])
    )
    setShowSnackBar(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowSnackBar(false)
  }

  function filterWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6
  }

  //The actual component is returned here
  return (
    <BoxLayout title={'Alle Termine'}>
      <Grid container justify="space-between" alignItems="center">
        {/* A DatePicker to show the appointments on a certain day */}
        <Grid item xs={3} md={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
            <KeyboardDatePicker
              disableToolbar
              PopoverProps={{ disableScrollLock: true }}
              shouldDisableDate={filterWeekends}
              variant="inline"
              margin="normal"
              id="datum"
              label="Datum"
              format="dd.MM.yyyy"
              value={selectedDate}
              onChange={(e) => {
                e.setSeconds(0)
                setSelectedDate(e)
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                style: { padding: 0 },
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        {/* A Button to switch the calendar to the 3-Days-View */}
        <Grid item xs={2}>
          <Button
            color="primary"
            variant={!fiveDays ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => setFiveDays(false)}
          >
            3-Tages-Ansicht
          </Button>
        </Grid>

        {/* A Button to switch the calendar to the 5-Days-View */}
        <Grid item xs={2}>
          <Button
            color="primary"
            variant={fiveDays ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => setFiveDays(true)}
          >
            5-Tages-Ansicht
          </Button>
        </Grid>

        {/* A select for picking the doctor  */}
        <Grid item xs={3} md={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="arztLabel">Doktor</InputLabel>
            <Select
              labelId="arztLabel"
              id="arzt"
              value={doctor}
              onChange={(e) => {
                setDoctor(e.target.value)
              }}
              label="Doktor"
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value={'alle'}>Alle </MenuItem>
              {allDoctors &&
                allDoctors.map((doc, key) => {
                  return (
                    <MenuItem name={doc} key={key} value={doc}>
                      {doc}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/*The list of "DokumentBar" is filtered and viewed here*/}
      <Grid
        className={classes.headerBox}
        container
        justify="space-between"
        alignItems="center"
      >
        {/* An Icon to move to the previous day */}
        <Grid item xs={1}>
          <div
            className={classes.icon}
            onClick={() => setSelectedDate(previousDay(selectedDate))}
          >
            <ArrowBackIosIcon />
          </div>
        </Grid>

        {/* The date range is viewed here */}
        <Grid item xs={10}>
          <Typography className={classes.header} variant="h4" align="center">
            {`${printDateRange(selectedDate)} - ${
              fiveDays
                ? printDateRange(
                    nextDay(nextDay(nextDay(nextDay(selectedDate))))
                  )
                : printDateRange(nextDay(nextDay(selectedDate)))
            }`}
          </Typography>
        </Grid>

        {/* An Icon to move to the next day */}
        <Grid item xs={1}>
          <div
            className={classes.icon}
            onClick={() => setSelectedDate(nextDay(selectedDate))}
          >
            <ArrowForwardIosIcon />
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {/* A LoadingContainer that is viewed while the appointments are being loaded */}
      {loading ? (
        <LoadingContainer />
      ) : (
        <Grid
          className={classes.appointments}
          container
          justify="space-between"
          alignItems="flex-start"
        >
          {/* The first column on the calendar */}
          <Grid container justify="space-between">
            <Grid item xs={fiveDays ? 2 : 3}>
              {printDate(selectedDate)}

              {appointments && dayOne.length > 0 ? (
                dayOne.map((key) => {
                  return printAppointment(key)
                })
              ) : (
                //If there is no appointment on this day, then show this text
                <Typography
                  className={classes.noAppointment}
                  variant="body1"
                  align="center"
                >
                  Keine Termine
                </Typography>
              )}
            </Grid>
            <div>
              <Divider orientation="vertical" />
            </div>
            {/* The second column on the calendar */}
            <Grid item xs={fiveDays ? 2 : 3}>
              {printDate(nextDay(selectedDate))}

              {appointments && dayTwo.length > 0 ? (
                dayTwo.map((key) => {
                  return printAppointment(key)
                })
              ) : (
                //If there is no appointment on this day, then show this text
                <Typography
                  className={classes.noAppointment}
                  variant="body1"
                  align="center"
                >
                  Keine Termine
                </Typography>
              )}
            </Grid>
            <div>
              <Divider orientation="vertical" />
            </div>
            {/* The third column on the calendar */}
            <Grid item xs={fiveDays ? 2 : 3}>
              {printDate(nextDay(nextDay(selectedDate)))}

              {appointments && dayThree.length > 0 ? (
                dayThree.map((key) => {
                  return printAppointment(key)
                })
              ) : (
                //If there is no appointment on this day, then show this text
                <Typography
                  className={classes.noAppointment}
                  variant="body1"
                  align="center"
                >
                  Keine Termine
                </Typography>
              )}
            </Grid>
            {fiveDays && (
              <>
                <div>
                  <Divider orientation="vertical" />
                </div>
                {/* The forth column on the calendar */}
                <Grid item xs={fiveDays ? 2 : 3}>
                  {printDate(nextDay(nextDay(nextDay(selectedDate))))}

                  {appointments && dayFour.length > 0 ? (
                    dayFour.map((key) => {
                      return printAppointment(key)
                    })
                  ) : (
                    //If there is no appointment on this day, then show this text
                    <Typography
                      className={classes.noAppointment}
                      variant="body1"
                      align="center"
                    >
                      Keine Termine
                    </Typography>
                  )}
                </Grid>
                <div>
                  <Divider orientation="vertical" />
                </div>
                {/* The fifth column on the calendar */}
                <Grid item xs={fiveDays ? 2 : 3}>
                  {printDate(nextDay(nextDay(nextDay(nextDay(selectedDate)))))}

                  {appointments && dayFive.length > 0 ? (
                    dayFive.map((key) => {
                      return printAppointment(key)
                    })
                  ) : (
                    //If there is no appointment on this day, then show this text
                    <Typography
                      className={classes.noAppointment}
                      variant="body1"
                      align="center"
                    >
                      Keine Termine
                    </Typography>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      )}
      {/* //Snackbar bei erfolgreicher absage */}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={() => setShowSnackBar(false)} severity="success">
          Der Termin wurde erfolgreich abgesagt.
        </Alert>
      </Snackbar>
    </BoxLayout>
  )
}

export default AllAppointsmentsBox
