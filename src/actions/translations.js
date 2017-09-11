export const UPDATE_VISIBLE = 'UPDATE_VISIBLE';
export const CHANGE_LOCALE_ONE = 'CHANGE_LOCALE_ONE';
export const CHANGE_LOCALE_TWO = 'CHANGE_LOCALE_TWO';
export const CLEAR_LOCALES = 'CLEAR_LOCALES';

export const updateVisible = (visible) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_VISIBLE,
      visible
    });
  }
};

export const updateLocale = (locale, first) => {
  return (dispatch) => {
    if (first) {
      return dispatch({
        type: CHANGE_LOCALE_ONE,
        locale
      });
    }
    return dispatch({
      type: CHANGE_LOCALE_TWO,
      locale
    });
  };
};

export const clearLocales = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_LOCALES
    });
  };
};
