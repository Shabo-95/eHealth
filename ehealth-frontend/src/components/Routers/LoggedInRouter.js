import React, { useContext } from 'react'
import LoadingScreen from '../../pages/LoadingScreen'
import { UserContext } from '../ContextProvider/UserProvider'
import EmployeeRouter from './EmployeeRouter'
import PatientRouter from './PatientRouter'

// Router für eingeloggte Nutzer
const LoggedInRouter = () => {
  const { role } = useContext(UserContext)

  // Funktion um passenden Router zu laden basierend auf Rollenunterscheidung
  const getRouter = (role) => {
    switch (role) {
      case 'patient':
        return <PatientRouter />
      case 'employee':
        return <EmployeeRouter />
    }
  }

  return role === undefined ? <LoadingScreen /> : getRouter(role)
}

export default LoggedInRouter
