import axios from '../api';

export const FETCHING_LOCALES = 'FETCHING_LOCALES';
export const GET_LOCALES = 'GET_LOCALES';
export const GET_LOCALES_FAILURE = 'GET_LOCALES_FAILURE';
export const CREATING_LOCALES = 'CREATING_LOCALES';
export const SAVING_LOCALES = 'SAVING_LOCALES';

const _fetchProjectLocales = (token, id) =>
  axios
  .get(`/api/projects/${id}/locales`, {
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

export const fetchProjectLocales = (token, id) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_LOCALES });
    return _fetchProjectLocales(token, id)
      .then(({ data }) => dispatch({ type: GET_LOCALES, locales: data }))
      .catch(({ data }) => dispatch({ type: GET_LOCALES_FAILURE, payload: data }));
  };
};

export const projectLocalesAdd = (token, props, id) => {
  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
    return axios
      .post(`/api/projects/${id}/locales`, props, {
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

export const projectLocalesRemove = (token, locale, id) => {
  return (dispatch) =>
    axios
    .delete(`/api/projects/${id}/locales`, {
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

export const projectLocalesUpdate = (token, locale, id, key, value) => {
  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
    const keys = {};
    keys[key] = value;
    return axios
      .patch(`/api/projects/${id}/locales`, {
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

export const projectLocalesMultipleUpdate = (token, locales, id) => {
  return (dispatch) => {
    dispatch({ type: SAVING_LOCALES });
    return axios
      .patch(`/api/projects/${id}/locales/multiple`, {
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
