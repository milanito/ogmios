import axios from 'axios';

export const GET_PROJECT = 'GET_PROJECT';
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';

export const fetchProject = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    return axios
      .get(`http://localhost:3000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: GET_PROJECT, project: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_FAILURE, payload: data }));
  };
};

