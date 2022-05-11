import React from 'react'
import AllAppointsmentsBox from '../components/AllAppointsmentsBox/AllAppointsmentsBox'
import RootLayout from '../components/Layouts/RootLayout'

// Alle Termine-Seite Mitarbeiteransicht
const AllAppointsments = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für AllAppointsmentsBox  */}
      <AllAppointsmentsBox />
    </RootLayout>
  )
}

export default AllAppointsments
