import React from 'react';
import { Link } from 'react-router';

/* eslint-disable max-len */
function WelcomeForm() {
  return (
    <div id="welcome-area">
      <div id="welcome-area-title">Welcome to Calm Comments</div>
      <div id="welcome-area-text">
      People are different and process conversations in different ways. <span id="welcome-introverts">Introverts</span> (generally) need time to think. <span id="welcome-extroverts">Extroverts</span> (again, generally) dive right in. Calm comments can help bridge that gap. Here is how:
      <ol>
        <li>Comments can be posted at any time (after you log in).</li>
        <li>New posts are only distributed every 5 minutes.</li>
      </ol>
      Everyone wins! A nice calm conversation. Try it yourself - <Link to="/login">there&apos;s a free demo</Link>.
      </div>
      <div id="welcome-area-signup">
        <Link to="/signup">
          <button id="welcome-signup-button" name="button">Sign up</button>
        </Link>
      </div>
    </div>
  );
}
/* eslint-enable max-len */

export default WelcomeForm;
