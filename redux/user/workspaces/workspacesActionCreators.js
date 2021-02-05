import * as types from './workspacesActionTypes';
import axios from 'axios';

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

/**
 *
 * @param {String} email
 * @param {String} token
 * @param {String[]} workspaceIdArray
 */
export const getWorkspacesFromIds = (email, token, workspaceIdArray) => async (dispatch) => {
  try {
    // initiate loading
    dispatch(setIsLoading());

    // formulate request
    const getRequest = (url, email, workspaceId, token) =>
      axios.get(`${url}/users/${email}/workspaces/${workspaceId}?_token=${token}`);

    // request data for all workspace ids
    const responses = await axios.all(
      workspaceIdArray.map((v) => getRequest(SERVER_URL, email, v, token))
    );

    // map response data array into a workspaces object
    const workspaces = {};

    responses.forEach((v) => {
      const { data } = v; // destructure data object from response
      const id = data._id; // isolate id
      delete data._id; // delete id from original object

      // set key-value pair into workspaces object, where the
      // key is the workspaceId, and the value is the rest of
      // the original data response object
      workspaces[id] = data;
    });
    // dispatch workspace object
    dispatch(setWorkspaces(workspaces));
  } catch (err) {
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
