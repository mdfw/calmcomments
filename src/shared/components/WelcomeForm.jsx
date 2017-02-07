import React from 'react';
import { NowTimer, ReleaseTimer } from '../containers/Timers';

function WelcomeForm() {
  const welcomePostPaperStyle = {
    padding: '15px',
    marginBottom: '15px',
    borderColor: 'lightGray',
    borderWidth: '1px',
    borderRadius: '10px',
    borderStyle: 'solid',
  };

  return (
    <div style={welcomePostPaperStyle}>
      Welcome to Calm Comments.<br />
      Comments can be posted at any time (after you log in).
      However, new posts are only distributed every 5 minutes.
      This allows those of different temperaments to participate.
      <div style={{ fontSize: '12px', marginTop: '13px' }}>
        <NowTimer />
        <span> | </span>
        <ReleaseTimer />
      </div>

    </div>
  );
}

export default WelcomeForm;
