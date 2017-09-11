import axios from '../api';

export const CLEAR_IMPORTS = 'CLEAR_IMPORTS';
export const IMPORTING_KEYS = 'IMPORTING_KEYS';
export const IMPORTED_KEYS = 'IMPORTED_KEYS';
export const FAILURE_IMPORT_KEYS = 'FAILURE_IMPORT_KEYS';
export const UPLOADING_KEYS = 'UPLOADING_KEYS';
export const UPLOADED_KEYS = 'UPLOADED_KEYS';
export const FAILURE_UPLOAD_KEYS = 'FAILURE_UPLOAD_KEYS';

export const clearImports = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_IMPORTS
    });
  };
};

export const uploadKeys = (token, keys, id) => {
  return (dispatch) => {
    dispatch({ type: UPLOADING_KEYS });
    return axios
      .post(`/api/projects/${id}/keys`, {
        keys
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: UPLOADED_KEYS }))
      .catch(({ data }) => dispatch({ type: FAILURE_UPLOAD_KEYS, payload: data }));
  };
};

export const uploadLocale = (token, keys, locale, id)  => {
  return (dispatch) => {
    dispatch({ type: IMPORTING_KEYS });
    return axios
      .patch(`/api/projects/${id}/locales`, {
        locale,
        keys
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: IMPORTED_KEYS }))
      .catch(({ data }) => dispatch({ type: FAILURE_IMPORT_KEYS, payload: data }));
  };
};
