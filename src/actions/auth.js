import axios from 'axios';
import { createBrowserHistory } from 'history';

export const AUTH_USER = 'AUTH_USER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginUser = (props) => {
  const { email, password } = props;

  return (dispatch) => {
    axios.post('http://localhost:3000/api/auth', {
      grant: 'user',
      email, password
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      const history = createBrowserHistory();
      dispatch({ type: AUTH_USER });

      history.push('/');
    })
    .catch(({ data }) => dispatch({
      type: LOGIN_FAILURE,
      payload: data.error
    }));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  }
}
