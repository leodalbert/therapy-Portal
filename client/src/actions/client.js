import {
  GET_ALL_CLIENTS,
  ADD_CLIENT,
  UPDATE_CLIENT,
  GET_CLIENT,
  GET_ARCHIVED_CLIENTS,
  REMOVE_CLIENT,
  ARCHIVE_CLIENT,
  CLIENT_ERROR,
  UNARCHIVE_CLIENT,
  SHOW_SEARCHBAR,
  HIDE_SEARCHBAR,
  SET_TEXT_FILTER,
  CLEAR_CLIENT,
  GET_CLIENT_NOTES,
  EDIT_CLIENT,
} from './types';
import { destroy } from 'redux-form';
import { setAlert } from './alert';
import axios from 'axios';

// Get all clients
export const getAllClients = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/clients');

    dispatch({ type: GET_ALL_CLIENTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get client
export const getClient = (clientId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/clients/${clientId}`);

    dispatch({ type: GET_CLIENT, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get archived clients
export const getArchivedClients = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/clients/archived');

    dispatch({ type: GET_ARCHIVED_CLIENTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update client
export const updateClient = (values, history) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/clients/${values._id}`, values);
    history.push('/clients');
    dispatch({ type: UPDATE_CLIENT, payload: res.data });
    dispatch({ type: ADD_CLIENT, payload: res.data });
    dispatch(destroy('editClient'));
    dispatch(
      setAlert(`${values.name}'s profile has been updated`, 'alert-success')
    );
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add client
export const addClient = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/clients`, formData);

    dispatch({ type: ADD_CLIENT, payload: res.data });
    dispatch(setAlert('Client Added', 'alert-success'));
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove client
export const removeClient = (clientId) => async (dispatch) => {
  try {
    await axios.delete(`/api/clients/${clientId}`);

    dispatch({ type: REMOVE_CLIENT, payload: clientId });
    dispatch(setAlert('Client Removed', 'alert-success'));
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive client
export const archiveClient = (clientId) => async (dispatch) => {
  try {
    await axios.post(`/api/clients/archive/${clientId}`);

    dispatch({ type: ARCHIVE_CLIENT, payload: clientId });
    dispatch(setAlert('Client Archived', 'alert-success'));
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Unarchive client
export const unarchiveClient = (clientId) => async (dispatch) => {
  try {
    await axios.post(`/api/clients/unarchive/${clientId}`);

    dispatch({ type: UNARCHIVE_CLIENT, payload: clientId });
    dispatch(setAlert('Client re-activated', 'alert-success'));
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Show Searchbar
export const showSearchbar = () => (dispatch) => {
  dispatch({ type: SHOW_SEARCHBAR });
};

// Hide Searchbar
export const hideSearchbar = () => (dispatch) => {
  dispatch({ type: HIDE_SEARCHBAR });
};

// Set Text Filter
export const setTextFilter = (text) => (dispatch) => {
  dispatch({ type: SET_TEXT_FILTER, payload: text });
};

// Clear CLient
export const clearClient = () => (dispatch) => {
  dispatch({ type: CLEAR_CLIENT });
  dispatch(destroy('editClientForm'));
};

// Edit CLient
export const editClient = () => (dispatch) => {
  dispatch({ type: EDIT_CLIENT });
};

// Get Client Notes
export const getClientNotes = (clientId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/clientnotes/client/${clientId}`);

    dispatch({ type: GET_CLIENT_NOTES, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
