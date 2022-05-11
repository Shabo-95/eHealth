import { Button, Grid, IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFirebase } from '../firebase'
import Icon from '../images/icons/LOGO.png'
import MenuIcon from '@material-ui/icons/Menu'

/* Styling Code (CSS) */
const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: 'relative',
    top: 0,
    marginTop: 0,
    height: 100,
    width: '100%',
    backgroundColor: '#0c5f9a',
    color: '#FFF',
    opacity: 0.95,
    textAlign: 'center',
    borderRadius: '0 0 10% 10%',
    '-webkit-box-shadow': '0px 0px 9px 3px rgba(0, 0, 0, 0.3)',
    '-moz-box-shadow': '0px 0px 9px 3px rgba(0, 0, 0, 0.3)',
    boxShadow: '0px 0px 9px 3px rgba(0, 0, 0, 0.3)',
  },
  log: {
    height: 'auto',
    width: 'auto',
  },
  icon: {
    color: '#FFF',
  },
}))

/* Mit Firebase (Server) verbinden */
const HeaderContainer = (props) => {
  const { small, setOpen } = props
  const { currentUser, instance } = useFirebase()
  const history = useHistory()
  const classes = useStyles()

  const signOut = async () => {
    if (currentUser)
      await instance
        .auth()
        .signOut()
        .then(() => history.push('/'))
        .catch((err) => console.log(err))
  }

  /* hier return ist änlich wie Main z.B. in Java */
  return (
    <header className={classes.headerContainer}>
      {/* Div Container */}
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={3}>
          {/* Unser LOGO */}
          <Link to="/">
            <img className={classes.logo} src={Icon} />
          </Link>
        </Grid>
        <Grid item xs={3}>
          {/* Ausloggen-IconButton (Falls User angemeldet ist) */}
          {small ? (
            <IconButton
              className={classes.icon}
              onClick={() => setOpen((open) => !open)}
              size="medium"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            currentUser && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => signOut()}
              >
                Ausloggen
              </Button>
            )
          )}
        </Grid>
      </Grid>
    </header>
  )
}
export default HeaderContainer
