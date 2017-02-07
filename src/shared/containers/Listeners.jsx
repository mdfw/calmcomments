import { connect } from 'react-redux';
import React from 'react';

/* Renders if there are no posts */
const noListenersStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#4376a3',
  marginTop: '30px',
};

const NoListeners = () => (
  <div id="noListeners" style={noListenersStyle}>
    There are no listeners.
  </div>
);

/* Renders a list of listeners */
const AllListeners = ({ listeners }) => {
  const listenerComponents = [];
  listeners.map((listener) => { // eslint-disable-line array-callback-return
    if (listener && listener.length > 0) {
      listenerComponents.push(listener);
    }
  });
  if (listenerComponents.length === 0) {
    return null;
  }
  return (
    <div>
      Listening: {listenerComponents.join(', ')}
    </div>
  );
};
AllListeners.propTypes = {
  listeners: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/* Main container that manages showing of posts */
function Listeners({ listeners }) {
  if (!listeners || listeners.length === 0) {
    return (<NoListeners />);
  }
  return (
    <AllListeners listeners={listeners} />
  );
}

Listeners.propTypes = {
  listeners: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
Listeners.defaultProps = {
  listeners: [],
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    listeners: state.listeners.listeners,
  };
};

const Container = connect(mapStateToProps)(Listeners);

export default Container;
