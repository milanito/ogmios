import axios from '../api';
import { set } from 'lodash';

export const FETCHING_USERS = 'FETCHING_USERS';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const CREATING_USERS = 'CREATING_USERS';
export const SAVING_USERS = 'SAVING_USERS';

const _fetchProjectUsers = (token, id) =>
  axios
  .get(`/api/projects/${id}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchAllUsers = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    return axios
      .get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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

export const fetchProjectUsers = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    return _fetchProjectUsers(token, id)
      .then(({ data }) => dispatch({ type: GET_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_USERS_FAILURE, payload: data }));
  };
};

export const projectUsersAdd = (token, props, id) => {
  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
    return axios
      .post(`/api/projects/${id}/users`, props, {
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

export const projectUsersRemove = (token, user, id) => {
  return (dispatch) =>
    axios
    .delete(`/api/projects/${id}/users`, {
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

export const projectUsersUpdate = (token, user, id, role) => {
  return (dispatch) => {
    dispatch({ type: SAVING_USERS });
    return axios
      .patch(`/api/projects/${id}/users`, {
        user,
        role
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

