import axios from 'axios';
import setauthtoken from '../utilis/setauthtoken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setauthtoken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: 'LOAD_USER',
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: 'REGISTER_FAILED', payload: errors });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: 'REGISTER_USER',
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: 'REGISTER_FAILED', payload: errors });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: 'LOGIN_USER',
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
 
    dispatch({ type: 'LOGIN_FAILED', payload: errors });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: 'LOGOUT'
  });
};

export const handleToken = token => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ token });
    await axios.post('/api/stripe', body, config);
    dispatch(loadUser());
  } catch (err) {}
};
