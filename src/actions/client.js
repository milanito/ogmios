import axios from '../api';

export const GET_CLIENT = 'GET_CLIENT';
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE';

export const fetchClient = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
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


