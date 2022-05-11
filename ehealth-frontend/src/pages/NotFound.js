import { Container, Grid } from '@material-ui/core'
import React from 'react'
import BoxLayout from '../components/Layouts/BoxLayout'
import NotFoundBox from '../components/NotFoundBox/NotFoundBox'
import FooterContainer from '../containers/footer'
import HeaderContainer from '../containers/header'

//  Nicht gefunden-Seite
const NotFound = () => {
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
            <BoxLayout
              title={'Seite konnte nicht gefunden werden'}
              align={false}
            >
              {/* Ein Referenz für NotFoundBox  */}
              <NotFoundBox />
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

export default NotFound
