import * as types from './workspacesActionTypes';
import axios from 'axios';
import { Promise } from 'es6-promise';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Writes bulk workspace data into state
 * @param {Object} workspaces
 */
export const setWorkspaces = (workspaces) => ({
  type: types.SET_WORKSPACES,
  payload: {
    workspaces
  }
});

export const clearWorkspaces = () => ({ type: types.CLEAR_WORKSPACES });

/**
 * Sets loading flag to true
 */
const setIsLoading = () => ({
  type: types.SET_WORKSPACE_IS_LOADING
});

/**
 * Sets loading flag in state back to false
 */
const clearIsLoading = () => ({
  type: types.CLEAR_WORKSPACE_IS_LOADING
});

/**
 * Sets a new error message into redux state
 * @param {String} message error message for display
 */
const setNewWorkspaceErrMsg = (message) => {
  return {
    type: types.SET_NEW_WORKSPACE_ERROR_MSG,
    payload: {
      message
    }
  };
};

/** Sets new workspace error message state back to null */
export const clearNewWorkspaceErrMsg = () => ({ type: types.CLEAR_NEW_WORKSPACE_ERROR_MSG });

export const loadAndSetWorkspace = (email, token, workspaceId) => async (dispatch) => {
  try {
    // get details pertaining to a single workspace from server
    const response = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${email}/workspaces/${workspaceId}?_token=${token}`
    });

    // dispatch action creator with newly added data
    dispatch(setWorkspaces({ [workspaceId]: response.data }));
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {String} email
 * @param {String} token
 * @param {String[]} workspaceIdArray
 */
export const getWorkspacesFromIds = (email, token, workspaceIdArray = []) => async (dispatch) => {
  try {
    if (workspaceIdArray.length === 0) return;

    // initiate loading
    dispatch(setIsLoading());

    // push series of new requests into requestArray
    const requestArray = workspaceIdArray.map((v) => {
      return axios.get(`${SERVER_URL}/users/${email}/workspaces/${v}?_token=${token}`);
    });

    // await all promises in the request array to resolve before proceeding
    const responses = await Promise.all(requestArray);

    // map response data array into a workspaces object
    const workspaces = {};

    responses.forEach((v, i) => {
      console.log(v.data);
      // console.log(v.data.entity);
      const { data } = v; // destructure data object from response

      // set key-value pair into workspaces object, where the
      // key is the workspaceId, and the value is the rest of
      // the original data response object
      workspaces[workspaceIdArray[i]] = data;
    });
    // dispatch workspace object
    dispatch(setWorkspaces(workspaces));
  } catch (err) {
    console.log('an error occured inside getWorkspacesFromIds');
    console.log(err);
  } finally {
    dispatch(clearIsLoading());
  }
};

export const createNewWorkspace = (name, domain, credentials) => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    // get credentials from obj
    const { token, email } = credentials;

    // call api with creds and data
    const response = await axios({
      method: 'POST',
      url: `${SERVER_URL}/users/${email}/workspaces?_token=${token}`,
      data: {
        name,
        domain
      }
    });

    console.log(response.data);

    const body = response.data; // get data for storage in state

    delete body._id; // delete _id because it will be the key

    dispatch(setWorkspaces({ [response.data._id]: body })); // dispatch key-val pair where _id is the key
  } catch (err) {
    dispatch(
      setNewWorkspaceErrMsg(err.message || 'There was an error creating your new workspace')
    );
  } finally {
    dispatch(clearIsLoading());
  }
};
