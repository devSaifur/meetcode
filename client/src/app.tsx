import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'

const LoadHomePage = lazy(() => import('./pages/index'))
const HomePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoadHomePage />
  </Suspense>
)

const LoadLoginPage = lazy(() => import('./pages/login'))
const LoginPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoadLoginPage />
  </Suspense>
)

export const App = () => (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route>404: No such page!</Route>
  </Switch>
)
