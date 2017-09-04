import axios from 'axios';

export const SAVING_PROJECT = 'SAVING_PROJECT';
export const GET_PROJECT = 'GET_PROJECT';
export const FETCHING_PROJECT = 'FETCHING_PROJECT';
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';

const _fetchProject = (token, id) =>
  axios
  .get(`http://localhost:3000/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const fetchProject = (id) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: FETCHING_PROJECT });
    return _fetchProject(token, id)
      .then(({ data }) => dispatch({ type: GET_PROJECT, project: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECT_FAILURE, payload: data }));
  };
};

export const projectSave = (id, name) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: SAVING_PROJECT });
    return axios
      .patch(`http://localhost:3000/api/projects/${id}`, { name }, {
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
