import axios from 'axios';

export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE';
export const CREATING_PROJECTS = 'CREATING_PROJECTS';
export const SAVING_PROJECTS = 'SAVING_PROJECTS';

const _fetchProjects = (token) =>
  axios
  .get('http://localhost:3000/api/projects', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const projectsCreating = () => {
  return (dispatch) => {
    dispatch({ type: CREATING_PROJECTS });
  };
};

export const projectsSaving = () => {
  return (dispatch) => {
    dispatch({ type: SAVING_PROJECTS });
  };
};

export const fetchProjects = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_PROJECTS });
    return _fetchProjects(token)
      .then(({ data }) => dispatch({ type: GET_PROJECTS, projects: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECTS_FAILURE, payload: data }));
  };
};

export const projectsAdd = (token, props) => {
  return (dispatch) => {
    dispatch({ type: CREATING_PROJECTS });
    return axios
      .post('http://localhost:3000/api/projects', props, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_PROJECTS });
        return _fetchProjects(token);
      })
      .then(({ data }) => dispatch({ type: GET_PROJECTS, projects: data }))
      .catch(({ data }) => dispatch({ type: GET_PROJECTS_FAILURE, payload: data }));
  };
};

export const projectsRemove = (token, id) => {
  return (dispatch) =>
    axios
    .delete(`http://localhost:3000/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      dispatch({ type: FETCHING_PROJECTS });
      return _fetchProjects(token);
    })
    .then(({ data }) => dispatch({ type: GET_PROJECTS, projects: data }))
    .catch(({ data }) => dispatch({ type: GET_PROJECTS_FAILURE, payload: data }));
};
