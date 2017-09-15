import axios from '../api';

export const SAVING_PROJECT = 'SAVING_PROJECT';
export const SAVING_PROJECT_USER = 'SAVING_PROJECT_USER';
export const GET_PROJECT = 'GET_PROJECT';
export const GET_PROJECT_USERS = 'GET_PROJECT_USERS';
export const FETCHING_PROJECT = 'FETCHING_PROJECT';
export const FETCHING_PROJECT_USERS = 'FETCHING_PROJECT_USERS';
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';
export const GET_PROJECT_USERS_FAILURE = 'GET_PROJECT_USERS_FAILURE';

const _fetchProject = (token, id) =>
  axios
  .get(`/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const _fetchProjectUsers = (token, id) =>
  axios
  .get(`/api/projects/${id}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchProject = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_PROJECT });
    return _fetchProject(token, id)
      .then(({ data }) => dispatch({ type: GET_PROJECT, project: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_FAILURE, payload: data }));
  };
};

export const projectSave = (token, id, name) => {
  return (dispatch) => {
    dispatch({ type: SAVING_PROJECT });
    return axios
      .patch(`/api/projects/${id}`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_PROJECT });
        return _fetchProject(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_PROJECT, project: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_FAILURE, payload: data }));
  };
};

export const fetchProjectUsers = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_PROJECT_USERS });
    return _fetchProjectUsers(token, id)
      .then(({ data }) => dispatch({ type: GET_PROJECT_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_USERS_FAILURE, payload: data }));
  };
};

export const projectUsersAdd = (token, id, props) => {
  return (dispatch) => {
    dispatch({ type: SAVING_PROJECT_USER });
    return axios
      .post(`/api/projects/${id}/users`, props, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_PROJECT_USERS });
        return _fetchProjectUsers(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_PROJECT_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_USERS_FAILURE, payload: data }));
  };
};

export const projectUsersRemove = (token, id, user) => {
  return (dispatch) =>
    axios
    .delete(`/api/projects/${id}/users/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      dispatch({ type: FETCHING_PROJECT_USERS });
      return _fetchProjectUsers(token, id);
    })
    .then(({ data }) => dispatch({ type: GET_PROJECT_USERS, users: data }))
    .catch(({ data }) => dispatch({ type: GET_PROJECT_USERS_FAILURE, payload: data }));
};

export const projectUsersUpdate = (token, id, user, role) => {
  return (dispatch) => {
    dispatch({ type: SAVING_PROJECT_USER });
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
        dispatch({ type: FETCHING_PROJECT_USERS });
        return _fetchProjectUsers(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_PROJECT_USERS, users: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_USERS_FAILURE, payload: data }));
  };
};
