import React from 'react'
import { useFirebase } from './firebase'
import LoadingScreen from './pages/LoadingScreen'
import UserProvider from './components/ContextProvider/UserProvider'
import LoggedInRouter from './components/Routers/LoggedInRouter'
import GuestRouter from './components/Routers/GuestRouter'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './styles'
import './styles/GlobalStyles.css'

const App = () => {
  const { currentUser } = useFirebase()

  /* registrierter oder nicht registrierter User?*/
  return (
    <ThemeProvider theme={theme}>
      {currentUser === undefined ? (
        <LoadingScreen />
      ) : currentUser ? (
        <UserProvider currentUser={currentUser}>
          <LoggedInRouter />
        </UserProvider>
      ) : (
        <GuestRouter />
      )}
    </ThemeProvider>
  )
}

export default App
