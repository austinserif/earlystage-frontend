import { combineReducers } from 'redux';
import workspacesReducer from './workspaces/workspacesReducer';
import profileReducer from './profile/profileReducer';

const userReducer = combineReducers({
  workspaces: workspacesReducer,
  profile: profileReducer
});

export default userReducer;
