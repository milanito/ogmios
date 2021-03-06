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
import translations from './translations';
import upload from './upload';
import users from './users';
import user from './user';

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
  translations,
  upload,
  users,
  user,
  form
});

export default rootReducer;
