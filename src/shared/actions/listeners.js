
const RECEIVE_LISTENERS = 'RECEIVE_LISTENERS';
function receiveListeners(listeners) {
  return {
    type: RECEIVE_LISTENERS,
    listeners: listeners,
  };
}

const RECEIVE_TIME = 'RECEIVE_TIME';
function receiveTime(now, later) {
  return {
    type: RECEIVE_TIME,
    now: now,
    later: later,
  };
}

const RECEIVE_NOT_RECENT = 'RECEIVE_NOT_RECENT';
function receiveNotRecent() {
  return {
    type: RECEIVE_NOT_RECENT,
  };
}

export {
  RECEIVE_LISTENERS,
  receiveListeners,
  RECEIVE_TIME,
  receiveTime,
  RECEIVE_NOT_RECENT,
  receiveNotRecent,
};
