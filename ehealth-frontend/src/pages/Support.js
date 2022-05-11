import React from 'react'
import { Grid, Container } from '@material-ui/core'
import SupportBox from '../components/SupportBox/SupportBox'
import BoxLayout from '../components/Layouts/BoxLayout'
import RootLayout from '../components/Layouts/RootLayout'

//Support-Seite
const Support = () => {
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
            <BoxLayout title={'Support'} align={false}>
              {/* Ein Referenz für SupportBox  */}
              <SupportBox />
            </BoxLayout>
          </Grid>
        </Grid>
      </Container>
    </RootLayout>
  )
}

export default Support
