import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import clients from './clients';
import client from './client';
import drawer from './drawer';
import keys from './keys';
import locales from './locales';
import projects from './projects';
import project from './project';

const rootReducer = combineReducers({
  auth,
  clients,
  client,
  drawer,
  keys,
  locales,
  projects,
  project,
  form
});

export default rootReducer;
