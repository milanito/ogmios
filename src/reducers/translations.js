import {
  UPDATE_VISIBLE,
  CHANGE_LOCALE_ONE,
  CHANGE_LOCALE_TWO,
  CLEAR_LOCALES
} from '../actions/translations';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VISIBLE:
      return { ...state, visible: action.visible };
    case CHANGE_LOCALE_ONE:
      return { ...state, localeOne: action.locale };
    case CHANGE_LOCALE_TWO:
      return { ...state, localeTwo: action.locale };
    case CLEAR_LOCALES:
      return { ...state, localeOne: null, localeTwo: null };
    default:
      return state;
  }
}
