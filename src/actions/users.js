import axios from 'axios';
import { set } from 'lodash';

export const FETCHING_USERS = 'FETCHING_USERS';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const CREATING_USERS = 'CREATING_USERS';
export const SAVING_USERS = 'SAVING_USERS';

const _fetchProjectUsers = (token, id) =>
  axios
  .get(`http://localhost:3000/api/projects/${id}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const projectUsersCreating = () => {
  return (dispatch) => {
    dispatch({ type: CREATING_USERS });
  };
};

export const projectUsersSaving = () => {
  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
  };
};

export const fetchProjectUsers = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    const token = localStorage.getItem('token');
    return _fetchProjectUsers(token, id)
      .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
  };
};

export const projectUsersAdd = (props, id) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
    return axios
      .post(`http://localhost:3000/api/projects/${id}/users`, props, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_USERS });
        return _fetchProjectUsers(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
  };
};

export const projectUsersRemove = (user, id) => {
  const token = localStorage.getItem('token');
  return (dispatch) =>
    axios
    .delete(`http://localhost:3000/api/projects/${id}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        user: user.code
      }
    })
    .then(() => {
      dispatch({ type: FETCHING_USERS });
      return _fetchProjectUsers(token, id);
    })
    .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
    .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
};

export const projectUsersUpdate = (user, id, key, value) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
    return axios
      .patch(`http://localhost:3000/api/projects/${id}/users`, {
        user,
        keys: set({}, key, value)
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_USERS });
        return _fetchProjectUsers(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
  };
};

