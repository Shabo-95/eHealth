import React, { useEffect, useState } from 'react'
import {
  Button,
  Table,
  TableBody,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import PublishIcon from '@material-ui/icons/Publish'
import { getAllPatients } from '../../api/users'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { format } from 'date-fns'
import { createPrescription } from '../../api/prescription'
import { useFirebase } from '../../firebase'
import LoadingContainer from '../LoadingContainer/LoadingContainer'
import { FaUpload } from 'react-icons/fa'
import Draggable from 'react-draggable'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { deDE } from '@material-ui/core/locale'

/* Styling (CSS) */
const useStyles = makeStyles((theme) => ({
  tablePagination: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  smallTableCell: {
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))
const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

/* Ein Customized TableRow erstellen (<tr> in html) (Styling CSS) */
const useRowStyles = makeStyles((theme) => ({
  oddRow: {
    background: '#f2f2f2',
    boxShadow: '0px -2px 5px 0px rgba(0, 0, 0, 0.2) !important',
    '&:hover': {
      background: theme.palette.primary.light,
      '& *': {
        color: '#FFF',
      },
    },
  },
  tableRow: {
    boxShadow: '0px -2px 5px 0px rgba(0, 0, 0, 0.1) !important',
    '&:hover': {
      background: theme.palette.primary.light,
      '& *': {
        color: '#FFF',
      },
    },
  },
  bold: {
    fontWeight: 600,
  },
  borderBottom: {
    borderBottom: 0,
  },
  documentButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '5px',
  },
  cellPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  dialogButtons: {
    padding: '8px 24px 24px 24px !important',
    justifyContent: 'space-between',
  },
  radioGroup: {
    paddingTop: 5,
    paddingBottom: 30,
  },
}))

/* Ein Customized TableCell erstellen (<td> in html) (Styling CSS) */
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: '4%',
    paddingBottom: '4%',
  },
}))(TableCell)

/* Ein Customized DialogTitle erstellen (Styling CSS) */
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>

      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  )
})

/* Ein Customized DialogContent erstellen (Styling CSS) */
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingLeft: 24,
    paddingRight: 24,
  },
}))(MuiDialogContent)

/* Ein Customized DialogActions erstellen (Styling CSS) */
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'space-between',
  },
}))(MuiDialogActions)

