import {
  CLEAR_IMPORTS,
  IMPORTING_KEYS,
  IMPORTED_KEYS,
  FAILURE_IMPORT_KEYS,
  UPLOADING_KEYS,
  UPLOADED_KEYS,
  FAILURE_UPLOAD_KEYS
} from '../actions/upload';

export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_IMPORTS:
      return { ...state, importing: false, imported: false, uploading: false, uploaded: false };
    case IMPORTING_KEYS:
      return { ...state, importing: true, imported: false };
    case IMPORTED_KEYS:
      return { ...state, importing: false, imported: true };
    case FAILURE_IMPORT_KEYS:
      return { ...state, error: { upload: action.payload }, importing: false, imported: false };
    case UPLOADING_KEYS:
      return { ...state, uploading: true, uploaded: false };
    case UPLOADED_KEYS:
      return { ...state, uploading: false, uploaded: true };
    case FAILURE_UPLOAD_KEYS:
      return { ...state, error: { upload: action.payload }, uploading: false, uploaded: false };
    default:
      return state;
  }
}




