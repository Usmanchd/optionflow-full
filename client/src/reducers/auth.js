const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: {},
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_USER':
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      };
    case 'LOAD_USERS':
      return {
        ...state,
        users: payload
      };
    case 'REGISTER_USER':
    case 'LOGIN_USER':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        errors: []
      };
    case 'REGISTER_FAILED':
    case 'LOGIN_FAILED':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        errors: payload,
        user: {}
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        errors: [],
        user: {}
      };
    default:
      return state;
  }
}
