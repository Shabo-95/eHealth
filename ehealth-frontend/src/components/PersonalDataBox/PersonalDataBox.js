import React from 'react'
import BoxLayout from '../Layouts/BoxLayout'
import PersonalDataForm from '../PersonalDataForm/PersonalDataForm'

const PersonalDataBox = () => {
  return (
    /* Ein Referenz für BoxLayout.js */
    <BoxLayout title="Account verwalten">
      {/* Ein Referenz für PersonalDataForm.js */}
      <PersonalDataForm />
    </BoxLayout>
  )
}

export default PersonalDataBox
