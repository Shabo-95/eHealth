import React, { useEffect, useState, useContext } from 'react'
import BoxLayout from '../Layouts/BoxLayout'
import DokumentBar from '../DokumentBar/DokumentBar'
import {
  deleteAppointment,
  getPersonalAppointments,
} from '../../api/appointment'
import { UserContext } from '../ContextProvider/UserProvider'
import { isPast } from 'date-fns'
import { Divider, makeStyles, Typography } from '@material-ui/core'
import LoadingContainer from '../LoadingContainer/LoadingContainer'
import emailjs from 'emailjs-com'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { format } from 'date-fns/esm'

//The Styles to be used in this component
const useStyles = makeStyles({
  subHeader: {
    marginBottom: 15,
  },
  appointmentContainer: {
    marginBottom: 30,
  },
})

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const PersonalAppointmentBox = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [previousAppointments, setPreciousAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const { userId } = useContext(UserContext)
  const classes = useStyles()
  const [showSnackBar, setShowSnackBar] = useState(false)

  //A function to fetch the user's appointments from the Database
  //and split them into two groups, previous and upcoming appointments
  useEffect(() => {
    let sub = true
    const fetchAppointments = async () => {
      sub && setLoading(true)
      if (userId)
        await getPersonalAppointments(userId)
          .then((data) => {
            const upcoming = []
            const previous = []
            if (!data.message) {
              Object.keys(data).map((key) => {
                const appointmentDate = new Date(data[key].date)
                const splitTime = data[key].time.split(':')
                appointmentDate.setHours(splitTime[0])
                appointmentDate.setMinutes(splitTime[1])
                appointmentDate.setSeconds(0)
                if (isPast(new Date(appointmentDate))) previous.push(data[key])
                else upcoming.push(data[key])
              })

              sub && setUpcomingAppointments(upcoming)
              sub && setPreciousAppointments(previous)
            }
            sub && setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            sub && setLoading(false)
          })
    }
    fetchAppointments()
    return () => {
      sub = false
    }
  }, [userId])

  //Function to send an automated email response
  function sendMail(appointment) {
    const { lastname, firstname, type, email, date, time, doctor } = appointment

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

  // Gets the Personal Information from given ID (-> For sendMail())
  const getAppointmentByid = (id) => {
    let result
    upcomingAppointments.forEach((appointment) => {
      if (appointment.id === id) result = appointment
    })
    return result
  }

  //A function to delete an appointment and update the list of the appointments
  const deleteChild = (id) => {
    deleteAppointment(id)
    sendMail(getAppointmentByid(id))

    setUpcomingAppointments(
      Object.keys(upcomingAppointments)
        .filter((i) => upcomingAppointments[i].id !== id)
        .map((i) => upcomingAppointments[i])
    )
    setShowSnackBar(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowSnackBar(false)
  }

  //The box that this component returns
  return (
    <BoxLayout title="Persönliche Termine">
      {loading ? (
        <LoadingContainer />
      ) : (
        <>
          {/* The upcoming appointments are rendered here */}
          <div className={classes.subHeader}>
            <Typography variant="h4">Ausstehende Termine:</Typography>
            <Divider />
          </div>
          {/* Each appointment is represented by a DokumentBar component */}
          <div className={classes.appointmentContainer}>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments
                .sort((a, b) => {
                  return b.date.localeCompare(a.date) === 0
                    ? a.time.localeCompare(b.time)
                    : b.date.localeCompare(a.date)
                })
                .map((appointment, key) => {
                  return (
                    <div key={key} id={'div' + appointment.id}>
                      {
                        <>
                          <DokumentBar
                            doc={appointment}
                            deleteMe={deleteChild}
                            type={appointment.type}
                            purpose="Termin"
                            past={false}
                          />
                        </>
                      }
                    </div>
                  )
                })
            ) : (
              //If there were no appointments to view, then the following text will be viewed
              <Typography variant="h5" align="center">
                Keine anstehenden Termine vorhanden.
              </Typography>
            )}
          </div>

          {/* The previous appointments are rendered here */}
          <div className={classes.subHeader}>
            <Typography variant="h4">Vergangene Termine:</Typography>
            <Divider />
          </div>
          {/* Each appointment is represented by a DokumentBar component */}
          <div className={classes.appointmentContainer}>
            {previousAppointments.length > 0 ? (
              previousAppointments
                .sort((a, b) => {
                  return b.date.localeCompare(a.date) === 0
                    ? a.time.localeCompare(b.time)
                    : b.date.localeCompare(a.date)
                })
                .map((appointment, key) => {
                  return (
                    <div key={key} id={'div' + appointment.id}>
                      {
                        <>
                          <DokumentBar
                            doc={appointment}
                            deleteMe={deleteChild}
                            type={appointment.type}
                            purpose="Termin"
                            past={true}
                          />
                        </>
                      }
                    </div>
                  )
                })
            ) : (
              //If there were no appointments to view, then the following text will be viewed
              <Typography variant="h5" align="center">
                Keine vergangenen Termine vorhanden.
              </Typography>
            )}
          </div>
          <Snackbar //to signalize success
            open={showSnackBar}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={() => setShowSnackBar(false)} severity="success">
              Ihr Termin wurde erfolgreich abgesagt.
            </Alert>
          </Snackbar>
        </>
      )}
    </BoxLayout>
  )
}

export default PersonalAppointmentBox
