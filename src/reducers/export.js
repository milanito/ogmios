import {
  FETCHING_EXPORT_PROJECT,
  GET_EXPORT_PROJECT,
  GET_EXPORT_PROJECT_FAILURE,
  FETCHING_EXPORT_TYPES,
  GET_EXPORT_TYPES,
  GET_EXPORT_TYPES_FAILURE
} from '../actions/export';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCHING_EXPORT_PROJECT:
      return { ...state, exporting: true };
    case GET_EXPORT_PROJECT:
      return { ...state, data: action.export, exporting: false };
    case GET_EXPORT_PROJECT_FAILURE:
      return { ...state, error: { export: action.payload }, exportin: false };
    case FETCHING_EXPORT_TYPES:
      return { ...state, fetching: true };
    case GET_EXPORT_TYPES:
      return { ...state, types: action.types, fetching: false };
    case GET_EXPORT_TYPES_FAILURE:
      return { ...state, error: { types: action.payload }, fetching: false };
    default:
      return state;
  }
}



