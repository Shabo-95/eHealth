import {
  Container,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'

// Styles für Boxcontainer, Title und Kindkomponenten
const useStyles = makeStyles((theme) => ({
  boxcontainer: {
    margin: '50px 0',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto',
    },
  },
  boxlayout: {
    border: '1px solid #d2d2d2',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    padding: 20,
  },
  childWrapper: {
    padding: '10px 20px 30px 20px',
    overflow: 'hidden',
  },
}))

// Komponente um Kindkomponenten innerhalb einer Box darzustellen
const BoxLayout = (props) => {
  const { children, maxWidth, title, align } = props
  const classes = useStyles()
  return (
    <Container
      className={classes.boxcontainer}
      maxWidth={maxWidth ? maxWidth : undefined}
    >
      <Paper className={classes.boxlayout} elevation={1}>
        {/* Überschrift */}
        <Typography
          className={classes.title}
          variant="h3"
          align={align ? align : 'inherit'}
        >
          {title}
        </Typography>
        <Divider />
        {/* Kindkomponenten */}
        <div className={classes.childWrapper}>{children}</div>
      </Paper>
    </Container>
  )
}

export default BoxLayout
