import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import WedHalfList from './routes/list'
import WedHalfInfo from './routes/item'

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact render={() => <Redirect to="/wedhalf/list/1" />} />
      <Route path="/wedhalf/list/:pageIndex" exact component={WedHalfList} />
      <Route path="/wedhalf/info/:productNo" exact component={WedHalfInfo} />
    </BrowserRouter>
  )
}

export default App
