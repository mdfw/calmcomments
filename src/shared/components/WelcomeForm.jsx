import React from 'react';

function WelcomeForm() {
  const createPostPaperStyle = {
    padding: '15px',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    marginBottom: '15px',
  };

  return (
    <div style={createPostPaperStyle}>
      Welcome to Calm Comments. Comments can be posted at any time (after you log in). However, new posts are only distributed every 5 minutes. This allows those of different temperaments to participate.
    </div>
  );
}

export default WelcomeForm;
