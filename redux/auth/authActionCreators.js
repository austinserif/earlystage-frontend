import * as types from './authActionTypes';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setUserProfile, clearUserProfile } from '../user/profile/profileActionCreators';
import { getWorkspacesFromIds, clearWorkspaces } from '../user/workspaces/workspacesActionCreators';
import { getUserData } from '../../api/user';

/**
 * Sets new authentication credentials and preferences into state. Called
 * following a successful authentication attempt.
 *
 * @param {Object} user object containing tokne, uid, and keepLoggedIn values
 */
const setUser = ({ token, uid, isVerified, email, keepLoggedIn = false }) => ({
  type: types.SET_USER,
  payload: {
    token,
    uid,
    isVerified,
    keepLoggedIn,
    email
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

export const flushUserDataCache = () => async (dispatch) => {
  // clear auth state
  dispatch(clearUser());

  // clear profile state
  dispatch(clearUserProfile());

  // clear workspaces state
  dispatch(clearWorkspaces());
  // add others here as integrated ....
};

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

    // set verification status, token, and uid into state
    dispatch(setUser({ email, token, uid, isVerified }));

    // load user's data from the server
    dispatch(loadAndCacheUserData(token, email));
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

/**
 * Loads user profile data and key arrays of workspace and question ids.
 * Then, dispatches additional actionCreators to make follow up requests
 * and load all necessary pieces of data into state.
 *
 * @param {String} token
 * @param {String} email
 */
const loadAndCacheUserData = (email, token) => async (dispatch) => {
  try {
    // const data = await getUserData(); // returns => { _id, name, email, isVerified, isAdmin, workspaces, questions, metadata }

    const response = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${email}?_token=${token}`
    });

    const { _id, account, workspaces, questions } = response.data;

    // get sub documents
    const { name } = account;

    // cache profile data
    dispatch(setUserProfile({ _id, email, name }));

    // get and cache workspaces data
    dispatch(getWorkspacesFromIds(email, token, workspaces));
  } catch (err) {
    console.log(err);
  }
};

/**
 * Takes a full name, email, and password and
 * calls the server with that information to create
 * a new user. If a valid response is returned, the
 * function dispatches the `attemptLogin` action creator
 * to authomatically login the user.
 *
 * @param {String} name full name of new user
 * @param {String} email email address
 * @param {String} password password
 */
export const attemptRegistration = (name, email, password) => async (dispatch) => {
  try {
    // tell redux store that data is being loaded
    dispatch(setIsLoading());

    // build endpoint url
    const apiRoute = `${SERVER_URL}/users`;

    // call api
    await axios({
      method: 'POST',
      url: apiRoute,
      data: {
        name,
        email,
        password
      }
    });

    // if response is valid, attempt login
    return dispatch(attemptLogin(email, password));
  } catch (err) {
    console.log(err);
    dispatch(
      setAuthErrorMsg(err.message || 'Your registration could not be processed at this time')
    );
  } finally {
    // tell redux store that all requests are complete
    dispatch(clearIsLoading());
  }
};
