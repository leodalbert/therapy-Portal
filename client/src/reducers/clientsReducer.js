import {
  GET_ALL_CLIENTS,
  ADD_CLIENT,
  UPDATE_CLIENT,
  GET_CLIENT,
  GET_ARCHIVED_CLIENTS,
  REMOVE_CLIENT,
  ARCHIVE_CLIENT,
  UNARCHIVE_CLIENT,
  CLIENT_ERROR,
  SHOW_SEARCHBAR,
  HIDE_SEARCHBAR,
  SET_TEXT_FILTER,
  CLEAR_CLIENT,
  GET_CLIENT_NOTES,
  EDIT_CLIENT,
} from '../actions/types';

const initialState = {
  clients: [],
  client: null,
  loading: true,
  error: {},
  showSearchbar: false,
  filterText: '',
  clientNotes: [],
  edit: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: payload,
        loading: false,
        edit: false,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: payload,
        loading: false,
      };
    case CLEAR_CLIENT:
      return {
        ...state,
        client: null,
        clientNotes: [],
        loading: false,
        edit: false,
      };
    case SET_TEXT_FILTER:
      return {
        ...state,
        filterText: payload,
      };
    case GET_ARCHIVED_CLIENTS:
      return {
        ...state,
        clients: payload,
        loading: false,
      };
    case EDIT_CLIENT:
      return {
        ...state,
        edit: true,
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [payload, ...state.clients],
        loading: false,
        edit: false,
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client._id !== payload._id),
        client: null,
        clientNotes: [],
        loading: false,
        edit: false,
      };
    case REMOVE_CLIENT:
    case ARCHIVE_CLIENT:
    case UNARCHIVE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client._id !== payload),
        loading: false,
      };
    case CLIENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SHOW_SEARCHBAR:
      return {
        ...state,
        showSearchbar: true,
      };
    case HIDE_SEARCHBAR:
      return {
        ...state,
        showSearchbar: false,
      };
    case GET_CLIENT_NOTES:
      return {
        ...state,
        clientNotes: payload,
        loading: false,
      };
    default:
      return state;
  }
}
