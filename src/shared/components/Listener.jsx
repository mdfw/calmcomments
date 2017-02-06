import React from 'react';

function Listener({ displayName }) {
  return (
    <div className="listener">
      { displayName }
    </div>
  );
}

Listener.propTypes = {
  displayName: React.PropTypes.string,
};
Listener.defaultProps = {
  displayName: '',
};

export default Listener;
