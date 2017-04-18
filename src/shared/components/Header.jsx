import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router';
import HeaderLoggedInButton from './HeaderLoggedInButton';
import { TimersDisplay } from '../containers/Timers';

const HeaderLogin = () => (
  <Link to="/login">
    <button className="top-buttons" name="login">Login</button>
  </Link>
);

const HeaderSignup = () => (
  <Link to="/signup">
    <button className="top-buttons" name="button">Sign up</button>
  </Link>
);

function rightSideOption(urlPath, authenticated, displayName) {
  let rightSide = <HeaderLogin />;
  if (urlPath === '/login') {
    rightSide = <HeaderSignup />;
  }
  if (authenticated) {
    rightSide = <HeaderLoggedInButton displayName={displayName} />;
  }
  return rightSide;
}

const Header = (props) => {
  const rightSide = rightSideOption(props.urlPath, props.authenticated, props.displayName);
  return (
    <div>
      <div className="topSpacer" />
      <nav className="top-navigation">
        <div className="top-nav-overlay" />
        <div className="content">
          <div className="top-title">
            <Link to="/">
              <span className="top-title-text">Calm</span>
              <img
                className="logo"
                src="assets/calmlogo.svg"
                alt="Calm comments logo"
                width="20"
                height="20"
              />
              <span className="top-title-text">Comments</span>
            </Link>
            {rightSide}
          </div>
          <div className="top-timers">
            <TimersDisplay />
          </div>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  authenticated: React.PropTypes.bool,
  displayName: React.PropTypes.string,
  urlPath: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    authenticated: state.account.authenticated,
    displayName: state.account.displayName,
    urlPath: ownProps.urlPath,
  };
};

const Container = connect(mapStateToProps)(Header);

export default Container;
