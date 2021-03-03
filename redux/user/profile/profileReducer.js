import * as types from './profileActionTypes';

const initialState = {
  _id: null,
  email: '',
  name: '',
  account: {},
  questions: [],
  workspaces: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return {
        ...action.payload
      };
    case types.REMOVE_FROM_WORKSPACES_ARRAY: {
      let workspacesCopy = state.workspaces.filter((v) => v !== action.payload.workspaceId);
      return {
        ...state,
        workspaces: [...workspacesCopy]
      };
    }
    case types.CLEAR_USER_PROFILE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default profileReducer;
