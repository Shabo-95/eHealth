import React, { useState } from 'react'
import {
  InputLabel,
  TextField,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import IconButtonContent from '../IconButtonContent/IconButtonContent'

/* Styling Code (CSS) */
const useStyles = makeStyles((theme) => ({
  label: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 15,
    },
  },
  editButtonContainer: {
    textAlign: 'center',
  },
  editButton: {
    border: 'none !important',
    textAlign: 'center',
    minWidth: 100,
    padding: 6,
  },
  gridContainer: {
    textAlign: 'left',
    minWidth: 200,
    padding: 6,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingLeft: 0,
      paddingTop: 0,
    },
    '& input': {
      [theme.breakpoints.down('xs')]: { textAlign: 'center' },
    },
  },
}))

/* Hier exportieren wir der Name der Komponente um später (z.B. im PersonalDataForm) referenzieren zu können */
export const FormRow = (props) => {
  const {
    label,
    data,
    disabled,
    inputRef,
    index,
    edits,
    setEdits,
    error,
    helperText,
  } = props
  const [edit, setEdit] = useState()
  const classes = useStyles()

  const translateLabel = (label) => {
    switch (label) {
      case 'place':
        return 'Stadt:'
      case 'street':
        return 'Straße und Haus-Nr.:'
      case 'zip':
        return 'PLZ:'
      case 'phonenumber':
        return 'Telefon-Nr.:'
      case 'insuranceNr':
        return 'Versicherten-Nr.:'
      case 'email':
        return 'Email:'
      case 'password':
        return 'Passwort:'
    }
  }
  /*console.log('Hier: ' + 'data: ' + data + ', data.length: ' + data.length)*/

  /* hier return ist änlich wie Main z.B. in Java */
  return (
    /* Div Container */
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.gridContainer}
    >
      <Grid item xs={12} sm={4}>
        {/* Hier ist die linke Spalte (z.B. Stadt:, Straße:, ... , Email:) */}
        <InputLabel className={classes.label}>
          {translateLabel(label)}
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={5}>
        {/* Hier werden die persönliche Daten der/des Userin/Users von Datenbank geholt und im Textbox ausgefüllt 
        (mittlere Spalte) */}
        <TextField
          className={classes.gridContainer}
          name={label}
          inputRef={inputRef}
          InputProps={{
            disableUnderline: !edit,
          }}
          defaultValue={data}
          variant="standard"
          autoComplete="off"
          disabled={!edit}
          error={error}
          helperText={helperText}
          fullWidth
        />
      </Grid>

      <Grid className={classes.editButtonContainer} item xs={12} sm={3}>
        {/* Hier befindet sich der Bearbeiten- bzw. SpeicherButton (rechte Spalte) */}
        {!disabled && (
          <Button
            className={classes.editButton}
            variant={'outlined'}
            color={'primary'}
            onClick={() => {
              const result = [...edits]
              result[index] = !result[index]
              setEdits(result)
              setEdit(!edit)
            }}
          >
            <IconButtonContent
              icon={edit ? <SaveIcon /> : <EditIcon />}
              title={edit ? 'Speichern' : 'Bearbeiten'}
            />
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
