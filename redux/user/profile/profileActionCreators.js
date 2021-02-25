import * as types from './profileActionTypes';
import axios from 'axios';
import { loadAndCacheAllComponents, setWorkspaces } from '../workspaces/workspacesActionCreators';
import mapData from '../../../utils/mapData';
import { loadAndCacheQuestions } from '../questions/questionsActionCreators';

/**
 * Sets new user profile data into state.
 *
 * @param {Object} userProfileObject
 * @param {String} userProfileObject._id
 * @param {String} userProfileObject.email
 * @param {String} userProfileObject.name
 */
export const setUserProfile = (userObject) => ({
  type: types.SET_USER_PROFILE,
  payload: {
    ...userObject
  }
});

/**
 * Clears user profile data from state.
 */
export const clearUserProfile = () => ({
  type: types.CLEAR_USER_PROFILE
});

/**
 * Sets property hasLoadedUserObject to true, indicating the initially loaded arrays containing ids,
 * like `state.user.profile.questions` and `state.user.profile.workspaces`. These arrays allow pages
 * set placeholders while more specific data is loading.
 */
// const setHasLoadedUserObject = () => ({
//   type: types.HAS_LOADED_USER_OBJECT
// });

export const loadAndCacheProfile = ({ email, token }) => async (dispatch) => {
  try {
    // this endpoint will response with the following fields: { allWorkspaceData, _id, workspaces, email, account, questions, metadata}
    const response = await axios({
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      url: `/users/${email}?_token=${token}`
    });

    const { allWorkspaceData, questions, workspaces } = response.data;

    const mappedWorkspaces = mapData(allWorkspaceData);

    // sets user data into state
    dispatch(setUserProfile(response.data));

    // sets workspace data into state
    dispatch(setWorkspaces(mappedWorkspaces));

    // for each workspace id in the workspaces array, load all related component data
    workspaces.forEach((v) => {
      dispatch(loadAndCacheAllComponents({ email, token }, v));
    });

    // load and set questions into state
    dispatch(loadAndCacheQuestions({ email, token }));

    // what data does this respond with?
  } catch (err) {
    console.log(err);
  }
};
