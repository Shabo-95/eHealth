import React from 'react'
import DokumenteBox from '../components/DokumenteBox/DokumenteBox'
import RootLayout from '../components/Layouts/RootLayout'

// Persönliche Dokumente-Seite Patienten-Ansicht
const Dokumente = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für DokumenteBox  */}
      <DokumenteBox />
    </RootLayout>
  )
}

export default Dokumente
