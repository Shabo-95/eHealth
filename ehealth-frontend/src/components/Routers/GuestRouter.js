import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GastLogIn from '../../pages/GastLogIn'
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'
import Register from '../../pages/Register'
import support from '../../pages/Support'
import TerminBeantragen from '../../pages/TerminBeantragen'
import Datenschutz from '../../pages/Datenschutz'
import Impressung from '../../pages/Impressum'

// Router für Gäste
const GuestRouter = () => {
  return (
    <Router>
      {/* Switch Case für Gast Routen */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/impressum" component={Impressung} />
        <Route path="/guest" component={GastLogIn} />
        <Route path="/request_appointment" component={TerminBeantragen} />
        <Route path="/Support" component={support} />
        <Route path="/datenschutz" component={Datenschutz} />
        {/* Default Route, falls keine der obigen übereinstimmt */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default GuestRouter
