import { connect } from 'react-redux';
import React from 'react';
import Listener from '../components/Listener';

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
const AllListeners = ({ listeners }) => (
  <div>
    {listeners.map(listener => (
      <Listener displayName={listener.displayName} />
    ))}
  </div>
);
AllListeners.propTypes = {
  listeners: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/* Main container that manages showing of posts */
function Listeners({ listeners }) {
  if (listeners.length === 0) {
    return (<NoListeners />);
  }
  return (
    <AllListeners listeners={listeners} />
  );
}

Listeners.propTypes = {
  listeners: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    listeners: state.listeners,
  };
};

const Container = connect(mapStateToProps)(Listeners);

export default Container;
