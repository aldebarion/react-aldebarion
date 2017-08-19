import React /* , { PropTypes } */ from 'react'
// import loader from 'hoc-react-loader'
// import { Link } from 'react-router'
// import { Router, Route } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Welcome from './Welcome'
import Api from './Api'
import Hud from './Hud'
import { Dashboard } from './Demos'

// import Projects from './Projects'
// import Vision from './Vision'
// import Contact from './Contact'
// import Presentation from './Presentation'
// import Research from './Pages/Research'
// import AgileTouch from './Pages/AgileTouch'

import '../global.scss'

const App = () => {
  return (
    <div className="app">
      <Router>
        <div>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/" component={Api} />
          <Route exact path="/hud" component={Hud} />
          <Route exact path="/demo/dashboard" component={Dashboard} />

          {/* <Route path="/presentation" component={Presentation} />
          <Route path="/projects/plasticity-interfaces" component={Research} />
          <Route path="/projects/agile-touch" component={AgileTouch} />
          <Route path="/projects(/:projectId)" component={Projects} />
          <Route path="/vision" component={Vision} />
          <Route path="/contact" component={Contact} /> */ }
        </div>
      </Router>
    </div>
  )
}
App.propTypes = {}

// export default loader(App, { Loader: null })
export default App
