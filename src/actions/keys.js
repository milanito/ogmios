import axios from 'axios';

export const FETCHING_KEYS = 'FETCHING_KEYS';
export const GET_KEYS = 'GET_KEYS';
export const GET_KEYS_FAILURE = 'GET_KEYS_FAILURE';
export const CREATING_KEYS = 'CREATING_KEYS';
export const SAVING_KEYS = 'SAVING_KEYS';

const _fetchProjectKeys = (token, id) =>
  axios
  .get(`http://localhost:3000/api/projects/${id}/keys`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const projectKeysCreating = () => {
  return (dispatch) => {
    dispatch({ type: CREATING_KEYS });
  };
};

export const projectKeysSaving = () => {
  return (dispatch) => {
    dispatch({ type: SAVING_KEYS });
  };
};

export const fetchProjectKeys = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_KEYS });
    return _fetchProjectKeys(token, id)
      .then(({ data }) => dispatch({ type: GET_KEYS, keys: data }))
      .catch(({ data }) => dispatch({ type: GET_KEYS_FAILURE, payload: data }));
  };
};

export const projectKeysAdd = (token, props, id) => {
  return (dispatch) => {
    dispatch({ type: SAVING_KEYS });
    return axios
      .post(`http://localhost:3000/api/projects/${id}/keys`, {
        keys: [ props.key ]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_KEYS });
        return _fetchProjectKeys(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_KEYS, keys: data }))
      .catch(({ data }) => dispatch({ type: GET_KEYS_FAILURE, payload: data }));
  };
};

export const projectKeysRemove = (token, key, id) => {
  return (dispatch) =>
    axios
    .delete(`http://localhost:3000/api/projects/${id}/keys`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { keys: [ key ] }
    })
    .then(() => {
      dispatch({ type: FETCHING_KEYS });
      return _fetchProjectKeys(token, id);
    })
    .then(({ data }) => dispatch({ type: GET_KEYS, keys: data }))
    .catch(({ data }) => dispatch({ type: GET_KEYS_FAILURE, payload: data }));
};


