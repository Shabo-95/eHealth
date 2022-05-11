import React from 'react'
import AllPatientsBox from '../components/AllPatientsBox/AllPatientsBox'
import RootLayout from '../components/Layouts/RootLayout'

// Alle Patienten-Seite Mitarbeiteransicht
const AllPatients = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für AllPatientsBox  */}
      <AllPatientsBox />
    </RootLayout>
  )
}

export default AllPatients
