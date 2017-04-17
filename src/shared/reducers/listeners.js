import {
  RECEIVE_LISTENERS,
  RECEIVE_TIME,
  RECEIVE_NOT_RECENT,
} from '../actions/listeners';
import {
  LISTENER_STATUS_OFFLINE,
  LISTENER_STATUS_WAITING,
  LISTENER_STATUS_IMMINENT,
  LISTENER_STATUS_RELEASING,
} from './listener_constants';


const DEFAULT_POSTS_STATE = {
  listeners: [],
  receiveStatus: LISTENER_STATUS_OFFLINE,
  receivedRecent: false,
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
      let receiveStatus = LISTENER_STATUS_WAITING;
      if (action.later <= action.now) {
        receiveStatus = LISTENER_STATUS_RELEASING;
      } else if (action.later - action.now < 10000) {
        receiveStatus = LISTENER_STATUS_IMMINENT;
      }
      newstate = {
        ...state,
        serverNow: action.now,
        serverRelease: action.later,
        receiveStatus: receiveStatus,
        receivedRecent: true,
      };
      break;
    }
    case RECEIVE_NOT_RECENT: {
      newstate = {
        ...state,
        receivedRecent: false,
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default listenersReducer;
