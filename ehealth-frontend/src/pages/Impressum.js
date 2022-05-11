import React from 'react'
import { Grid, Container } from '@material-ui/core'
import ImpressumBox from '../components/ImpressumBox/ImpressumBox'
import BoxLayout from '../components/Layouts/BoxLayout'
import RootLayout from '../components/Layouts/RootLayout'

// Impressum Seite
const Impressum = () => {
  return (
    <RootLayout>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <BoxLayout title={'Impressum'} align={false}>
              {/* Ein Referenz für ImpressumBox  */}
              <ImpressumBox />
            </BoxLayout>
          </Grid>
        </Grid>
      </Container>
    </RootLayout>
  )
}

export default Impressum
