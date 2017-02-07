import React from 'react';

function Listener({ displayName }) {
  return (
    <span className="listener">
      { displayName }
    </span>
  );
}

Listener.propTypes = {
  displayName: React.PropTypes.string,
};
Listener.defaultProps = {
  displayName: '',
};

export default Listener;
