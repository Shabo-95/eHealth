import React, { useState } from 'react'
import { Button, Divider, makeStyles, Typography } from '@material-ui/core'
import DocumentDialog from '../DocumentDialog/DocumentDialog'
import { AppointmentInformation } from '../DokumentBar/AppointmentInformation'
import { isPast } from 'date-fns'

//The Styles to be used in this component
const useStyles = makeStyles((theme) => ({
  appointmentButton: {
    marginBottom: '15px !important',
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
    '& *': { color: '#FFF' },
    '&:hover': {
      backgroundColor: '#FFF',
      '& *': {
        color: theme.palette.primary.dark,
      },
    },
  },
  potentialCoronaButton: {
    marginBottom: '15px !important',
    backgroundColor: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.dark,
    '& *': { color: '#FFF' },
    '&:hover': {
      backgroundColor: '#FFF',
      '& *': {
        color: theme.palette.secondary.dark,
      },
    },
  },
  information: {
    hyphens: 'auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
  boxDivider: {
    margin: '5px 0 !important',
    backgroundColor: theme.palette.primary.dark,
  },
  coronaBoxDivider: {
    margin: '5px 0 !important',
    backgroundColor: theme.palette.secondary.dark,
  },
}))

//The component is created here
const AppointmentBox = (props) => {
  const { data, deleteMe } = props
  const classes = useStyles()
  const splitTime = data ? data.time.split(':') : null
  const [open, setOpen] = useState(false)

  //A function to close the appointment's dialog
  const handleClose = () => {
    setOpen(false)
  }

  //A function to check if an appointment has passed already
  const past = (appointment) => {
    if (!appointment.date) return false

    const appointmentDate = new Date(appointment.date)
    const splitTime = appointment.time.split(':')
    appointmentDate.setHours(splitTime[0])
    appointmentDate.setMinutes(splitTime[1])
    appointmentDate.setSeconds(0)
    return isPast(new Date(appointmentDate))
  }

  //The actual component is returned here
  return data ? (
    <div>
      {/* A button to view the appointment. The color
          indicates if the appointment is Corona-related */}
      <Button
        className={
          data.coronaContact === 'true' ||
          data.crowd === 'true' ||
          data.traveled === 'true'
            ? classes.potentialCoronaButton
            : classes.appointmentButton
        }
        variant="outlined"
        fullWidth
        onClick={() => {
          setOpen(true)
          past(data)
        }}
      >
        <div>
          {/* The time of the appointment */}
          <Typography className={classes.information} variant="subtitle1">
            {splitTime[0] + ':' + splitTime[1]}
          </Typography>
          {/* The type of the appointment */}
          <Typography className={classes.information} variant="subtitle2">
            {data.type}
          </Typography>
          <Divider
            className={
              data.coronaContact === 'true' ||
              data.crowd === 'true' ||
              data.traveled === 'true'
                ? classes.coronaBoxDivider
                : classes.boxDivider
            }
          />
          {/* The name of the patient */}
          <Typography className={classes.information} variant="subtitle2">
            {data.firstname}
          </Typography>
          <Typography className={classes.information} variant="subtitle2">
            {data.lastname}
          </Typography>
        </div>
      </Button>

      {/* A dialog with the appointment's information */}
      <DocumentDialog
        doc={data}
        type={data.type}
        purpose={'Termin'}
        past={past(data)}
        open={open}
        handleClose={handleClose}
        appointmentInformation={new AppointmentInformation(data)}
        deleteMe={deleteMe}
      />
    </div>
  ) : null
}

export default AppointmentBox
