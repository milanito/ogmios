import axios from '../api';

export const FETCHING_CLIENT = 'FETCHING_CLIENT';
export const SAVING_CLIENT = 'SAVING_CLIENT';
export const GET_CLIENT = 'GET_CLIENT';
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE';

const _fetchClient = (token, id) =>
  axios
    .get(`/api/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

export const fetchClient = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CLIENT });
    return _fetchClient(token, id)
      .then(({ data }) => dispatch({ type: GET_CLIENT, client: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENT_FAILURE, payload: data }));
  };
};

export const clientUpdate = (token, client, props) => {
  return (dispatch) => {
    dispatch({ type: SAVING_CLIENT });
    return axios
      .patch(`/api/clients/${client}`, props, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_CLIENT });
        return _fetchClient(token, client);
      })
      .then(({ data }) => dispatch({ type: GET_CLIENT, client: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENT_FAILURE, payload: data }));
  };
};

export const clientAddProject = (token, client, id) => {
  return (dispatch) => {
    dispatch({ type: SAVING_CLIENT });
    return axios
      .post(`/api/projects/${id}/clients`, {
        client
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_CLIENT });
        return _fetchClient(token, client);
      })
      .then(({ data }) => dispatch({ type: GET_CLIENT, client: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENT_FAILURE, payload: data }));
  };
};

export const clientRemoveProject = (token, client, id) => {
  return (dispatch) => {
    dispatch({ type: SAVING_CLIENT });
    return axios
      .delete(`/api/projects/${id}/clients/${client}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => _fetchClient(token, client))
      .then(({ data }) => dispatch({ type: GET_CLIENT, client: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENT_FAILURE, payload: data }));
  };
};
