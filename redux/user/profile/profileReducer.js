import * as types from './profileActionTypes';

const initialState = {
  _id: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case types.CLEAR_USER_PROFILE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default profileReducer;
