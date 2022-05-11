import React from 'react'
import RootLayout from '../components/Layouts/RootLayout'
import PersonalAppointmentBox from '../components/PersonalAppointmentBox/PersonalAppointmentBox'

// Persönliche Termine-Seite Patienten-ansicht
const PersonalAppointment = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für PersonalAppointmentBox  */}
      <PersonalAppointmentBox />
    </RootLayout>
  )
}

export default PersonalAppointment
