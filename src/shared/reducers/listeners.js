import {
  RECEIVE_LISTENERS,
  RECEIVE_TIME,
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
    case RECEIVE_TIME: {
      newstate = {
        ...state,
        serverNow: action.now,
        serverRelease: action.later,
      }
    }
    default:
      break;
  }
  return newstate;
};

export default listenersReducer;
