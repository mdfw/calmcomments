import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';


/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    listeners: state.listeners,
  };
};

/* eslint-disable react/no-multi-comp */

/* Now timer */
class NowTimerContainer extends React.Component {
  render() {
    let nowDate = null;
    if (this.props.listeners.serverNow) {
      nowDate = moment(this.props.listeners.serverNow).format('LTS');
    }
    if (!nowDate) {
      return null;
    }
    return (
      <span>Now: {nowDate}</span>
    );
  }
}
NowTimerContainer.propTypes = {
  listeners: React.PropTypes.object.isRequired,
};
const NowTimer = connect(mapStateToProps)(NowTimerContainer);


/* Release timer*/
class ReleaseTimerContainer extends React.Component {
  render() {
    let release = null;
    if (this.props.listeners.serverRelease) {
      release = moment(this.props.listeners.serverRelease).format('LTS');
    }
    if (!release) {
      return null;
    }
    return (
      <span>Next release: {release}</span>
    );
  }
}
ReleaseTimerContainer.propTypes = {
  listeners: React.PropTypes.object.isRequired,
};
const ReleaseTimer = connect(mapStateToProps)(ReleaseTimerContainer);

/* eslint-enable react/no-multi-comp */


export { ReleaseTimer, NowTimer };
