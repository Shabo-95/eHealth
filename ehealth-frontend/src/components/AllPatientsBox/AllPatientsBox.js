import React from 'react'
import AllPatientsForm from '../AllPatientsForm/AllPatientsForm'
import BoxLayout from '../Layouts/BoxLayout'

const AllPatientsBox = () => {
  return (
    /* Ein Referenz für BoxLayout.js */
    <BoxLayout title={'Alle Patienten'}>
      {/* Ein Referenz für AllPatientsForm.js */}
      <AllPatientsForm />
    </BoxLayout>
  )
}

export default AllPatientsBox
