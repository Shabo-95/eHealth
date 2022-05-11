import React, { useContext } from 'react'
import InfoBoxPatient from '../components/InfoBox/InfoBoxPatient'
import InfoBoxEmployee from '../components/InfoBox/InfoBoxEmployee'
import RootLayout from '../components/Layouts/RootLayout'
import { UserContext } from '../components/ContextProvider/UserProvider'

// angemeldet Seite
const LoggedIn = () => {
  const { role } = useContext(UserContext)

  return (
    <RootLayout>
      {/* Unterscheidung zwischen Patienten und Mitarbeiter mit der jeweilige Referenz für die Komponente  */}
      {role === 'patient' && <InfoBoxPatient />}
      {role === 'employee' && <InfoBoxEmployee />}
    </RootLayout>
  )
}

export default LoggedIn