const AllPatientsForm = () => {
  const [patients, setPatients] = useState()
  const [loading, setLoading] = useState(true)

  /* Wichtig für Styling */
  const classes = useStyles()

  /* Deutsche Sprache für TablePagination */
  const theme = createMuiTheme(deDE)

  /* mit dem Datenbank verbinden */
  useEffect(() => {
    let sub = true
    const fetchUsers = async () => {
      sub && setLoading(true)
      await getAllPatients()
        .then((data) => {
          const { created_at, lastLogin, role, ...filteredData } = data
          sub && setPatients({ ...filteredData })
          sub && setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          sub && setLoading(false)
        })
    }
    fetchUsers()
    return () => {
      sub = false
    }
  }, [])

  /* leeres Array für die Daten von Patienten */
  var endData = []

  /* Die Daten von Datenbank holen und in endData-Array lagern */
  const getPatientsInformation = (patient) => {
    endData.push({
      id: patients[patient].id,
      vorname: patients[patient].firstname,
      nachname: patients[patient].lastname,
      geburtstag: format(new Date(patients[patient].birthdate), 'dd.MM.yyyy'),
      email: patients[patient].email,
      nummer: patients[patient].phonenumber,
      additional: [
        {
          gender:
            patients[patient].gender === 'male'
              ? 'Männlich'
              : patients[patient].gender === 'female'
              ? 'Weiblich'
              : 'Divers',
          zip: patients[patient].zip,
          place: patients[patient].place,
          insuranceNr: patients[patient].insuranceNr,
          street: patients[patient].street,
        },
      ],
    })
  }

  /* Daten separieren */
  const slicePatientsInformation = () => {
    patients &&
      Object.keys(patients).map((patient) => {
        getPatientsInformation(patient)
      })
  }
  slicePatientsInformation()

  /* Die Daten von endData-Array in rows-Variable lagern */
  const rows = endData

  /* Wichtig für TablePagination */
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [countRows, setCountRows] = useState(0)

  /* TablePagination für die Suche behandeln */
  /* Also hier wird die Seite der Tabelle sich mit dem Such-Ergebnisse anpassen */
  const handleChangeRows = (currentSearchValue) => {
    setCountRows(
      rows.filter((row) => {
        const { vorname, nachname, geburtstag, email, nummer } = row
        return (
          vorname.toLowerCase().includes(currentSearchValue) ||
          nachname.toLowerCase().includes(currentSearchValue) ||
          geburtstag.toLowerCase().includes(currentSearchValue) ||
          email.toLowerCase().includes(currentSearchValue) ||
          nummer.toLowerCase().includes(currentSearchValue)
        )
      }).length
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    event.target.value == 'Alle'
      ? setRowsPerPage(rows.length)
      : setRowsPerPage(+event.target.value)
    setPage(0)
  }

  /* SnackBar erstellen */
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  /* SnackBar behandeln */
  const handleSnackOpen = () => {
    setShowSnackBar(true)
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowSnackBar(false)
  }

  /* "return" ist ähnlich wie die Main-Methode in Java */
  return (
    <div className={classes.root}>
      {loading ? (
        <LoadingContainer />
      ) : (
        <Paper className={classes.paper}>
          <TableContainer>
            <Box mx="auto" bgcolor="background.paper" p={1}>
              {/* Textfield für die Suche */}
              <TextField
                id="outlined-search"
                label="Patient Suchen..."
                variant="standard"
                align="center"
                color="primary"
                autoComplete="off"
                onChange={(e) => {
                  {
                    setSearchValue(e.target.value.toLowerCase())
                  }
                  handleChangeRows(e.target.value.toLowerCase())
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* Hier fängt die Tabelle an */}
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                {/* Das ist unser Tabellen-Header */}
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="right">Vorname</StyledTableCell>
                  <StyledTableCell align="right">Nachname</StyledTableCell>
                  <StyledTableCell align="right">Geburtsdatum</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Telefonnummer</StyledTableCell>
                </TableRow>
              </TableHead>
              {/* Hier werden die Daten von der Variable "rows" geholt und gemappt (MitHilfe von ".map") */}
              {/* ".slice" ist wichtig für Pagging, ".filter" ist wichtig für die Suche */}
              <TableBody>
                {rows
                  .filter((row) => {
                    const { vorname, nachname, geburtstag, email, nummer } = row
                    return (
                      vorname.toLowerCase().includes(searchValue) ||
                      nachname.toLowerCase().includes(searchValue) ||
                      geburtstag.toLowerCase().includes(searchValue) ||
                      email.toLowerCase().includes(searchValue) ||
                      nummer.toLowerCase().includes(searchValue)
                    )
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    return (
                      /* <Row> ist ein Referenz, Also unten steht der Code für <Row> */
                      <Row
                        even={key % 2 === 1}
                        key={key}
                        row={row}
                        handleSnackOpen={handleSnackOpen}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* TablePagination (wird ganz unten in der Tabelle gezeigt) wie Tabellen-Footer */}
          <ThemeProvider theme={theme}>
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[7, 12, 25, 100, 'Alle']}
              component="div"
              count={searchValue == '' ? rows.length : countRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              backIconButtonText="Vorherige Seite"
              SelectProps={{
                renderValue: (value) =>
                  value === rows.length ? 'Alle' : value,
              }}
            />
          </ThemeProvider>
          <Snackbar
            open={showSnackBar}
            autoHideDuration={4000}
            onClose={handleSnackClose}
          >
            <Alert onClose={handleSnackClose} severity="success">
              Die Datei wurde erfolgreich hochgeladen
            </Alert>
          </Snackbar>
        </Paper>
      )}
    </div>
  )
}

/* Ab hier fängt der Wichtige Code für die Tabelle an und ist oben in <TableBody> => als <Row> referenziert */
const Row = (props) => {
  const { row, handleSnackOpen, even } = props
  const [dropdown, setDropdown] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('Rezept')
  const [url, setUrl] = useState()
  const { instance } = useFirebase()
  const classes = useRowStyles()

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handlePdfUpload = async (e) => {
    const pdf = e.target.files[0]

    if (pdf) {
      const img = await instance
        .storage()
        .ref()
        .child(`prescriptions/${pdf.name}`)

      await img
        .put(pdf)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      await img
        .getDownloadURL()
        .then((url) => setUrl(url))
        .catch((err) => console.log(err))
    }
  }

  const documentUpload = async () => {
    const data = {
      userId: row.id,
      type: value,
      url: url,
    }
    await createPrescription(data)
      .then(() => {
        handleSnackOpen()
        setOpen(false)
      })
      .catch((err) => console.log(err))
  }

  /* Hier wird der folgende Code an dem <TableBody> => <Row> übergeben */
  return (
    <>
      {/* Hier fängt unser Haupt-TableRow an (Also was als erstes in die Tabelle gezeigt wird) */}
      <TableRow className={even ? classes.tableRow : classes.oddRow}>
        <TableCell>
          <Tooltip title="Weitere Informationen">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setDropdown(!dropdown)}
            >
              {dropdown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.vorname}
        </TableCell>
        <TableCell className={classes.tableCell}>{row.nachname}</TableCell>
        <TableCell className={classes.tableCell}>{row.geburtstag}</TableCell>
        <TableCell className={classes.tableCell}>{row.email}</TableCell>
        <TableCell className={classes.tableCell}>{row.nummer}</TableCell>
      </TableRow>
      {/* Hier fängt unser Sekundäre TableRow an (Expand-TableRow) */}
      {/* Also diese TableRow wird gezeigt, wenn man auf "Weitere Informationen" drückt */}
      <TableRow>
        <TableCell className={classes.cellPadding} colSpan={6}>
          <Collapse in={dropdown} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Weitere Informationen:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.bold}>Geschlecht</TableCell>
                    <TableCell className={classes.bold}>PLZ</TableCell>
                    <TableCell className={classes.bold}>Wohnort</TableCell>
                    <TableCell className={classes.bold}>Straße</TableCell>
                    <TableCell className={classes.bold}>
                      Krankenversicherungsnummer
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.additional.map((data, key) => (
                    <TableRow key={key}>
                      <TableCell className={classes.borderBottom}>
                        {data.gender}
                      </TableCell>
                      <TableCell className={classes.borderBottom}>
                        {data.zip}
                      </TableCell>
                      <TableCell className={classes.borderBottom}>
                        {data.place}
                      </TableCell>
                      <TableCell className={classes.borderBottom}>
                        {data.street}
                      </TableCell>
                      <TableCell className={classes.borderBottom}>
                        {data.insuranceNr}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className={classes.documentButton}>
                <Button
                  variant="contained"
                  color={'primary'}
                  startIcon={<NoteAddIcon />}
                  onClick={() => setOpen(true)}
                >
                  Dokument hinzufügen
                </Button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* Dialog wird angezeigt, wenn man auf "Dokument hochladen" drückt */}
      {/* Dieses Dialog enthält 4 Wichtige Kommponenten und zwar: 1) RadioButtons für DokumentenArt */}
      {/* 2) Button für Datei auswählen, 3) Button für Datei hochladen, 4) Button für Abbrechen */}
      <Dialog
        aria-labelledby="dialog-modal-title"
        onClose={() => setOpen(false)}
        TransitionComponent={Draggable}
        TransitionProps={{ handle: '.dialog-title' }}
        disableScrollLock
        disableAutoFocus
        PaperProps={{ tabIndex: '-1' }}
        open={open}
      >
        <>
          <DialogTitle id="dialog-modal-title" onClose={() => setOpen(false)}>
            Dokument hinzufügen
          </DialogTitle>
          <DialogContent dividers>
            <Typography style={{ fontWeight: 'bold' }}>
              Dokumentenart:
            </Typography>

            <Grid item xs={12}>
              {/* Radio-Buttons */}
              <FormControl component="fieldset" className={classes.radioGroup}>
                <RadioGroup
                  row
                  aria-label="dokumentenart"
                  name="dokumentenart"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Rezept"
                    control={<Radio color="primary" required={true} />}
                    label="Rezept"
                  />
                  <FormControlLabel
                    value="Laborbericht"
                    control={<Radio color="primary" required={true} />}
                    label="Laborbericht"
                  />
                  <FormControlLabel
                    value="Krankschreibung"
                    control={<Radio color="primary" required={true} />}
                    label="Krankschreibung"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Button für "Datei auswählen" */}
            <Button
              startIcon={<FaUpload />}
              variant="outlined"
              component="label"
              color="primary"
              fullWidth
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handlePdfUpload(e)}
              />
            </Button>
          </DialogContent>
          <DialogActions className={classes.dialogButtons}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpen(false)
              }}
            >
              Abbrechen
            </Button>
            {/* Button für "Datei hochladen" */}
            <Button
              autoFocus
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              onClick={() => documentUpload()}
              disabled={!(url && value)}
            >
              Hochladen
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  )
}

export default AllPatientsForm
