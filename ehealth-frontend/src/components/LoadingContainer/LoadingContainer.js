import React from 'react'
import { Container } from '@material-ui/core'
import Loader from '../Loader/Loader'

// Container in dem ein Ladesymbol angezeigt wird
const LoadingContainer = () => {
  return (
    <Container>
      <Loader />
    </Container>
  )
}

export default LoadingContainer
