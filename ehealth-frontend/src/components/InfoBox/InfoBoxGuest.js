import { Container } from '@material-ui/core'
import React from 'react'
import InfoBoxSubject from '../InfoBoxSubject/InfoBoxSubject'
import InfoBoxText from '../InfoBoxText/InfoBoxText'
import BoxLayout from '../Layouts/BoxLayout'

//InfoBox Komponente, die Gast-Nutzern auf der Übersichtsseite angezeigt wird
const InfoBoxGuest = () => {
  return (
    <BoxLayout title={'Willkommen!'}>
      <Container>
        {/* InfoText der auf der Überssichtsseite der Gast-Nutzer */}
        <InfoBoxText />
        {/* Referenzen auf InfoBoxSubjects mit entsprechenden Titlen, Texten und Verlinkungen */}
        <InfoBoxSubject
          title="Termin Beantragen"
          text="Betragen Sie ganz einfach mit wenigen Schritten einen Termin online und erhalten Sie eine Bestätigung per Email-Adresse."
          link="/request_appointment"
        />
        <InfoBoxSubject
          title="Registrieren"
          text="Erstellen Sie schnell und einfach einen Account, um auf zusätzliche Funktionen zugreifen zu können."
          addInfo="(Weitere Informationen)"
          link="/register"
        />
      </Container>
    </BoxLayout>
  )
}

export default InfoBoxGuest
