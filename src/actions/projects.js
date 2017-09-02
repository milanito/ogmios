import axios from 'axios';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE';

export const fetchProjects = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    return axios
      .get('http://localhost:3000/api/projects', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: GET_PROJECTS, projects: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECTS_FAILURE, payload: data }));
  };
};

export const projectsAdd = (props) => {
  const token = localStorage.getItem('token');
  return (dispatch) =>
    axios
    .post('http://localhost:3000/api/projects', props, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => axios.get('http://localhost:3000/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    .then(({ data }) => dispatch({ type: GET_PROJECTS, projects: data }))
    .catch(({ data }) => dispatch({ type: GET_PROJECTS_FAILURE, payload: data }));
};

export const projectsRemove = (id) => {
  const token = localStorage.getItem('token');
  return (dispatch) =>
    axios
    .delete(`http://localhost:3000/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => axios.get('http://localhost:3000/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    .then(({ data }) => dispatch({ type: GET_PROJECTS, projects: data }))
    .catch(({ data }) => dispatch({ type: GET_PROJECTS_FAILURE, payload: data }));
};
