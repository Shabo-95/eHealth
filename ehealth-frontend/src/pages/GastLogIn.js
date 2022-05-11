import React from 'react'
import InfoBoxGuest from '../components/InfoBox/InfoBoxGuest'
import RootLayout from '../components/Layouts/RootLayout'

//Home-Seite (Info-Seite) Gast-Ansicht
const GastLogIn = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für InfoBoxGuest  */}
      <InfoBoxGuest />
    </RootLayout>
  )
}

export default GastLogIn
