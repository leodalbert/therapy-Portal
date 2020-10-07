import {
  GET_APPTS,
  ADD_APPT,
  EDIT_APPT,
  DELETE_APPT,
  SET_LOADING,
  APPT_ERROR,
} from './types';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// Get all clients
export const getAppts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/appts');
    dispatch({ type: GET_APPTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: APPT_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

//  Add appt
export const addAppt = (appt) => async (dispatch) => {
  try {
    const res = await axios.post('/api/appts', appt);
    dispatch({
      type: ADD_APPT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPT_ERROR,
      payload: err.response.statusText,
    });
  }
};

// // Set Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
