import { Box } from '@material-ui/core'
import React from 'react'
import Loader from '../components/Loader/Loader'

// Übergangsseite
const LoadingScreen = () => {
  return (
    <Box display="flex" justifyContent="center" height="100vh">
      {/* Ein Referenz für Loader  */}
      <Loader />
    </Box>
  )
}

export default LoadingScreen
