import {
  SAVING_LOCALES,
  CREATING_LOCALES,
  FETCHING_LOCALES,
  GET_LOCALES,
  GET_LOCALES_FAILURE
} from '../actions/locales';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATING_LOCALES:
      return { ...state, creating: true };
    case SAVING_LOCALES:
      return { ...state, creating: false };
    case FETCHING_LOCALES:
      return { ...state, fetching: true };
    case GET_LOCALES:
      return { ...state, list: action.locales, fetching: false };
    case GET_LOCALES_FAILURE:
      return { ...state, error: { locales: action.payload }, fetching: false };
    default:
      return state;
  }
}

