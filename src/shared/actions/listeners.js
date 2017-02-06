
const RECEIVE_LISTENERS = 'RECEIVE_LISTENERS';
function receiveListeners(listeners) {
  return {
    type: RECEIVE_LISTENERS,
    listeners: listeners,
  };
}

export {
  RECEIVE_LISTENERS,
  receiveListeners,
};
