import axios from '../api';
import { set } from 'lodash';

export const FETCHING_USERS = 'FETCHING_USERS';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const CREATING_USERS = 'CREATING_USERS';
export const SAVING_USERS = 'SAVING_USERS';

const _fetchAllUsers = (token) =>
  axios
  .get('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchAllUsers = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    return _fetchAllUsers(token)
      .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
  };
};

export const usersCreating = () => {
  return (dispatch) => {
    dispatch({ type: CREATING_USERS });
  };
};

export const usersSaving = () => {
  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
  };
};

export const usersRemove = (token, id) => {
  return (dispatch) => {};
};

export const usersAdd = (token, email, password, role) => {
  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
    return axios
      .post(`/api/users`, {
        email,
        password,
        role
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_USERS });
        return _fetchAllUsers(token);
      })
      .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
  };
};
