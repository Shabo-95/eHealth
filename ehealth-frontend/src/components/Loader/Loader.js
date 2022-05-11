import React from 'react'
import { makeStyles } from '@material-ui/core'
import { PuffLoader } from 'react-spinners'

// Styles für Loading Container
const useStyles = makeStyles({
  loading: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// Animiertes Ladesymbol
const Loader = () => {
  const classes = useStyles()
  return (
    <div className={classes.loading}>
      <PuffLoader />
    </div>
  )
}

export default Loader
