import * as types from './profileActionTypes';

const initialState = {
  _id: null,
  email: '',
  name: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return {
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
