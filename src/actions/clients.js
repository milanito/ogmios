import axios from 'axios';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE';

export const fetchClients = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    return axios
      .get('http://localhost:3000/api/clients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: GET_CLIENTS, clients: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENTS_FAILURE, payload: data }));
  };
};

export const clientsSaving = () => {
  return (dispatch) => {};
};

export const clientsCreating = () => {
  return (dispatch) => {};
};

export const clientsRemove = () => {
  return (dispatch) => {};
};
