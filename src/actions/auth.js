import axios from '../api';
import history from '../history';

export const AUTH_USER = 'AUTH_USER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const _fetchMe = (token) =>
  axios
  .get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const updateData = (token) => {
  return (dispatch) => {
    return _fetchMe(token)
    .then((resp) => {
      dispatch({
        type: AUTH_USER,
        userid: resp.data._id,
        token,
        email: resp.data.email,
        role: resp.data.role
      });
    });
  };
};

export const loginUser = (props) => {
  const { email, password } = props;

  return (dispatch) => {
    return axios.post('api/auth', {
      grant: 'user',
      email, password
    })
    .then(({ data }) =>
      _fetchMe(data.token)
      .then((resp) => {
        dispatch({
          type: AUTH_USER,
          userid: resp.data._id,
          token: data.token,
          email: resp.data.email,
          role: resp.data.role
        });
        history.push('/projects');
      }))
    .catch(({ response }) => dispatch({
      type: LOGIN_FAILURE,
      payload: response ? response.data : {}
    }));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
