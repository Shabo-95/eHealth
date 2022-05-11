import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import AllAppointsments from '../../pages/AllAppointsments'
import AllDocuments from '../../pages/AllDocuments'
import AllPatients from '../../pages/AllPatients'
import LoggedIn from '../../pages/LoggedIn'
import NotFound from '../../pages/NotFound'
import Datenschutz from '../../pages/Datenschutz'
import Impressung from '../../pages/Impressum'

// Router für Mitarbeiter
const EmployeeRouter = () => {
  return (
    <Router>
      {/* Switch case für Mitarbeiter Routen */}
      <Switch>
        <Route exact path="/" component={LoggedIn} />
        <Route path="/appointments" component={AllAppointsments} />
        <Route path="/impressum" component={Impressung} />
        <Route path="/documents" component={AllDocuments} />
        <Route path="/patients" component={AllPatients} />
        <Route path="/datenschutz" component={Datenschutz} />
        {/* Default Route, falls keine der obigen übereinstimmt */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default EmployeeRouter
