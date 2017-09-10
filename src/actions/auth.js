import axios from 'axios';

import history from '../history';

export const AUTH_USER = 'AUTH_USER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginUser = (props) => {
  const { email, password } = props;

  return (dispatch) => {
    return axios.post('http://localhost:3000/api/auth', {
      grant: 'user',
      email, password
    })
    .then(({ data }) => {
      return axios
        .get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        })
        .then((resp) => {
          dispatch({ type: AUTH_USER, token: data.token, role: resp.data.role });
          history.push('/projects');
        });
    })
    .catch(({ response }) => dispatch({
      type: LOGIN_FAILURE,
      payload: response ? response.data : {}
    }));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    dispatch({ type: LOGOUT });
  };
};
