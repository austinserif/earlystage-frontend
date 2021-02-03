import * as types from './workspacesActionTypes';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const SERVER_URL = process.env.SERVER_URL;

/**
 * Writes bulk workspace data into state
 * @param {Object} workspaces
 */
const setWorkspaces = (workspaces) => ({
  type: types.SET_WORKSPACES,
  payload: {
    workspaces
  }
});

/**
 * Sets loading flag to true
 */
const setIsLoading = () => ({
  type: types.SET_WORKSPACES_IS_LOADING
});

/**
 * Sets loading flag in state back to false
 */
const clearIsLoading = () => ({
  type: types.CLEAR_WORKSPACES_IS_LOADING
});

export const getWorkspaces = (email, token, workspaceIdArray) => async (dispatch) => {
  try {
    const dispatch = useDispatch();

    dispatch(setIsLoading());

    const response = await axios.all([
      workspaceIdArray.map((v) =>
        axios.get(`${SERVER_URL}/users/${email}/workspaces/${v}?_token=${token}`)
      )
    ]);

    // map response data array into a workspace object
    const workspaces = {};

    response.forEach((v) => {
      const id = v.data._id;
      const res = v.data;
      delete res[v.data];
      workspaces[id] = res;
    });

    // dispatch workspace object
    dispatch(setWorkspaces(workspaces));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(clearIsLoading());
  }
};
