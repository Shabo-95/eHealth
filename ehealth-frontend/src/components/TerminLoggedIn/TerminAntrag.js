import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import BoxLayout from '../Layouts/BoxLayout'
import AnamneseBogen from './AnamneseBogen'
import { createAppointment } from '../../api/appointment'
import PickDate from './PickDate'
import PersonalInformation from './PersonalInformation'
import Overview from './Overview'
import TerminProvider from '../ContextProvider/TerminProvider'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import {
  Button,
  Grid,
  Typography,
  Divider,
  StepButton,
  StepConnector,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

//brief: Hier werden die möglichen Steps definiert
function getSteps() {
  return [
    'Wunschdatum auswählen',
    'Persönliche Daten ergänzen ',
    'Anamnesebogen ausfüllen',
    'Übersicht',
  ]
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '24px 0',
  },
  description: {
    marginTop: 10,
  },
  buttonLabel: {
    '& span': {
      [theme.breakpoints.down('xs')]: { fontSize: '0px !important' },
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: 20,
    marginBottom: 15,
  },
}))

const Step1 = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const [showSnackBar, setShowSnackBar] = useState(true)

  //Schritt zurück
  const handleBack = () => {
    setActiveStep((step) => step - 1)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  //Schließen der Snackbar, wenn man wo anders als die Snackbar klickt
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowSnackBar(false)
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          'Wunschdatum auswählen',
          (<PickDate setActiveStep={setActiveStep} handleBack={handleBack} />)
        )
      case 1:
        return (
          'Persönliche Daten ergänzen ',
          (
            <PersonalInformation
              setActiveStep={setActiveStep}
              handleBack={handleBack}
            />
          )
        )
      case 2:
        return (
          'Anamnesebogen ausfüllen',
          (
            <AnamneseBogen
              setActiveStep={setActiveStep}
              handleBack={handleBack}
            />
          )
        )

      case 3:
        return (
          'Übersicht',
          (<Overview setActiveStep={setActiveStep} handleBack={handleBack} />)
        )
      default:
        return 'Unknown stepIndex'
    }
  }

  //Anzeigen des aktuellen Schrittes
  const handleIconClick = (number) => {
    if (number <= activeStep && activeStep != 4) setActiveStep(number)
  }

  const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#0c5f9a',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#0c5f9a',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector)

  return (
    <BoxLayout title={'Termin Beantragen'}>
      {activeStep < 4 ? (
        <Stepper
          activeStep={activeStep}
          className={classes.root}
          connector={<QontoConnector />}
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step
              className={classes.backButton}
              key={label}
              onClick={() => handleIconClick(index)}
            >
              <StepButton className={classes.buttonLabel}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      ) : (
        <span style={{ cursor: 'default' }}>
          <Stepper
            activeStep={activeStep}
            className={classes.root}
            connector={<QontoConnector />}
            alternativeLabel
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                className={classes.backButton}
                onClick={() => handleIconClick(index)}
              >
                <StepLabel className={classes.buttonLabel}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </span>
      )}
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div>
        {/* //Letzte Seite */}
        {activeStep === steps.length ? (
          <div>
            <Grid container align="center" justify="center">
              <Grid item xs={12}>
                <Typography variant="h4">
                  Vielen Dank für Ihr Vertrauen!
                </Typography>
              </Grid>

              <Grid item xs={10}>
                <Typography className={classes.description} align="center">
                  Wenn Sie Fragen zu unserer Praxis und unseren Angeboten haben,
                  können Sie uns gerne über unser Kontaktformular in der
                  Fußzeile dieser Seite erreichen.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Link to="/">
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Zurück zum Home
                  </Button>
                </Link>
              </Grid>

              <Snackbar
                open={showSnackBar}
                autoHideDuration={5000}
                onClose={handleSnackClose}
              >
                <Alert onClose={handleSnackClose} severity="success">
                  Ihre Anfrage wurde bestätigt!
                </Alert>
              </Snackbar>
            </Grid>
          </div>
        ) : (
          <div className={classes.instructions}>
            <TerminProvider>{getStepContent(activeStep)}</TerminProvider>
          </div>
        )}
      </div>
    </BoxLayout>
  )
}

export default Step1
