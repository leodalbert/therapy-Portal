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
  EDIT_NEW_CLIENT_NOTE,
  SUBMIT_CLIENT_NOTE,
  CLEAR_CLIENT_NOTE_STATE,
  DELETE_NOTE,
} from '../actions/types';

const initialState = {
  clients: [],
  client: null,
  loading: true,
  error: {},
  showSearchbar: false,
  filterText: '',
  clientNotes: [],
  newNote: {
    note: '',
    _id: null,
  },
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
    case CLEAR_CLIENT_NOTE_STATE:
      return {
        ...state,
        newNote: {
          note: '',
          _id: null,
        },
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
        edit: payload,
      };
    case EDIT_NEW_CLIENT_NOTE:
      return {
        ...state,
        newNote: !!payload._id
          ? payload
          : {
              _id: state.newNote._id,
              note: payload,
            },
      };
    case SUBMIT_CLIENT_NOTE:
      return {
        ...state,
        clientNotes: state.clientNotes.find((note) => note._id === payload._id)
          ? state.clientNotes.map((noteItem) =>
              noteItem._id === payload._id
                ? { ...noteItem, note: payload.note }
                : noteItem
            )
          : [payload, ...state.clientNotes],
      };
    case DELETE_NOTE:
      return {
        ...state,
        clientNotes: state.clientNotes.filter((note) => note._id !== payload),
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
