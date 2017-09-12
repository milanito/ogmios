import axios from '../api';

export const FETCHING_CLIENT = 'FETCHING_CLIENT';
export const GET_CLIENT = 'GET_CLIENT';
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE';

export const fetchClient = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CLIENT });
    return axios
      .get(`/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: GET_CLIENT, client: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENT_FAILURE, payload: data }));
  };
};


