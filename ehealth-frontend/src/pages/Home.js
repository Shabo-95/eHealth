import React from 'react'
import { Container, Grid } from '@material-ui/core'
import InfoBox from '../components/InfoBox/InfoBox'
import LoginBox from '../components/LoginBox/LoginBox'
import FooterContainer from '../containers/footer'
import HeaderContainer from '../containers/header'

//Home-Seite (Login-Seite)
const Home = () => {
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
      <Container justify="space-between">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={7}>
            {/* Ein Referenz für InfoBox  */}
            <InfoBox />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            {/* Ein Referenz für LoginBox  */}
            <LoginBox />
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

export default Home
