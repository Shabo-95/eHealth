import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Dokumente from '../../pages/Dokumente'
import LoggedIn from '../../pages/LoggedIn'
import NotFound from '../../pages/NotFound'
import PersonalData from '../../pages/PersonalData'
import TerminBeantragen from '../../pages/TerminBeantragen'
import PersonalAppointment from '../../pages/PersonalAppointment'
import support from '../../pages/Support'
import Datenschutz from '../../pages/Datenschutz'
import Impressung from '../../pages/Impressum'

// Router für Patienten
const PatientRouter = () => {
  return (
    <Router>
      {/* Switch Case für Patienten Routen */}
      <Switch>
        <Route exact path="/" component={LoggedIn} />
        <Route path="/request_appointment" component={TerminBeantragen} />
        <Route path="/impressum" component={Impressung} />
        <Route path="/documents" component={Dokumente} />
        <Route path="/personal" component={PersonalData} />
        <Route path="/appointment" component={PersonalAppointment} />
        <Route path="/Support" component={support} />
        <Route path="/datenschutz" component={Datenschutz} />
        {/* Default Route, falls keine der obigen übereinstimmt */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default PatientRouter
