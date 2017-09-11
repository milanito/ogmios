import axios from 'axios';

export const FETCHING_EXPORT_TYPES = 'FETCHING_EXPORT_TYPES';
export const FETCHING_EXPORT_PROJECT = 'FETCHING_EXPORT_PROJECT';
export const GET_EXPORT_PROJECT = 'GET_EXPORT_PROJECT';
export const GET_EXPORT_PROJECT_FAILURE = 'GET_EXPORT_PROJECT_FAILURE';
export const GET_EXPORT_TYPES = 'GET_EXPORT_TYPES';
export const GET_EXPORT_TYPES_FAILURE = 'GET_EXPORT_TYPES_FAILURE';
export const EXPORT_DOWNLOADING = 'EXPORT_DOWNLOADING';
export const EXPORT_UPLOADING = 'EXPORT_UPLOADING';

export const fetchExportTypes = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_EXPORT_TYPES });
    return axios
    .get(`http://localhost:3000/api/export/types`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => dispatch({ type: GET_EXPORT_TYPES, types: data }))
    .catch(({ data }) => dispatch({ type: GET_EXPORT_TYPES_FAILURE, payload: data }));
  };
};

export const exportProject = (token, id, locale, type) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_EXPORT_PROJECT });
    return axios
    .get(`http://localhost:3000/api/export/project/${id}/locale/${locale}/type/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => dispatch({ type: GET_EXPORT_PROJECT, export: data }))
    .catch(({ data }) => dispatch({ type: GET_EXPORT_PROJECT_FAILURE, payload: data }));
  };
};
