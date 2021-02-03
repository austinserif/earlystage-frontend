import * as types from './profileActionTypes';

/**
 * Sets new user profile data into state.
 *
 * @param {Object} userProfileObject
 * @param {String} userProfileObject._id
 * @param {String} userProfileObject.email
 * @param {String} userProfileObject.name
 */
export const setUserProfile = ({ _id, email, name }) => ({
  type: types.SET_USER_PROFILE,
  payload: {
    _id,
    email,
    name
  }
});

/**
 * Clears user profile data from state.
 */
export const clearUserProfile = () => ({
  type: types.CLEAR_USER_PROFILE
});
