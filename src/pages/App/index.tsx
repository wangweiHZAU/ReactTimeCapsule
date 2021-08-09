import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as React from 'react'
import Main from '../Main'
import Put from '../Put'
import Open from '../Open'
import NotFound from '../NotFound'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          {
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/put" component={Put} />
              <Route path="/open" component={Open} />
              <Route component={NotFound} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    )
  }
}
