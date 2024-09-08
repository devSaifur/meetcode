import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'

const LoadHomePage = lazy(() => import('./pages/index'))
const HomePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoadHomePage />
  </Suspense>
)

export const App = () => (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route>404: No such page!</Route>
  </Switch>
)
