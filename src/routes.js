import React from 'react';
import { Route, Switch } from 'react-router-dom';

import requireAuth from './components/RequireAuth';
import requireNotAuth from './components/RequireNotAuth';
import Clients from './containers/Clients.js';
import Client from './containers/Client.js';
import Header from './components/Header.js';
import Login from './containers/Login.js';
import NotFound from './containers/NotFound';
import Projects from './containers/Projects.js';
import Project from './containers/Project.js';
import Settings from './containers/Settings.js';
import Users from './containers/Users.js';
import User from './containers/User.js';
import { switchStyle } from './styles/main';

export default (
  <div>
    <Header />
    <div style={switchStyle}>
      <Switch>
        <Route exact path="/login" component={requireNotAuth(Login)} />
        <Route exact path="/projects" component={requireAuth(Projects)} />
        <Route exact path="/project/:projectid" component={requireAuth(Project)} />
        <Route exact path="/clients" component={requireAuth(Clients)} />
        <Route exact path="/client/:clientid" component={requireAuth(Client)} />
        <Route exact path="/users" component={requireAuth(Users)} />
        <Route exact path="/user/:userid" component={requireAuth(User)} />
        <Route exact path="/settings" component={requireAuth(Settings)} />
        <Route component={requireAuth(NotFound)}/>
      </Switch>
    </div>
  </div>
)
