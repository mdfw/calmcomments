
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

export {
  RECEIVE_LISTENERS,
  receiveListeners,
  RECEIVE_TIME,
  receiveTime,
};
