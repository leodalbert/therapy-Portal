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
  EDIT_NEW_CLIENT_NOTE,
  SUBMIT_CLIENT_NOTE,
  CLEAR_CLIENT_NOTE_STATE,
  DELETE_NOTE,
  SET_SHOW_ARCHIVED,
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
export const addClient = (values) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/clients`, values);

    dispatch({ type: ADD_CLIENT, payload: res.data });
    dispatch(setAlert(`${values.name} added as a client`, 'alert-success'));
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
    dispatch(destroy('editClient'));
    dispatch({ type: EDIT_CLIENT, payload: false });
    dispatch(setAlert('Client Deleted', 'alert-success'));
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
    dispatch({ type: ARCHIVE_CLIENT, payload: { id: clientId, value: true } });
    dispatch(destroy('editClient'));
    dispatch({ type: EDIT_CLIENT, payload: false });
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

    dispatch({
      type: UNARCHIVE_CLIENT,
      payload: { id: clientId, value: false },
    });
    dispatch(destroy('editClient'));
    dispatch({ type: EDIT_CLIENT, payload: false });
    dispatch(setAlert('Client un-archived', 'alert-success'));
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
export const editClient = (value) => (dispatch) => {
  dispatch({ type: EDIT_CLIENT, payload: value });
};

// New Note State
export const editNewNote = (note) => (dispatch) => {
  dispatch({ type: EDIT_NEW_CLIENT_NOTE, payload: note });
};

// Clear New Note State
export const clearNewClientNote = () => (dispatch) => {
  dispatch({ type: CLEAR_CLIENT_NOTE_STATE });
};

// Sets Show Archived Clients
export const setShowArchived = (value) => (dispatch) => {
  dispatch({ type: SET_SHOW_ARCHIVED, payload: value });
};

// Submit new or edited note
export const submitClientNote = (note, clientId) => async (dispatch) => {
  try {
    let res = await axios.post(`/api/clients/${clientId}/note`, note);
    dispatch({ type: SUBMIT_CLIENT_NOTE, payload: res.data });
    dispatch({ type: CLEAR_CLIENT_NOTE_STATE });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
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

// Delete Note
export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await axios.delete(`/api/clientnote/${noteId}`);

    dispatch({ type: DELETE_NOTE, payload: noteId });
    dispatch(setAlert('Note Deleted', 'alert-success'));
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
