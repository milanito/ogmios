import axios from 'axios';

export const FETCHING_LOCALES = 'FETCHING_LOCALES';
export const GET_LOCALES = 'GET_LOCALES';
export const GET_LOCALES_FAILURE = 'GET_LOCALES_FAILURE';
export const CREATING_LOCALES = 'CREATING_LOCALES';
export const SAVING_LOCALES = 'SAVING_LOCALES';

const _fetchProjectLocales = (token, id) =>
  axios
  .get(`http://localhost:3000/api/projects/${id}/locales`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const projectLocalesCreating = () => {
  return (dispatch) => {
    dispatch({ type: CREATING_LOCALES });
  };
};

export const projectLocalesSaving = () => {
  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
  };
};

export const fetchProjectLocales = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_LOCALES });
    const token = localStorage.getItem('token');
    return _fetchProjectLocales(token, id)
      .then(({ data }) => dispatch({ type: GET_LOCALES, locales: data }))
      .catch(({ data }) => dispatch({ type: GET_LOCALES_FAILURE, payload: data }));
  };
};

export const projectLocalesAdd = (props, id) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
    return axios
      .post(`http://localhost:3000/api/projects/${id}/locales`, props, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_LOCALES });
        return _fetchProjectLocales(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_LOCALES, locales: data }))
      .catch(({ data }) => dispatch({ type: GET_LOCALES_FAILURE, payload: data }));
  };
};

export const projectLocalesRemove = (locale, id) => {
  const token = localStorage.getItem('token');
  return (dispatch) =>
    axios
    .delete(`http://localhost:3000/api/projects/${id}/locales`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        locale: locale.code
      }
    })
    .then(() => {
      dispatch({ type: FETCHING_LOCALES });
      return _fetchProjectLocales(token, id);
    })
    .then(({ data }) => dispatch({ type: GET_LOCALES, locales: data }))
    .catch(({ data }) => dispatch({ type: GET_LOCALES_FAILURE, payload: data }));
};

export const projectLocalesUpdate = (locale, id, key, value) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
    const keys = {};
    keys[key] = value;
    return axios
      .patch(`http://localhost:3000/api/projects/${id}/locales`, {
        locale,
        keys
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_LOCALES });
        return _fetchProjectLocales(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_LOCALES, locales: data }))
      .catch(({ data }) => dispatch({ type: GET_LOCALES_FAILURE, payload: data }));
  };
};

export const projectLocalesMultipleUpdate = (locales, id) => {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
    return axios
      .patch(`http://localhost:3000/api/projects/${id}/locales/multiple`, {
        locales
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch({ type: FETCHING_LOCALES });
        return _fetchProjectLocales(token, id);
      })
      .then(({ data }) => dispatch({ type: GET_LOCALES, locales: data }))
      .catch(({ data }) => dispatch({ type: GET_LOCALES_FAILURE, payload: data }));
  };
};
