import React from 'react'
import { Container } from '@material-ui/core'
import BoxLayout from '../Layouts/BoxLayout'
import InfoBoxSubject from '../InfoBoxSubject/InfoBoxSubject'

//InfoBox Komponente, die eingeloggten Mitarbeitern auf der Überssichtsseite angezeigt wird
const InfoBoxEmployee = () => {
  return (
    <BoxLayout title={'Willkommen!'}>
      <Container>
        {/* Referenzen auf InfoBoxSubjects mit entsprechenden Titlen, Texten und Verlinkungen */}
        <InfoBoxSubject
          title="Alle Termine"
          text="Sehen Sie alle Patienten Termine und Zusatzinformationen bezüglich des Termins ein. Verschiedene Ansichten zum Überblick sind möglich."
          link="/appointments"
        />
        <InfoBoxSubject
          title="Alle Dokumente"
          text="Sehen Sie alle bereits hochgeladenen Dokumente ein. Filterung nach beliebigem Patienten ist möglich."
          link="/documents"
        />
        <InfoBoxSubject
          title="Alle Patienten"
          text="Sehen Sie alle Patienteninformationen ein und laden Sie gegebenenfalls Dokumente für die jeweiligen Patieten hoch. Filterung nach beliebigem Patienten ist möglich."
          link="/patients"
        />
      </Container>
    </BoxLayout>
  )
}

export default InfoBoxEmployee
