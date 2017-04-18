import { connect } from 'react-redux';
import React from 'react';
import { logoutAccount } from '../actions/account';

class HeaderLoggedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleButtonTap = this.handleButtonTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMenuItemTap = this.handleMenuItemTap.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleButtonTap(event) {
    event.preventDefault();
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget,
    });
  }

  handleSignOut() {
    this.props.dispatch(logoutAccount());
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

//   handleMenuItemTap(event, menuItem) {  <--storing in case we need it.
  handleMenuItemTap(event) {
    this.setState({
      open: false,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    const welcomeText = `Welcome, ${this.props.displayName}`;
    return (
      <span id="top-title-right">{welcomeText}</span>
    );
  }
}

HeaderLoggedButton.propTypes = {
  displayName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

const Container = connect()(HeaderLoggedButton);

export default Container;

