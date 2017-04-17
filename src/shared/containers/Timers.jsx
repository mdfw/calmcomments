import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';
import { receiveNotRecent } from '../actions/listeners';
import {
  LISTENER_STATUS_OFFLINE,
  LISTENER_STATUS_IMMINENT,
  LISTENER_STATUS_RELEASING,
} from '../reducers/listener_constants';

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

function pad(n) {
  return ('0' + n).slice(-2); // eslint-disable-line prefer-template
}

/* eslint-disable react/no-multi-comp */
/* Timers desplay */
class TimersDisplayContainer extends React.Component {
  render() {
    this.lastStatus = this.props.listeners.receiveStatus;
    switch (this.props.listeners.receiveStatus) {
      case LISTENER_STATUS_OFFLINE:
        this.lastText = 'Next Release: offline';
        break;
      case LISTENER_STATUS_RELEASING:
        this.lastText = 'Releasing';
        break;
      case LISTENER_STATUS_IMMINENT:
        this.lastText = 'Next Release: imminent';
        break;
      default: {
        const elapsed = this.props.listeners.serverRelease - this.props.listeners.serverNow;
        const difference = new Date(elapsed);
        const diffMins = difference.getMinutes();
        const diffSecs = difference.getSeconds();
        this.lastText = `Next Release: ${pad(diffMins)}:${pad(diffSecs)}`;
        break;
      }
    }
    let cName = '';
    if (this.props.listeners.receivedRecent) {
      cName = 'pulse';
      const dispatch = this.props.dispatch;
      setTimeout(function fireNotNew() {
        dispatch(
          receiveNotRecent(),
        );
      }, 3000);
    }
    return <span className={cName}>{this.lastText}</span>;
  }
}
TimersDisplayContainer.propTypes = {
  listeners: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
const TimersDisplay = connect(mapStateToProps)(TimersDisplayContainer);

/* eslint-enable react/no-multi-comp */


export { ReleaseTimer, NowTimer, TimersDisplay };
