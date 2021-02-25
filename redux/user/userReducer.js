import { combineReducers } from 'redux';
import workspacesReducer from './workspaces/workspacesReducer';
import profileReducer from './profile/profileReducer';
import questionsReducer from './questions/questionsReducer';

const userReducer = combineReducers({
  workspaces: workspacesReducer,
  profile: profileReducer,
  questions: questionsReducer
});

export default userReducer;
