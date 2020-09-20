import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  clients: clientsReducer,
});
