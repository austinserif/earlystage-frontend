import { combineReducers } from 'redux';
import workspacesReducer from './workspaces/workspacesReducer';

const userReducer = combineReducers({
  workspaces: workspacesReducer
});

export default userReducer;
