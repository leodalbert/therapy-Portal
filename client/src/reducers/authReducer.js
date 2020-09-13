import { FETCH_USER } from '../actions/types';

const initialState = {
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
