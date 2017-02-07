import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';

class Timers extends React.Component {
  render() {
    let nowDate = null;
    if (this.props.listeners.serverNow) {
      nowDate = moment(this.props.listeners.serverNow).format('LTS');
    }
    let release = null;
    if (this.props.listeners.serverRelease) {
      release = moment(this.props.listeners.serverRelease).format('LTS');
    }
    if (!nowDate || !release) {
      return null;
    }
    return (
      <div style={{ fontSize: '12px' }} >
        Now: {nowDate}<br />Next release: {release}
      </div>
    );
  }
}

Timers.propTypes = {
  listeners: React.PropTypes.object.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    listeners: state.listeners,
  };
};

const Container = connect(mapStateToProps)(Timers);

export default Container;
