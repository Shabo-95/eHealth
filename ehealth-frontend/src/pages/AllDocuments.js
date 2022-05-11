import React from 'react'
import AllDocumentsBox from '../components/AllDocumentsBox/AllDocumentsBox'
import RootLayout from '../components/Layouts/RootLayout'

// Alle Dokumente-Seite Mitarbeiteransicht
const AllDocuments = () => {
  return (
    <RootLayout>
      {/* Ein Referenz für AllDocumentsBox  */}
      <AllDocumentsBox />
    </RootLayout>
  )
}

export default AllDocuments
