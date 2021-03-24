import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import * as Routes from './routes';

import {
  LoginPage,
  ProfilePage, 
  ProjectsPage,
  RegisterPage
} from './pages';

import './App.scss';
import { AuthProvider, SessionstorageProvider } from './services';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';

const App = () => {
  return(
    <SessionstorageProvider>
      <AuthProvider>
        <Router basename='/'>
          <Switch>
            <Route exact path={Routes.LANDING}>
              <Redirect to={Routes.LOGIN} />
            </Route>
            <RouteWithLayout exact path={Routes.LOGIN} component={LoginPage}/>
            <RouteWithLayout exact path={Routes.REGISTER} component={RegisterPage}/>
            <AuthRouteWithLayout exact path={Routes.PROFILE} component={ProfilePage}/>
            <AuthRouteWithLayout exact path={Routes.PROJECTS} component={ProjectsPage}/>
          </Switch>
        </Router>
      </AuthProvider>
    </SessionstorageProvider>
  )
}

export default App;