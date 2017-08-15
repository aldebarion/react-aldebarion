import React /* , { PropTypes }*/ from 'react'
// import loader from 'hoc-react-loader'
// import { Link } from 'react-router'
import { Router, Route, browserHistory } from 'react-router'
import Welcome from './Welcome'
import Api from './Api'
import Hud from './Hud'

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
      <Router history={browserHistory}>
        <Route path="/welcome" component={Welcome} />
        <Route path="/" component={Api} />
        <Route path="/hud" component={Hud} />

        {/* <Route path="/presentation" component={Presentation} />
        <Route path="/projects/plasticity-interfaces" component={Research} />
        <Route path="/projects/agile-touch" component={AgileTouch} />
        <Route path="/projects(/:projectId)" component={Projects} />
        <Route path="/vision" component={Vision} />
        <Route path="/contact" component={Contact} />*/ }

      </Router>
    </div>
  )
}
App.propTypes = {}

// export default loader(App, { Loader: null })
export default App
