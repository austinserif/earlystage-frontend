import * as types from './workspacesActionTypes';
import { clearProcessingInitialLoad } from '../../cache/cacheActionCreator';
import axios from 'axios';
import { Promise } from 'es6-promise';
import mapData from '../../../utils/mapData';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Writes bulk workspace data into state
 * @param {Object} workspaces
 */
export const setWorkspaces = (workspaces) => ({
  type: types.SET_WORKSPACES,
  payload: {
    ...workspaces
  }
});

/**
 * Takes a workspaceId and an object containing componets and overwrites/
 * sets the property `fullComponentData` into that workspaces state.
 * Note that the workspace should have a corresponding `components` array
 * that contains just the ids of its components.
 *
 * @param {String} workspaceId
 * @param {Object} components
 */
const updateWorkspaceComponents = (workspaceId, components) => {
  return {
    type: types.UPDATE_WORKSPACE_COMPONENTS,
    payload: {
      workspaceId,
      components
    }
  };
};

export const setWorkspaceComponent = (workspaceId, componentId, component) => ({
  type: types.SET_WORKSPACE_COMPONENT,
  payload: {
    workspaceId,
    componentId,
    component
  }
});

const getComponentData = (workspaceId) => async (dispatch) => {
  try {
    const token = document.cookie.token;
    const email = document.cookie.email;
    const response = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${email}/workspaces/${workspaceId}/components?_token=${token}`
    });

    const mappedData = mapData(response.data);
    console.log(mappedData);
    dispatch(updateWorkspaceComponents(workspaceId, mappedData));
  } catch (err) {
    console.log(err);
  }
};

/**
 * Takes a workspaces object containing a set of key-value pairs where
 * the key is a workspaceId and the value is the related metadata.
 * @param {Objet} workspaces
 */
export const loadAllWorkspaceComponents = (workspaces) => async (dispatch) => {
  try {
    const workspaceIds = Object.keys(workspaces); // gets an array of workspaceIds

    // sets workspaces into state
    dispatch(setWorkspaces(workspaces));

    // dispatches an action creator for each workspace id in the array
    workspaceIds.forEach((id) => {
      dispatch(getComponentData(id));
    });
  } catch (err) {
    console.log(err);
  }
};

export const setOneWorkspace = (key, value) => ({
  type: types.SET_ONE_WORKSPACE,
  payload: {
    key,
    value
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

/**
 *
 * @param {String} answer Updated answer
 * @param {Boolean} readiness Updated readiness
 * @param {String} workspaceId workspaceId string of target component
 * @param {String} componentId componentId string of target component/answer
 */
export const updateComponent = (answer, readiness, workspaceId, componentId) => {
  return {
    type: types.UPDATE_WORKSPACE_COMPONENTS,
    payload: {
      answer,
      readiness,
      workspaceId,
      componentId
    }
  };
};

export const updateComponentAnswer = (workspaceId, componentId, answer) => ({
  type: types.UPDATE_COMPONENT_ANSWER,
  payload: {
    workspaceId,
    componentId,
    answer
  }
});

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

/**
 * Takes user credentials and workspaceId and loads all components related to a particular workspaceId
 *
 * @param {Object} credentials credentials object containing email and token properties
 * @param {String} workspaceId string identifying a unique workspace
 */
export const loadAndCacheAllComponents = ({ email, token }, workspaceId, isLast = false) => async (
  dispatch
) => {
  try {
    // make a request to get all the components for a given workspace
    const response = await axios({
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      url: `users/${email}/workspaces/${workspaceId}/components?_token=${token}`
    });

    const mappedData = mapData(response.data); // maps data from an array to object with key entry by `_id` value

    dispatch(updateWorkspaceComponents(workspaceId, mappedData)); // dispatches action to update a given workspace in state to reflect changes to its components
  } catch (err) {
    console.log(err);
  } finally {
    if (isLast) dispatch(clearProcessingInitialLoad());
  }
};

export const createNewWorkspace = (
  name,
  domain,
  credentials,
  optionalCallback = () => {}
) => async (dispatch) => {
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

    const key = response.data._id;
    const value = {
      ...response.data,
      fullComponentData: {} // temporary patch until added to backend
      // without this code, error is thrown when a newly created workspace loads and tries to access the field
    };

    dispatch(setOneWorkspace(key, value)); // dispatch key-val pair where _id is the key
    optionalCallback();
  } catch (err) {
    dispatch(
      setNewWorkspaceErrMsg(err.message || 'There was an error creating your new workspace')
    );
  } finally {
    dispatch(clearIsLoading());
  }
};
