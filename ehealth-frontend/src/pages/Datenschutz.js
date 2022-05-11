import { Container, Grid } from '@material-ui/core'
import React from 'react'
import DatenschutzBox from '../components/DatenschutzBox/DatenschutzBox'
import RootLayout from '../components/Layouts/RootLayout'
import BoxLayout from '../components/Layouts/BoxLayout'

//Datenschutz Seite
const Datenschutz = () => {
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
            <BoxLayout title={'Datenschutz'} align={false}>
              {/* Ein Referenz für DatenschutzBox  */}
              <DatenschutzBox />
            </BoxLayout>
          </Grid>
        </Grid>
      </Container>
    </RootLayout>
  )
}

export default Datenschutz
