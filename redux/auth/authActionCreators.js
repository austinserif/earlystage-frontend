import * as types from './authActionTypes';
const SERVER_URL = 'https://earlystage-backend-y3tr5.ondigitalocean.app';
import axios from 'axios';

/**
 * Sets new authentication credentials and preferences into state. Called
 * following a successful authentication attempt.
 *
 * @param {Object} user object containing tokne, uid, and keepLoggedIn values
 */
const setUser = ({ token, uid, isVerified, keepLoggedIn = false }) => ({
  type: types.SET_USER,
  payload: {
    token,
    uid,
    isVerified,
    keepLoggedIn
  }
});

/**
 * Clears any stale or unwanted authentication information
 * from auth state.
 */
export const clearUser = () => ({ type: types.CLEAR_USER });

/**
 * Sets an auth error message into redux state.
 * @param {String} message
 */
const setAuthErrorMsg = (message) => ({
  type: types.SET_AUTH_ERROR_MESSAGE,
  payload: {
    errorMsg: message || 'There was an error fulfilling your request.'
  }
});

/**
 * Clears any prior standing auth error message from state.
 */
export const clearAuthErrorMsg = () => ({ type: types.CLEAR_AUTH_ERROR_MESSAGE });

/**
 * Sets loading flag to true, usually called from
 * async auth functions that require fetching data.
 */
const setIsLoading = () => ({
  type: types.SET_AUTH_LOADING
});

/**
 * Sets loading flag back to false, called
 * after reciept of completed api call.
 */
const clearIsLoading = () => ({
  type: types.CLEAR_AUTH_LOADING
});

/**
 * Attemps login given email and password credentials passed as args. If successful,
 * `setUser` is dispatched, setting the newly logged in user into state. Otherwise,
 * `setAuthErrorMsg` is dispatched instead, setting an error message into state.
 * @param {String} email credential string
 * @param {String} password credential string
 */
export const attemptLogin = (email, password) => async (dispatch) => {
  try {
    // tell redux store that data is being loaded
    dispatch(setIsLoading());

    // build endpoint url
    const apiRoute = `${SERVER_URL}/login`;

    // call api
    const response = await axios({
      method: 'POST',
      url: apiRoute,
      data: {
        email,
        password
      }
    });

    // destructure payload from response
    const { token, uid, isVerified } = response.data;

    // return dispatch action with logged in user's token and id
    return dispatch(setUser({ token, uid, isVerified }));
  } catch (err) {
    // set error message into state
    dispatch(
      setAuthErrorMsg(err.message || 'Your login request could not be processed at this time')
    );
  } finally {
    // tell redux store that all requests are complete
    dispatch(clearIsLoading());
  }
};

export const attemptRegistration = (name, email, password) => async (dispatch) => {
  try {
    // tell redux store that data is being loaded
    dispatch(setIsLoading());

    // build endpoint url
    const apiRoute = `${SERVER_URL}/users`;

    // call api
    const response = await axios({
      method: 'POST',
      url: apiRoute,
      data: {
        name,
        email,
        password
      }
    });

    // destructure payload from response
    const { token, uid, isVerified } = response;

    // registration process automatically logs in the new user and returns a token, uid, and verification status
    // --> return dispatch action with logged in user's token and id
    return dispatch(setUser({ token, uid, isVerified }));
  } catch (err) {
    dispatch(
      setAuthErrorMsg(err.message || 'Your registration could not be processed at this time')
    );
  } finally {
    // tell redux store that all requests are complete
    dispatch(clearIsLoading());
  }
};
