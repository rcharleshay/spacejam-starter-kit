import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'src/ui/pages/App'

const getUIRoutes = () => (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={() => <div>INDEX</div>} />
    <Route path="*" component={() => <div>No Match</div>} />
  </Route>
)

export default getUIRoutes
