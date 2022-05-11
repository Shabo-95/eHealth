import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

//The Styles to be used in this component
const useStyles = makeStyles({
  iconGrid: {
    display: 'inherit',
    justifyContent: 'flex-start',
    maxWidth: 60,
  },
})

//The component is created here
const IconButtonContent = (props) => {
  const { icon, title } = props
  const classes = useStyles()
  return (
    <>
      {/* The Icon that will be viewed on the component */}
      <Grid className={classes.iconGrid} item xs={3}>
        {icon}
      </Grid>
      {/* The text that will be viewed on the component */}
      <Grid item xs={9}>
        <Typography variant="button">{title}</Typography>
      </Grid>
    </>
  )
}

export default IconButtonContent
