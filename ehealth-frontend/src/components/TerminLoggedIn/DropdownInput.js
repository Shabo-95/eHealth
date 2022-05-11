import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  anamDropdown: {
    marginTop: 5,
    marginBottom: 30,
  },
})

//brief: Drop down input Feld für den Anamnesebogen
const DropdownInput = (props) => {
  const { label, register, name, defaultValue } = props
  const classes = useStyles()
  return (
    <Grid
      container
      className={classes.anamDropdown}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          name={name}
          required={true}
          inputRef={register}
          defaultValue={defaultValue}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export default DropdownInput
