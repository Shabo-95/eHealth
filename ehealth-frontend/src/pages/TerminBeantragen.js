import React from 'react'
import Step1 from '../components/TerminLoggedIn/TerminAntrag'
import RootLayout from '../components/Layouts/RootLayout'

//TerminBeantragen-Seite für Gast und Patienten
const TerminBeantragen = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für Step1 (TerminBeantragen Komponente) */}
      <Step1 />
    </RootLayout>
  )
}

export default TerminBeantragen
