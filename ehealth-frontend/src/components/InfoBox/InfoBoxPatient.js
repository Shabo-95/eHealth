import React, { useContext } from 'react'
import { UserContext } from '../ContextProvider/UserProvider'
import { Container } from '@material-ui/core'
import BoxLayout from '../Layouts/BoxLayout'
import InfoBoxSubject from '../InfoBoxSubject/InfoBoxSubject'
import InfoBoxText from '../InfoBoxText/InfoBoxText'

//InfoBox Komponente, die eingeloggten Patienten auf der Übersichtsseite angezeigt wird
const InfoBoxPatient = () => {
  const { user } = useContext(UserContext)
  return (
    // Persönliche Begrüßung sobald User geladen hat
    <BoxLayout
      title={
        user
          ? `Willkommen ${user.firstname} ${user.lastname}!`
          : 'Willkommen Nutzer!'
      }
    >
      <Container>
        {/* InfoText der auf der Überssichtsseite der Patienten */}
        <InfoBoxText />
        {/* Referenzen auf InfoBoxSubjects mit entsprechenden Titlen, Texten und Verlinkungen */}
        <InfoBoxSubject
          title="Termin Beantragen"
          text="Betragen Sie ganz einfach mit wenigen Schritten einen Termin online und erhalten Sie eine Bestätigung per Email-Adresse."
          link="/request_appointment"
        />
        <InfoBoxSubject
          title="Persönliche Termine"
          text="Alle Informationen über Ihre gebuchten und bereits vergangenen Termine sind für sie selbst einsehbar. Falls Bedarf besteht, können Sie die Informationen über Ihre Termine herunterladen."
          link="/appointment"
        />
        <InfoBoxSubject
          title="Persönliche Dokumente"
          text="Um zu vermeiden, dass Sie für Kleinigkeiten, wie zum Beispiel zur Rezeptabholung, in unsere Praxis kommen müssen, werden Ihnen hier Ihre persönlichen Dokumente bei Bedarf zum Einsehen und Herunterladen bereitgestellt."
          link="/documents"
        />
        <InfoBoxSubject
          title="Account Verwalten"
          text="Sie sind umgezogen oder wollen Informationen über eine andere Email-Adresse erhalten? Dann können Sie Ihre persönlichen Daten individuell verwalten und ändern."
          link="/personal"
        />
      </Container>
    </BoxLayout>
  )
}

export default InfoBoxPatient
