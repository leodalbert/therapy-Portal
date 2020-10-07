import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import alertReducer from './alertReducer';
import apptReducer from './apptReducer';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  alert: alertReducer,
  clients: clientsReducer,
  appts: apptReducer,
});
