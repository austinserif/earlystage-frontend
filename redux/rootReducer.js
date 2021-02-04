// `rootReducer.js` combines auth and user reducers into the root
import userReducer from './user/userReducer';
import authReducer from './auth/authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
