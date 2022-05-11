import React from 'react'
import { Grid, Container } from '@material-ui/core'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import BoxLayout from '../components/Layouts/BoxLayout'
import FooterContainer from '../containers/footer'
import HeaderContainer from '../containers/header'

//Registration-Seite
const Register = () => {
  //Javascript
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      wrap="nowrap"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12}>
        {/* Ein Referenz für HeaderContainer  */}
        <HeaderContainer />
      </Grid>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <BoxLayout title={'Registration'} align={false}>
              {/* Ein Referenz für RegisterForm  */}
              <RegisterForm />
            </BoxLayout>
          </Grid>
        </Grid>
      </Container>
      <Grid item xs={12}>
        {/* Ein Referenz für FooterContainer  */}
        <FooterContainer />
      </Grid>
    </Grid>
  )
}

export default Register
