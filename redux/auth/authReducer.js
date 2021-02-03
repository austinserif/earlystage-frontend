import * as types from './authActionTypes';

const initialState = {
  token: null,
  keepLoggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, ...action.payload };
    case types.SET_KEEP_LOGGED_IN:
      return { ...state, keepLoggedIn: true };
    case types.CLEAR_USER:
      return { token: null, keepLoggedIn: false };
    case types.SET_AUTH_ERROR_MESSAGE:
      return { token: null, keepLoggedIn: false, authErrorMessage: action.paylpad.errorMsg };
    case types.CLEAR_AUTH_ERROR_MESSAGE:
      return { authErrorMessage: null };
    case types.SET_AUTH_LOADING:
      return { ...state, isLoading: true };
    case types.CLEAR_AUTH_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default userReducer;
