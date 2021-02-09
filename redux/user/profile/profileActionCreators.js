import * as types from './profileActionTypes';

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
