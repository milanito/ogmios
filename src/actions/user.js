import axios from '../api';

export const FETCHING_USER = 'FETCHING_USER';
export const GET_USER = 'GET_USER';
export const GET_USER_FAILURE = 'GET_USERS_FAILURE';
export const SAVING_USER = 'SAVING_USER';

const _fetchUser = (token, id) =>
  axios
  .get(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchUser = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USER });
    return _fetchUser(token, id)
      .then(({ data }) => dispatch({ type: GET_USER, user: data }))
      .catch(({ data }) => dispatch({ type: GET_USER_FAILURE, payload: data }));
  };
};

export const fetchMe = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_USER });
    return _fetchUser(token, 'me')
      .then(({ data }) => dispatch({ type: GET_USER, user: data }))
      .catch(({ data }) => dispatch({ type: GET_USER_FAILURE, payload: data }));
  };
};

export const updateUser = (token, id, props) => {
  return (dispatch) => {
    dispatch({ type: SAVING_USER });
    return axios
      .patch(`/api/users/${id}`, props, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_USER });
        return _fetchUser(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_USER, user: data }))
      .catch(({ data }) => dispatch({ type: GET_USER_FAILURE, payload: data }));
  };
};
