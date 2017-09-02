import React from 'react';
import { Route } from 'react-router-dom';

import requireAuth from './components/RequireAuth';
import requireNotAuth from './components/RequireNotAuth';
import Header from './components/Header.js';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Projects from './containers/Projects.js';
import Project from './containers/Project.js';
import Clients from './containers/Clients.js';
import Client from './containers/Client.js';

export default (
  <div>
    <Header />
    <Route exact path="/" component={requireAuth(Home)} />
    <Route exact path="/login" component={requireNotAuth(Login)} />
    <Route exact path="/projects" component={requireAuth(Projects)} />
    <Route path="/project/:projectid" component={requireAuth(Project)} />
    <Route exact path="/clients" component={requireAuth(Clients)} />
    <Route path="/client/:clientid" component={requireAuth(Client)} />
  </div>
)
