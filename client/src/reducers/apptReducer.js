import {
  GET_APPTS,
  ADD_APPT,
  EDIT_APPT,
  DELETE_APPT,
  SET_LOADING,
  APPT_ERROR,
} from '../actions/types';

const initialState = {
  appts: [],
  current: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPTS:
      return {
        ...state,
        appts: payload,
        loading: false,
      };
    case ADD_APPT:
      return {
        ...state,
        appts: [...state.appts, action.payload],
        loading: false,
      };
    case DELETE_APPT:
      return {
        ...state,
        appts: state.logs.filter((appt) => appt.id !== action.payload),
        loading: false,
      };
    //   case EDIT_APPT:
    //     return {
    //       ...state,
    //       appts: state.appts.map((appt) =>
    //         appt.id === action.payload.id ? action.payload : appt
    //       ),
    //     };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case APPT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
