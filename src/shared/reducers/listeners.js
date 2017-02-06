import {
  RECEIVE_LISTENERS,
} from '../actions/listeners';

const DEFAULT_POSTS_STATE = {
  listeners: [],
};

const listenersReducer = function listenersReducer(state = DEFAULT_POSTS_STATE, action) {
  let newstate = state;
  switch (action.type) {
    case RECEIVE_LISTENERS: {
      newstate = {
        ...state,
        listeners: action.listeners,
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default listenersReducer;
