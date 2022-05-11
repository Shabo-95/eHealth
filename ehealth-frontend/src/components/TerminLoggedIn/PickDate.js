import React, { useContext, useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  isBefore,
  isAfter,
  isSameDay,
  addMinutes,
  isToday,
  roundToNearestMinutes,
} from 'date-fns'
import deLocale from 'date-fns/locale/de'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers'
import { Button, Divider, Grid, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { TerminContext } from '../ContextProvider/TerminProvider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import _default from '@material-ui/pickers/views/Calendar/Calendar'
import { getAllAppointment } from '../../api/appointment'
import { format, isPast, parse } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

//The Styles to be used in this component
const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: 10,
  },
  inputGrid: {
    textAlign: 'center',
  },
  input: {
    minWidth: '250px',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  divider: {
    marginTop: 5,
    marginBottom: 15,
  },
}))

//The component is created here
const PickDate = (props) => {
  const { handleSubmit, register, setValue, errors, control } = useForm({
    reValidateMode: 'onChange',
  })
  const { dateRef } = useContext(TerminContext)

  const [selectedDate, setSelectedDate] = useState(
    dateRef.current
      ? dateRef.current.date
      : roundToNearestMinutes(new Date(), { nearestTo: 5 })
  )
  const [selectedTime, setSelectedTime] = useState(
    dateRef.current
      ? dateRef.current.time
      : roundToNearestMinutes(new Date(), { nearestTo: 5 })
  )
  const [anliegen, setAnliegen] = useState(
    dateRef.current ? dateRef.current.subject : ''
  )
  const [doctor, setDoctor] = useState(
    dateRef.current ? dateRef.current.doctor : ''
  )
  const [validateTime, setValidateTime] = useState(
    dateRef.current ? true : false
  )
  const [appointments, setApppointments] = useState()
  const [appointmentType, setAppointmentType] = useState('Routineuntersuchung')
  const [appointmentDuration, setAppointmentDuration] = useState(15)
  const classes = useStyles()

  const allDoctors = [
    'Dr. Anna Müller',
    'Dr. Jonathan Schmidt',
    'Dr. Hendrik Wolf',
    'Dr. Lisa Scheuer',
  ]

  //Here we can set the opening hours (From - To)
  const openingHours = [
    [
      new Date('December 7, 2020 08:00:00'),
      new Date('December 7, 2020 12:00:00'),
    ],
    [
      new Date('December 7, 2020 13:00:00'),
      new Date('December 7, 2020 18:00:00'),
    ],
  ]

  //A function to fetch the appointments of the selected doctor from the Database
  useEffect(() => {
    let sub = true

    const fetchAppointments = async () => {
      await getAllAppointment()
        .then((data) => {
          sub && setApppointments(data)
        })
        .catch((err) => console.log(err))
    }
    fetchAppointments()
    if (!dateRef.current) {
      sub && setSelectedDate(nextDay(selectedDate))
      sub && setSelectedTime(nextDay(selectedTime))
    }
    return () => {
      sub = false
    }
  }, [])

  //A function to adapt the opening hours to the selected date
  const openingHoursToday = (openingHours, today) => {
    const hours = openingHours
    hours.forEach((openingHour) => {
      openingHour[0].setFullYear(today.getFullYear())
      openingHour[0].setMonth(today.getMonth())
      openingHour[0].setDate(today.getDate())

      openingHour[1].setFullYear(today.getFullYear())
      openingHour[1].setMonth(today.getMonth())
      openingHour[1].setDate(today.getDate())
    })

    return hours
  }

  //A function to filter the weekends and the days, on which the doctor has no freeTime
  function filterWeekends(date) {
    var free = freeTime(
      openingHoursToday(openingHours, date),
      getDoctorAppointments(doctor, date),
      appointmentDuration
    )
    return (
      isPast(date) ||
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      free[0] === 'Alle termine sind vergeben!'
    )
  }

  //A function to get the next work day
  const nextDay = (date) => {
    const newDate = new Date(date.getTime())
    const day = date.getDay()
    let add = 1
    if (day === 5) add = 3
    else if (day === 6) add = 2
    newDate.setDate(newDate.getDate() + add)
    return newDate
  }

  //A function to handle the selected date
  //Check the appointments of the selected doctor on this day
  //And check if the current selected Time is available
  const handleDateChange = (date) => {
    const dateCopy = date
    dateCopy.setHours(selectedDate.getHours())
    dateCopy.setMinutes(selectedDate.getMinutes())
    setSelectedDate(roundToNearestMinutes(dateCopy, { nearestTo: 5 }))
    setSelectedTime(roundToNearestMinutes(dateCopy, { nearestTo: 5 }))
    setValue('date', roundToNearestMinutes(dateCopy, { nearestTo: 5 }))
    handleSelectedDoctor(doctor, date)
    var validation = validateAppointment(
      dateCopy,
      openingHoursToday(openingHours, dateCopy),
      appointmentDuration,
      getDoctorAppointments(doctor, dateCopy)
    )

    var timePickerLabel = document.getElementById('time-picker-label')

    if (validation === 'Ok') {
      timePickerLabel.innerText = 'Gewählte Uhrzeit'
      timePickerLabel.style.color = 'gray'
      setSelectedDate(roundToNearestMinutes(dateCopy, { nearestTo: 5 }))
      setSelectedTime(roundToNearestMinutes(dateCopy, { nearestTo: 5 }))
      setValue('time', date)
    } else {
      timePickerLabel.innerText = validation
      timePickerLabel.style.color = 'red'
    }
  }

  //A function to handle the selected time
  //Check if the selected time is still available
  const handleSelectedTime = (date, doctorValue) => {
    const dateCopy = roundToNearestMinutes(selectedDate, { nearestTo: 5 })
    dateCopy.setHours(date.getHours())
    dateCopy.setMinutes(date.getMinutes())
    var validation = validateAppointment(
      dateCopy,
      openingHoursToday(openingHours, dateCopy),
      appointmentDuration,
      getDoctorAppointments(doctorValue, dateCopy)
    )

    var timePickerLabel = document.getElementById('time-picker-label')

    if (validation === 'Ok') {
      timePickerLabel.innerText = 'Gewählte Uhrzeit'
      timePickerLabel.style.color = 'gray'
      setValidateTime(true)
      setSelectedTime(dateCopy)
      setSelectedDate(dateCopy)
      setValue('date', date)
      setValue('time', date)
    } else {
      setValidateTime(false)
      timePickerLabel.innerText = validation
      timePickerLabel.style.color = 'red'
    }
  }

  //A function to handle the selected date
  //Change the selected doctor and check if the selected time is still available
  const handleSelectedDoctor = (value, date) => {
    setDoctor(value)
    getDoctorAppointments(value, date)
    handleSelectedTime(date, value)
  }

  //A function to handle the selected type of appointments
  //and set the corresponding appointment duration
  const handleSelectedType = (value) => {
    setAppointmentType(value)
    if (value === 'Routineuntersuchung') {
      setAppointmentDuration(15)
    } else if (value === 'Corona-Test') {
      setAppointmentDuration(10)
    } else if (value === 'Nachkontrolle') {
      setAppointmentDuration(15)
    } else if (value === 'Impftermin') {
      setAppointmentDuration(15)
    } else if (value === 'Blutabnahme') {
      setAppointmentDuration(10)
    } else if (value === 'Gesamtcheckup') {
      setAppointmentDuration(30)
    } else if (value === 'Laborbesprechung') {
      setAppointmentDuration(15)
    }

    handleDateChange(selectedDate)
  }

  //A function to reference the selected information
  const onSubmit = (data) => {
    dateRef.current = {
      ...data,
      doctor: doctor,
      type: appointmentType,
      duration: appointmentDuration,
    }
    props.setActiveStep((step) => step + 1)
  }

  //A set of properties to control the available appointments popover
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const popoverId = open ? 'simple-popover' : undefined
  //_______________________________________________________________

  //A function to get the appointments of the selected doctor on the selected date
  const getDoctorAppointments = (doctor, date) => {
    var doctorAppointments = []
    appointments &&
      Object.keys(appointments)
        .filter((key) => {
          const newDate = new Date(appointments[key].date)
          const splitTime = appointments[key].time.split(':')
          newDate.setHours(splitTime[0])
          newDate.setMinutes(splitTime[1])
          newDate.setSeconds(0)
          return doctor === appointments[key].doctor && isSameDay(date, newDate)
        })
        .map((appointment) => {
          const newDate = new Date(appointments[appointment].date)
          const splitTime = appointments[appointment].time.split(':')
          newDate.setHours(splitTime[0])
          newDate.setMinutes(splitTime[1])
          newDate.setSeconds(0)

          //Changed:
          //A doctor appointment consists now of the appointment and the duration
          //If there is no specified duration, then it will be 15 minutes be default
          var doctorAppointment = []
          doctorAppointment.push(newDate)
          if (appointments[appointment].duration != null) {
            doctorAppointment.push(appointments[appointment].duration)
          } else {
            doctorAppointment.push(15)
          }

          return doctorAppointments.push(doctorAppointment)
        })
    return doctorAppointments
  }

  //A function to check if the selected time is valid and available
  const validateAppointment = (
    selectedAppointment,
    openingHours,
    appointmentDuration,
    doctorAppointments
  ) => {
    //Check if the selected time is during opening hours
    for (let openingHour of openingHours) {
      if (
        //selectedAppointment === openingHour[0] ||
        (selectedAppointment.getHours() === openingHour[0].getHours() &&
          selectedAppointment.getMinutes() === openingHour[0].getMinutes()) ||
        (isAfter(selectedAppointment, openingHour[0]) &&
          isBefore(selectedAppointment, openingHour[1]))
      ) {
        //Check if there is not enough time between the selected time and the closing hours
        if (
          isAfter(
            addMinutes(selectedAppointment, appointmentDuration - 1),
            openingHour[1]
          ) ||
          (isToday(selectedAppointment) && isPast(selectedAppointment))
        ) {
          return 'Zu späte Reservierung'
        }
        //Check if the selected time is not conflicting with another appointment
        for (let doctorAppointment of doctorAppointments) {
          if (
            selectedAppointment === doctorAppointment[0] ||
            (isAfter(
              selectedAppointment,
              addMinutes(doctorAppointment[0], (appointmentDuration - 1) * -1)
            ) &&
              isBefore(
                selectedAppointment,
                addMinutes(doctorAppointment[0], doctorAppointment[1] - 1)
              ))
          ) {
            return 'Terminkollision'
          }
        }

        return 'Ok'
      }
    }

    return 'Ausserhalb userer Öffnungszeiten'
  }

  //A function to get a list of the available appointments on the selected date
  const freeTime = (openingHours, doctorAppointments, appointmentDuration) => {
    var hours = []
    var freeTimes = []

    openingHours.forEach((openingHour) => {
      hours.push(openingHour[0])
      hours.push(openingHour[1])
    })

    doctorAppointments.forEach((appointment) => {
      if (isSameDay(openingHours[0][0], appointment[0]))
        hours.push(appointment[0])
    })

    hours.sort()

    for (var i = 0; i < hours.length; i++) {
      if (hours[i + 1] != null) {
        var difference = hours[i + 1] - hours[i]
        var minutesDifference = Math.floor(difference / 1000 / 60)
        if (minutesDifference > appointmentDuration) {
          var isClosingHour = false
          var isAppointment = false
          var doctorAppointmentDuration = 30
          for (let openingHour of openingHours) {
            if (hours[i] === openingHour[1]) isClosingHour = true
          }
          for (let appointment of doctorAppointments) {
            if (hours[i] === appointment[0]) {
              isAppointment = true
              doctorAppointmentDuration = appointment[1]
            }
          }
          if (
            !isClosingHour &&
            !isAppointment &&
            isBefore(
              hours[i],
              addMinutes(hours[i + 1], appointmentDuration * -1)
            )
          ) {
            freeTimes.push([
              hours[i],
              addMinutes(hours[i + 1], appointmentDuration * -1),
            ])
          } else if (
            !isClosingHour &&
            isAppointment &&
            isBefore(
              addMinutes(hours[i], doctorAppointmentDuration),
              addMinutes(hours[i + 1], appointmentDuration * -1)
            )
          ) {
            freeTimes.push([
              addMinutes(hours[i], doctorAppointmentDuration),
              addMinutes(hours[i + 1], appointmentDuration * -1),
            ])
          }
        }
      }
    }

    var viewFreeTimes = []

    freeTimes.forEach((freeTime) => {
      if (viewTime(freeTime[0]) === viewTime(freeTime[1])) {
        viewFreeTimes.push('Um ' + viewTime(freeTime[0]))
      } else {
        viewFreeTimes.push(
          viewTime(freeTime[0]) + ' bis ' + viewTime(freeTime[1])
        )
      }
    })

    if (viewFreeTimes[0] == null) {
      viewFreeTimes.push('Alle termine sind vergeben!')
    }

    return viewFreeTimes
  }

  //A function to write the time in a proper way
  const viewTime = (date) => {
    if (!date) return ''

    var hours = '' + date.getHours()
    var minutes = '' + date.getMinutes()

    if (hours.length === 1) {
      hours = '0' + hours
    }

    if (minutes.length === 1) {
      minutes = '0' + minutes
    }

    return hours + ':' + minutes
  }

  //The actual component is rendered here
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Ihr Wunschtermin
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography
              className={classes.description}
              variant="body1"
              align="center"
            >
              Bitte wählen Sie das Datum und die Uhrzeit aus, an denen Sie gerne
              kommen möchten.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-between" spacing={4}>
              <Grid className={classes.inputGrid} item xs={12} sm={6}>
                {/* A select for picking the doctor  */}
                <FormControl className={classes.input} variant="standard">
                  <InputLabel htmlFor="arzt">Gewählter Arzt</InputLabel>
                  <Controller
                    control={control}
                    name="doctor"
                    defaultValue={
                      allDoctors
                        ? dateRef.current
                          ? dateRef.current.doctor
                          : 'Dr. Müller'
                        : ''
                    }
                    render={() => (
                      <Select
                        label="Arzt"
                        id="arzt"
                        value={allDoctors ? doctor : ''}
                        MenuProps={{ disableScrollLock: true }}
                        defaultValue={
                          allDoctors
                            ? dateRef.current
                              ? dateRef.current.doctor
                              : 'Dr. Müller'
                            : ''
                        }
                        onChange={(e) => {
                          handleSelectedDoctor(e.target.value, selectedDate)
                        }}
                      >
                        {allDoctors &&
                          allDoctors.map((doc, key) => {
                            return (
                              <MenuItem name={doc} key={key} value={doc}>
                                {doc}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.inputGrid} item xs={12} sm={6}>
                {/* A select for picking the type of the appointment  */}
                <FormControl className={classes.input} variant="standard">
                  <InputLabel htmlFor="art">Art des Termins</InputLabel>
                  <Select
                    label="Art des Termins"
                    id="art"
                    defaultValue="Routineuntersuchung"
                    MenuProps={{ disableScrollLock: true }}
                    onChange={(e) => {
                      handleSelectedType(e.target.value)
                    }}
                  >
                    <MenuItem value={'Routineuntersuchung'}>
                      Routineuntersuchung
                    </MenuItem>
                    <MenuItem value={'Corona-Test'}>Corona-Test</MenuItem>
                    <MenuItem value={'Nachkontrolle'}>Nachkontrolle</MenuItem>
                    <MenuItem value={'Impftermin'}>Impftermin</MenuItem>
                    <MenuItem value={'Blutabnahme'}>Blutabnahme</MenuItem>
                    <MenuItem value={'Gesamtcheckup'}>Gesamtcheckup</MenuItem>
                    <MenuItem value={'Laborbesprechung'}>
                      Laborbesprechung
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="center">
              Bitte beschreiben Sie kurz Ihr Anliegen:
            </Typography>
            {/* A TextField to describe the purpose of the appointment  */}
            <TextField
              name="subject"
              type="text"
              margin="normal"
              fullWidth
              value={anliegen}
              onChange={(e) => setAnliegen(e.target.value)}
              inputRef={register({
                required: true,
              })}
              error={!!errors.subject}
              helperText={
                errors.subject ? 'Bitte geben Sie Ihr Anliegen ein' : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={12} sm={6} className={classes.inputGrid}>
                {/* A DatePicker for picking the date of the appointment  */}
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="date"
                  defaultValue={
                    dateRef.current
                      ? dateRef.current.date
                      : format(new Date(), 'dd.MM.yyyy')
                  }
                  value={selectedDate}
                  render={() => (
                    <KeyboardDatePicker
                      className={classes.input}
                      disableToolbar
                      PopoverProps={{ disableScrollLock: true }}
                      shouldDisableDate={filterWeekends}
                      minDate={nextDay(new Date())}
                      variant="inline"
                      format="dd.MM.yyyy"
                      id="date-picker-inline"
                      label="Gewähltes Datum"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.inputGrid}>
                {/* A TimePicker for picking the time of the appointment  */}
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="time"
                  defaultValue={
                    dateRef.current
                      ? dateRef.current.time
                      : format(new Date(), 'HH:mm:ss')
                  }
                  value={selectedTime}
                  render={() => (
                    <KeyboardTimePicker
                      className={classes.input}
                      ampm={false}
                      minutesStep={5}
                      id="time-picker"
                      label="Gewählte Uhrzeit"
                      value={selectedTime}
                      onChange={(value) => handleSelectedTime(value, doctor)}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  )}
                />
                {/* A Popover to show the available times for the selecting an appointment  */}
                <Popover
                  id="mouse-over-popover"
                  disableScrollLock
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  {/* A Card that shows the available free time on the selected date */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        fontWeight="fontWeightBold"
                      >
                        Mögliche Terminauswahl:
                      </Typography>
                      {freeTime(
                        openingHoursToday(openingHours, selectedDate),
                        getDoctorAppointments(doctor, selectedDate),
                        appointmentDuration
                      ).map((element, index) => {
                        return (
                          <Typography key={index.toString()}>
                            {element}
                          </Typography>
                        )
                      })}
                    </CardContent>
                  </Card>
                </Popover>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid container justify="flex-end">
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          {/* A Button to move to the next page  */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!(validateTime && anliegen !== '' && doctor !== '')}
          >
            Weiter
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PickDate
