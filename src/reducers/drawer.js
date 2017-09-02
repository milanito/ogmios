import {
  TOGGLE_DRAWER
} from '../actions/drawer';

export default (state = { isOpen: false }, action) => {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isOpen: action.isOpen };
    default:
      return state;
  }
}

