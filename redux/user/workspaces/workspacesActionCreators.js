import * as types from './workspacesActionTypes';
import { useDispatch } from 'react-redux';
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
 *
 * @param {String} email
 * @param {String} token
 * @param {String[]} workspaceIdArray
 */
export const getWorkspaces = (email, token, workspaceIdArray) => async (dispatch) => {
  try {
    // initiate loading
    dispatch(setIsLoading());

    console.log(email, token, workspaceIdArray);

    const getRequest = (url, email, workspaceId, token) =>
      axios.get(`${url}/users/${email}/workspaces/${workspaceId}?_token=${token}`);

    // request data for all workspace ids
    const responses = await axios.all(
      workspaceIdArray.map((v) => getRequest(SERVER_URL, email, v, token))
    );

    console.log(responses);

    // map response data array into a workspace object
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
