import * as types from './cacheActionTypes';
import axios from 'axios';
import {
  setWorkspaces,
  loadAndCacheAllComponents
} from '../user/workspaces/workspacesActionCreators';
import mapData from '../../utils/mapData';
import { setUserProfile } from '../user/profile/profileActionCreators';
import { setManyQuestions } from '../user/questions/questionsActionCreators';
import mapCategories from '../../utils/mapCategories';

export const setHasCachedUser = () => ({ type: types.SET_HAS_CACHED_USER });
export const clearHasCachedUser = () => ({ type: types.CLEAR_HAS_CACHED_USER });
const setProcessingInitialLoad = () => ({ type: types.SET_PROCESSING_INITIAL_LOAD });
export const clearProcessingInitialLoad = () => ({ type: types.CLEAR_PROCESSING_INITIAL_LOAD });
const updateInitialLoadProcessingStage = (stage) => ({
  type: types.UPDATE_INITIAL_LOAD_PROCESSING_STAGE,
  payload: { stage }
});

export const initialLoadingSequence = ({ email, token }) => async (dispatch) => {
  try {
    dispatch(setProcessingInitialLoad());
    dispatch(updateInitialLoadProcessingStage('Fetching User...'));

    // loading sequence for
    const userResponse = await axios({
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      url: `/users/${email}?_token=${token}`
    });

    if (!userResponse) throw new Error('GET /users/:userId returned an undefined value'); // throws an error if resource could not be loaded
    dispatch(updateInitialLoadProcessingStage('User Profile Loaded...'));

    const { allWorkspaceData, workspaces, questions, _id, account, metadata } = userResponse.data;

    // defines a profile object without the presence of `allWorkspaceData` array
    const profile = {
      _id,
      questions,
      workspaces,
      account,
      metadata
    };

    // dispatches a action creator to update the user profile with a new object
    dispatch(setUserProfile(profile));

    // maps `allWorkspaceData`, which is an array of workspace objects,
    // into a nested object where each workspace is accessible given its
    // corresponding _id key.
    const mappedWorkspces = mapData(allWorkspaceData);

    dispatch(setWorkspaces(mappedWorkspces));
    dispatch(updateInitialLoadProcessingStage('Workspaces Loaded...'));

    const questionsResponse = await axios({
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      url: `/users/${email}/questions?_token=${token}`
    });

    if (!questionsResponse) throw new Error('GET /users/:userId returned an undefined value'); // throws an error if resource could not be loaded
    const mappedQuestions = mapCategories(questionsResponse.data);
    console.log('-----mapping questions during initial load------');
    dispatch(setManyQuestions(mappedQuestions));
    dispatch(updateInitialLoadProcessingStage('Questions Loaded...'));

    // load components for workspaces if less than 100
    workspaces.forEach((v, i, arr) => {
      let isLast = i === arr.length - 1;
      if (i < 100) dispatch(loadAndCacheAllComponents({ email, token }, v, isLast));
    });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setHasCachedUser());
  }
};
