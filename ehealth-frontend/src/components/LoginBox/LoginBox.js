import React from 'react'
import { Divider } from '@material-ui/core'
import LoginForm from '../LoginForm/LoginForm'
import LoginFooter from '../LoginFooter/LoginFooter'
import BoxLayout from '../Layouts/BoxLayout'

// Komponentenaufbau für Loginfenster
const LoginBox = () => {
  return (
    <BoxLayout title={'Login'} align={'center'} maxWidth={'sm'}>
      {/* Referenz auf LoginForm */}
      <LoginForm />
      <Divider />
      {/* Referenz auf LoginFooter */}
      <LoginFooter />
    </BoxLayout>
  )
}

export default LoginBox
