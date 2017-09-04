import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import clients from './clients';
import client from './client';
import drawer from './drawer';
import exprt from './export';
import keys from './keys';
import locales from './locales';
import projects from './projects';
import project from './project';
import users from './users';

const rootReducer = combineReducers({
  auth,
  clients,
  client,
  drawer,
  export: exprt,
  keys,
  locales,
  projects,
  project,
  users,
  form
});

export default rootReducer;
