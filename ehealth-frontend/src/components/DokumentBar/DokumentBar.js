import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import { format, addDays, isPast } from 'date-fns'
import { useFirebase } from '../../firebase'
import IconButtonContent from '../IconButtonContent/IconButtonContent'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AssignmentIcon from '@material-ui/icons/Assignment'
import HotelIcon from '@material-ui/icons/Hotel'
import GetAppIcon from '@material-ui/icons/GetApp'
import { AppointmentInformation } from '../DokumentBar/AppointmentInformation'
import DocumentDialog from '../DocumentDialog/DocumentDialog'
import { makeStyles } from '@material-ui/styles'

//Style classes to be used for the components
const useStyles = makeStyles((theme) => ({
  appbarItem: {
    [theme.breakpoints.down('xs')]: { textAlign: 'center' },
  },
  typeButton: {
    width: '100%',
    [theme.breakpoints.down('xs')]: { width: 'inherit' },
  },
  disabledBar: {
    backgroundColor: '#777 !important',
    '& *': { color: '#222', borderColor: '#555 !important' },
  },
}))

//A function to download the pdf file with a custom name
const downloadDocument = async (pdfDocument, documentName) => {
  const blob = await pdf(pdfDocument).toBlob()
  var link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = documentName
  document.body.appendChild(link)
  link.click()
}

//A function to download the document from a provided link
const downloadFromUrl = async (url, documentName) => {
  const blob = await fetch(url)
    .then((d) => d.blob())
    .then(
      (blobFile) =>
        new File([blobFile], documentName, {
          type: 'application/pdf',
        })
    )
  var link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = documentName
  document.body.appendChild(link)
  link.click()
}

//The component is to be returnd
const ButtonAppBar = (props) => {
  const { user, doc, purpose, past, type, deleteMe } = props
  const appointmentInformation = new AppointmentInformation(doc)
  const [old, setOld] = useState(false)
  const [open, setOpen] = useState(false)
  const [isOnDownload, setIsOnDownload] = useState(false)
  const { currentUser } = useFirebase()
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  //A function to get check if the document is old
  useEffect(() => {
    //Will be checked only when the document is a prescription
    if (purpose === 'Rezept') {
      let endDate = addDays(new Date(doc.created_at), 14)
      setOld(isPast(endDate))
    }
  }, [])

  //The date to be viewd on the bar
  const getDate = () => {
    if (purpose === 'Termin') {
      return (
        format(new Date(doc.date), 'dd.MM.yyy') +
        ' - ' +
        doc.time.split(':')[0] +
        ':' +
        doc.time.split(':')[1]
      )
    } else {
      return format(new Date(doc.created_at), 'dd.MM.yyyy')
    }
  }

  //A function to get the title of the document based on its type
  const getDocumentName = () => {
    if (purpose === 'Termin') {
      return type
    } else if (
      purpose !== 'Termin' &&
      user &&
      currentUser &&
      doc.userId !== currentUser.uid
    ) {
      return purpose + ' : ' + user.firstname + ' ' + user.lastname
    } else {
      return purpose
    }
  }

  //Style classes to be used for the PDF document
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFF',
    },
    section: {
      margin: 5,
      padding: 5,
    },
    innerSection: {
      marginLeft: 50,
      marginBottom: 20,
    },
    dialogContainer: {
      color: 'rgba(0, 0, 0, 0.54)',
      textAlign: 'left',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.5',
      minWidth: 675,
    },
    gridContainer: {
      textAlign: 'left',
      minWidth: 200,
      marginTop: 5,
      marginBottom: 5,
    },
  })

  //The document is created here
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Patient:</Text>
        </View>
        <View style={styles.innerSection}>
          {appointmentInformation.personalInformation.map(
            (information, key) => {
              return (
                <Text key={key}>
                  {information.title}: {information.text}
                </Text>
              )
            }
          )}
        </View>
        <View style={styles.section}>
          <Text>Termin:</Text>
        </View>
        <View style={styles.innerSection}>
          {appointmentInformation.appointmentInformation.map(
            (information, key) => {
              return (
                <Text key={key}>
                  {information.title}: {information.text}
                </Text>
              )
            }
          )}
        </View>
        <View style={styles.section}>
          <Text>Anamnesebogen:</Text>
        </View>
        <View style={styles.innerSection}>
          {appointmentInformation.formInformation.map((information, key) => {
            return (
              <Text key={key}>
                {information.title}: {information.text}
              </Text>
            )
          })}
        </View>
      </Page>
    </Document>
  )

  //A function to choose the background color of the document based on its type
  const getColor = () => {
    if (purpose === 'Termin') {
      //return '#212e53'
      return past ? '#113A6E' : '#4863B2'
    } else if (purpose === 'Krankschreibung') {
      // return '#0165B9'
      return '#154A70'
    } else if (purpose === 'Rezept') {
      return '#3AA0AA'
    } else if (purpose === 'Laborbericht') {
      return '#465F8C'
    }
  }

  //A function to choose the icon of the document based on its type
  const getIcon = () => {
    if (purpose === 'Termin') {
      return <ScheduleIcon />
    } else if (purpose === 'Rezept') {
      return <ReceiptIcon />
    } else if (purpose === 'Krankschreibung') {
      return <HotelIcon />
    } else if (purpose === 'Laborbericht') {
      return <AssignmentIcon />
    }
  }

  //The actual AppBar that represents the document
  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: getColor() }}
        className={old ? classes.disabledBar : null}
        onClick={() => {
          if (!isOnDownload && !old) handleClickOpen()
        }}
        onMouseEnter={() => {
          document.body.style.cursor = 'pointer'
        }}
        onMouseLeave={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={styles.gridContainer}
          >
            {/*A button to view the document*/}
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              lg={4}
              className={classes.appbarItem}
            >
              <Button
                className={classes.typeButton}
                id={doc.id + 'view'}
                color="inherit"
                disabled={old}
                style={styles.gridContainer}
              >
                <IconButtonContent icon={getIcon()} title={getDocumentName()} />
              </Button>
            </Grid>

            {/* A Button to view the date of the document */}
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              lg={3}
              className={classes.appbarItem}
            >
              <Button
                color={'inherit'}
                style={styles.gridContainer}
                disabled={old}
              >
                {getDate()}
              </Button>
            </Grid>

            {/*A button to download the document*/}
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              lg={3}
              className={classes.appbarItem}
            >
              <Button
                id={document.id + 'download'}
                variant="outlined"
                color={'inherit'}
                disabled={old}
                style={styles.gridContainer}
                onClick={() => {
                  if (purpose === 'Termin') {
                    downloadDocument(<MyDocument />, getDocumentName())
                  } else {
                    var documentLink = doc.url

                    downloadFromUrl(documentLink, getDocumentName())
                  }
                }}
                onMouseEnter={() => {
                  setIsOnDownload(true)
                }}
                onMouseLeave={() => {
                  setIsOnDownload(false)
                }}
              >
                <IconButtonContent
                  icon={<GetAppIcon />}
                  title="Herunterladen"
                />
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* A Dialog that contains the dodument's information */}
      <DocumentDialog
        doc={doc}
        type={type}
        purpose={purpose}
        past={past}
        open={open}
        handleClose={handleClose}
        appointmentInformation={appointmentInformation}
        deleteMe={deleteMe}
      />
    </div>
  )
}

export default ButtonAppBar
