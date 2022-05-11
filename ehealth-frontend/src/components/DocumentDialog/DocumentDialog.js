import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import { parse, differenceInHours } from 'date-fns'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

//Style classes to be used for the components
const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'left',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.5',
    minWidth: 675,
    /* New */
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  pdfContainer: {
    textAlign: 'center',
  },
  information: {
    color: '#212e53',
    marginTop: 5,
    /* New */
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  dialogButton: {
    padding: '8px 24px 24px 24px',
  },
  dialogButtons: {
    padding: '8px 24px 24px 24px',
    justifyContent: 'space-between',
  },
  cancelButtonContainer: {
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 15,
  },
  overview: {
    marginTop: 5,
  },
  oddRow: {
    marginTop: 5,
    backgroundColor: '#F2F2F2',
  },
  dialog: {
    width: 600, //old value => width=543,
    height: 420,
    /* New */
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      height: '420',
    },
  },
  tab: {
    minWidth: 130,
    width: 130,
    /* New */
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
      width: 'auto',
    },
  },
}))

//An animation function to slide the dialog up in the page
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

//A function that returns a TabPanel to be used in the dialog
function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

//The prop types of the TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

//The props to be used in the Tab
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ButtonAppBar = (props) => {
  const { doc, appointmentInformation, purpose } = props
  const [value, setValue] = useState(0)
  const [delDia, setDelDia] = useState(false)
  var isOdd = false
  const classes = useStyles()

  //A function to set the selected tab to the newValue
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //A function that returns the title to be used on top
  //of the dialog depending on the type of the document
  const getTitle = () => {
    if (purpose === 'Termin') {
      return 'Termindetails:'
    } else {
      return purpose + ':'
    }
  }

  //A function to toggle the value of "isOdd" between true
  //and false to determine the background color of each
  //line in the dialog
  const toggleIsOdd = () => {
    isOdd ? (isOdd = false) : (isOdd = true)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  //A function to view the document according to its type
  const ViewDocument = () => {
    //In the case of an appointment the document should look like the following
    if (purpose === 'Termin') {
      return (
        <div>
          {/* An AppBar that contains the Tabs of the dialog */}
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="on"
            >
              {/* The 4 Tabs that will be viewed in the dialog */}
              <Tab
                label="Patient"
                {...a11yProps(0)}
                classes={{ root: classes.tab }}
                wrapped={true}
              />
              <Tab
                label="Termin"
                {...a11yProps(1)}
                classes={{ root: classes.tab }}
                wrapped={true}
              />
              <Tab
                label="Anamnesebogen"
                {...a11yProps(2)}
                classes={{ root: classes.tab }}
                wrapped={true}
              />
              <Tab
                //variant="fullWidth"
                label="Termin Verwaltung"
                {...a11yProps(3)}
                classes={{ root: classes.tab }}
                wrapped={true}
                disabled={props.past}
              />
            </Tabs>
          </AppBar>
          {/* The first Tab contains the personal information of the patient */}
          <TabPanel value={value} index={0}>
            {appointmentInformation.personalInformation.map(
              (information, key) => {
                toggleIsOdd()
                return (
                  <Grid
                    key={key}
                    className={isOdd ? classes.oddRow : classes.overview}
                    container
                    justify="center"
                  >
                    <Grid item xs={12} sm={5}>
                      <Typography
                        className={classes.information}
                        variant="body1"
                        align="left"
                      >
                        {information.title}:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Typography
                        className={classes.information}
                        variant="body1"
                        align="right"
                      >
                        {information.text}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              }
            )}
          </TabPanel>

          {/* The second Tab contains the appointment's information */}
          <TabPanel value={value} index={1}>
            {/* <Grid container justify="center"> */}
            {appointmentInformation.appointmentInformation.map(
              (information, key) => {
                toggleIsOdd()
                return (
                  <Grid
                    key={key}
                    className={isOdd ? classes.oddRow : classes.overview}
                    container
                    justify="center"
                  >
                    <Grid item xs={12} sm={5}>
                      <Typography
                        className={classes.information}
                        variant="body1"
                        align="left"
                      >
                        {information.title}:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Typography
                        className={classes.information}
                        variant="body1"
                        align="right"
                      >
                        {information.text}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              }
            )}
          </TabPanel>

          {/* The third Tab contains the information filled in the form by the patient */}
          <TabPanel value={value} index={2}>
            {appointmentInformation.formInformation.map((information, key) => {
              toggleIsOdd()
              return (
                <Grid
                  key={key}
                  className={isOdd ? classes.oddRow : classes.overview}
                  container
                  justify="center"
                >
                  <Grid item xs={12} sm={5}>
                    <Typography
                      className={classes.information}
                      variant="body1"
                      align="left"
                    >
                      {information.title}:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography
                      className={classes.information}
                      variant="body1"
                      align="right"
                    >
                      {information.text}
                    </Typography>
                  </Grid>
                </Grid>
              )
            })}
          </TabPanel>

          {/* The forth Tab is used to cancel the appointment */}
          <TabPanel
            value={value}
            index={3}
            className={classes.cancelButtonContainer}
          >
            <Typography
              className={classes.information}
              variant="body1"
              align="center"
            >
              Abgesagte Termine können nicht mehr rückgängig gemacht werden!
            </Typography>
            <Button
              className={classes.cancelButton}
              variant="contained"
              color="primary"
              onClick={() => setDelDia(true)}
            >
              Termin Absagen
            </Button>
            <Dialog
              open={delDia}
              disableScrollLock
              onClose={() => setDelDia(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Termin absagen?</DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                  Sie können einen weiteren Termin mit uns vereinbaren über den
                  Punkt "Termin Beantragen".
                </DialogContentText>
              </DialogContent>

              <DialogActions className={classes.dialogButtons}>
                <Button
                  variant="outlined"
                  onClick={() => setDelDia(false)}
                  color="primary"
                  autoFocus
                >
                  Schließen
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    props.deleteMe(doc.id)
                    props.handleClose()
                    setDelDia(false)
                  }}
                  color="primary"
                >
                  Absagen
                </Button>
              </DialogActions>
            </Dialog>

            <p>
              {(() => {
                let date = parse(
                  doc.date + '-' + doc.time,
                  'dd.MM.yyyy-HH:mm:ss',
                  new Date()
                )
                {
                  /* If the Appointment is being canceled less than 24 hours before 
                    the selected time then there will be message shown to the user */
                }
                return differenceInHours(date, new Date()) < 24
              })() && (
                <Alert severity="warning">
                  Termin ist in weniger als 24 Stunden, es werden 50€ berechnet!{' '}
                </Alert>
              )}
            </p>
          </TabPanel>
        </div>
      )
    }

    //If each other type of document has to be viewd differently,
    //Then we specify it like the following
    //else if (purpose === 'Rezept') {...}
    //Otherwise we just view them equally:
    else {
      var documentLink = doc.url

      return (
        <div className={classes.pdfContainer}>
          <embed src={documentLink} width="575" height="650"></embed>
        </div>
      )
    }
  }

  {
    /* The actual Dialog returned by this component */
  }
  return (
    <Dialog
      maxWidth={false}
      className={classes.dialogContainer}
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      disableScrollLock
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{getTitle()}</DialogTitle>
      <DialogContent dividers>
        <div id="alert-dialog-slide-description" className={classes.dialog}>
          <ViewDocument />
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogButton}>
        <Button variant="outlined" onClick={props.handleClose} color="primary">
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ButtonAppBar
