import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import * as Routes from './routes';

import {
  AddProjectPage,
  LoginPage,
  ProfileEditPage,
  ProfilePage, 
  ProjectPage, 
  ProjectsPage,
  RegisterPage
} from './pages';

import './App.scss';
import { ApiProvider, AuthProvider, SessionstorageProvider } from './services';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';

const App = () => {
  return(
    <SessionstorageProvider>
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
              <Route exact path={Routes.LANDING}>
                <Redirect to={Routes.LOGIN} />
              </Route>
              <RouteWithLayout exact path={Routes.LOGIN} component={LoginPage}/>
              <RouteWithLayout exact path={Routes.REGISTER} component={RegisterPage}/>

              {/* 
                Profile routes
              */}
              <AuthRouteWithLayout exact path={Routes.PROFILE} component={ProfilePage}/>
              <AuthRouteWithLayout exact path={Routes.PROFILE_EDIT} component={ProfileEditPage}/>

              {/* 
                Project routes
              */}
              <AuthRouteWithLayout exact path={Routes.PROJECTS} component={ProjectsPage}/>
              <AuthRouteWithLayout exact path={Routes.PROJECTS_CREATE} component={AddProjectPage}/>
              <AuthRouteWithLayout exact path={Routes.PROJECT_PAGE} component={ProjectPage}/>
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </SessionstorageProvider>
  )
}

export default App;