export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const toggleDrawer = (isOpen) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAWER, isOpen });
  };
};
