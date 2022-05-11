import React from 'react'
import { Typography } from '@material-ui/core'
import BoxLayout from '../Layouts/BoxLayout'

//InfoBox Komponente, die auf der Startseite angezeigt wird
const InfoBox = () => {
  return (
    <BoxLayout title={'Willkommen in unserer Praxis!'} maxWidth={'md'}>
      <Typography variant="body1">
        Derzeit liegt uns ein hygienischer und geregelter Tagesablauf näher am
        Herzen denn je. Um uns zu helfen, können Sie sich einen Account
        erstellen, indem Sie Ihre Daten, Termine und Dokumente selbst verwalten
        können. Wenn Sie Fragen haben, können Sie uns über die gewohnten Quellen
        erreichen.
      </Typography>
    </BoxLayout>
  )
}

export default InfoBox
