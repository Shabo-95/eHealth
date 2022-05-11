import React from 'react'
import RootLayout from '../components/Layouts/RootLayout'
import PersonalDataBox from '../components/PersonalDataBox/PersonalDataBox'

// Account Verwaltung-Seite Patienten-ansicht
const PersonalData = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für PersonalDataBox  */}
      <PersonalDataBox />
    </RootLayout>
  )
}

export default PersonalData
